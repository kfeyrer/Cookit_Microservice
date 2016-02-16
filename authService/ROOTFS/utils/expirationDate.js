module.exports = function expirationDate(expired) {
    var now = new Date(),
        time = now.getTime(),
        expirationTime = 1000*36000;
    if (expired) {
        now.setTime( time - expirationTime);
    } else {
        now.setTime( time + expirationTime);
    }
    return now.toGMTString();
};