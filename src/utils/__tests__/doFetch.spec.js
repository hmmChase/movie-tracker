import { doFetch } from '../doFetch';

describe('doFetch', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve({ data: 'mock data' })
      })
    );
  });

  it('calls fetch', async () => {
    await doFetch();

    expect(window.fetch).toHaveBeenCalledTimes(1);
  });

  it('returns response data if response.ok is true', async () => {
    await expect(doFetch()).resolves.toEqual({data: 'mock data'});
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
    await expect(doFetch()).rejects.toEqual(expected);
  });

  it('throws an error if fetch fails', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.reject(Error('mock error')));
    let expected = Error('Network request failed. (error: mock error)');

    await expect(doFetch()).rejects.toEqual(expected);
  });
});