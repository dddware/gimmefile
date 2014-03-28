module.exports = function(statusCode)
{
    Error.call(this);
    this.message = 'suckmypenis';
    this.statusCode = parseInt(statusCode);
};