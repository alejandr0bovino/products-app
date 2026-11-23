import formatPrice from "./formatPrice";

const SumTotalOrder = (cart) => {
  return cart.reduce(
    (accumulator, currentValue) => accumulator + formatPrice(currentValue.price),
    0
  );
};

export default SumTotalOrder