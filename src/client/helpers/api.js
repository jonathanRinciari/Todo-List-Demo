/**
* Fetches to the backend and directs results to proper function for processing
*
* @param  {string} method - Request method
* @param  {object} data - Todo object
* @param  {function} cb - Callback function for returned data
*/
export function api(method, data, cb) {
  const promise = getApiPromise(method, data);

  promise.then(json => {
    if (typeof cb === 'function') {
      cb(JSON.parse(json));
    }
  })
  .catch(err => {
    console.log('error:', err);
  });
}

/**
 * Completes all active tasks and returns an updated list of tasks
 * @param cb - Callback for returned data
 */
export function completeAllTasks(cb) {
  let url = 'http://localhost:3000/todos/completeAllTasks';
  const options = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  fetch(url, options)
    .then(response => {
      if (response.status >= 400) {
        response.json().then(err => console.error(err.message));
      }
      response.json().then((json) => cb(JSON.parse(json)));
    });
}

/**
 *  Archives all completed tasks and returns an updated list of tasks
 * @param cb - Callback for returned ata
 */
export function archiveAllTasks(cb) {
  let url = 'http://localhost:3000/todos/archiveAllTasks';
  const options = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  fetch(url, options)
    .then(response => {
      if (response.status >= 400) {
        response.json().then(err => console.error(err.message));
      }
      response.json().then((json) => cb(JSON.parse(json)));
    });
}

/**
 * HTML request to the backend
 * @param  {string} method - Request method
 * @param  {object} data - Todo object
 *
 * @returns {promise} - Promise from the fetch request to the backend
 */
export function getApiPromise(method, data) {
  let url = 'http://localhost:3000/todos';
  if (['DELETE', 'PUT'].indexOf(method) !== -1) {
    url += `/${data.id}`;
  }

  const options = {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  if (data) {
    options.body = JSON.stringify({
      data,
    });
  }

  return fetch(url, options)
  .then(response => {
    if (response.status >= 400) {
      return response.json().then(err => Promise.reject(err.message));
    }

    return response.json();
  })
};
