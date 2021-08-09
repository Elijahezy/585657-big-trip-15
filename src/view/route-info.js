const getRouteDestinationList = (element) => {
  const result = [];
  element.forEach((item) => {
    if (result.includes(item.destination.name)) {
      return;
    }result.push(item.destination.name);

  });

  return result.join(' &nbsp;&mdash;&nbsp; ');
};


const showRouteInfo = (event) => `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${getRouteDestinationList(event)}</h1>

        <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
      </div>

    </section>`;

export { showRouteInfo };

