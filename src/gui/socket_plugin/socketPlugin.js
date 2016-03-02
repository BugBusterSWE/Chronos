'use strict';
// For this module is necessary use require( ./socket_plugin ).
// In the future version will be necessary remove './' because it's limit the
// extensible of project structure and it not allow information hiding.


/** Create a channel listener. The channel name is 'id' concat with the current
 *  time, in this way it's a univocal name.
 *
 * @param callback - Function to run when the PMP will reply
 * @returns {string} - Id of channel
 */
function openChannel( callback ) {
    var idChannel = "id_"+(new Date()).getTime(); // The time is solution?

    //Temporary channel listen for message reached from main process.
    require( 'electron' ).ipcRenderer.once(
        idChannel,
        function ( event, message ) {
            callback( message );
    });

    return idChannel;
}

/**
 * Packet template :
 * {
 *   action = action to perform,
 *   plugin = name of plugin,
 *   [ module ] = name of module ( optional ),
 *   [ args ] = arguments require ( optional ),
 *   channel = id of channel awaiting message
 * }
 */
var pack = new Object();
pack.action = undefined;
pack.plugin = undefined;
pack.module = undefined;
pack.args = undefined;
pack.channel = undefined;

/**
 * Send request to download plugin
 *
 * @param plugin - Name of plugin
 * @param callback - Function to perform after download
 */
exports.download = function ( plugin, callback ) {
    // Create packet
    pack.action = "download";
    pack.plugin = plugin;
    pack.channel = openChannel( callback );

    // Send message to the parent
    process.stdout.write( JSON.stringify( pack ) );
};

/**
 * Send request to remove plugin
 *
 * @param plugin - Name of plugin
 * @param callback - Function to perform after remove
 */
exports.remove = function ( plugin, callback ) {
    // Create packet
    pack.action = "remove";
    pack.plugin = plugin;
    pack.channel = openChannel( callback );

    // Send message to the parent
    process.stdout.write( JSON.stringify( pack ) );
};

/**
 * Send request to run the plugin's module specified
 *
 * @param plugin - Name of module
 * @param args - Array of arguments to pass to the module
 * @param callback - Function to perform after run module
 */
exports.run = function ( plugin, args, callback ) {
    if ( callback === undefined ) {
        // Se non sono stati specificati argomenti la callback si trova
        // nella variabile degli argomenti
        callback = args; // ORRIBILE!
        args = [];
    }

    var module = plugin;

    // Controllo se il plugin e' completo, con nome plugin seguito dal nome del
    // modulo separati con il carattere divisore oppure si e' usata la
    // forma abbreviata con solo il nome del modulo. In quel caso al nome del
    // plugin viene dato quello assiociato alla variabile globale __plugin,
    // identificando il plugin attualmente in uso.
    if ( plugin.indexOf( __SCOPING_OPERATOR ) > -1 ) {

        // res[0] = Nome del plugin
        // res[1] = Nome del modulo
        var res = plugin.split( __SCOPING_OPERATOR );

        plugin = res[0];
        module = res[1];
    } else {
        plugin = __plugin;
    }

    // Creo il pacchetto
    pack.action = "run";
    pack.plugin = plugin;
    pack.module = module;
    pack.args = args;
    // Il nome del canale deve essere unico altrimenti si creerebbe
    // interferenza
    pack.channel = openChannel( callback );

    // Serializzo il pacchetto da inviare al processo padre
    process.stdout.write( JSON.stringify( pack ) );
};

exports.update = function ( plugin, callback ) {
    // Creo il pacchetto
    pack.action = "update";
    pack.plugin = plugin;
    pack.channel = openChannel( callback );

    // Invio il messaggio al padre
    process.stdout.write( JSON.stringify( pack ) );
};
