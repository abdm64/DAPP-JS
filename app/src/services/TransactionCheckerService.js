


const Web3 = require('web3')

class TransactionCheckerService {
    web3;
    web3ws;
    account;
    subscription;
    amount 

    constructor(keys) {
        
        this.web3ws = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/'+ keys.ifura_ID));
        this.web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/' + keys.ifura_ID));
        this.account = keys.account.toLowerCase();
        this.amount = keys.amount
    }

    subscribe(topic) {
        this.subscription = this.web3ws.eth.subscribe(topic, (err, res) => {
            if (err) console.error(err);
        });
    }

    watchTransactions(notificationService) {
       // console.log('Watching all pending transactions...');
       
        this.subscription.on('data', (txHash) => {
            setTimeout(async () => {
                try {
                    let tx = await this.web3.eth.getTransaction(txHash);
                    if (tx != null) {
                       // console.log(tx.from)
                        if (this.account === tx.from.toLowerCase()) {
                           
                            try {
                                const balance = await this.web3.eth.getBalance(this.account)
                                const ethBalance = this.web3.utils.fromWei(balance,'ether') 
                               const time = new Date()
                                const notificationBody = {
                                    isTransaction : true ,
                                   time : time,
                                   balance: ethBalance
                                }
                                   console.log({transactions : true, time: time,actuelBalance : ethBalance + ' eth'})
                                
                                       notificationService.sendNotification(notificationBody)

                                       // if you want to send notification only if the currect balance is less than the amout injected in deployment files 

                                    //    if ( ethBalance < this.amount){
                                      //  notificationService.sendNotification(notificationBody)

                                    
                                    //    }



                            }catch(err){

                                console.error(err)


                            }
                             
                                    
                             
            
                        }

                    }
                } catch (err) {
                    console.error(err);
                }
            }, 6000)
        });
        // this.subscription.unsubscribe(function(error, success){
        //     // if(success)
        //         console.log('Successfully unsubscribed!');
        // });
    }
  async  getBalance(account){
    const balance = await this.web3.eth.getBalance(account)
    const ethBalance = this.web3.utils.fromWei(balance,'ether') 

    return ethBalance
    }
}//

module.exports = TransactionCheckerService

