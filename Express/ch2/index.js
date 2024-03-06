const http = require('http');

const data={age:5};
const server =http.createServer((req,res)=>{

    console.log(req.url);
    console.log('server started');
    res.end('<h1>Hello</h1>');
    res.setHeader('DummyHeader','dummy');
    res.end(JSON.stringify(data));

})

server.listen(8080);