const getPrice = (price) => {
  return price.toLocaleString('en-US').replaceAll(',', ' ');
};

export default getPrice;
