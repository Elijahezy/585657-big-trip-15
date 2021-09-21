import SmartView from './smart.js';
import { POINTS } from '../consts.js';
import {
  countEventsPrice,
  countEventsType,
  countEventsDurationInMilliSeconds,
  humanizeDurationOfEvents,
  countEventsInDateRange,
  getDatesInRange,
  getChart
} from '../utils/stats-utils.js';
import flatpickr from 'flatpickr';
import dayjs from 'dayjs';

const DAYS_TO_FULL_WEEK = 6;

const renderMoneyChart = (moneyCtx, events, points, start, end) => {
  const dates = getDatesInRange(start, end);
  const eventsInDateRangeCounts = countEventsInDateRange(dates, events);
  const chart = getChart(moneyCtx, countEventsPrice(eventsInDateRangeCounts, points), points, (value) => `€ ${value}`);
  return chart;
};

const renderTypeChart = (typeCtx, events, points, start, end) => {
  const dates = getDatesInRange(start, end);
  const eventsInDateRangeCounts = countEventsInDateRange(dates, events);
  const chart = getChart(typeCtx, countEventsType(eventsInDateRangeCounts, points), points, (value) => `${value}x`);
  return chart;
};

const renderTimeSpendChart = (typeCtx, events, points, start, end) => {
  const dates = getDatesInRange(start, end);
  const eventsInDateRangeCounts = countEventsInDateRange(dates, events);
  const chart = getChart(typeCtx, countEventsDurationInMilliSeconds(eventsInDateRangeCounts, points), points, (value) => {
    const newValue = humanizeDurationOfEvents(value);
    return newValue;
  });
  return chart;
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
      start: (() => dayjs().subtract(DAYS_TO_FULL_WEEK, 'day').toDate())(),
      end: dayjs().toDate(),
    };

    this._points = POINTS;
    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;

    this._dateChangeHandler = this._dateChangeHandler.bind(this);

    this._setCharts();
    this._setDatepicker();
  }

  removeElement() {
    super.removeElement();


    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;


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
    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;


    const {events, start, end} = this._data;
    const moneyCtx = this.getElement().querySelector('#money');
    const typeCtx = this.getElement().querySelector('#type');
    const timeCtx = this.getElement().querySelector('#time-spend');

    this._moneyChart = renderMoneyChart(moneyCtx, events, this._points,  start, end);
    this._typeChart = renderTypeChart(typeCtx, events, this._points,  start, end);
    this._timeChart = renderTimeSpendChart(timeCtx, events, this._points,  start, end);
  }
}
