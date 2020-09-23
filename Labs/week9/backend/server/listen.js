module.exports = (http) => {
    http.listen( 3000, () => {
        let d = new Date();
        let h = d.getHours();
        let m = d.getMinutes();

        console.log('Server has been started at ' + h + ':' + m);
        console.log("Server listening on port: 3000");
    });
};