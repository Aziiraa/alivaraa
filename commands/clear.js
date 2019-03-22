const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.reply(
      "Permissions insuffisantes"
    );
  if (!args[0])
    return message.reply("Syntaxe invalide");

  message.channel.bulkDelete(args[0]).then(() => {
    message.channel
      .send(`**${args[0]}** messages on étés supprimés avec succès !`)
      .then(msg => msg.delete(5000));
  });
};

module.exports.help = {
  name: "clear"
};
