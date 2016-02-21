'use strict';

const fs = require( 'fs' );
const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Bind plugin process' pipe identify with fd = 3
var reader = fs.createReadStream( null, {fd:3} );

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform != 'darwin') {
        app.quit();
    }
});

// Here receive all message from parent
reader.on( 'data', function( data ) {
    // Quando l'applicazione si chiude la mainWindow non e' piu' referenziata.
    // Per chiudere la pipe si e' innestato un ciclo di scambio di messaggi tra
    // il plugin manager process e la gui process che termina quando la pipe si
    // chiude.
    if ( mainWindow !== null ) {
        // Ricezione del pacchetto inviato
        var pack = JSON.parse( data.toString() );
        // Canale per comunicare con il processo di rendering.
        mainWindow.webContents.send( pack.channel, pack.result );
    } else {
        // L'altra parte per formare il loop fino alla chiusura della pipe
        process.stdout.write( 'idle' );
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600});

    // and load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
        // Star loop for to close the pipe. The message 'idle' is arbitrary.
        process.stdout.write( 'idle' );
    });
});




