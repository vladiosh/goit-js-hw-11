import './css/styles.css';
import { PixabayAPI } from './PixabayAPI';
import { createMarkup } from './createMarkup';
import { refs } from './refs';

const pixabay = new PixabayAPI();

refs.searchFormRef.addEventListener('submit', handleSubmit);
refs.loadMoreBtnRef.addEventListener('click', onLoadMoreClick);

function handleSubmit(evt) {
  evt.preventDefault();

  const {
    elements: { searchQuery },
  } = evt.currentTarget;

  const query = searchQuery.value.trim().toLowerCase();
  if (!query) {
    return;
  }

  pixabay.searchQuery = query;

  pixabay.getPhotos().then(({ hits }) => {
    const markup = createMarkup(hits);
    refs.listRef.insertAdjacentHTML('beforeend', markup);
  });
}

function onLoadMoreClick() {
  pixabay.incrementPage();

  pixabay.getPhotos().then(({ hits }) => {
    const markup = createMarkup(hits);
    refs.listRef.insertAdjacentHTML('beforeend', markup);
  });
}
