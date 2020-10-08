//@ts-check
var schedule = require('node-schedule');


// let url = "https://mainnet.infura.io/v3/b34ec3bc8dd346eb94f3337e1c9f7cb6"
// let Web3 = require('web3')


// let account = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
// let app = express()
// //connected to the main ether 
// let web3 = new Web3(url)

// web3.eth.accounts.create()
    const discordToken = process.env.DISCORD_TOKEN
    const  slackToken = process.env.SLACK_TOKEN
    const telegramToken = process.env.TELEGRAM_TOKEN
    const time = process.env.TIME


// web3.eth.getBalance(account,(err,bal)=>{
// if (err != null){

// console.log(err)

// } else {

//     console.log("fedf")
//     console.log(bal)
// }

// })

// //console.log(web3)

function getCronFromTime(time){











    //convert Time to local time 
//     const timeString = time.toLowerCase()
//     const stringLength = timeString.length
//     const timesign = timeString.slice('')[stringLength - 2]
//     const hour =  ()=>{
//         if ( timesign === 'p'){
//             let hourNumber = parseInt(timeString.slice(':')[0]) + 12
             
//             return hourNumber.toString()
//         }else {

//             return timeString.slice(':')[0]
//         }

      
//     }
//     console.log(hour())  


//     console.log(timesign)

// console.log(timeString)
   // return `${10} ${16} * * *`
}
//getCronFromTime('10:12 pm')

//console.log(now)
var date = new Date('2020-10-07 16:55:34 UTC');
console.log(date.toString())




// schedule.scheduleJob( getCronFromTime(), () => {
    
//    console.log('oops')
  
//   });



