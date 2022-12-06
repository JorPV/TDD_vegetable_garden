// 1. Get yield for plant 
const getYieldForPlant = (vegetables, factors) => {
  let getYield;
  // yield with NO environmental factors
  const fullYield = 100;
  if (!factors) {
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

// 2. Get yield for crop,
const getYieldForCrop = (vegetables, factors) => {
  let yieldPerCrop;
  // yield with NO environmental factors
  if (!factors) {
    yieldPerCrop = vegetables.crop.yield * vegetables.numCrops;
    return yieldPerCrop;
  } else {
  // yield WITH environmental factors
    yieldPerCrop = Math.round(
      getYieldForPlant(vegetables.crop.yield, factors) * vegetables.numCrops
    );
    return yieldPerCrop;
  }
};

// 3a. Calculate total yield with 0 amount
// 3b. Calculate total yield with multiple crops
const getTotalYield = (farmYield, factors) => {
  let totalYield = 0;  
  if (!factors) {
    farmYield.vegetables.forEach((veggie) => {
      totalYield += veggie.crop.yield * veggie.numCrops;
    });
    return totalYield;
  } else {
  //total yield WITH environmental factors
    farmYield.vegetables.forEach((veggie) => {
      totalYield = Math.round(
        getYieldForCrop(veggie.crop.yield, factors) * veggie.numCrops
      );
    }).reduce((a, b) => a + b);
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
  getCostsForCrop,
  getRevenueForCrop,
  //getProfitForCrop,
  //getTotalProfit,
};
