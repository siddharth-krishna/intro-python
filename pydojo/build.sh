#! /bin/bash

wget https://github.com/skulpt/skulpt-dist/archive/master.zip
unzip master.zip
mv -t dist/ skulpt-dist-master/skulpt{.min,-stdlib}.js