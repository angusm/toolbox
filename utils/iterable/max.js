function max(iterable, scoreFn) {
    return iterable.reduce(([result, maxScore], value) => {
        const score = scoreFn(value);
        if (
            (result === undefined && maxScore === undefined) ||
            maxScore < score
        ) {
            return [value, score];
        } else {
            return [result, maxScore];
        }
    }, [undefined, undefined])[0];
}

module.exports = max;
