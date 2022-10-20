export class PixabayAPI {
  #page = 1;
  #searchQuery = '';
  #totalPages = 0;
  #perPage = 40;

  getPhotos() {
    const url = `https://pixabay.com/api/?key=30687510-2718d4bf03f80212b157b4ce9&q=${
      this.#searchQuery
    }&image_type=photo&orientation=horizontal&safesearch=true&per_page=${
      this.#perPage
    }&page=${this.#page}`;

    return fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
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

  calculateTotalPages(total) {
    this.#totalPages = Math.ceil(total / this.#perPage);
  }

  get isShowLoadMore() {
    this.#page < this.#totalPages;
  }
}
