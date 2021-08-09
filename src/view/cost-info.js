const calculateCostInfo = (elements) => {
  const values = [];
  elements.forEach((item) => {
    values.push(item.price);
  },
  );
  const value = values.reduce((a,b) => a + b);
  return value;
};

const showCostInfo = (elements) => (
  `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${calculateCostInfo(elements)}</span>
</p>`
);

export { showCostInfo };
