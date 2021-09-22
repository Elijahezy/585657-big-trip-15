import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { MILLISECONDS_IN_DAY, MILLISECONDS_IN_HOUR, MILLISECONDS_IN_MINUTE, UNIX_START_DAY } from '../consts';
import { isDatesEqual } from './event';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);

const filterEmptyEvents = (events) => events.filter((event) => event.length);

const compareEventsWithPoints = (events, point) => {
  const filteredArrays = [];

  events.forEach((array) => array.filter((event) => {
    event.type === point.toLowerCase() ? filteredArrays.push(event) : false;
  }));

  return filteredArrays;
};

export const countEventsPrice = (events, points) => {
  const existingEvents = filterEmptyEvents(events);


  const finalPricesOfEvents = points.map((point) => {
    const comparedEventsWithPoints = compareEventsWithPoints(existingEvents, point);

    return comparedEventsWithPoints.reduce((sum, event) => sum + event.price, 0);
  });

  return finalPricesOfEvents;
};

export const countEventsType = (events, points) => {
  const existingEvents = filterEmptyEvents(events);

  const finalTypesOfEvents = points.map((point) => {
    const comparedEventsWithPoints = compareEventsWithPoints(existingEvents, point);
    return comparedEventsWithPoints.length;
  });

  return finalTypesOfEvents;
};

const getTimeInMilliSeconds = (from, to) => {
  const duration = dayjs(to).diff(dayjs(from), 'millisecond');
  return duration;
};


export const countEventsDurationInMilliSeconds = (events, points) => {
  const existingEvents = filterEmptyEvents(events);

  const finalTypesOfEvents = points.map((point) => {
    const comparedEventsWithPoints = compareEventsWithPoints(existingEvents, point);

    const reducedEventsTime = comparedEventsWithPoints.reduce((sum, event) => {
      const time = getTimeInMilliSeconds(event.start, event.end);
      return sum + time;
    }, 0);

    return reducedEventsTime;
  });

  return finalTypesOfEvents;
};

const getStringFormat = (time) => {
  let formatString;

  switch (true) {
    case time >= MILLISECONDS_IN_DAY:
      formatString = 'DD[D] HH[H] mm[M]';
      break;
    case time >= MILLISECONDS_IN_HOUR:
      formatString = 'HH[H] mm[M]';
      break;
    default:
      formatString = 'mm[M]';
  }

  return formatString;
};

export const humanizeDurationOfEvents = (duration) => {
  const formatString = getStringFormat(duration);
  duration = duration + new Date(duration) * MILLISECONDS_IN_MINUTE;
  return dayjs(duration).subtract(UNIX_START_DAY, 'day').format(formatString);
};

export const countEventsInDateRange = (dates, events) => dates.map((date) =>
  events.filter((event) => isDatesEqual(event.start, date)));


export const getDatesInRange = (dateFrom, dateTo) => {
  const dates = [];
  const stepDate = new Date(dateFrom);

  while (dayjs(stepDate).isSameOrBefore(dateTo)) {
    dates.push(new Date(stepDate));
    stepDate.setDate(stepDate.getDate() + 1);
  }

  return dates;
};


export const getChart = (type, events, points, val) => new Chart(type, {
  plugins: [ChartDataLabels],
  type: 'horizontalBar',
  data: {
    labels: points,
    datasets: [{
      data: events,
      backgroundColor: '#ffffff',
      hoverBackgroundColor: '#ffffff',
      anchor: 'start',
    }],
  },
  options: {
    plugins: {
      datalabels: {
        font: {
          size: 13,
        },
        color: '#000000',
        anchor: 'end',
        align: 'start',
        formatter: val,
      },
    },
    title: {
      display: true,
      text: 'TYPE',
      fontColor: '#000000',
      fontSize: 23,
      position: 'left',
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: '#000000',
          padding: 5,
          fontSize: 13,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
        barThickness: 44,
      }],
      xAxes: [{
        ticks: {
          display: false,
          beginAtZero: true,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
        minBarLength: 50,
      }],
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
  },
});

