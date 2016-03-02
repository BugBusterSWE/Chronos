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
        // If any arguments specify then the callaback will store in 'args'
        // parameter
        callback = args; // ORRIBLE!
        args = [];
    }

    var module = plugin;

    // Check if the expression of plugin is extended type. Otherwise,
    // the name of plugin is storing in global variable __plugin.
    if ( plugin.indexOf( __SCOPING_OPERATOR ) > -1 ) {

        // res[0] = Name of plugin
        // res[1] = Name of module
        var res = plugin.split( __SCOPING_OPERATOR );

        plugin = res[0];
        module = res[1];
    } else {
        plugin = __plugin;
    }

    // Make packet
    pack.action = "run";
    pack.plugin = plugin;
    pack.module = module;
    pack.args = args;
    pack.channel = openChannel( callback );

    // Packet serialized to send to the parent process
    process.stdout.write( JSON.stringify( pack ) );
};

/**
 * Send request to update specified plugin
 *
 * @param plugin - Name of plugin
 * @param callback - Function to perforn after update plugin
 */
exports.update = function ( plugin, callback ) {
    // Make packet
    pack.action = "update";
    pack.plugin = plugin;
    pack.channel = openChannel( callback );

    // Packet serialized to send to the parent process
    process.stdout.write( JSON.stringify( pack ) );
};
