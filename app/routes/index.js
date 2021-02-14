const logRoutes = require('./logger_routes');
const containerRoutes = require('./container_routes');

//In Express routes are wrapped in a function,
//which takes the Express instance (app) and a
//database as arguments:
module.exports = function(app, db) {  
    logRoutes(app, db);  
    containerRoutes(app, db);  
};

