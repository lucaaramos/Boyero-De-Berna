function generateRandomIntegers(max) {
    let primero = Math.floor(Math.random()* (max - 0 + 1)) + 0;
    const randomIntegers = [primero];
    let length = max >= 4 ? 4 : max; 
    for (let i = 0; randomIntegers.length < length ; i++) {
        const randomInteger = Math.floor(Math.random() * (max - 0 + 1)) + 0;
        if(!randomIntegers.includes(randomInteger)){
            randomIntegers.push(randomInteger);
        }
    }
    return randomIntegers;
}

module.exports = generateRandomIntegers;