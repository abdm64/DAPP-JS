
require('dotenv').config();

const Web3 = require('web3');

class TransactionChecker {
    web3;
    web3ws;
    account;
    subscription;

    constructor(projectId, account) {
        this.web3ws = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/b34ec3bc8dd346eb94f3337e1c9f7cb6'));
        this.web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/b34ec3bc8dd346eb94f3337e1c9f7cb6'));
        this.account = account.toLowerCase();
    }

    subscribe(topic) {
        this.subscription = this.web3ws.eth.subscribe(topic, (err, res) => {
            if (err) console.error(err);
        });
    }

    watchTransactions() {
        console.log('Watching all pending transactions...');
        this.subscription.on('data', (txHash) => {
            setTimeout(async () => {
                try {
                    let tx = await this.web3.eth.getTransaction(txHash);
                    if (tx != null) {
                        if (this.account == tx.to.toLowerCase()) {
                            //send notifiaction to messages Service 

                            console.log({address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date()});
                        }
                    }
                } catch (err) {
                    console.error(err);
                }
            }, 60000)
        });
    }
}

let account = process.env.ADRESS_ID || '0xe1Dd30fecAb8a63105F2C035B084BfC6Ca5B1493'

let txChecker = new TransactionChecker(process.env.INFURA_ID, account);
txChecker.subscribe('pendingTransactions');
txChecker.watchTransactions();