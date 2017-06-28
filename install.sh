#!/usr/bin/env sh
set -e

reset="\033[0m"
red="\033[31m"
green="\033[32m"
yellow="\033[33m"
cyan="\033[36m"
white="\033[37m"
gpg_key=9D41F3C3

yarn_get_tarball() {
  echo "${cyan}> Downloading tarball...${reset}"
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
      echo "${red}> Version number must match MAJOR.MINOR.PATCH.${reset}"
      exit 1;
    fi
  else
    url=https://yarnpkg.com/latest.tar.gz
  fi
  # Get both the tarball and its GPG signature
  tarball_tmp=$(mktemp -t yarn.tar.gz.XXXXXXXXXX)
  if curl --fail -L -o "$tarball_tmp#1" "$url{,.asc}"; then
    yarn_verify_integrity "$tarball_tmp"

    echo "${cyan}> Extracting to ~/.yarn...${reset}"
    mkdir .yarn
    tar zxf "$tarball_tmp" -C .yarn --strip 1 # extract tarball
    rm $tarball_tmp* # Ignore shellcheck warning; it's intended to have globbing!
  else
    echo "${red}> Failed to download ${url}.${reset}"
    exit 1;
  fi
}

# Verifies the GPG signature of the tarball
yarn_verify_integrity() {
  # Check if GPG is installed
  if [ -z "$(command -v gpg)" ]; then
    echo "${yellow}> WARNING: GPG is not installed, integrity can not be verified!${reset}"
    return
  fi

  if [ "$YARN_GPG" = "no" ]; then
    echo "${cyan}> WARNING: Skipping GPG integrity check!${reset}"
    return
  fi

  echo "${cyan}> Verifying integrity...${reset}"
  # Grab the public key if it doesn't already exist
  gpg --list-keys $gpg_key >/dev/null 2>&1 || (curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --import)

  if [ ! -f "$1.asc" ]; then
    echo "${red}> Could not download GPG signature for this Yarn release. This means the release can not be verified!${reset}"
    yarn_verify_or_quit "> Do you really want to continue?"
    return
  fi

  # Actually perform the verification
  if gpg --verify "$1.asc" "$1"; then
    echo "${green}> GPG signature looks good.${reset}"
  else
    echo "${red}> GPG signature for this Yarn release is invalid! This is BAD and may mean the release has been tampered with. It is strongly recommended that you report this to the Yarn developers.${reset}"
    yarn_verify_or_quit "> Do you really want to continue?"
  fi
}

yarn_link() {
  echo "${cyan}> Adding to \$PATH...${reset}"
  YARN_PROFILE="$(yarn_detect_profile)"
  SOURCE_STR="\nexport PATH=\"\$HOME/.yarn/bin:\$PATH\"\n"

  if [ -z "${YARN_PROFILE-}" ]; then
    echo "${red}> Profile not found. Tried ${YARN_PROFILE} (as defined in \$PROFILE), ~/.bashrc, ~/.bash_profile, ~/.zshrc, and ~/.profile."
    echo "> Create one of them and run this script again"
    echo "> Create it (touch ${YARN_PROFILE}) and run this script again"
    echo "   OR"
    echo "> Append the following lines to the correct file yourself:${reset}"
    command printf "${SOURCE_STR}"
  else
    if ! grep -q 'yarn' "$YARN_PROFILE"; then
      if echo "$YARN_PROFILE" | grep -q "fish"; then
        command fish -c "set -U fish_user_paths ${fish_user_paths} ~/.yarn/bin"
      else
        command printf "$SOURCE_STR" >> "$YARN_PROFILE"
      fi
    fi

    echo "${cyan}> We've added the following to your ${YARN_PROFILE}"
    echo "> If this isn't the profile of your current shell then please add the following to your correct profile:"
    echo "   ${SOURCE_STR}${reset}"

    version=$("$HOME"/.yarn/bin/yarn --version) || (
      echo "${red}> Yarn was installed, but doesn't seem to be working :(.${reset}"
      exit 1;
    )

    echo "${green}> Successfully installed Yarn ${version}! Please open another terminal where the \`yarn\` command will now be available.${reset}"
  fi
}

yarn_detect_profile() {
  if [ -n "${PROFILE}" ] && [ -f "${PROFILE}" ]; then
    echo "${PROFILE}"
    return
  fi

  # local DETECTED_PROFILE
  DETECTED_PROFILE=''
  # local SHELLTYPE
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

  if [ ! -z "$DETECTED_PROFILE" ]; then
    echo "$DETECTED_PROFILE"
  fi
}

yarn_reset() {
  unset -f yarn_install yarn_reset yarn_get_tarball yarn_link yarn_detect_profile yarn_verify_integrity yarn_verify_or_quit
}

yarn_install() {
  echo "${white}Installing Yarn!${reset}"

  if [ -d "$HOME/.yarn" ]; then
    if which yarn; then
      # local latest_url
      # local specified_version
      # local version_type
      if [ "$1" = '--nightly' ]; then
        latest_url=https://nightly.yarnpkg.com/latest-tar-version
        specified_version=$(curl -sS $latest_url)
        version_type='latest'
      elif [ "$1" = '--version' ]; then
        specified_version=$2
        version_type='specified'
      elif [ "$1" = '--rc' ]; then
        latest_url=https://yarnpkg.com/latest-rc-version
        specified_version=$(curl -sS $latest_url)
        version_type='rc'
      else
        latest_url=https://yarnpkg.com/latest-version
        specified_version=$(curl -sS $latest_url)
        version_type='latest'
      fi
      yarn_version=$(yarn -V)
      yarn_alt_version=$(yarn --version)
      if [ "$specified_version" = "$yarn_version" ] || [ "$specified_version" = "$yarn_alt_version" ]; then
        echo "${green}> Yarn is already at the ${specified_version} version.${reset}"
        exit 0
      else
        rm -rf "$HOME/.yarn"
      fi
    else
      echo "${red}> ${HOME}/.yarn already exists, possibly from a past Yarn install."
      echo "$> Remove it (rm -rf ${HOME}/.yarn) and run this script again.${reset}"
      exit 0
    fi
  fi

  yarn_get_tarball "$1" "$2"
  yarn_link
  yarn_reset
}

yarn_verify_or_quit() {
  echo "$1 [y/N] \c"
  read -r REPLY
  
  case $REPLY in [!yY]* )
    echo "${red}> Aborting${reset}"
    exit 1
    ;;
  esac
}

cd ~
yarn_install "$1" "$2"
