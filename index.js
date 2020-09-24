const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes")
const stockData = require("./stockData.json")
const Stock = require("./model/Stock")
var cors = require('cors');
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
  }

const mongoDBAtlasUrl = "mongodb+srv://admin:azerty1@clusterstock.lgi8s.mongodb.net/warehouse?retryWrites=true&w=majority";

function resetStockData() {
    Stock.find().remove()
    for (var i=0; i < stockData.length; i++) {
        new Stock( stockData[i]).save();
    }
}

// Connect to MongoDB database & stock Collection
mongoose
        .connect(mongoDBAtlasUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(
            resetStockData()
        )
        

            const app = express()
            app.use(cors(corsOptions));
            app.use(express.json())
			// app.use(function(req, res, next) {
            //     res.header("Access-Control-Allow-Origin", "*");
            //     res.header("Acces-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
            //     res.header("Acces-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            //     next();
            // })
            
            app.use("/api", routes)
            
            app.listen(5000, () => {
                console.log("server has started")
            })
       


