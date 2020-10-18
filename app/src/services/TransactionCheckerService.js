

// require  web3js our javascript API to interface with the blockchain network  via JSON-RPC
const Web3 = require('web3')
// This class will be responsible for getting all information we need from the blockchain 
class TransactionCheckerService {
    web3;
    web3ws;
    account;
    subscription;
    amount 

    constructor(keys) {
        // Please Notice That we using the rinkeby test blockchain  network if you want  to go to mainnet net change ether url in the websocket and the https provider 

        // mainnet url is mainnet.infura.io 
       // https://mainnet.infura.io/v3/
       //wss://mainnet.infura.io/ws/v3/
        const mainUrlhttp = "https://mainnet.infura.io/v3/"
        const mainUrlws = "wss://mainnet.infura.io/ws/v3/"
        this.web3ws = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/'+ keys.ifura_ID));
        this.web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/' + keys.ifura_ID));
        this.account = keys.account.toLowerCase();
        this.amount = keys.amount
    }
// function to listen to some event  in the blockchain ( PendingTransactions for our case )

    subscribe(topic) {
        this.subscription = this.web3ws.eth.subscribe(topic, (err, res) => {
            if (err) console.error(err);
        });
    }
// start watching for  all transaction  in the blockchain 
    watchTransactions(notificationService) {
       // console.log('Watching all pending transactions...');
      // this.subscribe('pendingTransactions')
       
        this.subscription.on('data', (txHash) => {
                // we need setTimeout to wait until the transaction is confirmed
            setTimeout(async () => {
                try {
                    // get all  pending transactions hashes  in the blockchain
                    let tx = await this.web3.eth.getTransaction(txHash);
                    if (tx != null) {
                       // console.log(tx.from)
                       // if the transaction from our account ( provided in deployment process)

                        if (this.account === tx.from.toLowerCase()) {
                            // we need to execute  code that send notification to our services
                            
                           
                            try {
                                // get the actual balance for the account with ETH
                                const balance = await this.web3.eth.getBalance(this.account)
                                const ethBalance = this.web3.utils.fromWei(balance,'ether') 
                               const time = new Date() // get the date of operation 

                               // build the notification body 
                                const notificationBody = {
                                    isTransaction : true , // we need this information for the message that we send 
                                   time : time, // we need the  actual time for the transaction
                                   balance: ethBalance // the actual balance for the account 
                                }
                                // print to the console about the transaction
                                   console.log({transactions : true, timestamp: time,actualBalance : ethBalance + ' ETH'})
                                
                                       notificationService.sendNotification(notificationBody)

                                       // if you want to send notification only if the actual balance is less than the amount injected in deployment files  Please uncomment  the next 3 lines of code 

                                    //    if ( ethBalance < this.amount){
                                      //  notificationService.sendNotification(notificationBody)

                                    
                                    //    }



                            }catch(err){
                                // if any err  print the err message 

                                console.error(err)


                            }
                             
                                    
                             
            
                        }

                    }
                } catch (err) {
                    console.error(err);
                }
            }, 6000) // you can increase this value if the account has a lower gas 
        });
       
    }
 //   get the actual balance for an account
  async  getBalance(account){

    try {

        const balance = await this.web3.eth.getBalance(account)
        const ethBalance = this.web3.utils.fromWei(balance,'ether') 
        return ethBalance

    } catch(err){


        console.log(err)
    }
    
    }
}//

module.exports = TransactionCheckerService

