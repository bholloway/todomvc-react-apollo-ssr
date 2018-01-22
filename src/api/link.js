import {stringify} from 'query-string';
import {createHttpLink as apolloHttpLink} from 'apollo-link-http';

// use GET instead of POST
// https://www.apollographql.com/docs/link/links/http.html#get-request
export const createHttpLink = ({fetch, ...rest}) =>
  apolloHttpLink({
    ...rest,
    headers: {accept: 'application/json'},
    fetchOptions: {method: 'GET'},
    fetch: (uri, options) => {
      const {body, headers, ...otherOptions} = options;
      const {'content-type': _contentType, ...otherHeaders} = headers;
      const obj = JSON.parse(body);

      // remove empty objects which do not encode well
      const safeObj = Object.keys(obj)
        .filter((k) => !!obj[k])
        .filter((k) => typeof obj[k] !== 'object' || Object.keys(obj[k]).length > 0)
        .reduce((accumulator, k) => ({[k]: obj[k], ...accumulator}), {raw: true});

      const queryString = stringify(safeObj);

      return fetch(`${uri}?${queryString}`, {headers: otherHeaders, ...otherOptions});
    }
  });
