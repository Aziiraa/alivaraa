const Discord = require("discord.js");
const math = require("mathjs");

module.exports.run = async (bot, message, args) => {
  if (!args[0])
    return message.channel.send("Veuillez fournir des données valides");
  let calcul;

  try {
    calcul = math.eval(args.join(" "));
  } catch (e) {
    message.channel.send("Veuillez entrer des nombres valides");
  }

  const mathEmbed = new Discord.RichEmbed()
    .setColor("#01FEDC")
    .addField("Calcul", args.join(" "))
    .addField("Résulat", calcul);

  message.channel.send(mathEmbed);
};

module.exports.help = {
  name: "calc"
};
