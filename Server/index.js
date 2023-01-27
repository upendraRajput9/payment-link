const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIP_SECRET_TEST)
const bodyParser = require("body-parser");
const cors = require("cors")


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(cors())

app.post("/payment", cors(), async (req,res)=>{
    let {amount,id} = req.body
    console.log("🚀 ~ file: index.js:16 ~ app.post ~ amount,id", amount,id)
    
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency:"INR",
            description:"Spatualacompany",
            payment_method:id,
            confirm:true
        })
        console.log("🚀 ~ file: index.js:24 ~ app.post ~ payment", payment)
       res.json({
        message:"Payment successful",
        sucess:true
       })
    } catch (error) {
        console.log("🚀 ~ file: index.js:30 ~ app.post ~ error", error)
        res.json({
            message:"Payment failed",
            success:false
           })
    }
})

app.listen(process.env.PORT || 4000, ()=>{
    console.log("Server is listeningon port 4000");
})
