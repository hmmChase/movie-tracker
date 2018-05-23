import { fetchMovieData, cleanMovieData } from '../fetchMovieData';
jest.mock('../fetchMovieData.js');
import { doFetch } from '../doFetch';
jest.mock('../doFetch');

describe('fetchMovieData', () => {
  it.skip('calls do doFetch', async () => {
    const mockDirtyMovieData = { results: { title: 'mock movie' } };
    doFetch.mockImplementation(() => {
      return Promise.resolve(mockDirtyMovieData);
    });
    await fetchMovieData();

    expect(doFetch).toHaveBeenCalledTimes(1);
  });

  it.skip('calls cleanMovieData', async () => {
    const mockDirtyMovieData = { results: 'anything' };
    doFetch.mockImplementation(() => {
      return Promise.resolve(mockDirtyMovieData);
    });

    expect(cleanMovieData).toHaveBeenCalledTimes(1);
  });
});

describe('cleanMovieData', () => {
  it.skip('returns clean movie data', () => {
    const mockMovieData = [
      {
        id: 1234,
        title: 'mock title',
        poster_path: '/sdfdsaf.png',
        release_date: '12-12-12',
        vote_average: 3,
        overview: 'mock overviewe'
      }
    ];

    cleanMovieData.mockImplementation(mockMovieData => {
      return mockMovieData.map(movie => ({
        movie_id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        overview: movie.overview
      }));
    });

    const results = [
      {
        movie_id: 1234,
        title: 'mock title',
        poster_path: '/sdfdsaf.png',
        release_date: '12-12-12',
        vote_average: 3,
        overview: 'mock overviewe'
      }
    ];

    cleanMovieData(mockMovieData);
    expect(cleanMovieData(mockMovieData)).toEqual(results);
  });
});