const discord = require('discord.js');
const client = new discord.Client();
const { TOKEN, MEMBER_ID, CHANNEL_ID } = require("./config.json");
// Your Bot TOKEN at config file
client.login(TOKEN);

client.on('ready', async function () {
    console.log(`ready, logged in as ${client.user.tag}`);
});

client.on('presenceUpdate', (oldPresence, newPresence) => {
    let member = newPresence.member;
    // Target Member at config file
    if (member.id === MEMBER_ID) {
        if (oldPresence.status !== newPresence.status) {
            //  Your specific channel to send a message at config file.
            let channel = member.guild.channels.cache.get(CHANNEL_ID);
            //  You can edit Embed
            let EmbedStatus = new discord.MessageEmbed()
                .setTitle(`${member.displayName}`)
                .setAuthor("Target User Alerts")
                .setFooter("Discord Target User Status Bot")
                .setTimestamp()

            if (newPresence.status === "online") {
                EmbedStatus.setColor('#00ff84')
                EmbedStatus.setDescription("Special member is Online!")
                console.log("Target_User_Online");

            } else if (newPresence.status === "offline") {
                EmbedStatus.setColor('#95A5A6')
                EmbedStatus.setDescription("Special member is Offline!")
                console.log("Target_User_Offline");

            }else if (newPresence.status === "idle") {
                EmbedStatus.setColor('#FEE75C')
                EmbedStatus.setDescription("Special member is Idle!")
                console.log("Target_User_Idle");

            }else if (newPresence.status === "dnd") {
                EmbedStatus.setColor('#ED4245')
                EmbedStatus.setDescription("Special member is Do Not Distrub!")
                console.log("Target_User_Do_Not_Distrub");
            }

            channel.send(EmbedStatus).catch();

        }
    }
});

client.on('error', e => {
    console.log(e);
});
