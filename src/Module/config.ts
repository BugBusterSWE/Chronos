/**
 * Dichiarazione variabili globali all'interno del modulo Module.
 * Preferito al posto di un file di configurazione in quando non sono opzioni
 * negoziabili durante l'uso del programma.
 *
 * @author @korut94
 */

module Module {
    //Directory dei plugins
    export const _PATH : string = "plugins/";
    //Regex in cui si preleva il nome l'autore del plugin e il nome del
    //plugin
    export const _EXPR_GIT : RegExp = /:(.*)\.git$/;
    //Modulo presente i codici d'uscita dei moduli
    export module Code{
        //Uscita con successo
        export const _SUCCESS : number = 0;
        //Errore generale
        export const _GENERAL_ERROR : number = 1
        //Argomento non valido
        export const _INVALID_ARG : number = 128;
    }
}