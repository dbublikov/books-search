import axios from 'axios';

const API_KEY = 'AIzaSyB0Gf_r2La1jo5bMrpUzgVaQqHkxqS05-A';

const baseUrl = 'https://www.googleapis.com/books/v1/volumes';

const getBooks = `${baseUrl}?q=subject:art&orderBy=newest&maxResults=12&key=${API_KEY}`;

export const initLoad = async () => {
  const res = await axios.get(getBooks);
  // console.log(res)
  if (res.isAxiosError) {
    throw new Error('Can\'t fetch');
  }
  return res;
};

export const loadDetails = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`);
  if (res.isAxiosError) {
    throw new Error('Can\'t fetch');
  }
  return res;
};
