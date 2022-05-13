const Discord = require("discord.js")
require("dotenv").config()
const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`, + client.channels.length + ` channels `)
    client.user.setStatus("Online");
    client.user.setActivity("Black Desert Online");
})

client.on("messageCreate", (message) => {
    if (message.content.toLowerCase() === "!ping"){
        message.reply(`${client.ws.ping}ms`)
    }
});

const welcomeChannelId = "973912082607112312"

client.on("guildMemberAdd", member => {
    let welcomeRole1 = member.guild.roles.cache.find(role => role.name === 'BDO-Chains')
    let welcomeRole2 = member.guild.roles.cache.find(role => role.name === 'Baddie')
    member.roles.add(welcomeRole1)
    member.roles.add(welcomeRole2)
    member.guild.channels.cache.get(welcomeChannelId).send(`<@${member.id}> Welcome to the shit show!`)
})
client.on("guildMemberRemove", member => {
    member.guild.channels.cache.get(welcomeChannelId).send(`${member.user.username} Fucked off!`)
})

// client.on("guildMemberAdd", member => {
//     member.guild.channels.cache.get(welcomeChannelId).send(`<@${member.id}> Welcome to the shit show!`)
// })
// client.on("guildMemberRemove", member => {
//     member.guild.channels.cache.get(welcomeChannelId).send(`${member.user.username} Fucked off!`)
// })
client.login(process.env.TOKEN)