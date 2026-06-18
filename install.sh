#!/bin/sh
set -e

reset="\033[0m"
red="\033[31m"
green="\033[32m"
yellow="\033[33m"
cyan="\033[36m"
white="\033[37m"
gpg_key=23E7166788B63E1E

yarn_get_tarball() {
  printf "%b> Downloading tarball...%b\n" "$cyan" "$reset"
  if [ "$1" = '--nightly' ]; then
    url=https://nightly.yarnpkg.com/latest.tar.gz
  elif [ "$1" = '--rc' ]; then
    url=https://yarnpkg.com/latest-rc.tar.gz
  elif [ "$1" = '--version' ]; then
    # Validate that the version matches MAJOR.MINOR.PATCH to avoid garbage-in/garbage-out behavior
    version=$2
    if echo "$version" | grep -qE "^[[:digit:]]+\.[[:digit:]]+\.[[:digit:]]+$"; then
      url="https://yarnpkg.com/downloads/$version/yarn-v$version.tar.gz"
    else
      printf "%b> Version number must match MAJOR.MINOR.PATCH.%b\n" "$red" "$reset"
      exit 1;
    fi
  else
    url=https://yarnpkg.com/latest.tar.gz
  fi
  # Get both the tarball and its GPG signature
  tarball_tmp=$(mktemp -t yarn.tar.gz.XXXXXXXXXX)
  if curl --fail -L -o "$tarball_tmp#1" "$url{,.asc}"; then
    yarn_verify_integrity "$tarball_tmp"

    printf "%b> Extracting to ~/.yarn...%b\n" "$cyan" "$reset"
    # All this dance is because `tar --strip=1` does not work everywhere
    temp=$(mktemp -d yarn.XXXXXXXXXX)
    tar zxf "$tarball_tmp" -C "$temp"
    mkdir .yarn
    mv "$temp"/*/* .yarn
    rm -rf "$temp"
    rm "$tarball_tmp"*
  else
    printf "%b> Failed to download $url.%b\n" "$red" "$reset"
    exit 1;
  fi
}

# Verifies the GPG signature of the tarball
yarn_verify_integrity() {
  # Check if GPG is installed
  if [ -z "$(command -v gpg)" ]; then
    printf "%b> WARNING: GPG is not installed, integrity can not be verified!%b\n" "$yellow" "$reset"
    return
  fi

  if [ "$YARN_GPG" = "no" ]; then
    printf "%b> WARNING: Skipping GPG integrity check!%b\n" "$cyan" "$reset"
    return
  fi

  printf "%b> Verifying integrity...%b\n" "$cyan" "$reset"
  # Grab the public key if it doesn't already exist
  gpg --list-keys $gpg_key >/dev/null 2>&1 || (curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --import)

  if [ ! -f "$1.asc" ]; then
    printf "%b> Could not download GPG signature for this Yarn release. This means the release can not be verified!%b\n" "$red" "$reset"
    yarn_verify_or_quit "> Do you really want to continue?"
    return
  fi

  # Actually perform the verification
  if gpg --verify "$1.asc" "$1"; then
    printf "%b> GPG signature looks good%b\n" "$green" "$reset"
  else
    printf "%b> GPG signature for this Yarn release is invalid! This is BAD and may mean the release has been tampered with. It is strongly recommended that you report this to the Yarn developers.%b\n" "$red" "$reset"
    yarn_verify_or_quit "> Do you really want to continue?"
  fi
}

yarn_link() {
  printf "%b> Adding to \$PATH...%b\n" "$cyan" "$reset"
  YARN_PROFILE="$(yarn_detect_profile)"
  SOURCE_STR="\nexport PATH=\"\$HOME/.yarn/bin:\$HOME/.config/yarn/global/node_modules/.bin:\$PATH\"\n"

  if [ -z "${YARN_PROFILE-}" ] ; then
    printf "%b> Profile not found. Tried %s (as defined in \$PROFILE), ~/.bashrc, ~/.bash_profile, ~/.zshrc, and ~/.profile.\n" "$red" "$YARN_PROFILE"
    echo "> Create one of them and run this script again"
    echo "> Create it (touch ${YARN_PROFILE}) and run this script again"
    echo "   OR"
    printf "> Append the following lines to the correct file yourself:%b\n" "$reset"
    command printf "${SOURCE_STR}"
  else
    if ! grep -q 'yarn/bin' "$YARN_PROFILE"; then
      case "$YARN_PROFILE" in
        *"fish"*)
          # shellcheck disable=SC2016
          command fish -c 'set -U fish_user_paths $fish_user_paths ~/.yarn/bin'
          printf "%b> We've added ~/.yarn/bin to your fish_user_paths universal variable\n" "$cyan"
          ;;
        *)
          command printf "$SOURCE_STR" >> "$YARN_PROFILE"
          printf "%b> We've added the following to your %s\n" "$cyan" "$YARN_PROFILE"
          ;;
      esac

      echo "> If this isn't the profile of your current shell then please add the following to your correct profile:"
      printf "   $SOURCE_STR%b\n" "$reset"
    fi

    version=$("$HOME/.yarn/bin/yarn" --version) || (
      printf "%b> Yarn was installed, but doesn't seem to be working :(.%b\n" "$red" "$reset"
      exit 1;
    )

    printf "%b> Successfully installed Yarn $version! Please open another terminal where the \`yarn\` command will now be available.%b\n" "$green" "$reset"
  fi
}

yarn_detect_profile() {
  if [ -n "${PROFILE}" ] && [ -f "${PROFILE}" ]; then
    echo "${PROFILE}"
    return
  fi

  DETECTED_PROFILE=''
  SHELLTYPE="$(basename "/$SHELL")"

  if [ "$SHELLTYPE" = "bash" ]; then
    if [ -f "$HOME/.bashrc" ]; then
      DETECTED_PROFILE="$HOME/.bashrc"
    elif [ -f "$HOME/.bash_profile" ]; then
      DETECTED_PROFILE="$HOME/.bash_profile"
    fi
  elif [ "$SHELLTYPE" = "zsh" ]; then
    DETECTED_PROFILE="$HOME/.zshrc"
  elif [ "$SHELLTYPE" = "fish" ]; then
    DETECTED_PROFILE="$HOME/.config/fish/config.fish"
  fi

  if [ -z "$DETECTED_PROFILE" ]; then
    if [ -f "$HOME/.profile" ]; then
      DETECTED_PROFILE="$HOME/.profile"
    elif [ -f "$HOME/.bashrc" ]; then
      DETECTED_PROFILE="$HOME/.bashrc"
    elif [ -f "$HOME/.bash_profile" ]; then
      DETECTED_PROFILE="$HOME/.bash_profile"
    elif [ -f "$HOME/.zshrc" ]; then
      DETECTED_PROFILE="$HOME/.zshrc"
    elif [ -f "$HOME/.config/fish/config.fish" ]; then
      DETECTED_PROFILE="$HOME/.config/fish/config.fish"
    fi
  fi

  if [ -n "$DETECTED_PROFILE" ]; then
    echo "$DETECTED_PROFILE"
  fi
}

yarn_reset() {
  unset -f yarn_install yarn_reset yarn_get_tarball yarn_link yarn_detect_profile yarn_verify_integrity yarn_verify_or_quit
}

yarn_install() {
  printf "%bInstalling Yarn!%b\n" "$white" "$reset"

  if [ -d "$HOME/.yarn" ]; then
    if command -v yarn; then
      if [ "$1" = '--nightly' ]; then
        latest_url=https://nightly.yarnpkg.com/latest-tar-version
        specified_version=$(curl -sS "$latest_url")
      elif [ "$1" = '--version' ]; then
        specified_version=$2
      elif [ "$1" = '--rc' ]; then
        latest_url=https://yarnpkg.com/latest-rc-version
        specified_version=$(curl -sS "$latest_url")
      else
        latest_url=https://yarnpkg.com/latest-version
        specified_version=$(curl -sS "$latest_url")
      fi
      yarn_version=$(yarn -V)
      yarn_alt_version=$(yarn --version)

      if [ "$specified_version" = "$yarn_version" ] || [ "$specified_version" = "$yarn_alt_version" ]; then
        printf "%b> Yarn is already at the $specified_version version.%b\n" "$green" "$reset"
        exit 0
      else
        printf "%b> $yarn_alt_version is already installed, Specified version: $specified_version.%b\n" "$yellow" "$reset"
        rm -rf "$HOME/.yarn"
      fi
    else
      printf "%b> $HOME/.yarn already exists, possibly from a past Yarn install.%b\n" "$red" "$reset"
      printf "%b> Remove it (rm -rf $HOME/.yarn) and run this script again.%b\n" "$red" "$reset"
      exit 0
    fi
  fi

  yarn_get_tarball "$1" "$2"
  yarn_link
  yarn_reset
}

yarn_verify_or_quit() {
  printf '%s [y/N] ' "$1"
  read -r
  echo
  case "$REPLY" in
    Y|y)
      ;;
    *)
      printf "%b> Aborting%b\n" "$red" "$reset"
      exit 1
      ;;
  esac
}

cd ~
yarn_install "$1" "$2"
