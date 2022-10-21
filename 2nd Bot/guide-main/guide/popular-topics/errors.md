# Errors

There is no doubt that you have encountered errors while making bots. While errors are instrumental at warning you of what is going wrong, many people are stumped by them and how to track them down and fix them, but don't worry, we have you covered. This section will be all about diagnosing errors, identifying where they are coming from, and fixing them.

## Types of Errors

### API Errors

API Errors or DiscordAPIErrors are thrown by the Discord API when an invalid request carries out. API Errors can be mostly diagnosed using the message that is given. You can further examine errors by inspecting the HTTP method and path used. We will explore tracking these errors down in the next section.

Example: `DiscordAPIError: Cannot send an empty message`

### discord.js errors

discord.js errors are thrown by the library itself. They can usually be easily tracked down using the stack trace and error message.

Example: `The messages must be an Array, Collection, or number.`

### JavaScript errors

JavaScript errors are thrown by node itself or by discord.js. These errors can easily be fixed by looking at the type of error and the stack trace. You can find a full list of types [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) And a list of common js errors [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors).

Example: `ReferenceError: "x" is not defined`

### WebSocket and Network errors

WebSocket and Network errors are common system errors thrown by Node in response to something wrong with the WebSocket connection. Unfortunately, these errors do not have a concrete solution and can be (usually) fixed by getting a better, more stable, and more robust connection. discord.js will automatically try to reconnect to the WebSocket if an error occurs. 

In version 12, WebSocket errors are handled internally, meaning your process should never crash from them. If you want to log these errors, should they happen, you can listen to the `shardError` event as shown below.

```js
client.on('shardError', error => {
	console.error('A websocket connection encountered an error:', error);
});
```

The commonly thrown codes for these errors are:
- `ECONNRESET` - The connection was forcibly closed by a peer, thrown by the loss of connection to a WebSocket due to timeout or reboot.
- `ETIMEDOUT` - A connect or send request failed because the receiving party did not respond after some time.
- `EPIPE` - The remote side of the stream being written to has been closed.
- `ENOTFOUND` - The domain being accessed is unavailable, usually caused by a lack of internet, can be thrown by the WebSocket and HTTP API.
- `ECONNREFUSED` - The target machine refused the connection; check your ports and firewall.

## How to diagnose API errors

API Errors can be tracked down by adding an event listener for unhandled rejections and looking at the extra info.
This can be done by adding this to your main file.

```js
process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});
```

The next time you get the error it will show info along the bottom of the error which will look something like this for example:

```json
  name: 'DiscordAPIError',
  message: 'Invalid Form Body\nmessage_id: Value "[object Object]" is not snowflake.',
  path: '/api/v7/channels/638200642359525387/messages/[object%20Object]',
  code: 50035,
  method: 'GET'
```

All of this information can help you track down what caused the error and how to fix it. In this section, we will run through what each property means.

### Message

The most important part of the error is the message. It tells you what went wrong, which can help you track down where it originates. 
You can find a full list of messages [here](https://discord.com/developers/docs/topics/opcodes-and-status-codes#json) in the Discord API Docs.

### Path

Another helpful piece of information is the path, which tells you what API endpoint the error occurred on. We cannot possibly cover all endpoints, but they are usually very descriptive.

In the above example, the path tells you that the action was executed in the `/channels/` scope. The number you see next is the channel's ID. Next, you can spot the `message/` scope. The number is again the object's ID. Combined with the method `GET` you can conclude, that the bot tried to fetch the message with the id `[object Object]` from the channel with the ID `638200642359525387`.

As the error message tells you `[object Object ]` is not a valid ID, so you now know where to look for an error! Find out where you pass an object as an ID when trying to fetch a message and fix your code in that location.

### Code

The code is another partial representation of the message, in this case, `Invalid Form Body`. You can find a full list of codes [here](https://discord.com/developers/docs/topics/opcodes-and-status-codes#json-json-error-codes)

The code is also handy if you want only to handle a specific error. Say you're trying to delete a message which may or may not be there, and wanted to ignore unknown message errors. This can be done by checking the code, either manually or using discord.js constants.

```js
message.delete().catch(error => {
	// Only log the error if it is not an Unknown Message error
	if (error.code !== 10008) {
		console.error('Failed to delete the message:', error);
	}
});
```

Or using Constants:

```js
message.delete().catch(error => {
	if (error.code !== Discord.Constants.APIErrors.UNKNOWN_MESSAGE) {
		console.error('Failed to delete the message:', error);
	}
});
```

You can find a list of constants [here](https://github.com/discordjs/discord.js/blob/stable/src/util/Constants.js#L552)

### Method

The final piece of information can tell you a lot about what you tried to do to the path. There are a set of predefined keywords that describe our actions on the path.

```
GET    - Used to retrieve a piece of data
POST   - Used to send a piece of data
PATCH  - Used to modify a piece of data
PUT    - Used to replace a piece of data completely
DELETE - Used to delete a piece of data completely
```

In this particular example, you can see you are trying to access a piece of data, specifically, a message.

## Common discord.js and API errors

### An invalid token was provided.

This is a prevalent error; it originates from a wrong token being passed into `client.login()`. The most common causes of this error are:

- Not importing the config or env file correctly
- Copying the client secret instead of the bot token (the token is alphanumerical and three parts delimited by a period while the client secret is significantly smaller and one part only)
- Simply showing the token and copying that, instead of clicking regenerate and copying that.

::: warning
Before the release of version 12, there used to be an issue where the token was not prefixed correctly, which resulted in valid tokens being marked as invalid. If you have verified that all of the above is not the case, make sure you have updated discord.js to the current stable version.
:::

### Request to use token, but token was unavailable to the client.

Another common error–this error originates from the client attempting to execute an action that requires the token but the token not being available. This is most commonly caused by destroying the client and then trying to perform an action.

This error is also caused by attempting to use a client that has not logged in. Both of the examples below will throw errors.

```js
const { Client, Intents } = require('discord.js');

// Should not be here!
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

module.exports = interaction => {
	const id = interaction.options.getString('id');
	// Should be `interaction.client` instead!
	client.users.fetch(id).then(user => {
		interaction.reply(`Your requested user: ${user.tag}`);
	});
};
```

```js
const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('interactionCreate', someHandlerFunction);

client.login('your-token-goes-here');
// client will not be logged in yet!
client.users.fetch('myId').then(someInitFunction);
```

### MessageEmbed field names may not be empty.

This error originates from calling `MessageEmbed.addFields()` with a field object's `name` property as an empty string. If you would like the title to be empty for a reason, you should use a zero width space, which can be input as `\u200b`.

### MessageEmbed field values may not be empty.

In conjunction with the previous error, this error results from calling `MessageEmbed.addFields()` with a field object's `value` property as an empty string. You can use a zero-width space if you would like this blank.

### The messages must be an Array, Collection, or number.

This error originates from an invalid call to `bulkDelete()`. Make sure you are inputting a valid Array or Collection of messages or a valid number.

### Members didn't arrive in time.

Another common error–this error originates from the client requesting members from the API through the WebSocket and the member chunks not arriving in time and triggering the timeout. The most common cause of this error is a bad connection; however, it can also be caused by fetching many members, upwards of 50 thousand. To fix this, run the bot on a location with better internet, such as a VPS. If this does not work for you, you will have to manually change the hardcoded member fetching timeout in the source code.

### MaxListenersExceededWarning: Possible EventEmitter memory leak detected...

This error is caused by spawning a large number of event listeners, usually for the client. The most common cause of this is nesting your event listeners instead of separating them. The way to fix this error is to make sure you do not nest your listeners; it is **not** to use `emitter.setMaxListeners()` as the error suggests.

You can debug these messages in different ways:
- Through the [CLI](https://nodejs.org/api/cli.html#cli_trace_warnings): `node --trace-warnings index.js`
- Through the [`process#warning` event](https://nodejs.org/api/process.html#process_event_warning): `process.on('warning', console.warn);`

### Cannot send messages to this user.

This error throws when the bot attempts to send a DM message to a user but cannot do so. A variety of reasons causes this:
- The bot and the user do not share a guild (often, people attempt to dm the user after kicking or banning them).
- The bot tries to DM another bot.
- The user has blocked the bot.
- The user has disabled dms in the privacy settings.

In the case of the last two reasons, the error is not preventable, as the Discord API does not provide a way to check if you can send a user a dm until you attempt to send one. The best way to handle this error is to add a `.catch()` where you try to dm the user and either ignore the rejected Promise or do what you want because of it.

## Common miscellaneous errors

### code ENOENT... syscall spawn git.

This error is commonly thrown by your system due to it not finding `git`. You need to install `git` or update your path if `git` is already installed. Here are the download links for it:
- Ubuntu/Debian: `sudo apt-get install git`
- Windows: [git-scm](https://git-scm.com/download/win)

### code ELIFECYCLE

This error is commonly thrown by your system in response to the process unexpectedly closing. Cleaning the npm cache and deleting node_modules can usually fix it. The instructions for doing that are as such:
- Clean npm cache with `npm cache clean --force`
- delete `node_modules`
- delete `package-lock.json` (make sure you have a `package.json`!)
- run `npm install` to reinstall packages from `package.json`
