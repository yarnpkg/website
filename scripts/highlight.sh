#!/bin/bash

ROOT_PATH=$(python -c "import os,sys;print(os.path.dirname(os.path.realpath(sys.argv[1])))" $0)
ROOT_PATH=$(dirname $ROOT_PATH)
OLD_CWD=$(pwd)
cd $ROOT_PATH/_js/highlight
rm -rf build/ &> /dev/null
yarn
node tools/build.js css javascript markdown bash shell xml typescript scss
cd $OLD_CWD
