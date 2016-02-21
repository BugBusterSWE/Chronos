/**
 * Creo le variabili globali necessarie per il corretto funzionamento di
 * Chronos.
 *
 * Created by amantova on 21/02/16.
 */

// Ogni plugin dovra' specificare in questa variabile il suo nome, in tal
// maniera si potra' eseguire la procedura d'esecuzione dei moduli senza
// specificare il nome del plugin, accorciando la stringa del paramentro.
// E' compito del modulo di trasmissione al plugin manager process come viene
// definito la forma abbreviata da usare.
var __plugin = undefined;

const __SCOPING_OPERATOR = '::';