import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
const __dirname = path.resolve();

import compression from 'compression';
import enforce from 'express-sslify'

/* // https://nodejs.org/docs/latest-v15.x/api/esm.html#esm_no_filename_or_dirname
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// or much better for ES6
// import path from 'path'
// const __dirname = path.resolve(); */

if (process.env.NODE_ENV != 'production') {
    dotenv.config()
}

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


const app = express()
const port = process.env.PORT || 5000

//app use
app.use(compression())
app.use(express.urlencoded( { extended: true } ))
app.use(express.json())
app.use(enforce.HTTPS( { trustProtoHeader: true } ))

if (process.env.NODE_ENV == 'production'){
    app.use(express.static( path.join(__dirname, 'client/build' )))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })
}


app.listen(port, (error) => {
    if(error) throw error
    console.log('app running on port: ', port);
    // console.log(process.env.POGI_STRING);
    //console.log(path.join(__dirname, 'client/build', 'index.html'))
})

app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.resolve( __dirname, '..', 'build', 'service-worker.js' ))
})

app.post('/payment', (req, res) => {

    //console.log('log req.body: ', req.body);

    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    }
 
    stripe.charges.create(body, (stripeError, stripeRes) => {
        if(stripeError){
            res.status(500)
            res.send({ error: stripeError })
            
        }
        else{
            res.status(200)
            res.send({ success: stripeRes })
        }

    })
})



