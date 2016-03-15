'use strict';

const fs = require('fs');
const electron = require('electron');
// Module to control application life.
const app = electron.app;

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform != 'darwin') {
        app.quit();
    }
});

// In the gui to catch a message sended by pmp it use the stdin channel and it
// send messages by stdout channal.

// Here receive all message from parent
process.stdin.on( 'data', function( data ) {
    // Catch message sended
    var pack = JSON.parse( data.toString() );
    // Channel to communicate between Main process and Rendered process
    mainWindow.webContents.send( pack.channel, pack.result );
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600});

    // and load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
        // Send signal to close pipe
        process.stdout.emit( 'end' );
    });
});