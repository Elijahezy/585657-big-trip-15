import AbstractView from './abstract';
import { MenuItem } from '../consts';

const createSiteMenuTemplate = () =>
  (`<nav class="trip-controls__trip-tabs  trip-tabs">
<a class="trip-tabs__btn" href="#" data-menu-type="${MenuItem.TABLE}">Table</a>
<a class="trip-tabs__btn" href="#" data-menu-type="${MenuItem.STATS}">Stats</a>
</nav>`);

export default class SiteMenu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.menuType);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`[data-menu-type="${menuItem}"]`);

    if (item !== null) {
      item.classList.add('trip-tabs__btn--active');
    }
  }

  resetMenuItem(menuItem) {
    const item = this.getElement().querySelector(`[data-menu-type="${menuItem}"]`);

    if (item !== null) {
      item.classList.remove('trip-tabs__btn--active');
    }
  }
}
