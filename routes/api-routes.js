

module.exports = function(app) {
    app.post("/api/poststring", function(req, res) {
        console.log(req.body)
    });



};
