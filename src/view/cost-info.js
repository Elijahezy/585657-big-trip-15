const calculateCostInfo = (elements) => {
  const values = elements.map((item) => item.price);
  const result = values.reduce((a, b) =>a + b);
  return result;
};

const showCostInfo = (elements) => (
  `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${calculateCostInfo(elements)}</span>
</p>`
);

export { showCostInfo };
