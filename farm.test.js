const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./farm");

// 1. CALCULATE THE YIELD FOR PLANT
describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 30,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
      wind: {
        low: 0,
        medium: -30,
        high: -60,
      },
    },
  };

  test("Get yield for plant with NO environmental factors", () => {
    expect(getYieldForPlant(corn)).toBe(30);
  });

  test("Get yield for plant WITH environmental factors", () => {
    const environmentFactors = { sun: "medium", wind: "high" };

    // expect(getYieldForPlant(corn, environmentFactors)).toBe(11); // sun: low, wind: medium
    expect(getYieldForPlant(corn, environmentFactors)).toBe(12); // sun: medium, wind: high
    // expect(getYieldForPlant(corn, environmentFactors)).toBe(45); // sun: high, wind: low
  });
});

// 2. CALCULATE YIELD FOR CROP
describe("getYieldForCrop", () => {
  const corn = {
    name: "corn",
    yield: 3,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
      wind: {
        low: 0,
        medium: -30,
        high: -60,
      },
    },
  };

  const pumpkin = {
    name: "pumpkin",
    yield: 4,
    factor: {
      sun: {
        low: -40,
        medium: 0,
        high: 60,
      },
      wind: {
        low: 0,
        medium: -20,
        high: -50,
      },
    },
  };

  const tomatoes = {
    name: "tomatoes",
    yield: 5,
    factor: {
      sun: {
        low: -30,
        medium: 10,
        high: 70,
      },
      wind: {
        low: 0,
        medium: -30,
        high: -40,
      },
    },
  };

  const veggies = [
    { crop: corn, numCrops: 10 },
    { crop: pumpkin, numCrops: 2 },
    { crop: tomatoes,numCrops: 4 },
  ]; 

  test("Get yield for crop, simple", () => {
    expect(getYieldForCrop(veggies[1])).toBe(8);
  });

  test("Get yield for crop, WITH environmental factors", () => {
    const environmentFactors = { sun: "medium", wind: "high" };
    expect(getYieldForCrop(veggies[2], environmentFactors)).toBe(12);
  });
});

// 3.CALCULATE THE TOTAL YIELD FOR MULTIPLE CROPS
describe("getTotalYield", () => {
  const corn = {
    name: "corn",
    yield: 3,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
      wind: {
        low: 0,
        medium: -30,
        high: -60,
      },
    },
  };

  const pumpkin = {
    name: "pumpkin",
    yield: 4,
    factor: {
      sun: {
        low: -40,
        medium: 0,
        high: 60,
      },
      wind: {
        low: 0,
        medium: -20,
        high: -50,
      },
    },
  };

  const tomatoes = {
    name: "tomatoes",
    yield: 5,
    factor: {
      sun: {
        low: -30,
        medium: 10,
        high: 70,
      },
      wind: {
        low: 0,
        medium: -30,
        high: -40,
      },
    },
  };

  const vegetables = [
    { crop: corn, numCrops: 5 },
    { crop: pumpkin, numCrops: 2 },
    { crop: tomatoes,numCrops: 4 },
  ];

  test("Calculate total yield with 0 amount", () => {
    const vegetables = [{ crop: corn, numCrops: 0 }];
    expect(getTotalYield({ vegetables })).toBe(0);
  });
  
  test("Calculate total yield with multiple crops", () => {
    expect(getTotalYield({ vegetables })).toBe(43);
  });

  test("Calculate total yield with environmental factors", () => {
    const environmentFactors = [{ sun: "high", wind: "high" }];
    expect(getTotalYield({ vegetables }, environmentFactors)).toBe(0);
  });
});

// 4. CALCULATE THE COST FOR A CROP 
describe("getCostsForCrop", () => {
    const corn = {
      name: "corn",
      yield: 3,
      sowingPrice: 1,
      plantsPerCrop: 30,
      numCrops: 5,
    };

    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      sowingPrice: 1,
      plantsPerCrop: 35,
      numCrops: 2,
    };

    const tomatoes = {
      name: "tomatoes",
      yield: 5,
      sowingPrice: 1,
      plantsPerCrop: 40,
      numCrops: 4,
    };

  test("Calculate the cost for a crop", () => { 
     //expect(getCostsForCrop(corn)).toBe(150);
     //expect(getCostsForCrop(pumpkin)).toBe(70);
     expect(getCostsForCrop(tomatoes)).toBe(160);
  });
});

// 5. CALCULATE THE REVENUE FOR A CROP
describe("getRevenueForCrop", () => {
    const corn = {
      name: "corn",
      yield: 3,
      sowingPrice: 1,
      plantsPerCrop: 30,
      numCrops: 5,
      salePrice: 2,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };

    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      sowingPrice: 1,
      plantsPerCrop: 35,
      numCrops: 2,
      salePrice: 2,
      factor: {
        sun: {
          low: -40,
          medium: 0,
          high: 60,
        },
        wind: {
          low: 0,
          medium: -20,
          high: -50,
        },
      },
    };

    const tomatoes = {
      name: "tomatoes",
      yield: 5,
      sowingPrice: 1,
      plantsPerCrop: 40,
      numCrops: 4,
      salePrice: 1.5,
      factor: {
        sun: {
          low: -30,
          medium: 10,
          high: 70,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -40,
        },
      },
    };

  test("calculate the revenue for a crop", () => {
    expect(getRevenueForCrop(corn)).toBe(900);
    //expect(getRevenueForCrop(pumpkin)).toBe(560);
    //expect(getRevenueForCrop(tomatoes)).toBe(720);
  });

  test("Calculate the revenue for a crop with environmental factors", () => {
  const environmentFactors = { sun: "medium", wind: "high" };
  expect(getRevenueForCrop(pumpkin)).toBe(560);
  });
});

// 6.CALCULATE THE FROFIT FOR A CROP 
describe("getProfitForCrop", () => {
  test("calculate the profit for a crop", () => {
    const corn = {
      name: "corn",
      yield: 3,
      sowingPrice: 1,
      plantsPerCrop: 30,
      numCrops: 5,
      salePrice: 2,
    };

    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      sowingPrice: 1,
      plantsPerCrop: 35,
      numCrops: 2,
      salePrice: 2,
    };

    const tomatoes = {
      name: "tomatoes",
      yield: 5,
      sowingPrice: 1,
      plantsPerCrop: 40,
      numCrops: 4,
      salePrice: 1.5,
    };

    //expect(getProfitForCrop(corn)).toBe(750);
    // expect(getProfitForCrop(pumpkin)).toBe(490);
    // expect(getProfitForCrop(tomatoes)).toBe(560);
  });

  // const corn = {
  //   name: "corn",
  //   yield: 3,
  //   factor: {
  //     sun: {
  //       low: -50,
  //       medium: 0,
  //       high: 50,
  //     },
  //     wind: {
  //       low: 0,
  //       medium: -30,
  //       high: -60,
  //     },
  //   },
  // };

  // const pumpkin = {
  //   name: "pumpkin",
  //   yield: 4,
  //   factor: {
  //     sun: {
  //       low: -40,
  //       medium: 0,
  //       high: 60,
  //     },
  //     wind: {
  //       low: 0,
  //       medium: -20,
  //       high: -50,
  //     },
  //   },
  // };

  // const tomatoes = {
  //     name: "tomatoes",
  //     yield: 5,
  //     factor: {
  //       sun: {
  //         low: -30,
  //         medium: 10,
  //         high: 70,
  //       },
  //       wind: {
  //         low: 0,
  //         medium: -30,
  //         high: -40,
  //       },
  //     },
  //   };

  // const vegetables = [
  //   {
  //     crop: corn,
  //     numCrops: 10,
  //   },
  //   {
  //     crop: pumpkin,
  //     numCrops: 2,
  //   },
  //   {
  //     crop: tomatoes,
  //     numCrops: 4,
  //   },
  // ];

  // const environmentFactors = { sun: "medium", wind: "high" };
});

// 7. CALCULATER THE PROFIT FOR MULTIPLE CROPS
describe("getTotalProfit", () => {
  test("calculate the profit for multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
      sowingPrice: 1,
      plantsPerCrop: 30,
      numCrops: 5,
      salePrice: 2,
    };

    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      sowingPrice: 1,
      plantsPerCrop: 35,
      numCrops: 2,
      salePrice: 2,
    };

    const tomatoes = {
      name: "tomatoes",
      yield: 5,
      sowingPrice: 1,
      plantsPerCrop: 40,
      numCrops: 4,
      salePrice: 1.5,
    };

    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
      { crop: pumpkin, numCrops: 4 },
    ];

     //expect(getTotalProfit({crops})).toBe(1800);
  });

  // const corn = {
  //   name: "corn",
  //   yield: 3,
  //   factor: {
  //     sun: {
  //       low: -50,
  //       medium: 0,
  //       high: 50,
  //     },
  //     wind: {
  //       low: 0,
  //       medium: -30,
  //       high: -60,
  //     },
  //   },
  // };

  // const pumpkin = {
  //   name: "pumpkin",
  //   yield: 4,
  //   factor: {
  //     sun: {
  //       low: -40,
  //       medium: 0,
  //       high: 60,
  //     },
  //     wind: {
  //       low: 0,
  //       medium: -20,
  //       high: -50,
  //     },
  //   },
  // };

  // const tomatoes = {
  //     name: "tomatoes",
  //     yield: 5,
  //     factor: {
  //       sun: {
  //         low: -30,
  //         medium: 10,
  //         high: 70,
  //       },
  //       wind: {
  //         low: 0,
  //         medium: -30,
  //         high: -40,
  //       },
  //     },
  //   };

  // const vegetables = [
  //   {
  //     crop: corn,
  //     numCrops: 10,
  //   },
  //   {
  //     crop: pumpkin,
  //     numCrops: 2,
  //   },
  //   {
  //     crop: tomatoes,
  //     numCrops: 4,
  //   },
  // ];

  // const environmentFactors = { sun: "medium", wind: "high" };
});
