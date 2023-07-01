
const User = require("../../../models/tutorial.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Tutorial
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password 
    });
  
    // Save Tutorial in the database
    User.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user."
        });
      else res.send(data);
    });
  };


  exports.findAll = (req, res) => {
    const title = req.query.title;
  
    User.getAll(title,function (err, data) {
        if (err)
          res.status(500).send({
            message: err.message || "Some error occurred while retrieving tutorials."
          });
        else res.send(data);
      });
  };
  
  
  exports.findOne = (req, res) => {
    User.findById(req.body.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tutorial with id ${req.body.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Tutorial with id " + req.body.id
          });
        }
      } else res.send(data);
    });
  };

  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
  
    User.updateById(
      req.body.id,
      new User(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Tutorial with id ${req.body.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Tutorial with id " + req.body.id
            });
          }
        } else res.send(data);
      }
    );
  };

  exports.delete = (req, res) => {
    User.remove(req.body.id, (err, data) => {
      if (err) {
       
            message: "Could not delete Tutorial with id " + req.body.id
          
        
      } else res.send({ message: `Tutorial was deleted successfully!` });
    });
  };
  
  exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      else res.send({ message: `All Tutorials were deleted successfully!` });
    });
  };