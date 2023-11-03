const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete')
        .setDescription('Deletes the tickets system (cannot be undone).')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),
    async execute(interaction) {
        await interaction.reply({content: 'Delete', ephemeral: true})
    }
}