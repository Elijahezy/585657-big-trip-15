const calculateCostInfo = (events) =>
  events.map((event) => event.price)
    .reduce((a, b) => a + b);

const showCostInfo = (events) => (
  `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${calculateCostInfo(events)}</span>
</p>`
);

export { showCostInfo };
