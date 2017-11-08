function zip() {
    return [...arguments].reduce(
        (result, list) => {
            list.forEach(
                (listItem, index) => {
                    result[index] = [...(result[index] || []), listItem]});
            return result;
        },
        []
    );
}

module.exports = zip;