import { fetchMovieData, cleanMovieData } from '../fetchMovieData';
import { doFetch } from '../doFetch';

jest.mock('../doFetch');

describe('fetchMovieData', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve({ data: 'mock data' })
      })
    );
  });

  it.skip('calls do fetch', () => {
    const mockDirtyMovieData = { results: 'for sale' };
    doFetch.mockImplementation(() => {
      return Promise.resolve(mockDirtyMovieData);
    });
    cleanMovieData = jest.fn();
    fetchMovieData();

    expect(doFetch).toHaveBeenCalledTimes(1);
  });

  it.skip('returns the correct data', async () => {
    const mockDirtyMovieData = { results: 'anything' };
    doFetch.mockImplementation(() => {
      return Promise.resolve(mockDirtyMovieData);
    });
    expect(fetchMovieData()).toEqual('anything');
  });
});