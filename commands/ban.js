const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bannedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!bannedUser) {
        return message.channel.send("L'utilisateur que vous avez essayé de bannir n'existe pas, veuillez réessayer")
    }
    
    let banReason = args.join(" ").slice(22)
    if(!message.member.hasPermission("BAN_MEMBERS")) {
        return message.channel.send("Vous n'avez pas les permissions requises pour cette commande.");
    }
    
    if(bannedUser.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send("Vous ne pouves pas Bannir un membre du Staff !");
    }
    
    let banEmbed = new Discord.RichEmbed()
    .setDescription("Kick")
    .setColor('#FE0103')
    .addField('Utilisateur Banni', `${bannedUser} (ID: ${bannedUser.ID})`)
    .addField('Raison du Bannissement', `${banReason}` )
    .addField('Utilisateur Ayant Banni', `${message.author} (ID: ${message.author.ID})` )
    .addField('Canal du Bannissement', message.channel);

    let banOutput = message.guild.channels.find(x => x.name === "logs-serveur"); 
if (!banOutput) { 
    return message.channel.send("Le salon <Logs-serveur> n'existe pas, veuillez en créer un du même nom")
    }
    message.guild.member(bannedUser).ban(banReason)
    banOutput.send(banEmbed);
};

module.exports.help = {
    name: "ban"
}