const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let servIcon = message.guild.iconURL
    let servEmbed = new Discord.RichEmbed()
        .setDescription("Informations Sur Le Serveur")
        .setColor('#01FEDC')
        .setThumbnail(servIcon)   
        .addField('Nom du serveur', message.guild.name)
        .addField('Nombre de membres', message.guild.memberCount)
        .addField('Crée le ', message.guild.createdAt)
        .addField('Vous avez rejoint le', message.member.joinedAt);

        return message.channel.send(servEmbed);
};

module.exports.help = {
    name: "s-info"
}