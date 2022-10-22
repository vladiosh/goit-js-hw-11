import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
// axios.defaults.headers.common['Authorization'] =
//   'AUTH_KEY 30687510-2718d4bf03f80212b157b4ce9';
export class PixabayAPI {
  #page = 1;
  #searchQuery = '';
  #totalPages = 0;
  #perPage = 40;
  #params = {
    params: {
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  };

  async getPhotos() {
    const urlAxios = `?key=30687510-2718d4bf03f80212b157b4ce9&q=${
      this.#searchQuery
    }&per_page=${this.#perPage}&page=${this.#page}`;

    const { data } = await axios.get(urlAxios, this.#params);
    return data;
  }

  set searchQuery(newQuery) {
    this.#searchQuery = newQuery;
  }

  get searchQuery() {
    return this.#searchQuery;
  }

  incrementPage() {
    this.#page += 1;
  }

  resetPage() {
    this.#page = 1;
  }

  calculateTotalPages(total) {
    this.#totalPages = Math.ceil(total / this.#perPage);
  }

  get isShowLoadMore() {
    return this.#page < this.#totalPages;
  }
}
