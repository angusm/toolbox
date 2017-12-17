const getVisibleDistanceBetweenElements = require('./get-visible-distance-between-elements');

function getClosestToTopWithoutGoingOver(elements, container = null) {
    const distances =
      [...elements].map(
      (element) => [
        element, getVisibleDistanceBetweenElements(element, container).y]);
    const absDistances =
      distances.map(
        ([element, distance]) => [element, distance, Math.abs(distance)]);

    const sortedDistances =
      absDistances.sort(([eA, dA, adA], [eB, dB, adB]) => adA - adB);
    const distancesBelowTop =
      sortedDistances.filter(([e, distance, ad]) => distance >= 0);

    return distancesBelowTop.length ?
      distancesBelowTop[0] && distancesBelowTop[0][0] :
      sortedDistances[0] && sortedDistances[0][0];
}

module.exports = getClosestToTopWithoutGoingOver;
