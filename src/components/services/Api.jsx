import axios from "axios"
import PropTypes from 'prop-types'

axios.defaults.baseURL = 'https://pixabay.com//api';
const API_KEY = '33045436-8e58141e6d6ddbbbde7b75c75';

export const getImages = async (query, page) => {
  const { data } = await axios.get('/', {
    params: {
      key: API_KEY,
      image_type: "photo",
      orientation: 'horizontal',
      q: query,
      page: page,
      per_page: 12,
    }
  })
  return data;
}

getImages.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
}
