import toast from 'react-hot-toast';

export const signinFetch = (data) => {
  const response = fetch('/api/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response;
};
