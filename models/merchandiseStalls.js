
module.exports = (sequelize, DataTypes) => {
    const merchandiseStalls = sequelize.define("merchandiseStalls", {
        stallName: DataTypes.STRING,
        itemAvailable: DataTypes.STRING,
        price: DataTypes.FLOAT,
    },{
        timestamps: true
    })
    return merchandiseStalls
}