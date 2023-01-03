// 1. Get yield for plant 
const getYieldForPlant = (vegetable, factor) => {
  let getYield;
  // yield with NO environmental factors
  const fullYield = 100;
  if (!factor) {
    getYield = vegetable.yield;
    return getYield;
  } else {
  // yield WITH environmental factors
    let sunValue = factor.sun;
    let windValue = factor.wind;
    if (sunValue === "low" || sunValue === "medium") {
      getYield = Math.round(
        vegetable.yield *
          ((fullYield - Math.abs(vegetable.factor.sun[sunValue])) / 100) *
          ((fullYield - Math.abs(vegetable.factor.wind[windValue])) / 100)
      );
    } else {
      getYield = Math.round(
        vegetable.yield *
          ((fullYield + vegetable.factor.sun[sunValue]) / 100) *
          ((fullYield - Math.abs(vegetable.factor.wind[windValue])) / 100)
      );
    }
    return getYield;
  }
};

// 2. Get yield for crop,
const getYieldForCrop = (vegetable, factor) => {
  let yieldPerCrop;
  // yield with NO environmental factors
  if (!factor) {
    yieldPerCrop = vegetable.crop.yield * vegetable.numCrops;
    return yieldPerCrop;
  } else {
  // yield WITH environmental factors
    yieldPerCrop = Math.round(
      getYieldForPlant(vegetable.crop, factor) * vegetable.numCrops
    );
    return yieldPerCrop;
  }
};

// 3a. Calculate total yield with 0 amount
// 3b. Calculate total yield with multiple crops
const getTotalYield = (farmYield, factor) => {
  let totalYield = 0;  
  if (!factor) {
    farmYield.vegetables.forEach((vegetable) => {
      totalYield += getYieldForCrop(vegetable)
    });
    return totalYield;
  } else {
  //total yield WITH environmental factors
    farmYield.vegetables.forEach((vegetable) => {
      totalYield += Math.round(
        getYieldForCrop(vegetable, factor)
      )
    });
    return totalYield;
  }
};

// 4. Calculate the cost for a crop
const getCostsForCrop = (vegetables) =>
  vegetables.sowingPrice * vegetables.plantsPerCrop * vegetables.numCrops;

// 5.Calculate the revenue for a crop (without environmental factors)
const getRevenueForCrop = (vegetables, factors) => {
let revenue = 0;
  if(!factors) {
    revenue = vegetables.salePrice *
    (vegetables.yield * vegetables.plantsPerCrop * vegetables.numCrops);
    return revenue;
  }else{
  //revenue for a crop WITH environmental factors    
    
  }
};  

// 6. Calculate the profit for a crop (without environmental factors)
const getProfitForCrop = (vegetables) => {
  return getRevenueForCrop(vegetables) - getCostsForCrop(vegetables);
};

// 7. Calculate the profit for multiple crops (without environmental factors)
const getTotalProfit = (crops) => {

  const profitPerCrop = crops.map(getRevenueForCrop(crops)); //push the profit of each crop into the array

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
  // getCostsForCrop,
  // getRevenueForCrop,
  //getProfitForCrop,
  //getTotalProfit,
};
