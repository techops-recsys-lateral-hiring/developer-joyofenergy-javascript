const { pricePlans, pricePlanNames } = require("../price-plans/price-plans");

const meters = {
    METER0: "smart-meter-0",
    METER1: "smart-meter-1",
    METER2: "smart-meter-2",
    METER3: "smart-meter-3",
    METER4: "smart-meter-4",
};

const meterPricePlanMap = {
    [meters.METER0]: pricePlans[pricePlanNames.PRICEPLAN0],
    [meters.METER1]: pricePlans[pricePlanNames.PRICEPLAN1],
    [meters.METER2]: pricePlans[pricePlanNames.PRICEPLAN2],
};

module.exports = { meterPricePlanMap, meters };
