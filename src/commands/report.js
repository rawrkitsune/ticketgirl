const { SlashCommandBuilder, PermissionFlagsBits, Collection } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('report')
    .setDescription('Reports an user to staff')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
    async execute(interaction) {
        interaction.reply({content: 'Report', ephemeral: true})
    }
}