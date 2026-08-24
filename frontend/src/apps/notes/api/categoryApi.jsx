const API_URL = '/api/notes/categories/';
    
function createRequest(method, url, data = null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Accept', 'application/json');

    if (data !== null) {
      xhr.setRequestHeader('Content-Type', 'application/json');
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;

      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = xhr.status === 204 ? null : JSON.parse(xhr.responseText);
          resolve(response);
        } catch (parseError) {
          reject(parseError.message);
        }
      } else {
        reject(`HTTP error! status: ${xhr.status}`);
      }
    };

    xhr.onerror = () => reject('Network error');

    xhr.send(data !== null ? JSON.stringify(data) : null);
  });
}

export const categoryApi = {
  getAll() {
    return createRequest('GET', API_URL);
  },

  create(category) {
    return createRequest('POST', API_URL, category);
  },

  update(id, category) {
    return createRequest('PATCH', `${API_URL}${id}/`, category);
  },

  delete(id) {
    return createRequest('DELETE', `${API_URL}${id}/`);
  },
};
