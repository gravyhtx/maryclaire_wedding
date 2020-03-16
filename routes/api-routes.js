// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/posts", function(req, res) {
    // Add sequelize code to find all posts, and return them to the user with res.json
    db.Post.findAll({})
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Get route for returning posts of a specific guest
  app.get("/api/posts/guest/:guest", function(req, res) {
    // Add sequelize code to find all posts where the guest is equal to req.params.guest,
    // return the result to the user with res.json
      db.Post.findOne({where: {
        guest: req.params.guest
      }}).then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // Get route for returning posts of a specific date
//   app.get("/api/posts/today/:today", function(req, res) {
//     // Add sequelize code to find all posts where the date is equal to req.params.today,
//     // return the result to the user with res.json
//       db.Post.findOne({where: {
//         today: req.params.today
//       }}).then(function(dbPost) {
//         res.json(dbPost);
//       });
//   });

  // Get route for retrieving a single post
  app.get("/api/posts/:id", function(req, res) {
    // Add sequelize code to find a single post where the id is equal to req.params.id,
    // return the result to the user with res.json
    db.Post.findOne({
      where: {id: req.params.id
      }}).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // POST route for saving a new post
  app.post("/api/posts", function(req, res) {
    // Add sequelize code for creating a post using req.body,
    // then return the result using res.json
    const {guest, message} = req.body
    db.Post.create({
      guest,
      message,
    }).then(function(dbPost) {
      // We have access to the new Post as an argument inside of the callback function
      res.json(dbPost);
    })
      .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });

  // DELETE route for deleting posts
  // NOT BEING USED FOR NOE
//   app.delete("/api/posts/:id", function(req, res) {
//     // Add sequelize code to delete a post where the id is equal to req.params.id, 
//     // then return the result to the user using res.json
//     db.Post.destroy({
//       where: {
//         id: req.params.id
//       }
//     }).then(function(dbPost) {
//       res.json(dbPost);
//     });
//   });

  // PUT route for updating posts
  app.put("/api/posts", (req, res) => {
    // Add code here to update a post using the values in req.body, where the id is equal to
    // req.body.id and return the result to the user using res.json
    db.Post.update({
    guest: req.body.guest,
    message: req.body.message,
    // today: req.body.today
    }, {
      where: {
        id: req.body.id
      }
    }).then((dbPost) => {
      res.json(dbPost);
    })
      .catch((err) => {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
    });
};
