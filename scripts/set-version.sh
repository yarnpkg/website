#!/bin/bash
# Sets the Yarn version number in _config.yml
set -ex

if [ -z "$YARN_VERSION" -o -z "$YARN_RC" ]; then
  echo 'Please provide YARN_VERSION and YARN_RC environment variables.'
  echo 'YARN_RC should be "true" to release an RC build.'
  exit 1
fi

configFile=`dirname $0`/../_config.yml

if [ "$YARN_RC" = "true" ]; then
  sed -i -e "s/latest_rc_version:.\+/latest_rc_version: $YARN_VERSION/" "$configFile"
  sed -i -e 's/show_rc:.\+/show_rc: true/' "$configFile"
else
  sed -i -e "s/latest_version:.\+/latest_version: $YARN_VERSION/" "$configFile"

  # If the stable version is newer than the latest RC, we should hide the RC
  latestRCVersion=`grep -oP 'latest_rc_version: \K([0-9\.]+)' "$configFile"`
  ! dpkg --compare-versions $latestRCVersion le $YARN_VERSION
  if [ $? -ne 0 ]; then
    sed -i -e 's/show_rc:.\+/show_rc: false/' "$configFile"
  fi;
fi
