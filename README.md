<h1 align='center'>TicketGirl 🎫</h1>

<p align="center">
  <a href="https://badge.fury.io/js/discord.js">
    <img src="https://badge.fury.io/js/discord.js.svg"
         alt="DiscordJS">
  </a>
  <a href="https://badge.fury.io/js/lowdb"><img src="https://badge.fury.io/js/lowdb.svg" alt="npm version" height="18"></a>
 <a href="https://badge.fury.io/js/node"><img src="https://badge.fury.io/js/node.svg" alt="npm version" height="18"></a>
 <a href="https://badge.fury.io/js/dotenv"><img src="https://badge.fury.io/js/dotenv.svg" alt="npm version" height="18"></a>
</p>

<p align='center'>
    TicketGirl is a currently under development Discord bot created by <a href='https://github.com/rawrkitsune'>rawrkitsune</a>. It was created with the purpose of programming training and supporting large servers that require a ticket bot to do so. Before this bot, a prototype of the same was created but it never went live or on GitHub and was later placed as the developer's main project. The purpose of the training was to return to the developer's programming activities given that she was not working on any project involving programming, her last project before the break being a website for the indie game Rain World whose idea/project was abandoned by the website project managers themselves some time later.

</p>

<p align="center">
  • <a href="#how-to-use">How To Use</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a> •
  <a href="#contact">Contact</a> •
</p>

## How To Use

First, clone and run this application (you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) installed on your computer) using these commands on your terminal:

```bash
# Clone this repository
$ git clone https://github.com/TicketGirl/ticketgirl.git

# Go into the repository
$ cd ticketgirl

# Install dependencies
$ npm install discord.js lowdb dotenv nodemon

# Run the app
$ npm run start
```

> **Note:**
> If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

Once you've followed the above steps, it's time to set up your environment variables on your `.env` file. Go to [Discord Developers Portal](https://discord.com/developers/applications), select your desired application and copy your "Client ID", after this, go to "Bot" section and set up your bot's name and avatar. Click on "Reset token" and copy it too. Once you did this you can set up your `.env` file and make sure to write **exactly** as written below to avoid crashes.

```dotenv
DISCORD_CLIENT_ID=<paste_your_client_id>
DISCORD_TOKEN_ACCESS=<paste_your_bot_token>
```

> **Note:**
> Make sure to not include spaces in the environment variables to avoid token issues.


## Credits

This application uses the following packages:

> - [Node.js](https://nodejs.org/) (Required)
> - [Discord.js](https://discord.js.org/) (Required)
> - [lowdb](https://github.com/typicode/lowdb) (Required)
> - [dotenv](https://www.npmjs.com/package/dotenv) (Required)
> - [Nodemon](https://nodemon.io/) (Optional)

## License

- [ISC](https://en.wikipedia.org/wiki/ISC_license)

## Contact 

[GitHub](https://github.com/rawrkitsune) &nbsp;&middot;&nbsp;
[Twitter](https://twitter.com/rawrkitsune) &nbsp;&middot;&nbsp;
 [Twitch](https://twitch.tv/rawrkitsune)

© 2023 rawrkitsune



