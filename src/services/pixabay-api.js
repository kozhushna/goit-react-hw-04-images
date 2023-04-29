import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34313610-1e4a8498015aaf70caf78cfd3';

async function getImages(searchQuery, page, pageSize) {
  const { data } = await axios.get(BASE_URL, {
    params: {
      q: searchQuery,
      page: page,
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: pageSize,
    },
  });

  return {
    total: data.totalHits,
    images: data.hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      tags,
    })),
  };
}

export default getImages;
