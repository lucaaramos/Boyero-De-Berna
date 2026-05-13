function generateRandomIntegers(totalItems, requestedAmount) {
    const total = Number(totalItems) || 0;
    const asked = Number(requestedAmount) || 0;

    if (total <= 0 || asked <= 0) return [];

    const length = Math.min(total, asked);
    const randomIntegers = [];

    while (randomIntegers.length < length) {
        const randomInteger = Math.floor(Math.random() * total);
        if (!randomIntegers.includes(randomInteger)) {
            randomIntegers.push(randomInteger);
        }
    }

    return randomIntegers;
}

module.exports = generateRandomIntegers;
