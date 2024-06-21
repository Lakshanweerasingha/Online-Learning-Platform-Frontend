import axios from '../../axios'; // Adjust the import path as needed

export function Logout() {
  return axios.post('/logout')
    .then(response => {
      // Perform any additional actions after logout (e.g., redirect)
      // Example: window.location.href = '/login';
      return response.data; // Optionally return any data if needed
    })
    .catch(error => {
      console.error('Failed to logout.', error);
      throw error; // Propagate the error for handling in the UI or logging
    });
}
