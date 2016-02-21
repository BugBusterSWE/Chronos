/**
 * Classe definisce gli attributi dei vari tipi di Pack.
 * Created by amantova on 21/02/16.
 */
var Package;
(function (Package) {
    // Pacchetto inviato dalla GUI per poter usare le funzionalita' del plugin
    // manager.
    var PackRe = (function () {
        // Viene costruito con qualsiasi cosa abbia quei specifici attributi.
        // Nel caso il pack non abbia quell'attributo verra' settato ad
        // undefined.
        function PackRe(pack) {
            this.action = pack.action;
            this.plugin = pack.plugin;
            this.module = pack.module;
            this.args = pack.args;
            this.channel = pack.channel;
        }
        return PackRe;
    })();
    Package.PackRe = PackRe;
    // Pacchetto inviatto alla GUI con la risposta alla sua richiesta.
    var PackSe = (function () {
        function PackSe(channel, result) {
            if (result === void 0) { result = undefined; }
            this.result = result;
            this.channel = channel;
        }
        return PackSe;
    })();
    Package.PackSe = PackSe;
})(Package || (Package = {}));
//# sourceMappingURL=pack.js.map