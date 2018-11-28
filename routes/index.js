var express = require('express');

const path = require("path");
module.exports = function(app) {
    // Load index page
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, '../public', 'index.html'));
    });

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.status(404);
        res.end();
    });
};
