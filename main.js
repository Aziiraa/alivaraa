const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({ disableEveryone: true });
const money = require("./money.json");
const exp = require("./exp.json");

bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);

  let jsFile = files.filter(f => f.split(".").pop() === "js");
  if (jsFile.length <= 0) {
    console.log("Commande introuvable");
    return;
  }

  jsFile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} est fonctionnel !`);
  bot.user.setActivity("Fait Par LePingouinBleu! ");
});

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  // Système de monnaie

  if (!money[message.author.id]) {
    money[message.author.id] = {
      money: 0
    };
  }

  let startMoney = Math.floor(Math.random() * 5) + 1;
  let addMoney = Math.floor(Math.random() * 3) + 1;

  if (addMoney === startMoney) {
    money[message.author.id] = {
      money: money[message.author.id].money + addMoney
    };
  }

  fs.writeFile("./money.json", JSON.stringify(money), err => {
    if (err) console.log(err);
  });

  // Système d'expérience

  let addExp = Math.floor(Math.random() * 5) + 1;

  if (!exp[message.author.id]) {
    exp[message.author.id] = {
      exp: 0,
      currentLvl: 1
    };
  }

  let currentExp = exp[message.author.id].exp;
  let currentLvl = exp[message.author.id].lvl;
  let nextLvl = exp[message.author.id].lvl * 10;
  exp[message.author.id].exp = currentExp + addExp;

  if (nextLvl <= currentExp) {
    exp[message.author.id].lvl += 1;
    message.channel
      .send(`Félicitations! Tu es rendu au niveau ${currentLvl + 1}`)
      .then(message => {
        message.delete(5000);
      });
  }

  fs.writeFile("./exp.json", JSON.stringify(exp), err => {
    if (err) console.log(err);
  });

  // Variables

  if (!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: process.env.PREFIX 
    };
  }

  let prefix = prefixes[message.guild.id].prefixes;
  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);

  let commandFile = bot.commands.get(command.slice(prefix.length));
  if (commandFile) commandFile.run(bot, message, args);
});

bot.login(process.env.BOT_TOKEN);
