#!/bin/bash

ROOT_PATH=$(python -c "import os,sys;print(os.path.dirname(os.path.realpath(sys.argv[1])))" $0)
ROOT_PATH=$(dirname $ROOT_PATH)
OLD_CWD=$(pwd)
echo "Changing to $ROOT_PATH/_js/highlight"
if [ -d "$ROOT_PATH/_js/highlight" ]; then
  echo "highlight folder not found. Will init."
  cd $ROOT_PATH
  git submodule update --init --recursive
fi

cd $ROOT_PATH/_js/highlight
rm -rf build/ &> /dev/null
yarn
node tools/build.js css javascript markdown bash shell xml typescript scss
cd $OLD_CWD
