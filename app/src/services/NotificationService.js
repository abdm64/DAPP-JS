


const { WebClient } = require('@slack/web-api');
const TelegramBot = require('Telegraf');
const axios = require('axios')
const 


class NotificationService  {
   
    telegramBot
    slack
    chatId_slack
    chatId_telegram
    constructor(slackKeys,telegramKeys){
        this.telegramBot = new TelegramBot(telegramKeys.token)
        this.slack =  new WebClient(slackKeys.token)
        this.chatId_slack= slackKeys.chatId
        this.chatId_telegram = telegramKeys.chatId 
    }

 async sendNotification(notificationBody){ 
    const time = notificationBody.time
    const balance = notificationBody.balance
    const isTransaction = notificationBody.isTransaction
    let message;
    // we do this at separate fucntion  that returen message  as string 

    if (isTransaction){

        message = `Please notice that your account made a  transaction at time ${time.toUTCString()}  UTC ;  your currect balance is : ${balance} ETH`
    } else {

        message = ` Daily check for your currect balance is : ${balance} ETH at ${time.toUTCString()}  UTC `
    }

    
    this.telegramBot.telegram.sendMessage(this.chatId_telegram, message).catch(console.error);

      this.slackNotification(message)
    
    


}
async  slackNotification(message) {
     
    try {

        await slackBot.chat.postMessage({
            text: message,
            channel:  this.chatId_slack,
          });
    } catch(err){

        console.log(err)
    }


     }
    
    




}// class

module.exports = NotificationService