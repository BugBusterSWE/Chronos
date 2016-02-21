/**
 * @author @korut94 on 09/02/16.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="CommandAbs.ts" />
var Command;
(function (Command) {
    /**
     * @classdesc CommandSync perform a synchronous child process
     */
    var CommandSync = (function (_super) {
        __extends(CommandSync, _super);
        function CommandSync(cmd, opt) {
            if (opt === void 0) { opt = []; }
            _super.call(this, cmd, opt);
        }
        /**
         * Run command in a synchronous way
         * @override
         */
        CommandSync.prototype.exec = function () {
            //Rappresentazione del processo figlio
            return CommandSync.SPAWN(this.cmd, this.opt).status;
        };
        //Executor of process
        CommandSync.SPAWN = require('child_process').spawnSync;
        return CommandSync;
    })(Command.CommandAbs);
    Command.CommandSync = CommandSync;
})(Command || (Command = {}));
//# sourceMappingURL=CommandSync.js.map