const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)); // since require is not supported, we will use this 
//workaround to import node-fetch

module.exports = {
    data: new SlashCommandBuilder()
        .setName("meme")
        .setDescription("Get a meme!")
        .addStringOption(option =>
            option.setName("platform")
                .setDescription("Meme platform (optional)")
                .addChoices(
                    { name: "Reddit", value: "reddit" },
                    { name: "Giphy", value: "giphy" }
                )
        ),

    async execute(interaction) {
        const { guild, options, member } = interaction;

        const platform = options.getString("platform");

        const embed = new EmbedBuilder();

        async function redditMeme() {
            await fetch('https://www.reddit.com/r/memes/random/.json').then(async res => {
                let meme = await res.json();

                console.log(meme);

                let title = meme[0].data.children[0].data.title;
                let url = meme[0].data.children[0].data.url;
                let author = meme[0].data.children[0].data.author;

                return interaction.reply({ embeds: [embed.setTitle(title).setImage(url).setURL(url).setColor("Random").setFooter({ text: author })] });
            });
        }

        async function giphyMeme() {
            await fetch('https://api.giphy.com/v1/gifs/random?api_key=lYBciWOvaOhVPNzGy4J8mUXNpC53YNbz&tag=&rating=g').then(async res => {
                let meme = await res.json();

                let title = meme.data.title;
                let url = meme.data.images.original.url;
                let link = meme.data.url;
                let author = meme.data.user.display_name;
                let pf = meme.data.user.avatar_url;

                return interaction.reply({
                    embeds: [embed.setTitle(`${title}`).setImage(`${url}`).setURL(link).setColor("Random").setFooter({ text: author, iconURL: pf })],
                });
            });
        }

        if (platform === "reddit") {
            redditMeme();
        }

        if (platform === "giphy") {
            giphyMeme();
        }

        //generating a random meme from any platform
        if (!platform) {
            let memes = [giphyMeme, redditMeme];
            memes[Math.floor(Math.random() * memes.length)]();
        }

    }
}