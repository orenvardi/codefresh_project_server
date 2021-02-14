var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {  

    app.get('/containers/', (req, res) => {
        db.collection("containers").find({}).toArray((err, item) => {
            if (err) {        
                res.send({'error':'An error has occurred'});      
            } else {        
                res.send(item);      
            }    
        });  
    });

    app.delete('/containers/:id', (req, res) => {    
        const id = req.params.id;    
        const details = { '_id': new ObjectID(id) };   
        db.collection('containers').deleteOne(details, (err, item) => {      
            if (err) {        
                res.send({'error':'An error has occurred'});      
            } else {        
                res.send('Container ' + id + ' deleted!');      
            }     
        });  
    });
}