module.exports = function() {

    this.After(function() {
        browser.execute(function () {
        localStorage.clear();
        sessionStorage.clear();
        });
    });

}
