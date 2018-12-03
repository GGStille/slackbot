const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
    token: 'xoxb-493509712083-493447451572-OvtK8DsK01ZHNRdHKt98O7MQ',
    name: 'memebot'
});

// Start Handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':smiley:'
    }

    bot.postMessageToChannel('general', 'Here is a meme for ya', params)
})

// Error handler

bot.on('error', (err) => {console.log(err)})

// Message Handler
bot.on('message', (data) => {
    if(data.type !== 'message') {
        return;
    }

    handleMessage(data.text)
});

// Respond to Data
function handleMessage(message) {
    if(message.includes(' mommajoke')) {
        mommaJoke();
    }
}

// Tell a Chuck joke
function mommaJoke() {
    axios.get('https://api.yomomma.info/')
        .then(res => {
            const joke = res.data.joke

            const params = {
                icon_emoji: ':laughing:'
            }
        
            bot.postMessageToChannel('general', `Momma Joke: ${joke}`, params)        
        })
        .catch(function (error) {
            console.log(error)
        })
}