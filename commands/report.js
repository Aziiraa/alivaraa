const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    
    let reportedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!reportedUser) {
            return message.channel.send("L'utilisateur que vous avez essayé de reporter n'existe pas, veuillez réessayer")
        }
        if(reportedUser.hasPermission("MANAGE_MEMBERS")) {
            return message.channel.send("Vous ne pouvez pas reporter un membre du Staff !");
        }
        let reportReason = args.join(" ").slice(22)
        let reportEmbed = new Discord.RichEmbed()
            .setDescription("Report")
            .setColor('#01FEDC')
            .addField('Utilisateur Reporté', `${reportedUser} (ID: ${reportedUser.ID})`)
            .addField('Raison du report', `${reportReason}` )
            .addField('Utilisateur Ayant Reporté', `${message.author} (ID: ${message.author.ID})` )
            .addField('Canal du report', message.channel);

            let reportOutput = message.guild.channels.find(x => x.name === "logs-serveur"); 
        if (!reportOutput) { 
            return message.channel.send("Le salon <Logs-serveur> n'existe pas, veuillez en créer un du même nom")
        }
        message.delete()
        reportOutput.send(reportEmbed);
};

module.exports.help = {
    name: "report"
}