# smart-command

`smart-command` is a command processor that makes your job easy when controlling parameter obligatoriness and responses.

## Example

### Code

*Take this example as hypothetical.*
```javascript
var playerCommands = Scope.get('player');
playerCommands.addCommnand('ban', {
  target: 'Word',
  time: 'Number',
  reason: { type: 'Phrase', required: false }
}, function(source, parameters) {
  var source_player = source.player;
  var target_player = mp.players.get(parameters.target);

  source.respond(`Admin ${source_player.name} has banned ${target_player.name}!`);
  if(parameters.reason) {
    source.respond(`Reason ${parameters.reason}`);
  }  
});

// called when a player enters a command
function onPlayerCommand(player, text) {
  playerCommands.parse({
    player: player,
    respond: text => { player.send(text) }
  }, text);
}
```
### Input command

```
/ban WeirdNewbie 10 "Called another player a \"Dum-Dum\""
```

### Possible output

```
Admin Candy has banned WeirdNewbie
Reason Called another player a "Dum-Dum"
```

## Parameter Types

Parameter types are configured when a command is being defined (`Scope.addCommand`). A parameter type must be an object with the keys being the parameter names - later to be pushed to the handler as an argument - and values as:
* *string*: when a parameter is mandatory, the value must be a string containing the parameter parser name.
* *object of `{ type: String, required: Boolean }`*: When the obligatoriness of the parameter must be specified.

Note: A nonrequired parameter must always follow a required one and never the opposite.

### Number

Parses a number and trims the result. Will fail if any non-numeric character is input or it contains nothing.

### Word

Parses a word, or any piece of text which does not contain whitespace. Will fail if the input text is blank.

### Phrase

Parses a double quote enclosed text and watches out for escaped double quotes. As shown in the example above.

---

License: MIT
