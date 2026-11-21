const SumTotalOrder = (cart) => {
  const sum = cart.reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue.price || 0),
    0
  );

  return sum.toFixed(2);
};

export default SumTotalOrder