var ObjectID = require('mongodb').ObjectID;/*maybe not necessary*/

module.exports = function(app, db) {  

    app.get('/logger/', (req, res) => {    
        db.collection("logger").distinct('containerName', (err, items) => {
            if (err) {        
                res.send({'error':'An error has occurred'});      
            } else {        
                res.send(items);      
            }    
        });  
    });

    app.get('/logger/:name', (req, res) => {   
        const name = req.params.name;
        const details = { 'containerName': name };   
        
          db.collection("containers").updateOne(
            { 'containerName': name },
            { $inc: {'useCounter': 1} },
            { upsert: true },
            (err, item) => {
              if (err) {
                res.send({ error: "An error has occurred" });
              }
            }
          );

        db.collection('logger').find(details).toArray((err, items) => {
            if (err) {        
                res.send({'error':'An error has occurred'});      
            } else {        
                res.send(items);      
            }    
        });  
    });
    
    app.get('/logger/:name/:type', (req, res) => {  
        const name = req.params.name;
        const type = req.params.type;
        const details = { 'containerName': name, 'type': type};    
        
        db.collection("containers").updateOne(
            { 'containerName': name },
            { $inc: {'useCounter': 1} },
            { upsert: true },
            (err, item) => {
              if (err) {
                res.send({ error: "An error has occurred" });
              }
            }
          );
        
        db.collection('logger').find(details).toArray((err, item) => {
            if (err) {        
                res.send({'error':'An error has occurred'});      
            } else {        
                res.send(item);      
            }    
        });  
    });
    
        
    // app.get('/logger/:id', (req, res) => {    
    //     const id = req.params.id;
    //     const details = { 'containerId': id };    
    //     db.collection('logger').find(details).toArray((err, items) => {
    //         if (err) {        
    //             res.send({'error':'An error has occurred'});      
    //         } else {        
    //             res.send(items);      
    //         }    
    //     });  
    // });

    // app.get('/logger/:id/:type', (req, res) => {  
    //     const id = req.params.id;
    //     const type = req.params.type;
    //     const details = { 'containerId': id, 'type': type};    
    //     db.collection('logger').find(details).toArray((err, item) => {
    //         if (err) {        
    //             res.send({'error':'An error has occurred'});      
    //         } else {        
    //             res.send(item);      
    //         }    
    //     });  
    // });
    
    /***********************************************************/
/*     app.post('/logger', (req, res) => { 
        const log = { text: req.body.body, title: req.body.title }; 
        db.collection('logger').insertOne(log, (err, result) => {      
            if (err) {         
                res.send({ 'error': 'An error has occurred '+err });       
            } else {        
                res.send(result.ops[0]);      
            }    
        });  
    }); */
    
    app.delete('/logger/:id', (req, res) => {    
        const id = req.params.id;    
        const details = { '_id': new ObjectID(id) };   
        db.collection('logger').deleteOne(details, (err, item) => {      
            if (err) {        
                res.send({'error':'An error has occurred'});      
            } else {        
                res.send('Note ' + id + ' deleted!');      
            }     
        });  
    });

    app.delete('/logger/', (req, res) => {    
        const id = req.params.id;    
        db.collection('logger').remove((err, item) => {      
            if (err) {        
                res.send({'error':'An error has occurred'});      
            } else {        
                res.send('Notes deleted!');      
            }     
        });  
    });

/*     app.put('/logger/:id', (req, res) => {    
        const id = req.params.id;    
        const details = { '_id': new ObjectID(id) };    
        const log = { $set: {text: req.body.body, title: req.body.title }};    
        db.collection('logger').updateOne(details, log, (err, result) => {      
            if (err) {          
                res.send({'error':'An error has occurred'});      
            } else {          
                res.send(log);      
            }     
        });  
    }); */
};
