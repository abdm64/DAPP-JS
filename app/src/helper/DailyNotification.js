
const cron = require('node-cron');




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


 exports.sendNotification = (dailyNotificationBody) =>{
  

    const time = dailyNotificationBody.time
    const transactionService = dailyNotificationBody.transactionService
    const account = dailyNotificationBody.account
    const notificationService = dailyNotificationBody.notificationService

    cron.schedule( getCronFromTime(time),async () => {
 
        try {
    
            const  balance  =  await transactionService.getBalance(account)
    
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
}


