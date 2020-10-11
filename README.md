

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](../TODO.md)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

Write about 1-2 paragraphs describing the purpose of your project.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites


You need to install the fellowing software in order to get the application up and running 

 - Node.js and npm
 - Docker
 - Kubernetes on cloud

 ## Development environment

### Installing

- Download and Install node.js and NPM from https://nodejs.org/en/download/

 ## Running node.js application
- Download or clone the project code from https://github.com/abdm64/DAPP-JS.git

- Install all required npm packages by running npm install from the command line in the app folder (where the package.json is located).
```
cd app
```
```
npm install
```
- Before start the applcaition you should change keys ( account ) and token in order to get messeges from the the applcaition in you slack and telegram channel

- Start the application by running npm start from the command line in the app folder, you should see the message: Watching all pending transactions... .

```
npm start 
```

- Now the applcation should send you a notification  at every transaction happend in your account and will send you daily check of your  current balance 


## 🚀 Deployment <a name = "deployment"></a>
## Docker

### Installing

- Download and install docker in your machine

- you need to  have the kubectl cammand line you can use Google kubernetes engine or other cloud platform or for test purpuse you install minikube in your machine 

### Build Docker image 

- Build your own docker image and push it to your repo  by running  "docker build -t my-app-name:v1 . "
   from the cammand line in app folder you can push it to your own registy 

```
cd app
```

```
docker build -t my-app-name:v1 .
```
###  Run Docker image 

- Run  your Docker image  for the application by the cammand 

```
docker run -e [inject your env variable here] my-app-name:v1
```
###  Docker compose 
- Also you can run the application as service by running  the fellowing cammand 

```
docker-compose up 
```

and the docker-compose.yaml handle all the task for you 

- to drop the running container use the cammand 
```
docker-compose  down 
```
## Kubernetes  GKE

- you should have access  to kubernets cluster GKE or you can download and install minikube in your machine 



- Please update  the eth-app.yaml file in the k8s folder with all needed information ( env var ) in order to the applcaion work 

- To run the application on kubernetes cluster ( GKE) just run the fellowing cammand 

```
kubectl apply -f k8s
```


## 🔧 Running the tests <a name = "tests"></a>

Explain how to run the automated tests for this system.

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## 🎈 Usage <a name="usage"></a>

Add notes about how to use the system.

## 🚀 Deployment <a name = "deployment"></a>

Add additional notes about how to deploy this on a live system.

## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [VueJs](https://vuejs.org/) - Web Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@kylelobo](https://github.com/kylelobo) - Idea & Initial work

See also the list of [contributors](https://github.com/kylelobo/The-Documentation-Compendium/contributors) who participated in this project.

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Hat tip to anyone whose code was used
- Inspiration
- References
