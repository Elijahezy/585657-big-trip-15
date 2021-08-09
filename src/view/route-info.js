const getRouteDestinationList = (elements) => {
  const result = elements.map((item) => item.destination.name);
  const filteredResult = result.filter((item, index) => result.indexOf(item) === index);
  return filteredResult;
};


const showRouteInfo = (events) => `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${getRouteDestinationList(events)}</h1>

        <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
      </div>

    </section>`;

export { showRouteInfo };

