const Discord = require("discord.js");
const axios = require("axios");
const Entities = require("html-entities").AllHtmlEntities;

const fetchMeme = (client) => {
    return axios.get("https://www.reddit.com/r/Animemes/top/.json", {
        params: {
            t: "day",
            limit: 1,
            after: client.after
        }
    }).then((response) => {
        client.after = response.data.data.after;
        if (response.data.data.children[0].data.over_18) return [];
        return response.data.data.children[0].data.preview.images;
    });
}

module.exports = {
    name: "meme",
    description: "Retrieve a meme from r/animemes",
    channelType: ["text"],
    execute: async (client, message, args) => {
        const reply = await message.reply("loading meme...");
        try {
            let img = await fetchMeme(client); while (img.length == 0) img = await fetchMeme(client);
            reply.delete();
            console.log(Entities.decode(img[0].source.url));
            message.channel.send(
                new Discord.RichEmbed().setImage(Entities.decode(img[0].source.url)).setColor(0xF1C40F)
            );
        } catch (err) {
            reply.edit("Unable to load meme.");
            console.error(err);
        }
        return true;
    }
}