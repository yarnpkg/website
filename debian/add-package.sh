#!/bin/bash
set -ex
cd "${0%/*}"

GPGKEY=86E50310
VERSION=$1
if [ -z "$VERSION" ]; then
  echo 'You must pass the version number you want to add to the repo'
  exit 1
fi;

# Check environment
# Ensure GPG key is installed
gpg2 --list-secret-keys $GPGKEY || (echo 'GPG key not found!' && exit 2)
reprepro --version || (echo 'Reprepro must be installed' && exit 3)

# Get the package
#PACKAGE_URL='https://yarnpkg.com/downloads/'$VERSION'/yarn_'$VERSION'_all.deb'
PACKAGE_URL='https://github.com/yarnpkg/yarn/releases/download/v'$VERSION'/yarn_'$VERSION'_all.deb'
TEMPFILE=$(mktemp --suffix=.deb)
wget -O $TEMPFILE $PACKAGE_URL
#cp /mnt/c/src/yarn_0.14.0_all.deb $TEMPFILE # Just for testing

# Add it to the repo
reprepro includedeb stable $TEMPFILE

# Find where reprepro put the file
FINAL_PACKAGE_PATH=$(find . -name "*$VERSION*.deb" -printf '%P')
if [ -z $FINAL_PACKAGE_PATH ]; then
  echo 'Could not find resulting package file :('
  exit 4
fi;

# Set up a redirect so we don't have to commit the .deb binary file to source
# control
REDIRECTS_FILE=../_includes/debian_redirects
grep -q $FINAL_PACKAGE_PATH $REDIRECTS_FILE || (
  echo "/debian/$FINAL_PACKAGE_PATH $PACKAGE_URL" >> $REDIRECTS_FILE
)
rm $FINAL_PACKAGE_PATH

rm $TEMPFILE
