import { showEditModule } from '../view/event-edit';
import { render, events } from './render';

const rollUpBtn = document.querySelectorAll('.event__rollup-btn');
const liList = document.querySelectorAll('.trip-events__item');


rollUpBtn.forEach((item, i) => {
  const currentItem = item;
  const onRollUpBtnClose = () => {
    const closeBtn = document.querySelector('.event--edit .event__rollup-btn');
    closeBtn.addEventListener('click', () => { document.querySelector('.event--edit').remove();
      liList[i].querySelector('.event').insertAdjacentElement('beforeend', currentItem);
    });

  };
  const onRollUpBtnOpen = () => {
    render(liList[i], 'afterend', showEditModule(events[i]));
    item.remove();
    onRollUpBtnClose();
  };
  item.addEventListener('click', onRollUpBtnOpen);
});
