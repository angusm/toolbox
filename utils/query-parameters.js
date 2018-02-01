const MAPPINGS = [
  [/ /g, '%20'],
  [/[\[\]]/g, '\\$&'],
];

class QueryParameters {
  static getQueryParams(reload = {}) {
    const url = QueryParameters.getUrl_(reload);
    const queryParamString = url.split('?')[-1];
    return queryParamString.split('&')
      .map((value) => value.split('='))
      .reduce(
        (result, [key, value]) => {
          result[key] = value;
          return result;
        },
        {});
  }

  static getParameterByName(rawName) {
    // Cribbed from https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
    const name = QueryParameters.escapeParamString_(rawName);
    return QueryParameters.unescapeParamString_(
      QueryParameters.getQueryParams()[name]);
  }

  static setParameterByName(rawName, rawValue, reload = false) {
    // Cribbed from https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter
    const queryParams = QueryParameters.getQueryParams(reload);
    const name = QueryParameters.escapeParamString_(rawName);
    queryParams[name] = QueryParameters.escapeParamString_(rawValue);
    return QueryParameters.updateUrl(queryParams, reload);
  }

  static deleteParameterByName(rawName, reload = false) {
    const queryParams = QueryParameters.getQueryParams();
    const name = QueryParameters.escapeParamString_(rawName);
    delete queryParams[name];
    QueryParameters.updateUrl(queryParams, reload);
  }

  static escapeParamString_(rawKey) {
    return MAPPINGS.reduce(
      (key, [find, sub]) => key.replace(find, sub),
      rawKey);
  }

  static unescapeParamString_(rawKey) {
    if (!rawKey) {
      return rawKey;
    }

    return MAPPINGS.reduce(
      (key, [sub, find]) => key.replace(find, sub),
      rawKey);
  }

  static getUrl_() {
    return window.location.href;
  }

  static updateUrl(queryParams, reload = false) {
    const paramsString =
      Object.keys(queryParams)
        .map((key) => [key, queryParams[key]].join('='))
        .join('&');

    if (!reload) {
      window.history.pushState(
        {'path': window.location.origin + window.location.pathname},
        '',
        `?${paramsString}`);
    } else {
      window.location.href =
        [window.location.origin, window.location.pathname, '?', paramsString]
          .join('');
    }
  }
}

module.exports = QueryParameters;
