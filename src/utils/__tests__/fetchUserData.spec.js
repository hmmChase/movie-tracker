import { fetchUserData } from '../fetchUserData';
import { doFetch } from '../doFetch';

jest.mock('../doFetch');

describe('fetchUserData', () => {
  it('calls do fetch', () => {
    fetchUserData();

    expect(doFetch).toHaveBeenCalledTimes(1);
  });
});