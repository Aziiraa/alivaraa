const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let kickedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!kickedUser) {
        return message.channel.send("L'utilisateur que vous avez essayé de kick n'existe pas, veuillez réessayer")
    }
    
    let kickReason = args.join(" ").slice(22)
    if(!message.member.hasPermission("KICK_MEMBERS")) {
        return message.channel.send("Permissions insuffisantes");
    }
    
    if(kickedUser.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send("Vous ne pouves pas Kick un membre du Staff !");
    }
    
    let kickEmbed = new Discord.RichEmbed()
    .setDescription("Kick")
    .setColor('#01FEDC')
    .addField('Utilisateur Kick', `${kickedUser} (ID: ${kickedUser.ID})`)
    .addField('Raison du Kick', `${kickReason}` )
    .addField('Utilisateur Ayant kick', `${message.author} (ID: ${message.author.ID})` )
    .addField('Canal du Kick', message.channel);

    let kickOutput = message.guild.channels.find(x => x.name === "logs-serveur"); 
if (!kickOutput) { 
    return message.channel.send("Le salon <Logs-serveur> n'existe pas, veuillez en créer un du même nom")
    }
    message.guild.member(kickedUser).kick(kickReason)
    kickOutput.send(kickEmbed);
};

module.exports.help = {
    name: "kick"
}