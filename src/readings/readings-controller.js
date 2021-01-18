const read = (getData, req) => {
    const meter = req.params.smartMeterId;
    return getData(meter);
};

const store = (setData, req) => {
    const data = req.body;
    return setData(data.smartMeterId, data.electricityReadings);
};

module.exports = { read, store };
