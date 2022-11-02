module.exports = {
    name: "messageCreate",
    async execute(message) {

        console.log(message);

        if (message.webhookId) {
            message.channel.send("@everyone");
        }

    }
}