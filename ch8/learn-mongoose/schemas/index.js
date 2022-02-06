const mongoose = require('mongoose');

const connect = () => {
    if(process.env.NODE_ENV != 'production') {
        mongoose.get('debug', true);
    }
    mongoose.connect('mongodb://rmw:rmwkey0129@localhost:27017/admin', {
        dbName: 'nodejs',
    }, (error) => {
        if(error) console.log('mongodb 연결 err: ', error);
        else console.log('mongodb 연결 성공');
    });
};
mongoose.connection.on('error', (error) => {
    console.log('mongodb 연결 err: ', error);
})
mongoose.connection.on('disconnected', () => {
    console.log('mongodb 연결이 끊어졌습니다. 연결을 재시도 합니다.');
    connect();
});

module.exports = connect;