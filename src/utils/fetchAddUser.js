export const fetchAddUser = async user => {
  const url = 'http://localhost:3000/api/users/new';
  const options = {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' }
  };
  await fetch(url, options);
};
