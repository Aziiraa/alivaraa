const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let BotIcon = bot.user.displayAvatarURL;
    let infoEmbed = new Discord.RichEmbed()
        .setDescription("Informations Sur Le Bot")
        .setColor('#01FEDC')
        .setThumbnail(BotIcon)
        .addField('Nom Du Bot' , bot.user.username)
        .addField('Ping' , bot.ping)
        .addField('Crée le' , bot.user.createdAt)
        .addField('Préfixe', `+`)
        .addField('Commandes' , '------------')
        .addField(`${prefix}info` , 'Montre Cette Page D"Aide')
        .addField(`${prefix}s-info` , 'Montre Les Informations Sur Le Serveur')
        .addField(`${prefix}report` , 'Sert à reporter un joueur **(report <Joueur> <Raison>)**')
        .addField(`${prefix}kick` , 'Kick le joueur / Uniquement accessible au staff **(kick <Joueur> <Raison>)**')
        .addField(`${prefix}ban` , 'Banni le joueur définitivement / Uniquement accessible au staff **(ban <Joueur> <Raison>)**')
        .addField(`${prefix}addrole` , 'Ajoute le rôle spécifié / Uniquement accessible au staff **(addrole <Joueur> <Rôle> ')
        .addField(`${prefix}addrole` , 'Ajoute le rôle spécifié / Uniquement accessible au staff **(addrole <Joueur> <Rôle> ')
        .addField('------------' , ' ')


    return message.channel.send(infoEmbed);
};

module.exports.help = {
    name: "info"
}