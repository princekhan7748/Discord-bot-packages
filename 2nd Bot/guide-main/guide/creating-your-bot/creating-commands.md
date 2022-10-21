# Creating commands

::: tip
This page is a follow-up and bases its code on [the previous page](/creating-your-bot/).
:::

<DiscordMessages>
	<DiscordMessage profile="bot">
		<template #interactions>
			<DiscordInteraction profile="user" :command="true">ping</DiscordInteraction>
		</template>
		Pong!
	</DiscordMessage>
</DiscordMessages>

Discord allows developers to register [slash commands](https://discord.com/developers/docs/interactions/application-commands), which provide users a first-class way of interacting directly with your application. Before being able to reply to a command, you must first register it.

## Registering commands

This section will cover only the bare minimum to get you started, but you can refer to our [in-depth page on registering slash commands](/interactions/registering-slash-commands.md) for further details. It covers guild commands, global commands, options, option types, and choices.

### Command deployment script

Create a `deploy-commands.js` file in your project directory. This file will be used to register and update the slash commands for your bot application.

You'll need to install [`@discordjs/builders`](https://github.com/discordjs/builders), [`@discordjs/rest`](https://github.com/discordjs/discord.js-modules/blob/main/packages/rest/), and [`discord-api-types`](https://github.com/discordjs/discord-api-types/).

```sh:no-line-numbers
npm install @discordjs/builders @discordjs/rest discord-api-types
```

Below is a deployment script you can use. Focus on these variables:

- `clientId`: Your client's id
- `guildId`: Your development server's id
- `commands`: An array of commands to register. The [slash command builder](/popular-topics/builders.md#slash-command-builders) from `@discordjs/builders` is used to build the data for your commands

::: tip
In order to get your client and guild ids, open Discord and go to your settings. On the "Advanced" page, turn on "Developer Mode". This will enable a "Copy ID" button in the context menu when you right-click on a server icon, a user's profile, etc.
:::

:::: code-group
::: code-group-item deploy-commands.js
```js{4,6-11}
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully registered application commands.');
	} catch (error) {
		console.error(error);
	}
})();
```
:::
::: code-group-item config.json
```json {2-3}
{
	"clientId": "123456789012345678",
	"guildId": "876543210987654321",
	"token": "your-token-goes-here"
}
```
:::
::::

Once you fill in these values, run `node deploy-commands.js` in your project directory to register your commands to a single guild. It's also possible to [register commands globally](/interactions/registering-slash-commands.md#global-commands).

::: tip
You only need to run `node deploy-commands.js` once. You should only run it again if you add or edit existing commands.
:::

## Replying to commands

Once you've registered your commands, you can listen for interactions via <DocsLink path="class/Client?scrollTo=e-interactionCreate" /> in your `index.js` file.

You should first check if an interation is a command via <DocsLink path="class/Interaction?scrollTo=isCommand" type="method">`.isCommand()`</DocsLink>, and then check the <DocsLink path="class/CommandInteraction?scrollTo=commandName">`.commandName`</DocsLink> property to know which command it is. You can respond to interactions with <DocsLink path="class/CommandInteraction?scrollTo=reply">`.reply()`</DocsLink>.

```js {5-17}
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply('Server info.');
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
});

client.login(token);
```

### Server info command

Note that servers are referred to as "guilds" in the Discord API and discord.js library. `interaction.guild` refers to the guild the interaction was sent in (a <DocsLink path="class/Guild" /> instance), which exposes properties such as `.name` or `.memberCount`.

```js {9}
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
});
```

<DiscordMessages>
	<DiscordMessage profile="bot">
		<template #interactions>
			<DiscordInteraction profile="user" :command="true">server</DiscordInteraction>
		</template>
		Server name: Discord.js Guide
		<br />
		Total members: 2
	</DiscordMessage>
</DiscordMessages>

You could also display the date the server was created, or the server's verification level. You would do those in the same manner–use `interaction.guild.createdAt` or `interaction.guild.verificationLevel`, respectively.

::: tip
Refer to the <DocsLink path="class/Guild" /> documentation for a list of all the available properties and methods!
:::

### User info command

A "user" refers to a Discord user. `interaction.user` refers to the user the interaction was sent by (a <DocsLink path="class/User" /> instance), which exposes properties such as `.tag` or `.id`.

```js {11}
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	}
});
```

<DiscordMessages>
	<DiscordMessage profile="bot">
		<template #interactions>
			<DiscordInteraction profile="user" :command="true">user</DiscordInteraction>
		</template>
		Your tag: User#0001
		<br />
		Your id: 123456789012345678
	</DiscordMessage>
</DiscordMessages>

::: tip
Refer to the <DocsLink path="class/User" /> documentation for a list of all the available properties and methods!
:::

And there you have it!

## The problem with `if`/`else if`

If you don't plan on making more than a couple commands, then using an `if`/`else if` chain is fine; however, this isn't always the case. Using a giant `if`/`else if` chain will only hinder your development process in the long run.

Here's a small list of reasons why you shouldn't do so:

* Takes longer to find a piece of code you want;
* Easier to fall victim to [spaghetti code](https://en.wikipedia.org/wiki/Spaghetti_code);
* Difficult to maintain as it grows;
* Difficult to debug;
* Difficult to organize;
* General bad practice.

Next, we'll be diving into something called a "command handler"–code that makes handling commands easier and much more efficient. This allows you to move your commands into individual files.

## Resulting code

<ResultingCode />
