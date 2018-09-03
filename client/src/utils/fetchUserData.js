import { doFetch } from './doFetch';

export const fetchUserData = async () => await doFetch('/api/users');
