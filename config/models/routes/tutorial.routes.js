module.exports = app => {
    const tutorials = require("./controllers/tutorial.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/create", tutorials.create);
  
    // Retrieve all Tutorials
    router.get("/getAll", tutorials.findAll);
  
    // Retrieve all published Tutorials
    
  
    // Retrieve a single Tutorial with id
    router.get("/getOne", tutorials.findOne);
  
    // Update a Tutorial with id
    router.put("/update", tutorials.update);
  
    // Delete a Tutorial with id
    router.delete("/deleteOne", tutorials.delete);
  
    // Delete all Tutorials
    router.delete("/deleteAll", tutorials.deleteAll);
  
    app.use('/api/tutorials', router);
  };

  