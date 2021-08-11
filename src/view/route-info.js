const getRouteDestinationList = (events) => {
  const routeNames = events.map((event) => event.destination.name);
  const filteredRouteNames = routeNames.filter((name, index) => routeNames.indexOf(name) === index);
  return filteredRouteNames;
};

const showRouteInfo = (events) => `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${getRouteDestinationList(events)}</h1>

        <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
      </div>

    </section>`;

export { showRouteInfo };

