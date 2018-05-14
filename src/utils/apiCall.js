import apiKey from '../private/apiKey';
import { doFetch}  from './doFetch';

const getMovieData = async () => {
  const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=';

  return await doFetch(url+apiKey);
};

export default getMovieData;