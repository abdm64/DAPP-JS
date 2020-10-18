
// All telegram keys should be injected from deployment files 
module.exports = {
    token : process.env.TELEGRAM_TOKEN || '1245097298:AAHRaPbq7AY3YVb7-f04nIjWbYnCprjrI6s', // only for testing
    chatId : process.env.TELEGRAM_CHAT_ID ||  256445793, // only test still you can inject your keys in the deployment file 
  };