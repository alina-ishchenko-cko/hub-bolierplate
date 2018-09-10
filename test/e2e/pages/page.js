var env = (process.env.CHIMP_ENV).toLowerCase();
var host = 'https://test.ckotech.co/v2/';
function Page () {
    this.title = 'Home Page';
}
Page.prototype.open = function (path) {
	if (env === 'test' || env === 'qa' || env === 'uat') {
		host = 'https://' + env +'.ckotech.co/v2/';
	} else if(env === 'sand') {
		host = 'https://' + env +'.checkout.com/v2/'
	}
	browser.url(host + path);	
}
Page.prototype.moveToElement = function (identifier){
    browser.moveToObject(identifier);
}

module.exports = new Page()
