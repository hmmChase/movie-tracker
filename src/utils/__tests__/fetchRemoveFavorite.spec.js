import { fetchRemoveFavorite } from '../fetchRemoveFavorite';

describe('fetchRemoveFavorite', () => {
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
    const user_id = 1;
    const movie_id = 5;
    const url = `http://localhost:3000/api/users/${user_id}/favorites/${movie_id}`;
    const options = { method: 'DELETE' };

    await fetchRemoveFavorite(user_id, movie_id);

    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenLastCalledWith(url, options);
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
    await expect(fetchRemoveFavorite()).rejects.toEqual(expected);
  });

  it('throws an error if fetch fails', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.reject(Error('mock error')));
    let expected = Error('Network request failed. (error: mock error)');

    await expect(fetchRemoveFavorite()).rejects.toEqual(expected);
  });
});