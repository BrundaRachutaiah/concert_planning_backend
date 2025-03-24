const { concert: concertModel, merchandiseStalls: merchandiseStallsModel, afterParties: afterPartiesModel, tour: tourModel, tourItem: tourItemModel } = require("../models");

const createTour = async (req, res) => {
    try {
        const { concerts, merchandiseStalls, afterParties, name } = req.body;
        const newTour = await tourModel.create({ name });

        if (concerts && concerts.length > 0) {
            for (const concert of concerts) {
                const savedConcert = await concertModel.create(concert);
                await tourItemModel.create({
                    tourId: newTour.id,
                    itemId: savedConcert.id,
                    type: "concert",
                });
            }
        }

        if (merchandiseStalls && merchandiseStalls.length > 0) {
            for (const merchandiseStall of merchandiseStalls) {
                const savedMerchandiseStall = await merchandiseStallsModel.create(merchandiseStall);
                await tourItemModel.create({
                    tourId: newTour.id,
                    itemId: savedMerchandiseStall.id,
                    type: "merchandiseStall",
                });
            }
        }

        if (afterParties && afterParties.length > 0) {
            for (const afterParty of afterParties) {
                const savedAfterParty = await afterPartiesModel.create(afterParty);
                await tourItemModel.create({
                    tourId: newTour.id,
                    itemId: savedAfterParty.id,
                    type: "afterParty",
                });
            }
        }

        res.status(201).json({ message: "Tour created", tour: newTour });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create Itinerary" });
    }
};

const getTour = async (req, res) => {
    try {
        const tour = await tourModel.findByPk(req.params.id);
        if (!tour) {
            return res.status(404).json({ error: "Tour not found" });
        }
        console.log(tour.concerts); 

        const items = await tourItemModel.findAll({
            where: { tourId: tour.id },
        });

        

        const concerts = [];
        const merchandiseStalls = [];
        const afterParties = [];

        for (const item of items){
            if (item.type === "concert") {
                const concert = await concertModel.findByPk(item.itemId);
                if (concert) concerts.push(concert);
                
            } else if (item.type === "merchandiseStall") {
                const merchandiseStall = await merchandiseStallsModel.findByPk(item.itemId);
                if (merchandiseStall) merchandiseStalls.push(merchandiseStall);
            } else if (item.type === "afterParty") {
                const afterParty = await afterPartiesModel.findByPk(item.itemId);
                if (afterParty) afterParties.push(afterParty);
            }
        }

        res.json({
            tour,
            concerts,
            merchandiseStalls,
            afterParties,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve tour data" });
    }
};

module.exports = { createTour, getTour };
