if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
  //CHECKKAA DOTENV KIRJASTO MIKSI EI TOIMI ympäristömuuttuja toimii jos annetaan manuaalisesti 
}

 let PORT = process.env.PORT || 3001
 let MONGODB_URI = process.env.MONGODB_URI

 module.exports = {
   MONGODB_URI,
   PORT
 }