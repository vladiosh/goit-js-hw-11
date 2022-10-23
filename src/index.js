import './css/styles.css';
import { PixabayAPI } from './PixabayAPI';
import { createMarkup } from './createMarkup';
import { refs } from './refs';
import Notiflix from 'notiflix';

const pixabay = new PixabayAPI();

refs.searchFormRef.addEventListener('submit', handleSubmit);
refs.loadMoreBtnRef.addEventListener('click', onLoadMoreClick);

async function handleSubmit(evt) {
  evt.preventDefault();

  const {
    elements: { searchQuery },
  } = evt.currentTarget;

  const query = searchQuery.value.trim().toLowerCase();
  if (!query) {
    return;
  }

  pixabay.searchQuery = query;
  clearPage();
  refs.loadMoreBtnRef.classList.add('visually-hidden');

  try {
    const { hits, total } = await pixabay.getPhotos();
    if (hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    const markup = createMarkup(hits);
    refs.listRef.insertAdjacentHTML('beforeend', markup);

    pixabay.calculateTotalPages(total);
    Notiflix.Notify.success(`Hooray! We found ${total} images.`, {
      timeout: 1000,
      position: 'left-top',
    });
    // console.log(pixabay);

    if (pixabay.isShowLoadMore) {
      refs.loadMoreBtnRef.classList.remove('visually-hidden');
    }
  } catch (error) {
    console.log(error);
    clearPage();
  }
}

function onLoadMoreClick() {
  pixabay.incrementPage();

  if (!pixabay.isShowLoadMore) {
    refs.loadMoreBtnRef.classList.add('visually-hidden');
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }

  pixabay
    .getPhotos()
    .then(({ hits }) => {
      const markup = createMarkup(hits);
      refs.listRef.insertAdjacentHTML('beforeend', markup);
    })
    .catch(error => {
      console.log(error);
      clearPage();
    });
}

function clearPage() {
  pixabay.resetPage();
  refs.listRef.innerHTML = '';
}
