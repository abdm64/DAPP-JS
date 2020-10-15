

// requie javascript API's for slack and slack 
const { WebClient } = require('@slack/web-api');
const TelegramBot = require('telegraf');


// the main duty of this class is send notifaction via telegam and slack 
class NotificationService  {
   
    telegramBot
    slack
    chatId_slack
    chatId_telegram
    // create the intance with initial data 
    constructor(slackKeys,telegramKeys){
        // configure our API's to use our tokens 
        this.telegramBot = new TelegramBot(telegramKeys.token)
        this.slack =  new WebClient(slackKeys.token)
        this.chatId_slack= slackKeys.chatId
        this.chatId_telegram = telegramKeys.chatId 
    }
// fucntion to send notification 
 async sendNotification(notificationBody){ 
     // get information from our body to send notification 
    const time = notificationBody.time
    const balance = notificationBody.balance
    const isTransaction = notificationBody.isTransaction
    let message; // the message taht send to messeges services 
    // we do this at separate fucntion  that returen message  as string 

    if (isTransaction){
        // if transaction happend we want to send this message with all informations
        message = `Please notice that your account made a  transaction at  ${time.toUTCString()}  and  your actuel balance is : ${balance} ETH`
    } else {
// if it's  daily check for the balance we want to sned this message 
        message = ` Daily check for your actuel  balance is : ${balance} ETH at ${time.toUTCString()}  `
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
            channel:  this.chatId_slack,
          });
    } catch(err){

        console.log(err)
    }


     }
    
    




}// class

module.exports = NotificationService