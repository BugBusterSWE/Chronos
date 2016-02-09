/**
 * @author @korut94 on 09/02/16.
 */

module Command{
    /**
     * @classdesc Interfaccia Command, rappresenta l'esecuzione di un comando.
     */
    export interface CommandI{
        /**
         * Esegue il comando assegnato
         *
         * @return {Number} Codice dello stato al termine dell'esecuzione del programma
         */
        exec() : number;
    }
}
