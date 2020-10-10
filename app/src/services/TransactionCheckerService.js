
require('dotenv').config();

const Web3 = require('web3');

class TransactionCheckerService {
    web3;
    web3ws;
    account;
    subscription;

    constructor(projectId, account) {
        this.web3ws = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/b34ec3bc8dd346eb94f3337e1c9f7cb6'));
        this.web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/' + projectId));
        this.account = account.toLowerCase();
    }

    subscribe(topic) {
        this.subscription = this.web3ws.eth.subscribe(topic, (err, res) => {
            if (err) console.error(err);
        });
    }

    watchTransactions(notificationService) {
        console.log('Watching all pending transactions...');
       
        this.subscription.on('data', (txHash) => {
            setTimeout(async () => {
                try {
                    let tx = await this.web3.eth.getTransaction(txHash);
                    if (tx != null) {
                        console.log(tx.from)
                        if (this.account == tx.from.toLowerCase()) {
                            
                            
                            //get the balance of account if less than 5 eth send notification 
                                
                            //console.log({address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date()});
                             const balance = await web3.eth.getBalance(account)
                             const ethBalance = web3.utils.fromWei(balance,'ether') 
                            
                             const notificationBody = {
                                 isTransaction : true ,
                                time : new Date(),
                                balance: ethBalance
                             }
                                console.log({transactions : true, time: time,actuelBalance : ethBalance + ' eth'})
                             
                                    notificationService.sendNotificationToTelegram(notificationBody)
                                    
                             
                             if ( ethBalance < 5){
                                   
                                   

                             } else {

                                //do noting
                             }

                        }

                    }
                } catch (err) {
                    console.error(err);
                }
            }, 6000)
        });
    }
}

module.exports = TransactionCheckerService

