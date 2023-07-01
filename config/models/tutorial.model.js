const sql = require("./db.js");
const bcrypt = require("bcrypt");


// constructor
const User = function(user) {
  this.name = user.name;
  this.email = user.email;
  this.password = user.password;
};

User.create = (newUser, result) => {
  
  
    bcrypt.hash(newUser.password, 10, function(err, hash) {
        // Store hash in the database
        
   

    
  sql.query("INSERT INTO users (name, email, password) values('"+newUser.name+"','"+ newUser.email+"','"+hash+"')", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
  });
    console.log("created tutorial: ");
    result(null,  "success, created tutorial");
  });
};


User.findById = (id, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = (title, result) => {
    let query = "SELECT * FROM users";
  
   
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("tutorials: ", res);
      result(null, res);
    });
  };



User.updateById = (id, user, result) => {
  
  bcrypt.hash(user.password, 10, function(err, hash) {
    // store hash in the database

  sql.query(
    "UPDATE users SET password = ?, name = ?, email = ? WHERE id = ?",
    [hash, user.name, user.email, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }
    });
      console.log("updated user: ", { id: id, ...user });
      result(null, 'updated successfully');
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result("user not found", null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, "deleted successfully");
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};


module.exports = User;