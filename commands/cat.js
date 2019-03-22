const Discord = require('discord.js');
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    let { body } = await superagent.get(`https://aws.random.cat//meow`)

    let catEmbed = new Discord.RichEmbed()
       .setColor("#01FEDC") 
       .setTitle('Miaou 😺')
       .setImage(body.file);

    message.channel.send(catEmbed);
};

module.exports.help = {
    name: "cat"
}