/**
 * Created by amantova on 09/02/16.
 */
/// <reference path="CommandI.ts" />
var Command;
(function (Command) {
    /**
     * @classdesc CommandAbs - Common information about every Command types
     */
    var CommandAbs = (function () {
        /**
         * Build a CommandAbs object
         *
         * @param cmd {string} - String command to run
         * @param opt {string[]} - Array List of string arguments
         */
        function CommandAbs(cmd, opt) {
            this.cmd = cmd;
            this.opt = opt;
        }
        return CommandAbs;
    })();
    Command.CommandAbs = CommandAbs;
})(Command || (Command = {}));
//# sourceMappingURL=CommandAbs.js.map