const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  ChannelType,
} = require("discord.js");
const dotenv = require("dotenv").config();
const client = require("../client/client.js");
const dbs = new Map();
const dbDefaults = {
  category: null,
  textChannel: null
};

// Create database file
async function getDb(guildId) {
  if (dbs.has(guildId)) {
    return dbs.get(guildId);
  }
  const lowdb = await import("lowdb/node");
  const discordServer = guildId;
  const db = await lowdb.JSONPreset(`./src/db/${discordServer}.json`, dbDefaults);
  dbs.set(guildId, db);
  return db;
}

client.login(process.env.DISCORD_TOKEN_ACCESS);
const setupEmbed = new EmbedBuilder(client)
  .setTitle("Set up")
  .setURL("https://example.com")
  .setDescription(
    "I'm currently setting up the ticket system, this might take some time if I'm overloaded (which rarely happens). I will create an category for you with the text channel for creating tickets. If needed or wanted, you can change the channel and category name to match with your server design."
  )
  .setImage(
    "https://img.freepik.com/free-vector/abstract-blue-light-pipe-speed-zoom-black-background-technology_1142-9980.jpg"
  )
  .setThumbnail(
    "https://thumbs.dreamstime.com/b/gear-wrench-icon-black-background-black-flat-style-vector-illustration-gear-wrench-icon-black-background-black-flat-170443769.jpg"
  )
  .setColor("#00b0f4")
  .setFooter({
    text: "TicketGirl",
  })
  .setTimestamp();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Setup ticket system on server")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;
    const db = await getDb(interaction.guildId);
    if (
      !interaction.member.permissions.has(PermissionFlagsBits.Administrator)
    ) {
      interaction.reply({content: "Only administrators can perform this command.", ephemeral: true});
      return;
    }
    if (db.data.category !== null) {
      interaction.reply({content: "This has been already set up.", ephemeral: true});
      return;
    }

    const category = await interaction.guild.channels.create({
      name: "🔨| HELP",
      type: ChannelType.GuildCategory,
    });
    const text = await interaction.guild.channels.create({
      name: "『📩』text-support",
      type: ChannelType.GuildText,
      parent: category,
      permissionOverwrites: [],
    });
    db.data = {
      category: category.id,
      textChannel: text.id
    }

    interaction.reply({
      embeds: [setupEmbed],
      ephemeral: true
    })

    await db.write();
    interaction.reply({content: "Set up successfully.", ephemeral: true})
    },
};
