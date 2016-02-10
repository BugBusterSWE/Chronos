/**
 * Script di partenze per l'esecuzione di Chronos
 *
 * Created by amantova on 09/02/16.
 */

/// <reference path="Module/dl_plugin.ts" />
/// <reference path="Module/rm_plugin.ts" />
/// <reference path="Module/up_plugin.ts" />

console.log( "Download plugin..." );
var code : number = Module.downloadPlugin(
    "git@github.com:korut94/LinQedIn.git"
);
console.log( "Download completato!" );


console.log( "Update plugin..." );
var code : number = Module.updatePlugin(
    "git@github.com:korut94/LinQedIn.git"
);

console.log( `Terminato con stato ${code}` );
