const { meters } = require("../meters/meters");
const { readingsData } = require("./readings.data");

describe("generate data", () => {
    it("should generate readings for one meter", () => {
        expect(readingsData[meters.METER0].length).toBeGreaterThan(0);
    });
});
