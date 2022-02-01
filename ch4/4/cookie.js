const http = require('http');

http.createServer((req, res) => {
    console.log('url: ', req.url);
    console.log('cookie: ', req.headers.cookie);
    res.writeHead(200, {'Set-Cookie' : 'mycookie=test'});
    res.end('hello cookie');

})
.listen(8083, () => {
    console.log('8083번 포트에서 서버에서 대기중입니다.');
})