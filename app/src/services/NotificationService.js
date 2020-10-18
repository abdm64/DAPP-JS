

// require javascript libraries for  telegram and slack 
const { WebClient } = require('@slack/web-api');
const TelegramBot = require('telegraf');


// the main duty of this class is send Notification  via telegram , slack , etc 
class NotificationService  {
   
    telegramBot
    slack
    chatId_slack
    chatId_telegram
    // create the instance  with initial data 
    constructor(slackKeys,telegramKeys){
        // configure our API  to use our tokens 
        this.telegramBot = new TelegramBot(telegramKeys.token)
        this.slack =  new WebClient(slackKeys.token)
        this.chatId_slack= slackKeys.chatId
        this.chatId_telegram = telegramKeys.chatId 
    }
// function  to send notification 
 async sendNotification(notificationBody){ 
     // get information from our body to send notification 
    const time = notificationBody.time
    const balance = notificationBody.balance
    const isTransaction = notificationBody.isTransaction
    let message; // the message we want to send to messages services 
    // we do this at separate function  that return message  as string 

    if (isTransaction){
        // if transaction  we want to send this message with all information
        message = `Please notice that your account made a  transaction at  ${time.toUTCString()}  and  your Actual  balance is : ${balance} ETH`
    } else {
// if it's  daily check for the balance we want to send this message 
        message = ` Daily check for your Actual balance is : ${balance} ETH at ${time.toUTCString()}  `
    }

    // use telegraf api to send message we need to provide chat_id and the message 
    this.telegramBot.telegram.sendMessage(this.chatId_telegram, message).catch(console.error);
// call other function to send slack message 
      this.slackNotification(message)


}
// method to send slack message 
async  slackNotification(message) {
     
    try {
// send message using slack web api  we need to provide message and chat_id 
        await this.slack.chat.postMessage({
        
            text: message,
            channel:  this.chatId_slack, //slack chat id 
          });
    } catch(err){

        console.log(err)
    }

     }
    
    




}// class

module.exports = NotificationService