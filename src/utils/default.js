import { openDB, addData, getCurrentTime } from './DB'

export function initDB() {
    openDB('stulist', 1).then((db) => {
        db = db
        console.log(db);

        //插入数据,自定义五个初始数据
        let data = [{
            uuid: 1,
            name: '小明',
            age: 19,
            college: '自动化',
            time: getCurrentTime(),
            tel: '',
            gender: '',
            address: '',
            desc: ''
        },
        {
            uuid: 2,
            name: '小王',
            age: 20,
            college: '计算机',
            time: getCurrentTime(),
            tel: '',
            gender: '',
            address: '',
            desc: ''
        },
        {
            uuid: 3,
            name: '小红',
            age: 18,
            college: '传媒',
            time: getCurrentTime(),
            tel: '',
            gender: '',
            address: '',
            desc: ''
        },
        {
            uuid: 4,
            name: '小刚',
            age: 20,
            college: '通信',
            time: getCurrentTime(),
            tel: '',
            gender: '',
            address: '',
            desc: ''
        },
        {
            uuid: 5,
            name: '小李',
            age: 21,
            college: '经管',
            time: getCurrentTime(),
            tel: '',
            gender: '',
            address: '',
            desc: ''
        }
        ]
        //讲数据插入到列表当中
        for (let i = 0; i < 5; i++) {
            addData(db, 'studentsMessage', data[i])
        }
        db.close();

    })


}
