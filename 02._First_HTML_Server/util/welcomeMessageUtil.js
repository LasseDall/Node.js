const welcomeMessageJSON = require("./welcomeMessage.json");

function getWelcomeMessage(clientName) {
    if(!clientName) {
        return welcomeMessageJSON.noNameWelcomeMessage;
    } else {
        return welcomeMessageJSON.nameWelcomeMessgae.replace("$clientName", clientName);
    }
}

module.exports = {
    getWelcomeMessage
};