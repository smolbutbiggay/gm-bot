const Beautify = require('js-beautify').js_beautify;
const cleanCodeExp = new RegExp(/([`]{3})clean-code([^```]*)([`]{3})/g);
const beautifyOptions = require("./jsbeautify.json");

const clean = function(msg) {
    // Test for the correct code block
    console.log("Is clean");
    if (cleanCodeExp.test(msg.content)) {
        console.log("is triggered");
        // Delete the old message
        msg.delete()
            .then(msg => console.log(`Deleted message from ${msg.author}`))
            .catch(console.error);

        // Set up a response string
        var res = msg.author + `, here is your message with formatted code:\n${msg.content}`;

        // Fetch the code block contents
        var code = msg.content.match(cleanCodeExp);

        // Loop through the matches
        for (var i = 0; i < code.length; i++) {
            // Replace all code with pretty code
            var rawCode = code[i].substr(13,code[i].length - 16);
            var originalCode = rawCode;
            var prettyCode = Beautify(originalCode, beautifyOptions);
            res = res.replace(originalCode, prettyCode);
            console.log("Looping");
        }

        // Replace the language with javascript
        res = res.replace(/(clean-code)/g, 'javascript\n');

        // Send it to the channel!
        msg.channel.sendMessage(res)
            .then(msg => console.log(`Sent message: ${msg.content}`))
            .catch(console.error);
    }
};

module.exports.clean = clean;