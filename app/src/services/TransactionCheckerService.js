

// web3js our javascript API to interface with the blockchain network  via JSON-RPC
const Web3 = require('web3')
// class will be responsable for getting all information we need from the blockchain 
class TransactionCheckerService {
    web3;
    web3ws;
    account;
    subscription;
    amount 

    constructor(keys) {
        // Please Notice That we using the rinkeby test blocchain  network if you want  to go to maint net chang ethe url in the websocket and the https provider 

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
// fuction to listen to some event  in the blockchain ( transactions for example )

    subscribe(topic) {
        this.subscription = this.web3ws.eth.subscribe(topic, (err, res) => {
            if (err) console.error(err);
        });
    }
// start watching for  all transaction  in the blockchain 
    watchTransactions(notificationService) {
       // console.log('Watching all pending transactions...');
       
        this.subscription.on('data', (txHash) => {

            setTimeout(async () => {
                try {
                    // get all transactions happend in the blockchain
                    let tx = await this.web3.eth.getTransaction(txHash);
                    if (tx != null) {
                       // console.log(tx.from)
                       // if the transaction from our account ( provided in deployment process)

                        if (this.account === tx.from.toLowerCase()) {
                            // we need to excute code that send notication to our services
                            
                           
                            try {
                                // get the actuel balance for the account with ETH
                                const balance = await this.web3.eth.getBalance(this.account)
                                const ethBalance = this.web3.utils.fromWei(balance,'ether') 
                               const time = new Date() // get the date of operation 

                               // build the notification body 
                                const notificationBody = {
                                    isTransaction : true , // we need this information for the message that we send 
                                   time : time, // we need actuel time for the transaction
                                   balance: ethBalance // the actuel balance for the account 
                                }
                                // print to the console about the transaction
                                   console.log({transactions : true, time: time,actuelBalance : ethBalance + ' ETH'})
                                
                                       notificationService.sendNotification(notificationBody)

                                       // if you want to send notification only if the currect balance is less than the amout injected in deployment files  Please uncumment the next 3 lines of code 

                                    //    if ( ethBalance < this.amount){
                                      //  notificationService.sendNotification(notificationBody)

                                    
                                    //    }



                            }catch(err){
                                // if any err happend when the exution of the previes code we need to console the err 

                                console.error(err)


                            }
                             
                                    
                             
            
                        }

                    }
                } catch (err) {
                    console.error(err);
                }
            }, 6000)
        });
       
    }
 //   get the actuel balance for an accout
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

