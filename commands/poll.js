const Discord = require("discord.js");
const moment = require('moment');

const alphabet = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹', '🇺', '🇻', '🇼', '🇽', '🇾', '🇿'];

exports.run = async (client, message, args) => {

    let choices = args.join(" ").split("|").map(e => e.trim());
    const title = choices[0];
    const description = choices[1];
    choices = choices.slice(2);
    
    const embed = new Discord.RichEmbed();
    embed.setTitle(`**${title}**`);
    embed.setDescription(description + "\n\n" + choices.map((val, idx) => `${alphabet[idx]} ${val}`).join("\n"));
    embed.setFooter('LHS Anime Club Bot', client.user.avatarURL);

    const suggestion = await message.channel.send(embed);

    for (let i = 0; i < choices.length; i++) {
        //console.log(alphabet[i]);
        await suggestion.react(alphabet[i])
    }

};