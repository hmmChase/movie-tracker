import { fetchAddFavorite } from '../fetchAddFavorite';

describe('fetchAddFavorite', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve({ data: 'mock data' })
      })
    );
  });

  it('calls fetch with correct params', async () => {
    const url = '/api/users/favorites/new';
    const movie = { title: 'movie' };
    const user_id = 1;
    const options = {
      method: 'POST',
      body: JSON.stringify({
        ...movie,
        user_id
      }),
      headers: { 'Content-Type': 'application/json' }
    };

    await fetchAddFavorite(movie, user_id);

    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith(url, options);
  });

  it('throws an error if response.ok is false', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 500,
        ok: false,
        json: () => Promise.resolve({ data: 'mock data' })
      })
    );

    let expected = Error(`Network request failed. (error: 500)`);
    await expect(fetchAddFavorite()).rejects.toEqual(expected);
  });

  it('throws an error if fetch fails', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.reject(Error('mock error')));
    let expected = Error('Network request failed. (error: mock error)');

    await expect(fetchAddFavorite()).rejects.toEqual(expected);
  });
});