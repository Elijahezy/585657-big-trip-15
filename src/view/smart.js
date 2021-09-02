import Abstract from './abstract';

export default class Smart extends Abstract {
  constructor() {
    super();
    this._data = {};
  }

  updateElement() {
    const prevEvent = this.getElement();
    const parent = prevEvent.parentElement;
    this.removeElement();

    const newEvent = this.getElement();

    parent.replaceChild(newEvent, prevEvent);

    this.restoreHandlers();
  }

  updateData(update) {
    if(!update) {
      return;
    }

    this._data = Object.assign(
      {},
      this._data,
      update,
    );

    this.updateElement();
  }

  restoreHandlers() {
    throw new Error('Problems in restoring');
  }
}
