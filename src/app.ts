/**
 * Created by amantova on 09/02/16.
 */

/// <reference path="Command/CommandI.ts" />
/// <reference path="Command/CommandSync.ts" />

var command : Command.CommandI = new Command.CommandSync(
    'git',
    ['clone','git@github.com:korut94/LinQedIn.git']
);

console.log( command.exec() );