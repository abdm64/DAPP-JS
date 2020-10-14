
const cron = require('node-cron');
const keys = require('./config/keys')
const telegramKeys = require('./config/TelegramKeys')
const slackKeys = require('./config/SlackKeys')
const time = keys.time
const utils = require('./helper/utils')
const account = keys.account

// Class Prototype
const TransactionCheckerService = require('./services/TransactionCheckerService')
const NotificationService = require('./services/NotificationService')



//Class intance with init data 
const transactionCheckerService  = new TransactionCheckerService(keys.ifura_ID,keys.account)
const notificationService  = new NotificationService(slackKeys,telegramKeys)




// subscribe to the evant pending trasactions
transactionCheckerService.subscribe('pendingTransactions')

// watch tranasction to send notifiation to services 
transactionCheckerService.watchTransactions(notificationService)














// daily notification at specefic time
cron.schedule( utils.getCronFromTime(time),async () => {
 
    try {

        const  balance  =  await transactionCheckerService.getBalance(account)

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



  console.log("the application Now is running, start  watch your  notification")

  

