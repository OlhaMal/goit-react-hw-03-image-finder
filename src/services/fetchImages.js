import axios from "axios";

axios.defaults.baseURL = `https://pixabay.com/api/`;

export const fetchImages = async (inputValue, pageNr) => {
  const response = await axios.get(
    `?q=${inputValue}&page=${pageNr}&key=33235528-f77f5559eb18b5179aa92c19b&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data.hits.map(image => {
    return {
      id: image.id,
      webformatURL: image.webformatURL,
      largeImageURL: image.largeImageURL,
      tags: image.tags,
    };
  });
};