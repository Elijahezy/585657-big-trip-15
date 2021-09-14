import SmartView from './smart.js';
import { POINTS } from '../consts.js';
import {
  countEventsPrice,
  countEventsType,
  countEventsDurationInMilliSeconds,
  humanizeDurationOfEvents,
  countEventsInDateRange,
  getDatesInRange
} from '../utils/stats-utils.js';
import flatpickr from 'flatpickr';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import dayjs from 'dayjs';

const renderMoneyChart = (moneyCtx, events, points, height, start, end) => {
  const dates = getDatesInRange(start, end);
  const eventsInDateRangeCounts = countEventsInDateRange(dates, events);
  moneyCtx.height = height * points.length;
  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: points,
      datasets: [{
        data: countEventsPrice(eventsInDateRangeCounts, points),
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
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
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
          minBarLength: 100,
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
};

const renderTypeChart = (typeCtx, events, points, height, start, end) =>{
  const dates = getDatesInRange(start, end);
  const eventsInDateRangeCounts = countEventsInDateRange(dates, events);

  typeCtx.height = height * points.length;
  new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: points,
      datasets: [{
        data: countEventsType(eventsInDateRangeCounts, points),
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
          formatter: (val) => `${val}x`,
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
};

const renderTimeSpendChart = (timeCtx, events, points, height, start, end) => {
  const dates = getDatesInRange(start, end);
  const eventsInDateRangeCounts = countEventsInDateRange(dates, events);
  const countedEventsTime = countEventsDurationInMilliSeconds(eventsInDateRangeCounts, points);
  timeCtx.height = height * points.length;

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: points,
      datasets: [{
        data: countedEventsTime,
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
          formatter: function(value) {
            const newValue = humanizeDurationOfEvents(value);
            return newValue;
          },
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
};

const createStatsTemplate = () => `<div class="page-body__container">
  <section class="trip-events  trip-events--hidden">
    <h2 class="visually-hidden">Trip events</h2>
  </section>

  <section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="money" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="type" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="time-spend" width="900"></canvas>
    </div>
  </section>
</div>`;

export default class Stats extends SmartView {
  constructor(events) {
    super();

    this._data = {
      events,
      start: (() => {
        const daysToFullWeek = 6;
        return dayjs().subtract(daysToFullWeek, 'day').toDate();
      })(),
      end: dayjs().toDate(),
    };

    this._points = POINTS;
    this._barHeight = 55;
    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;

    this._dateChangeHandler = this._dateChangeHandler.bind(this);

    this._setCharts();
    this._setDatepicker();
  }

  removeElement() {
    super.removeElement();

    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }

    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  }

  getTemplate() {
    return createStatsTemplate(this._data);
  }

  restoreHandlers() {
    this._setCharts();
    this._setDatepicker();
  }

  _dateChangeHandler([start, end]) {
    if (!start || !end) {
      return;
    }

    this.updateData({
      start,
      end,
    });
  }

  _setDatepicker() {
    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }

    this._datepicker = flatpickr(
      this.getElement().querySelector('.statistics__item'),
      {
        mode: 'range',
        dateFormat: 'j F',
        defaultDate: [this._data.start, this._data.end],
        onChange: this._dateChangeHandler,
      },
    );
  }

  _setCharts() {
    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }

    const {events, start, end} = this._data;
    const moneyCtx = this.getElement().querySelector('#money');
    const typeCtx = this.getElement().querySelector('#type');
    const timeCtx = this.getElement().querySelector('#time-spend');

    this._moneyChart = renderMoneyChart(moneyCtx, events, this._points, this._barHeight, start, end);
    this._typeChart = renderTypeChart(typeCtx, events, this._points, this._barHeight, start, end);
    this._timeChart = renderTimeSpendChart(timeCtx, events, this._points, this._barHeight, start, end);
  }
}
