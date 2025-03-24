const express = require("express")
const cors = require("cors")
require("dotenv").config()
const {createTour, getTour} = require("./controllers/dataController")
const {getConcerts, getMerchandiseStalls, getAfterParty, getConcertByArtistAndCity, getMerchandiseStallsByStallName, getAfterPartyByCity} = require("./controllers/tourController")
const { sequelize } = require("./models")

const app = express()
app.use(express.json())
app.use(cors())

app.post("/tour", createTour);
app.get("/tour/:id", getTour);

app.get("/data/concerts", getConcerts);
app.get("/data/merchandiseStalls", getMerchandiseStalls);
app.get("/data/afterParties", getAfterParty);

app.get("/concerts/search", getConcertByArtistAndCity);
app.get("/merchandiseStalls/search", getMerchandiseStallsByStallName);
app.get("/afterparty/search", getAfterPartyByCity);

sequelize.authenticate().then(() => {
    console.log("database connected")
}).catch(error => {
    console.error("Unable to connect to database", error)
})

app.listen(3001, () => {
    console.log("server is running on port 3000")
})