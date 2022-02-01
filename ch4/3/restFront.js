async function getUser() {
    try {
        const res = await axios.get('/users');
        const users = res.data;
        const list = document.getElementById('list');
        list.innerHTML = '';
        Object.keys(users).map(function (key) {
            const userDiv = document.createElement('div');
            const span = document.createElement('span');
            span.textContent = users[key];
            const edit = document.createElement('button');
            edit.textContent = '수정';
            edit.addEventListener('click', async () => {
                const name = prompt('바꿀 이름을 선택하세요');
                if(!name) {
                    return alert('이름을 반드시 입력해야 합니다.');
                }
                try {
                    await axios.put('/user/'+key, {name});
                    getUser();
                }
                catch(e1) {
                    console.log('err1: ', e1);
                }
            });
            const remove = document.createElement('button');
            remove.textContent = '삭제';
            remove.addEventListener('click', async () => {
                try {
                    await axios.delete('/user/'+key);
                    getUser();
                }
                catch(e2) {
                    console.log('err2: ', e2);
                }
            });
            userDiv.appendChild(span);
            userDiv.appendChild(edit);
            userDiv.appendChild(remove);
            list.appendChild(userDiv);
            console.log('result: ', res.data);
        })
    }
    catch(e) {
        console.log('err: ', e);
    }
}

window.onload = getUser; // 화면 로딩시 getUser 호출
// 등록 버튼 클릭
document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = e.target.username.value;
    if(!name) return alert('이름을 입력하세요');
    
    try {
        await axios.post('/user', {name});
        getUser();
    }
    catch(e) {
        console.log('submit error: ', e);
    }
    e.target.username.value = '';
});