// This module allows you to schedule task in node.js 
const cron = require('node-cron');



// get local time form UTC Time ()
 function getCronFromTime(time){
    const d = new Date()
    const d1 = new Date()
    const timeStr = time.toString()
    const hours = timeStr.split(":")[0]
    const min = timeStr.split(":")[1]
    // convert UTC Time to local Time 
    const utc_offeset = d.getTimezoneOffset()
    let utc_date = new Date( d.setMinutes(d.getMinutes() + utc_offeset)) 
    
    const  deff_hours =  d1.getHours() - utc_date.getHours()
    const deff_min = d1.getMinutes() - utc_date.getMinutes()
     const actuelHour =  deff_hours + parseInt(hours)
    const actuelMinutes = deff_min + parseInt(min)
    
    return `${actuelMinutes} ${actuelHour} * * *`
}

// file will be respnsible about the daily notification 
 exports.sendNotification = (dailyNotificationBody) =>{
  
// get all fucntion and data  we need 
    const time = dailyNotificationBody.time
    const transactionService = dailyNotificationBody.transactionService
    const account = dailyNotificationBody.account
    const notificationService = dailyNotificationBody.notificationService
//  schedule a job usein the node-cron module 
    cron.schedule( getCronFromTime(time),async () => {
 
        try {
    // the actuel balance at that time 
            const  balance  =  await transactionService.getBalance(account)
    // build notification body 
            const notificationBody = {
                isTransaction : false ,
                balance : balance,
                time : new Date()
            }
            // send notification using notification service
           notificationService.sendNotification(notificationBody)
    
        }catch(err){
    // in case of err console  the err 
            console.log(err)
    
        }
       
      
      });
}


