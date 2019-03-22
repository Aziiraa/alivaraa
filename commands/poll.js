const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
		return message.channel.send("Permissions insuffisantes");
    }
    if (!args[0]) return message.channel.send("Syntaxe invalide")

    const pollEmbed = new Discord.RichEmbed()
        .setTitle(`Sondage créé par: ${message.author.username}`)
        .setColor("#01FEDC")
        .setFooter("Appuyez sur les réactions pour voter")
        .setDescription(args.join(" "));

    let pollMessage = await message.channel.send(pollEmbed);
    await pollMessage.react("✅");
    await pollMessage.react("❌");
};

module.exports.help = {
  name: "poll"
};
