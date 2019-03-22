const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (!args[1]) return message.reply("Entrez une question !");

    let askReplies = ["Oui", "Non", "Peut-Être", "Reformule ta question", "Probablement", "Je ne peux pas répondre à cette question", "Sûrement pas", "Alivara.exe a cessé de fonctionner devant cette question, mbd"];
    let askQuestion = args.slice(0).join(" ");
    let askResponse = Math.floor((Math.random() * askReplies.length));

    let askEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.tag)
        .setColor("#01FEDC")
        .addField("Question", askQuestion)
        .addField("Réponse", askReplies[askResponse]);

        message.channel.send(askEmbed);

};

module.exports.help = {
    name: "ask"
}