class QueryParameters {
  static getParameterByName(name, urlParam = null) {
    // Cribbed from https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
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

  static setParameterByName(name, value, updateOptions = {}) {
    // Cribbed from https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter
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

  static deleteParameterByName(name, updateOptions = {}) {
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
