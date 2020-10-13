

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Development ](#development)

     - [App Architecture](#app-archi)
     - [APP Architecture Explained](#app-exp)
     
     - [Running the APP](#app-run)
- [Deployment ](#deployment)
     - [Deployment Architecture](#dep-archi)
     - [Deployment Architecture Explained](#dep-exp)
     - [Docker](#docker)
     - [Kubernetes GKE](#k8s)
- [Built Using](#built_using)
- [Author](#authors)


## 🧐 About <a name = "about"></a>

- This application allow you  to track your amount of Ether and  get daily notification form an  account in ethereum  blockchain account ( challenge sent by the dev team at  [startbahn](https://startbahn.jp/en/) )





## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites


You need to install the fellowing software in order to get the application up and running 

 - Node.js and npm
 - Docker
 - Kubernetes  on cloud

 # Development <a name = "development"></a>
 ## APP Architecture <a name = "app-archi"></a>
-
![Alt text](./images/ethe-app.PNG?raw=true "Title")

### APP Architecture Explained <a name = "app-exp"></a>

  The application  architecture contain 3 part 
- Node js application that connect to the blockchain network using the web3js as interface via infura 
- the application watch all transaction that happened in the blockchain network ( because all transactions will be broadcast at all node in the blockchain network )
- when we detect a transaction happened FROM the provided account we  execute code  to get the currect  balance for that specific account ( using the web3js library ) and use the third party api for messages services (telegram, slack , etc )  to send notification 
- everyday at giving time ( you can inject it on the deployment process )  we execute a code to get the balance for that account and send a notification ( using messages service )


### Installing

- Download and Install node.js and NPM from https://nodejs.org/en/download/

 ### Running the Node.js application <a name = "app-run"></a>
- Download or clone the project code from https://github.com/abdm64/DAPP-JS.git

- Install all required npm packages by running npm install from the command line in the app folder (where the package.json is located).
```
cd app
```
```
npm install
```
- Before start the application you should change keys ( account ) and token in order to get messages from the the application in your slack and telegram channel

- Start the application by running npm start from the command line in the app folder, you should see the message: "the application Now is running, start  watch your  notification".

```
npm start 
```

- Now the application should send you a notification  at every transaction happened in your account and will send you daily check of your  current balance 


# 🚀 Deployment <a name = "deployment"></a>

## Deployment Architecture <a name = "dep-archi"></a>
-
![Alt text](./images/Ether-deploy.PNG?raw=true "Title")
## Deployment Architecture Explained <a name = "dep-exp"></a>

- In order to deploy this application in production we need 
   - Docker to build image for this application and push it to the docker hub or private registry 
   - Kubernetes cluster to run the application in production  mode from the image that was created 

## Docker <a name = "docker"></a>

### Installing

- Download and install docker in your machine



### Build Docker image 

- Build your own docker image and push it to your repo  by running  "docker build -t my-app-name:v1 . "
   from the command line in app folder you can push it to your own registry 

```
cd app
```

```
docker build -t my-app-name:v1 .
```
###  Run Docker image 

- Run  your Docker image  for the application by the command line 

```
docker run -e [inject your env variable here] my-app-name:v1
```
###  Docker compose 
- Also you can run the application as service by running  

```
docker-compose up 
```

and the docker-compose.yaml handle all the task for you 

- to drop the running container use the CLI
```
docker-compose  down 
```
## Kubernetes  GKE <a name = "k8s"></a>

- you should have access  to Kubernetes  cluster GKE or you can download and install minikube in your machine 



- Please fellow the instruction in   the eth-app.yaml file in the k8s folder to update all  information needed ( env var ) in order to the application work  on Kubernetes cluster

- To run the application on Kubernetes cluster ( GKE) just run the fellowing  command

```
kubectl apply -f k8s
```
- this will create 3 kubernetes objects: 
  - Deployment for the application with one pod ( running container) insuring high availability for that service.
  - Secret to store all you secret data including tokens password etc 
  - Namespace  a  virtual cluster for all your ressource related to this application ( in our case the secret and the deployment )




- to drop the application just run the command : 


```
kubectl delete  -f k8s
```









## ⛏️ Built Using <a name = "built_using"></a>

- [Web3.js](https://web3js.readthedocs.io/en/v1.3.0/) - blockchain interface for javascript program
- [Telegraph](https://telegraf.js.org/#/) -  telegram api for javascript program
- [@slack/web-api](https://www.npmjs.com/package/@slack/web-api) - Web Framework for slack api 
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Docker](https://www.docker.com/) - Software platform for building applications

## ✍️ Author <a name = "authors"></a>

- [@abdm64](https://github.com/abdm64) Backend |  DevOps Engineer @  [Djezzy](http://www.djezzy.dz/) 

Made with  ❤️  by Abdellah
