class QueryParameters {
  static getParameterByName(name, urlParam = null) {
    // Cribbed from https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
    const url = urlParam || window.location.href;
    const parsedName = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + parsedName + "(=([^&#]*)|&|#|$)");
    const results = regex.exec(url);
    if (!results) {
      return null;
    } else if (!results[2]) {
      return '';
    } else {
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
  }
}

module.exports = new QueryParameters();
