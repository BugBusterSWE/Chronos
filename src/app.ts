/**
 * Script di partenze per l'esecuzione di Chronos
 *
 * Created by amantova on 09/02/16.
 */

/// <reference path="Module/dl_plugin.ts" />
/// <reference path="Module/rm_plugin.ts" />
/// <reference path="Module/up_plugin.ts" />
/// <reference path="Module/run_plugin.ts" />

var [ result, code ] = Module.runModule(
    "git@github.com:korut94/Test.git",
    "Test"
);

console.log( `Terminato con stato ${code} e risultato ${result}` );
