const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
    try {
        console.log('req.method: ', req.method);
        console.log('req.url: ', req.url);
        if(req.method == 'GET') {
            switch(req.url) {
                case '/':
                    const data = await fs.readFile('./restFront.html');
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    return res.end(data);
                case '/about':
                    const data = await fs.readFile('./about.html');
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    return res.end(data);
                default:
                    break;
            }
            try {
                const data = await fs.readFile(`.${req.url}`);
                return res.end(data);
            }
            catch(e) {
                console.log('404err: ', e); // 404 에러 발생
            }
        }
        res.writeHead(404);
        return res.end('NOT FOUND');
    }
    catch(e) {
        console.log('error: ', e);
        res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(e.message);
    }
})
.listen(8082, () => {
    console.log('8082 포트에서 서버 대기 중입니다.');
})