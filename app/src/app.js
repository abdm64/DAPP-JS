
const keys = require('./config/keys')
const telegramKeys = require('./config/TelegramKeys')
const slackKeys = require('./config/SlackKeys')
const time = keys.time
const dailyNotificationService = require('./helper/DailyNotification')
const account = keys.account

// Class Prototype
const TransactionCheckerService = require('./services/TransactionCheckerService')
const NotificationService = require('./services/NotificationService')



//Class intance with init data 
const transactionCheckerService  = new TransactionCheckerService(keys)
const notificationService  = new NotificationService(slackKeys,telegramKeys)
// daily notification information
const dailyNotificationBody = {
    time : time,
    transactionService: transactionCheckerService,
    account: account,
    notificationService : notificationService

}


// subscribe to the evant pending trasactions
transactionCheckerService.subscribe('pendingTransactions')

// watch tranasction to send notifiation to services 
transactionCheckerService.watchTransactions(notificationService)


// daily notification at specefic time

dailyNotificationService.sendNotification(dailyNotificationBody)














   
  




  console.log("the application Now is running, start  watch your  notification")

  

