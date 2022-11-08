// Get yield for vegetables with environment factors
const getYieldForPlant = (vegetables, factors) => {
  let getYield;
  const fullYield = 100;
  if (!factors) {
    // yield with NO environmental factors
    getYield = vegetables.yield;
    return getYield;
  } else {
    // yield WITH environmental factors
    let sunValue = factors.sun;
    let windValue = factors.wind;
    if (sunValue === "low" || sunValue === "medium") {
      getYield = Math.round(
        vegetables.yield *
          ((fullYield - Math.abs(vegetables.factor.sun[sunValue])) / 100) *
          ((fullYield - Math.abs(vegetables.factor.wind[windValue])) / 100)
      );
    } else {
      getYield = Math.round(
        vegetables.yield *
          ((fullYield + vegetables.factor.sun[sunValue]) / 100) *
          ((fullYield - Math.abs(vegetables.factor.wind[windValue])) / 100)
      );
    }
    return getYield;
  }
};

// Get yield for crop,
const getYieldForCrop = (vegetables, factors) => {
  let yieldPerCrop;
  // yield with NO environmental factors
  if (!factors) {
    yieldPerCrop = vegetables.crop.yield * vegetables.numCrops;
    return yieldPerCrop;
  } else {
    // yield WITH environmental factors
    yieldPerCrop = Math.round(
      getYieldForPlant(vegetables.crop, factors) * vegetables.numCrops
    );
    return yieldPerCrop;
  }
};

// Calculate total yield with 0 amount
// Calculate total yield with multiple crops
const getTotalYield = (farmYield, factors) => {
  let totalYield = 0;  
  if (!factors) {
    farmYield.vegetables.forEach((element) => {
      totalYield += element.crop.yield * element.numCrops;
    });
    return totalYield;
  } else {
//Calculate total yield WITH environmental factors
    farmYield.vegetables.forEach((element) => {
      totalYield = Math.round(
        getYieldForCrop(element.crop.yield, factors) * element.numCrops
      );
    }).reduce((a, b) => a + b);
    return totalYield;
  }
};

// Calculate the cost for a crop
const getCostsForCrop = (vegetables) =>
  vegetables.sowingPrice * vegetables.plantsPerCrop * vegetables.numCrops;

// Calculate the revenue for a crop (without environmental factors)
const getRevenueForCrop = (vegetables) =>
  vegetables.salePrice *
  (vegetables.yield * vegetables.plantsPerCrop * vegetables.numCrops);

// Calculate the profit for a crop (without environmental factors)
const getProfitForCrop = (vegetables) => {
  return getRevenueForCrop(vegetables) - getCostsForCrop(vegetables);
};

// Calculate the profit for multiple crops (without environmental factors)
const getTotalProfit = (crops) => {
  console.log(crops);
  const profitPerCrop = crops.map(getRevenueForCrop(crops)); //push the profit of each crop into the array
  console.log(profitPerCrop);
  profitPerCrop.reduce((previousValue, currentValue) => {
    const sumProfit = previousValue + currentValue;
    return sumProfit;
  });
  return sumProfit;
};

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  //getCostsForCrop,
  //getRevenueForCrop,
  //getProfitForCrop,
  // getTotalProfit,
};
