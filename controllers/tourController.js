const axios = require("axios")
const {validateConcertQueryParams,  validateMerchandiseStallsQueryParams, validateAfterPartyQueryParam} = require("../validations/index")
const axiosInstance = axios.create({
    baseURL: process.env.MICROSERVICE_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        CLIENT_KEY: process.env.CLIENT_KEY,
        CLIENT_SECRET: process.env.CLIENT_SECRET
    }
})

const getConcertByArtistAndCity = async (req,res) => {
    const errors = validateConcertQueryParams(req.query)
    if(errors.length > 0) return res.status(400).json({errors})
    try {
        const {artist, city} = req.query
        const response = await axiosInstance.get(`/concerts/search?artist=${artist}&city=${city}`)
        res.json(response.data)
    } catch (error) {
        res.status(500).json({error:"Fail to fetch concert details."})
    }    
}

const getConcerts = async (req,res) => {
    try {
        const test_error = req.query.test_error
        const rate_limit = req.query.rate_limit
        const response = await axiosInstance.get(`/concerts?test_error=${test_error}&rate_limit=${rate_limit}`, {
            headers: {
                CLIENT_KEY: process.env.CLIENT_KEY,
                CLIENT_SECRET: process.env.CLIENT_SECRET
            }
        })
        res.json(response.data)
    } catch (error) {
        console.error(error)
        if(error.response.status === 429){
            return res.status(429).json({error: "Rate limit exceed, Please try again later."})
        }else if(error.response.status === 500 && error.response.data.error === "Stimulated error for testing purposes."){
            return res.status(500).json({error: "Stimulated error for testing purposes."})
        }
        res.status(500).json({error: "Fail to fetch concert"})
    }
}

const getMerchandiseStallsByStallName = async (req,query) => {
    const errors = validateMerchandiseStallsQueryParams(req.query)
    if(!errors) return res.status(400).json({errors})
    try {
        const {stallName} = req.query
        const response = await axiosInstance.get(`/merchandiseStalls/search?stallName=${stallName}`)
        res.json(response.data)
    } catch (error) {
        res.status(500).json({error: "Fail to fetch the merchandiseStall details."})
    }
}

const getMerchandiseStalls = async (req,res) => {
    try {
        const test_error = req.query.test_error
        const rate_limit = req.query.rate_limit
        const response = await axiosInstance.get(`/merchandiseStalls?test_error=${test_error}&rate_limit=${rate_limit}`)
        res.json(response.data)
    } catch (error) {
        console.error(error)
        if(error.response.status === 429){
            return res.status(429).json({error: "Rate limit exceed, Please try again later."})
        }else if(error.response.status === 500 && error.response.data.error === "Stimulated error for testing purposes."){
            return res.status(500).json({error: "Stimulated error for testing purposes."})
        }
        res.status(500).json({error: "Fail to fetch merchandiseStalls"})
    }
}

const getAfterPartyByCity = async (req,res) => {
    const errors = validateAfterPartyQueryParam(req.query)
    if(!errors) return res.status(400).json({errors})
    try {
        const {city} = req.query
        const response = await axiosInstance.get(`/afterparty/search?city=${city}`)
        res.json(response.data)
    } catch (error) {
        res.status(500).json({error: "Fail to fetch the afterParty details."})
    }
}

const getAfterParty = async (req,res) => {
    try {
        const test_error = req.query.test_error
        const rate_limit = req.query.rate_limit
        const response = await axiosInstance.get(`/afterParties?test_error=${test_error}&rate_limit=${rate_limit}`)
        res.json(response.data)
    } catch (error) {
        console.error(error)
        if(error.response.status === 429){
            return res.status(429).json({error: "Rate limit exceed, Please try again later."})
        }else if(error.response.status === 500 && error.response.data.error === "Stimulated error for testing purposes."){
            return res.status(500).json({error: "Stimulated error for testing purposes."})
        }
        res.status(500).json({error: "Fail to fetch afterParty"})
    }
}

module.exports = {
    getConcerts, getMerchandiseStalls, getAfterParty, getConcertByArtistAndCity, getMerchandiseStallsByStallName, getAfterPartyByCity,
}