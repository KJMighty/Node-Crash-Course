const url = require('url');

const myUrl = new URL('https://mywebsite.com/hello.html?id=100&status=active');

//Serialized URL
console.log(myUrl.href);
console.log(myUrl.href.toString());

//Host (root domain)
console.log(myUrl.host);

//Hostname (doesn't get port)
console.log(myUrl.hostname);

//Pathname
console.log(myUrl.pathname);

//Serialized query
console.log(myUrl.search);

//Params object
console.log(myUrl.searchParams);

//Add Param
myUrl.searchParams.append('abc', 123);
console.log(myUrl.searchParams);

//Loop through Params
myUrl.searchParams.forEach((value, name) => {
    console.log(`${name}: ${value}`);
})