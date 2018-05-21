export const fetchAddUser = async user => {
  try {
    const url = 'http://localhost:3000/api/users/new';
    const options = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    response;
  } catch (error) {
    throw new Error(`Network request failed. (error: ${error.message})`);
  }

};
