
//@ts-check
const Discord = require('discord.js');
const { WebClient } = require('@slack/web-api');
const TelegramBot = require('node-telegram-bot-api');


class NotificationService  {
    
    telegram
    slack
    discord
    constructor(slackToken,telegramToken, discordToken){
        this.telegram = new TelegramBot(telegramToken , {polling: true})
        this.slack =  new WebClient(slackToken)
        this.discord = 
    }

sendNotificationToTelegram(time, amount){



}
sendNotificationToSlack(time,amount) {

    
}


sendNotificationToDiscord(time,amount) {


}




}

module.exports = NotificationService