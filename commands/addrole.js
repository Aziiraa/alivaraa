const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let memberRole = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!memberRole) {
        return message.channel.send("L'utilisateur que vous avez essayé de kick n'existe pas, veuillez réessayer")
    }
    
    let roleToAdd = args.join(" ").slice(22)
    if(!roleToAdd) return message.channel.send("Veuillez spécifier un rôle")
    if(!message.member.hasPermission("MANAGE_ROLES")) {
        return message.channel.send("Vous n'avez pas les permissions requises pour cette commande.");
    }
    
    if(memberRole.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send("Vous ne pouvez pas modifier les rôles d'un membre du Staff !");
    }

    let role = message.guild.roles.find(`name`, roleToAdd)
    if(!role) return message.channel.send("Le rôle spécifié n'existe pas !");

    if(memberRole.roles.has(role.id)) return message.channel.send(`L'utilisateur spécifié a déjà le rôle ${roleToAdd}!` );
    await memberRole.addRole(role.id);

    try {
        await memberRole.send(`Félicitations ! Tu as reçu le rôle ${role.name} avec succès`);
    } catch (e) {
        message.channel.send(`Le rôle ${role.name} a été attribué à <@${memberRole.id}>`)
    }
};

module.exports.help = {
    name: "addrole"
}