# Initial files

Once you [add your bot to a server](/preparations/adding-your-bot-to-servers.md), the next step is to start coding and get it online! Let's start by creating a config file for your client token and a main file for your bot application.

## Creating configuration files

As explained in the ["What is a token, anyway?"](/preparations/setting-up-a-bot-application.md#what-is-a-token-anyway) section, your token is essentially your bot's password, and you should protect it as best as possible. This can be done through a `config.json` file or by using environment variables.

Open your application in the [Discord Developer Portal](https://discord.com/developers/applications) and go to the "Bot" page to copy your token.

### Using `config.json`

Storing data in a `config.json` file is a common way of keeping your sensitive values safe. Create a `config.json` file in your project directory and paste in your token. You can access your token inside other files by using `require()`.

:::: code-group
::: code-group-item config.json
```json
{
	"token": "your-token-goes-here"
}
```
:::
::: code-group-item Usage
```js
const { token } = require('./config.json');

console.log(token);
```
:::
::::

::: danger
If you're using Git, you should not commit this file and should [ignore it via `.gitignore`](/creating-your-bot/#git-and-gitignore).
:::

### Using environment variables

Environment variables are special values for your environment (e.g., terminal session, docker container, or environment variable file). You can pass these values into your code's scope so that you can use them.

One way to pass in environment variables is via the command line interface. When starting your app, instead of `node index.js`, use `TOKEN=your-token-goes-here node index.js`. You can repeat this pattern to expose other values as well.

You can access the set values in your code via the `process.env` global variable, accessible in any file. Note that values passed this way will always be strings and that you might need to parse them to a number, if using them to do calculations.

:::: code-group
::: code-group-item Command line
```sh:no-line-numbers
A=123 B=456 TOKEN=your-token-goes-here node index.js
```
:::
::: code-group-item Usage
```js
console.log(process.env.A);
console.log(process.env.B);
console.log(process.env.TOKEN);
```
:::
::::

#### Using dotenv

Another common approach is storing these values in a `.env` file. This spares you from always copying your token into the command line. Each line in a `.env` file should hold a `KEY=value` pair.

You can use the [`dotenv` package](https://www.npmjs.com/package/dotenv) for this. Once installed, require and use the package to load your `.env` file and attach the variables to `process.env`:

```sh:no-line-numbers
npm install dotenv
```

:::: code-group
::: code-group-item .env
```
A=123
B=456
TOKEN=your-token-goes-here
```
:::
::: code-group-item Usage
```js
const dotenv = require('dotenv');

dotenv.config();

console.log(process.env.A);
console.log(process.env.B);
console.log(process.env.TOKEN);
```
:::
::::

::: danger
If you're using Git, you should not commit this file and should [ignore it via `.gitignore`](/creating-your-bot/#git-and-gitignore).
:::

::: details Online editors (Glitch, Heroku, Repl.it, etc.)
While we generally do not recommend using online editors as hosting solutions, but rather invest in a proper virtual private server, these services do offer ways to keep your credentials safe as well! Please see the respective service's documentation and help articles for more information on how to keep sensitive values safe:

- Glitch.com: [Storing secrets in .env](https://glitch.happyfox.com/kb/article/18)
- Heroku.com: [Configuration variables](https://devcenter.heroku.com/articles/config-vars)
- Repl.it: [Secrets and environment variables](https://docs.replit.com/repls/secrets-environment-variables)
:::

### Git and `.gitignore`

Git is a fantastic tool to keep track of your code changes and allows you to upload progress to services like [GitHub](https://github.com/), [GitLab](https://about.gitlab.com/), or [Bitbucket](https://bitbucket.org/product). While this is super useful to share code with other developers, it also bears the risk of uploading your configuration files with sensitive values!

You can specify files that Git should ignore in its versioning systems with a `.gitignore` file. Create a `.gitignore` file in your project directory and add the names of the files and folders you want to ignore:

```
node_modules
.env
config.json
```

::: tip
Aside from keeping credentials safe, `node_modules` should be included here. Since this directory can be restored based on the entries in your `package.json` and `package-lock.json` files by running `npm install`, it does not need to be included in Git.

You can specify quite intricate patterns in `.gitignore` files, check out the [Git documentation on `.gitignore`](https://git-scm.com/docs/gitignore) for more information!
:::

## Creating the main file

Open your code editor and create a new file. We suggest that you save the file as `index.js`, but you may name it whatever you wish.

Here's the base code to get you started:

```js
// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Login to Discord with your client's token
client.login(token);
```

This is how you create a client instance for your Discord bot and login to Discord. The `Intents.FLAGS.GUILDS` intents option is necessary for your client to work properly.

Open your terminal and run `node index.js` to start the process. If you see "Ready!" after a few seconds, you're good to go!

::: tip
You can open your `package.json` file and edit the `"main": "index.js"` field to point to your main file. You can then run `node .` in your terminal to start the process!

After closing the process with `Ctrl + C`, you can press the up arrow on your keyboard to bring up the latest commands you've run. Pressing up and then enter after closing the process is a quick way to start it up again.
:::

## Resulting code

<ResultingCode path="creating-your-bot/initial-files" />
