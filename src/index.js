import './css/styles.css';
import { PixabayAPI } from './PixabayAPI';

const pixabay = new PixabayAPI();

const refs = {
  searchFormRef: document.querySelector('.js-search-form'),
  listRef: document.querySelector('.js-gallery'),
  loadMoreBtnRef: document.querySelector('.load-more'),
};

refs.searchFormRef.addEventListener('submit', handleSubmit);

function handleSubmit(evt) {
  evt.preventDefault();

  const {
    elements: { searchQuery },
  } = evt.currentTarget;

  const query = searchQuery.value.trim().toLowerCase();
  if (!query) {
    return;
  }

  pixabay.getPhotos(query).then(({ hits }) => {
    const markup = createMarkup(hits);
    refs.listRef.insertAdjacentHTML('beforeend', markup);
  });
}

function createMarkup(photos) {
  return photos
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
      <a class='link' href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width='200' height='140' />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
   </a>
  </div>`;
      }
    )
    .join('');
}
