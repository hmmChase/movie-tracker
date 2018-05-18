import { doFetch } from './doFetch';

export const fetchUserData = async () =>
  await doFetch('http://localhost:3000/api/users');
