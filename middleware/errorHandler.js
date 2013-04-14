module.exports = function(err, req, res, next) {
    if(err) {
        switch(err.name) {
            case 'ValidationError':
                res.send(400, err);
                break;
            case 'CastError':
                res.send(404, 'Not Found');
                break;
            case 'NotFoundError':
                res.send(404, 'Not Found');
                break;
            default:
                res.send(500, 'Server Error');
        }
    }
};
