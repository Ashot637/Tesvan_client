const getPrice = (price) => {
  return price.toLocaleString().replaceAll(',', ' ');
};

export default getPrice;
