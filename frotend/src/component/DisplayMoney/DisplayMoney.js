// dispaly Money In indian Formate
export const dispalyMoney = function(num) {
  const numFormate = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const arr = numFormate.format(num).split(".", 1);
  return arr[0];
};

// Calculate Discount Percentage
export const calculateDiscount = (discountedPrice, originalPrice) => {
  const disCountPercent = (discountedPrice / originalPrice) * 100;
  return disCountPercent;
};

// calculate Total  Ammount

export const calculateTotal = (arr) => {
  const total = arr.reduce((accum, curr) => accum + curr, 0);
  return total;
};
