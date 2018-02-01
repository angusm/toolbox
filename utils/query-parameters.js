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

  static setParameterByName(name, value, urlParam = null) {
    // Cribbed from https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter
    const url = urlParam || window.location.href;
    const re = new RegExp('([?&])' + name + '=.*?(&|$)', 'i');
    const separator = url.indexOf('?') !== -1 ? '&' : '?';
    let endResult;
    if (url.match(re)) {
      endResult = url.replace(re, '$1' + name + '=' + value + '$2');
    }
    else {
      endResult = url + separator + name + '=' + value;
    }
    if (!urlParam) {
      window.location.href = endResult;
    }
    return endResult;
  }
}

module.exports = QueryParameters;
