#!/bin/bash
if [ ! -d node_modules ]
then 
    npm i
fi

node ./src/bin/www