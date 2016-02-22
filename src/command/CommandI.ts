/**
 * @author @korut94 on 09/02/16.
 */

module Command{
    /**
     * @classdesc Interface Command, it's perform a child process
     */
    export interface CommandI{
        /**
         * Run the command
         *
         * @return {number} Exit code of the process terminated
         */
        exec() : number;
    }
}
