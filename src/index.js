const Discord = require("discord.js");

const client = new Discord.Client();
require("dotenv").config();
const prefix = "!";

const commandList = `Comandos disponibles: !insultar !dados`;

//helpers
const rollDice = require("./helpers/RollDice");
const Insultar = require("./helpers/Insultar");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // only general chat
  if (message.channel.name === process.env.CHANNEL) {
    if (command === "commands") {
      message.channel.send(commandList);
    }
    //COMANDO INSULTAR
    if (command === "insultar") {
      if (args[0] === "add") return;
      const taggedUser = message.mentions.users.size
        ? message.mentions.users.first()
        : message.author;

      message.channel.send(`${taggedUser} es un ${Insultar}`);
    }
    //COMMAND DADOS

    if (command == "dados") {
      message.channel.send(`${message.author} ha sacado un ${rollDice(args)}`);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
