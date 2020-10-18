// require all module we created 
const keys = require('./config/keys')
const telegramKeys = require('./config/TelegramKeys')
const slackKeys = require('./config/SlackKeys')
const time = keys.time
const account = keys.account

// import Class Prototype
const TransactionCheckerService = require('./services/TransactionCheckerService')
const NotificationService = require('./services/NotificationService')
//
const dailyNotificationService = require('./helper/DailyNotification')


//Class  instance with init data  ( from the env var )
const transactionCheckerService  = new TransactionCheckerService(keys)
const notificationService  = new NotificationService(slackKeys,telegramKeys)
// daily notification information
const dailyNotificationBody = {
    time : time,
    transactionService: transactionCheckerService,
    account: account,
    notificationService : notificationService

}


// subscribe to the event pending transaction
transactionCheckerService.subscribe('pendingTransactions')

// watch all transactions to send notification to services 
transactionCheckerService.watchTransactions(notificationService)


// daily notification at specific time

dailyNotificationService.sendNotification(dailyNotificationBody)














   
  


// notice the final user that the app is running 

  console.log("the application Now is running, start  watch your  notification")

  

