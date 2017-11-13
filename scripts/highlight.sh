#!/bin/bash

ROOT_PATH=$(python -c "import os,sys;print(os.path.dirname(os.path.realpath(sys.argv[1])))" $0)
ROOT_PATH=$(dirname $ROOT_PATH)
npm --prefix $ROOT_PATH/_js/highlight install
OLD_CWD=$(pwd)
cd $ROOT_PATH/_js/highlight
rm -rf build/ &> /dev/null
node tools/build.js css javascript markdown bash shell xml typescript scss
cd $OLD_CWD
