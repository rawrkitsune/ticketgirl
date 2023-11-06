const {SlashCommandBuilder,EmbedBuilder,PermissionFlagsBits,ModalBuilder,TextInputStyle,TextInputBuilder,ActionRowBuilder,Events,ChannelType} = require("discord.js");
require("dotenv").config();
const client = require("../client/index.js");
const dbs = new Map();
const dbDefaults = { category: null, textChannel: null }; module.exports = dbDefaults;
const applicationAuthor = {
  name: "TicketGirl",
  url: "https://discord.com/api/oauth2/authorize?client_id=1163683000182116403&permissions=2164335632&scope=bot%20applications.commands",
  iconURL:
    "https://cdn.discordapp.com/app-icons/1163683000182116403/47b74e6c7a59800f5fdfea61f89574e6.png?size=256",
};

// Create database file
async function getDb(guildId) {
  if (dbs.has(guildId)) {
    return dbs.get(guildId);
  }
  const lowdb = await import("lowdb/node");
  const discordServer = guildId;
  const db = await lowdb.JSONPreset(
    `./src/db/${discordServer}.json`,
    dbDefaults
  );
  dbs.set(guildId, db);
  return db;
}

const errorEmbed = new EmbedBuilder()
  .setTitle('An error has occourred while executing this command.')
  .setDescription('The tickets system has been already set up and can not be set again. If you think this an issue, please, report to my [Official Discord Server](https://discord.com/channels/1165038260792336455/1165041615300210699).')
  .setColor('Red')
  .setAuthor(applicationAuthor)
  .setTimestamp()

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Setup ticket system on server")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
  async execute(interaction) {
    const db = await getDb(interaction.guildId);
    const interactionAuthor = {
      text: interaction.user.displayName,
      iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png`,
    };

    const modal = new ModalBuilder()
      .setCustomId("setupModal")
      .setTitle("Setup")
      
    const categoryName = new TextInputBuilder()
      .setCustomId("categoryName")
      .setLabel("Insert a name for the tickets category")
      .setStyle(TextInputStyle.Short);

    const channelName = new TextInputBuilder()
      .setCustomId("channelName")
      .setLabel("Insert a name for the tickets channel")
      .setStyle(TextInputStyle.Short);

    const firstActionRow = new ActionRowBuilder().addComponents(categoryName);
    const secondActionRow = new ActionRowBuilder().addComponents(channelName);
    modal.addComponents(firstActionRow, secondActionRow);

    if (db.data.category !== null) {
      interaction.reply({
        embeds: [errorEmbed],
        ephemeral: true,
      })
      return;
    } else {
      await interaction.showModal(modal);
      client.on(Events.InteractionCreate, async (interaction) => {
        if (!interaction.isModalSubmit()) return;
        const categoryName =
          interaction.fields.getTextInputValue("categoryName");
        const channelName = interaction.fields.getTextInputValue("channelName");
        await interaction.deferReply({ ephemeral: true });
        const category = await interaction.guild.channels.create({
          name: categoryName,
          type: ChannelType.GuildCategory,
        });
        const text = await interaction.guild.channels.create({
          name: channelName,
          type: ChannelType.GuildText,
          parent: category,
          permissionOverwrites: [],
        });

        db.data = {
          category: category.id,
          textChannel: text.id,
        };

        const doneEmbed = new EmbedBuilder()
        .setTitle("Done!")
        .setDescription(`The tickets system has been set up successfully. Now you can start using /ticket at <#${text.id}> to make sure everything is working good!`)
        .setColor("Green")
        .setTimestamp();

        await db.write();

        await interaction.editReply({ embeds: [doneEmbed] });
      });
      return;
    }
  },
};

client.login(process.env.DISCORD_TOKEN_ACCESS);
