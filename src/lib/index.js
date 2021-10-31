import moment from "moment";
import {
  perEveryDayMiles,
  perEveryDecreased,
  per2DaysDecreased,
} from "../constants";

/**
 * calculate number of days
 * @params date array
 * @return absolute value like 1
 */
export const numberOfDays = (from_to_date) => {
  const dateFormat = "YYYY-MM-DD";
  var start = moment(from_to_date[0], dateFormat);
  var end = moment(from_to_date[1], dateFormat);
  //Difference in number of days
  return Math.abs(moment.duration(start.diff(end)).asDays()) + 1;
};

/**
 * products set local storage
 * @params products array
 * @return undefined
 */
export const setDataInlocalStorage = (data) => {
  //set items in local storage
  localStorage.setItem("products", JSON.stringify(data));
};

/**
 * calculate discount
 * @params price,discount
 * @return discount price
 */
export const discountCalculate = (price, discount) => {
  return discount > 0 ? (price / 100) * discount : 0;
};

/**
 * products get from local storage
 * @params
 * @return products array
 */
export const getDataInlocalStorage = () => {
  //retrieve items from local storage
  return JSON.parse(localStorage.getItem("products")) || [];
};

/**
 * calculate mileage to price
 * @params use mileage, price
 * @return price
 */
export const calculateMileageToPrice = (use_mileage, price) => {
  return price * (use_mileage / perEveryDayMiles);
};

/**
 * calculate mileage to count days
 * @params use mileage
 * @return days like 2
 */
export const calculateMileageToCountDays = (use_mileage) => {
  return use_mileage / perEveryDayMiles;
};

/**
 * calculate durability
 * @params count days,minimum rent period
 * @return number like 2
 */
export const calculateDurability = (countDays, minimum_rent_period) => {
  return minimum_rent_period === perEveryDecreased
    ? countDays * perEveryDecreased
    : countDays * per2DaysDecreased;
};

/**
 * products Filtaring
 * @params products array,addType
 * @return products array
 */
export const productsFiltaring = (products, addType) => {
  // product must have durability more than 0
  let productList = products.filter((item) => item.durability > 0);

  if (addType === "booking") {
    // for booking product must have availability=true
    productList = productList.filter((item) => item.availability === true);
  }
  return productList;
};
