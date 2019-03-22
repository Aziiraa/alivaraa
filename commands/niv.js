const Discord = require("discord.js");
const exp = require("../exp.json");

module.exports.run = async (bot, message, args) => {
  if (!exp[message.author.id]) {
    exp[message.author.id] = {
      exp: 0,
      lvl: 1
    };
  }

  let cExp = exp[message.author.id].exp;
  let cLvl = exp[message.author.id].lvl;
  let nLvl = exp[message.author.id].exp * 10;
  let expNeedLvlUp = nLvl - cExp;

  let expEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor("#01FEDC")
    .addField("Expérience", cExp, true)
    .addField("Niveau", cLvl, true)
    .setFooter(
      `${expNeedLvlUp} xp est necéssaire pour passer au prochain niveau`
    );

  message.channel.send(expEmbed);
};

module.exports.help = {
  name: "niv"
};
