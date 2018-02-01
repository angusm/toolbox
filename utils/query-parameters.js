const MAPPINGS = [
  [/ /g, '%20'],
  [/[\[\]]/g, '\\$&'],
];

class QueryParameters {
  static getParameterByName(rawName, urlParam = null) {
    console.log(QueryParameters.getParameterByName_(rawName, urlParam));
    return QueryParameters.unescapeParamString_(
      QueryParameters.getParameterByName_(rawName, urlParam));
  }

  static getParameterByName_(rawName, urlParam = null) {
    // Cribbed from https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
    const name = QueryParameters.escapeParamString_(rawName);
    const url = urlParam || window.location.href;
    const parsedName = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + parsedName + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) {
      return null;
    } else if (!results[2]) {
      return '';
    } else {
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
  }

  static setParameterByName(rawName, rawValue, updateOptions = {}) {
    // Cribbed from https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter
    const name = QueryParameters.escapeParamString_(rawName);
    const value = QueryParameters.escapeParamString_(rawValue);
    QueryParameters.deleteParameterByName(name);
    const url = QueryParameters.getUrl_(updateOptions);
    const re = new RegExp('([?&])' + name + '=.*?(&|$)', 'i');
    const separator = url.indexOf('?') !== -1 ? '&' : '?';
    let endResult;
    if (url.match(re)) {
      endResult = url.replace(re, '$1' + name + '=' + value + '$2');
    }
    else {
      endResult = url + separator + name + '=' + value;
    }
    QueryParameters.updateUrl(endResult, updateOptions);
    return endResult;
  }

  static deleteParameterByName(rawName, updateOptions = {}) {
    const name = QueryParameters.escapeParamString_(rawName);
    const url = QueryParameters.getUrl_(updateOptions);
    const re = new RegExp('([?&])' + name + '=.*?(&|$)', 'i');
    let endResult;
    if (url.match(re)) {
      endResult = url.replace(re, '$1$2');
    }
    else {
      endResult = url;
    }
    QueryParameters.updateUrl(endResult, updateOptions);
    return endResult;
  }

  static escapeParamString_(rawKey) {
    return MAPPINGS.reduce(
      (key, [find, sub]) => key.replace(find, sub),
      rawKey);
  }

  static unescapeParamString_(rawKey) {
    return MAPPINGS.reduce(
      (key, [sub, find]) => key.replace(find, sub),
      rawKey);
  }

  static getUrl_({urlParam = null} = {}) {
    return urlParam || window.location.href;
  }

  static updateUrl(fullUrl, {urlParam = null, reload = false} = {}) {
    if (urlParam) {
      return;
    }

    const queryParams = fullUrl.split(window.location.pathname)[1];

    if (!reload) {
      window.history.pushState(
        {'path': window.location.origin + window.location.pathname},
        '',
        queryParams);
    } else {
      window.location.href =
        [window.location.origin, window.location.pathname, queryParams]
          .join('');
    }
  }
}

module.exports = QueryParameters;
