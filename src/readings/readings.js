const readings = (data) => ({
  getReadings: (meterId) => data[meterId] || [],
  setReadings: (meterId, readings) => {
    const currentReadings = data.hasOwnProperty(meterId) ? data[meterId] : [];
    data[meterId] = [...currentReadings, ...readings];
    return data[meterId];
  },
});

module.exports = { readings };
