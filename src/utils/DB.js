//创建打开数据库
export function openDB(dbName, version = 1) {
    return new Promise((resolve, reject) => {
        //兼容浏览器
        var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
        let db
        //打开数据库,若没有则会创建
        const request = indexedDB.open(dbName, version)
        //数据库打开成功的回调函数
        request.onsuccess = function (event) {
            db = event.target.result//数据库对象
            console.log('数据库打开成功')
            resolve(db)
        }
        //数据库打开失败的回调函数
        request.onerror = function (event) {
            console.log('数据库打开失败');
        }
        //数据库有更新时的回调函数
        request.onupgradeneeded = function (event) {
            //数据库创建或者升级的时候会触发
            console.log('数据库需要更新');
            db = event.target.result
            var objectStore
            //创建存储库-studentsMessage
            objectStore = db.createObjectStore('studentsMessage', {
                keyPath: 'uuid'//主键
                // autoIncrement:true 实现自增自增
            })
            //创建索引，在后面查询数据的时候可以根据索引查
            objectStore.createIndex('uuid', 'uuid', { unique: true })
            objectStore.createIndex('name', 'name', { unique: false })
            objectStore.createIndex('age', 'age', { unique: false })
            objectStore.createIndex('college', 'college', { unique: false })
            objectStore.createIndex('time', 'time', { unique: false })
            objectStore.createIndex('tel', 'tel', { unique: false })
            objectStore.createIndex('gender', 'gender', { unique: false })
            objectStore.createIndex('address', 'address', { unique: false })
            objectStore.createIndex('desc', 'desc', { unique: false })
        }

    })
}

//插入数据库
export function addData(db, storeName, data) {
    var request = db
        .transaction([storeName], 'readwrite') //事务对象 指定表格名称和操作模式（"只读"或"读写"）
        .objectStore(storeName)//仓库对象
        .add(data)//添加数据，必须是对象，以键值对形式
    request.onsuccess = function (event) {
        console.log('数据写入成功');
    }
    request.onerror = function (event) {
        console.log('数据写入失败');
    }
}

// 通过游标查询数据
export function cursorGetData(db, storeName) {
    let list = []
    var store = db
        .transaction(storeName, 'readwrite')//事务
        .objectStore(storeName)//仓库对象
    var request = store.openCursor()//指针对象
    //游标开启成功，逐行读数据
    request.onsuccess = function (e) {
        var cursor = e.target.result
        if (cursor) {
            //必须要检查
            list.push(cursor.value)
            cursor.continue()//继续往下走，遍历了存储对象中的所有内容
        } else {
            console.log('游标读取的数据', list);

        }
    }
    return list
}

//更新数据
export function updateDB(db, storeName, data) {
    var request = db
        .transaction([storeName], 'readwrite')//事务对象
        .objectStore(storeName)//仓库对象
        .put(data)
    request.onsuccess = function () {
        console.log('数据更新成功');
    }
    request.onerror = function () {
        console.log('数据更新失败');
    }
}

//通过主键删除数据
export function deleteDB(db, storeName, id) {
    var request = db
        .transaction([storeName], 'readwrite')
        .objectStore(storeName)
        .delete(id)
    request.onsuccess = function () {
        console.log('数据库删除成功');
    }
    request.onerror = function () {
        console.log('数据库删除失败');
    }
}

//关闭数据库
export function closeDB(db) {
    db.close();
    console.log('数据库已关闭');
}

//获取当前时间
export function getCurrentTime() {
    let date = new Date();
    const year = date.getFullYear();//获取年
    const month = date.getMonth() + 1;//获取月,注意时间是0-11，0代表1月份
    const dates = date.getDate();//获取日
    const hours = date.getHours();//获取小时
    const minute = date.getMinutes();//获取分钟
    const seconds = date.getSeconds();//获取秒钟

    return `${year}年${month}月${dates}日${hours}时${minute}分${seconds}秒`;
};