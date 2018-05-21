import { fetchAddUser } from '../fetchAddUser';

describe('fetchAddUser', () => {
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
    const url = 'http://localhost:3000/api/users/new';
    const user = {name: 'jim'};
    const options = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' }
    };

    await fetchAddUser(user);

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
    await expect(fetchAddUser()).rejects.toEqual(expected);
  });

  it('throws an error if fetch fails', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.reject(Error('mock error')));
    let expected = Error('Network request failed. (error: mock error)');

    await expect(fetchAddUser()).rejects.toEqual(expected);
  });
});