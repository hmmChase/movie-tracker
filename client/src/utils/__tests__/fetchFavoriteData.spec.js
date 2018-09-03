import { fetchFavoriteData } from '../fetchFavoriteData';
import { doFetch } from '../doFetch';

jest.mock('../doFetch');

describe('fetchFavoriteData', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve({ data: 'mock data' })
      })
    );
  });

  it('calls do fetch', () => {
    const mockFavoriteList = { data: 'anything' };
    doFetch.mockImplementation(() => {
      return Promise.resolve(mockFavoriteList);
    });
    fetchFavoriteData();
    expect(doFetch).toHaveBeenCalledTimes(1);
  });

  it('returns the correct data', async () => {
    const mockFavoriteList = { data: 'anything' };
    doFetch.mockImplementation(() => {
      return Promise.resolve(mockFavoriteList);
    });
    await expect(fetchFavoriteData()).resolves.toEqual('anything');
  });
});