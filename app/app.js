
const schedule = require('node-schedule');
const keys = require('./src/config/keys')
const telegramKeys = require('./src/config/TelegramKeys')
const slackKeys = require('./src/config/SlackKeys')
const time = keys.time
const utils = require('./src/helper/utils')

// Class Prototype
const TransactionCheckerService = require('./src/services/TransactionCheckerService')
const NotificationService = require('./src/services/NotificationService')



//Class intance with init data 
const transactionCheckerService  = new TransactionCheckerService(keys.ifura_ID,keys.account)
const notificationService  = new NotificationService(slackKeys,telegramKeys)




// subscribe to the evant pending trasactions
transactionCheckerService.subscribe('pendingTransactions')

// watch tranasction to send notifiation to services 
transactionCheckerService.watchTransactions(notificationService)















// daily notification at specefic time
schedule.scheduleJob( utils.getCronFromTime(time),async () => {
    try {

        const  balance  =  await transactionCheckerService.getBalance(balance)

        const notificationBody = {
            isTransaction : false ,
            balance : balance,
            time : new Date()
        }
        
       notificationService.sendNotification(notificationBody)

    }catch(err){

        console.log(err)

    }
   
  
  });



  console.log("the application Now is running watch your  notification")

