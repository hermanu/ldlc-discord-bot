const Discord = require("discord.js");

const client = new Discord.Client();
require("dotenv").config();
const prefix = "!";

const commandList = `Comandos disponibles: !insultar !dados !pelea`;

//helpers
const rollDice = require("./helpers/RollDice");
const insultos = require("../jmInsultos.json").insultos;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  const taggedUser = message.mentions.users.size
    ? message.mentions.users.first()
    : message.author;

  // only general chat
  if (message.channel.name === process.env.CHANNEL) {
    if (command === "commands") {
      message.channel.send(commandList);
    }
    //COMANDO INSULTAR
    if (command === "insultar") {
      if (args[0] === "add") return;

      const ranbdomInsulto =
        insultos[Math.floor(Math.random() * insultos.length)].toLowerCase();
      message.channel.send(
        `${taggedUser} es un ${insultos[
          Math.floor(Math.random() * insultos.length)
        ].toLowerCase()}`
      );
    }
    //COMMAND DADOS

    if (command === "dados") {
      message.channel.send(`${message.author} ha sacado un ${rollDice(args)}`);
    }

    //COMMAND FIGHT
    if (command === "pelea") {
      const winner =
        Math.floor(Math.random() * 100 + 1) <= 50 ? message.author : taggedUser;
      const looser = winner === message.author ? taggedUser : message.author;
      message.channel.send(`${winner} le ha pegado un palizon a ${looser}`);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
