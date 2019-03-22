const ytdl = require("ytdl-core");

module.exports.run = async (bot, message, args) => {
  // Vérification
  if (!message.member.voiceChannel)
    return message.channel.send("Veuillez vous connecter à un salon vocal");
  if (!message.guild.me.voiceChannel)
    return message.channel.send(
      "Le bot n'est déjà plus connecté à un salon vocal !"
    );
  if (!message.guild.me.voiceChannelID !== message.member.voiceChannelID)
    return message.channel.send(
      "Vous ne pouvez pas contrôler le bot à distance ! Je sais, c'est décevant..."
    );
    message.guild.me.voiceChannel.leave();
    message.channel.send("Le bot à bien quitté le salon !");
};

module.exports.help = {
  name: "stop"
};
