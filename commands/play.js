const ytdl = require("ytdl-core");

module.exports.run = async (bot, message, args) => {
  // Vérification
  if (!message.member.voiceChannel)
    return message.channel.send("Veuillez vous connecter à un salon vocal");
  if (message.guild.me.voiceChannel)
    return message.channel.send("Le bot est déjà connecté à un salon vocal !");
  if (!args[0])
    return message.channel.send(
      "Veuillez spécifier un lien **YouTube** valide"
    );

  const validate = await ytdl.validateURL(args[0]);
  if (!validate)
    return message.channel.send("Lien invalide, veuillez réessayer");

  // Commande
  const info = await ytdl.getInfo(args[0]);
  const connection = await message.member.voiceChannel.join();
  const dispatcher = await connection.playStream(
    ytdl(args[0], { filter: "audioonly" })
  );
  const disconnect = await dispatcher.on('end', () => { message.guild.me.voiceChannel.leave()});
  message.channel.send(`La musique : **${info}** va être jouée !`)
};

module.exports.help = {
  name: "play"
};
