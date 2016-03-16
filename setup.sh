#Setup script for running Chronos
#@author: Davide Polonio
#@license: GPLv3 license


##VARIABLES
VERBOSE=1
DEBUG=0
##END

function msg() {
	 #filter for messages
	 if [ $1 == "e" ]
	 then
	     # "!!!" red and blinking
	     echo -e "\e[5m\e[31m !!!\e[0m\e[25m $2"
	 fi

	 if [ $1 == "v" -a $VERBOSE -eq 1 ]
	 then
	     echo -e "\e[92m ***\e[0m $2"
	 fi

	 if [ $1 == "d" -a $DEBUG -eq 1 ]
	 then
	     echo -e "\e[33m @@@\e[0m $2"
	 fi  
}

function get_npm_dependences() {

    msg v "Installing npm dependences"
    msg d "Getting Electron..."
    sudo npm install electron-prebuilt@0.36.8 -g
    msg d "Getting Typings..."
    sudo npm install typings -g
    msg d "Getting Async..."
    npm install async
    msg d "Getting posix-getopt"
    npm install posix-getopt
}

function get_node() {

    msg v "You need sudo privileges in order to do this operation"
    msg d "Refreshing apt cache..."
    sudo apt-get update -qq
    msg d "Installing nodeJs..."
    sudo apt-get install nodejs-legacy nodejs -y -qq
    msg v "Done installing nodeJs"
}

function main() {

    echo "IMPORTANT: you need to run this script in the Chronos folder. If you moved it, press Ctrl-C and stop the execution. Waiting 3 seconds..."
    sleep 3

    if [ "$1" == "-n" ]
    then
	msg d "Getting NodeJs"
	get_node
    fi

    msg d "Getting npm dependences..."
    get_npm_dependences

    msg d "Setting typings"
    cd src/
    typings install node --ambient
    msg d "Compiling..."
    tsc
    cd ..
    msg v "Done"
}

#first error everything stops
set -e
#main call
main $1
