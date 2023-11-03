const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Creates a ticket')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
    async execute(interaction) {
        await interaction.reply({content: 'Ticket', ephemeral: true})
    }
}