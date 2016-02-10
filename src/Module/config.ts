/**
 * Dichiarazione variabili globali all'interno del modulo Module.
 * Preferito al posto di un file di configurazione in quando non sono opzioni
 * negoziabili durante l'uso del programma.
 *
 * @author @korut94
 */

module Module {
    // Directory dei plugins
    export const _PATH : string = "plugins/";
    // Regex in cui si preleva il nome l'autore del plugin e il nome del
    // plugin
    export const _EXPR_GIT : RegExp = /:(.*)\.git$/;
}