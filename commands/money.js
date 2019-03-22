const Discord = require("discord.js");
const money = require("../money.json")

module.exports.run = async (bot, message, args) => {
    if (!money[message.author.id]) {
        money[message.author.id] = {
          money: 0
        };
      }

      let userMoney = money[message.author.id].money;

      let userMoneyEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.username)
      .setColor("#01FEDC")
      .addField("Monnaie 💰", userMoney);

    message.channel.send(userMoneyEmbed)
};

module.exports.help = {
  name: "money"
};
