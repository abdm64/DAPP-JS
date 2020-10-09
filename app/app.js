
const schedule = require('node-schedule');
const keys = require('./src/config/keys')
const telegramKeys = require('./src/config/TelegramKeys')
const slackKeys = require('./src/config/SlackKeys')
const TransactionCheckerService = require('./src/services/TransactionCheckerService')
const NotificationService = require('./src/services/NotificationService')
const time = keys.time
//Class intance
const transactionCheckerService  = new TransactionCheckerService(keys.ifura_ID,keys.account)
const notificationService  = new NotificationService(slackKeys,telegramKeys)




// subscribe to the evant pending trasactions
transactionCheckerService.subscribe('pendingTransactions')

// watch tranasction to send notifiation to services 
transactionCheckerService.watchTransactions(notificationService)









// big problem with timing 
function getCronFromTime(time){

  
    return `0 ${time} * * *`
}






schedule.scheduleJob( getCronFromTime(time), () => {
    // getBalance with ether

    const notificationBody = {
        isTransaction : false ,
        balance : balance,
        time : new Date()
    }
    
   notificationService.sendNotification(notificationBody)
  });



