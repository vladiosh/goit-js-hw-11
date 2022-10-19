export class PixabayAPI {
  getPhotos(query) {
    const url = `https://pixabay.com/api/?key=30687510-2718d4bf03f80212b157b4ce9&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;

    return fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }
}
