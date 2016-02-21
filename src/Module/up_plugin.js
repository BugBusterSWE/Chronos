/**
 * Esegue l'operazione di aggiornamento di un plugin. Al momento vengono
 * prelevati tutte le modifiche dal branch 'master' di un repo remoto.
 * @todo Da introdurre un sistema di gestione repo.
 *
 * Created by @korut94 on 10/02/16.
 */
/// <require path="../Command/CommandSync.ts" />
/// <require path="config.ts" />
var fs = require('fs');
var Module;
(function (Module) {
    /**
     * @param url {string} - URL del repo del plugin da aggiornare
     * @returns {number} - Codice d'uscita dell'aggiornamento
     */
    function updatePlugin(url) {
        console.log("URL plugin: " + url);
        //Preleva la posizione del plugin
        var namePlugin = Module._EXPR_GIT.exec(url)[1];
        console.log("Plugin trovato da aggiornare: " + namePlugin);
        var code = Module.Code._SUCCESS;
        //Controllo presenza del plugin
        try {
            console.log("Stato " + (Module._PATH + namePlugin) + ": ");
            fs.accessSync(Module._PATH + namePlugin);
            console.log("Presente");
            console.log("Inizio invio aggiornamenti...");
            code = new Command.CommandSync("git", ["-C", Module._PATH + namePlugin, "pull"]).exec();
        }
        catch (err) {
            console.log(err.message);
            code = Module.Code._INVALID_ARG;
        }
        return code;
    }
    Module.updatePlugin = updatePlugin;
})(Module || (Module = {}));
//# sourceMappingURL=up_plugin.js.map