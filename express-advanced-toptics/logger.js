function logger(req, res, next){
    console.log('logging...');
    next();
}

function logger2(req, res, next){
    console.log('logging 2...');
    next();
}

module.exports = {
    logger,
    logger2
}