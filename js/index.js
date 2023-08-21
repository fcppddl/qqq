let areaElement = document.querySelector('.mod_body .main .area')
let versionElement = document.querySelector('.mod_body .main .version')
let tag = document.querySelector('content .left')
let areaLiArr = document.querySelectorAll('.mod_body .main .area li')
let versionLiArr = document.querySelectorAll('.mod_body .main .version li')
let message = document.querySelectorAll('.right a')
let ul = document.querySelector('.mod_body .main content ul')

// import hotMessage from '/data/hot.js'
// console.log(hotMessage);
// import newMessage from '/data/new.js'
// console.log(newMessage);
let hotMessage = []
let newMessage = []


function getData(file, type) {
    //创建xhr
    let xhr = new XMLHttpRequest()
    //调用open 函数
    xhr.open("GET", `./task/${file}`)
    //调用send 函数
    xhr.send()
    //监听onreadystatechenge
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if (type == 'hotMessage') hotMessage = JSON.parse(xhr.responseText)
            else newMessage = JSON.parse(xhr.responseText)
            // console.log(type);
            if (type == 'hotMessage') {
                setTimeout(() => {
                    message[0].click()
                }, 100)
            }
        }
    }
}

getData('hot.json', 'hotMessage')
getData('new.json', 'newMessage')


const area = {
    1: "内地",
    2: "港台",
    3: "欧美",
    4: "韩国",
    5: "日本",
};

const verison = {
    1: "MV",
    2: "现场",
    3: "翻唱",
    4: "舞蹈",
    5: "影视",
    6: "综艺",
    7: "儿歌",
};

areaElement.addEventListener('click', (e) => {

    active(areaLiArr, e.target.innerText)
    // 更新数据
    document.querySelector('.mod_body .main .right a[class=active]').click()

    if (e.target.innerText != '全部') {
        let newChild = document.createElement('span')
        newChild.innerHTML = `${e.target.innerText}&nbsp;<a onclick='del(event)'>x</a>`
        if (tag.innerText == '全部MV') {
            tag.replaceChild(newChild, tag.firstChild)
            return
        }

        try {
            Object.values(verison).forEach((item) => {
                if (tag.firstElementChild.innerText.includes(item)) {
                    tag.insertBefore(newChild, tag.firstElementChild)
                    throw new Error('')
                }
            })
            tag.replaceChild(newChild, tag.firstElementChild)
        } catch (error) { }
    } else {
        // if (tag.innerText == '全部MV') return
        // try {
        //     Object.values(area).forEach((item) => {
        //         if (tag.firstElementChild.innerText.includes(item)) {
        //             tag.removeChild(tag.firstElementChild)
        //             throw new Error('')
        //         }
        //     })
        // } catch (error) { }
        // if (tag.children.length == 0) tag.innerText = ' 全部MV'

        clickAll(area)
    }
})

versionElement.addEventListener('click', (e) => {

    active(versionLiArr, e.target.innerText)
    // 更新数据
    document.querySelector('.mod_body .main .right a[class=active]').click()

    if (e.target.innerText != '全部') {
        let newChild = document.createElement('span')
        newChild.innerHTML = `${e.target.innerText}&nbsp;<a onclick='del(event)'>x</a>`
        if (tag.innerText == '全部MV')
            tag.replaceChild(newChild, tag.firstChild)
        else if (tag.children.length == 2) {
            tag.replaceChild(newChild, tag.children[1])
        } else {
            try {
                Object.values(area).forEach((item) => {
                    if (tag.firstElementChild.innerText.includes(item)) {
                        tag.appendChild(newChild)
                        throw new Error('')
                    }
                })
                tag.replaceChild(newChild, tag.firstElementChild)
            } catch (error) { }
        }
    } else {
        // if (tag.innerText == '全部MV') return
        // try {
        //     Object.values(verison).forEach((item) => {
        //         if (tag.children.length == 1) {
        //             if (tag.firstElementChild.innerText.includes(item)) {
        //                 tag.removeChild(tag.firstElementChild)
        //                 throw new Error('')
        //             }
        //         } else {
        //             if (tag.children[1].innerText.includes(item)) {
        //                 tag.removeChild(tag.children[1])
        //                 throw new Error('')
        //             }
        //         }
        //     })
        // } catch (error) { }
        // if (tag.children.length == 0) tag.innerText = ' 全部MV'

        clickAll(verison)
    }
})

function clickAll(arr) {
    if (tag.innerText == '全部MV') return
    try {
        Object.values(arr).forEach((item) => {
            if (Object.values(arr).length == 5 || tag.children.length == 1) {
                if (tag.firstElementChild.innerText.includes(item)) {
                    tag.removeChild(tag.firstElementChild)
                    throw new Error('')
                }
            } else {
                if (tag.children[1].innerText.includes(item)) {
                    tag.removeChild(tag.children[1])
                    throw new Error('')
                }
            }
        })
    } catch (error) { }
    if (tag.children.length == 0) tag.innerText = ' 全部MV'
}


function active(arr, text) {
    arr.forEach((item) => {
        if (item.innerText == text) {
            item.className = 'active'
            return
        }
        item.className = ''
    })
}

function del(e) {
    // console.log('del');
    try {
        Object.values(area).forEach((item) => {
            if (e.target.parentElement.innerText.includes(item)) {
                areaLiArr[0].click()
                throw new Error('')
            }
        })
    } catch (error) { return }

    versionLiArr[0].click()
}

message[0].addEventListener('click', (e) => {
    handlerFun(newMessage, e.target.innerText)
})
// message[0].click()

message[1].addEventListener('click', (e) => {
    handlerFun(hotMessage, e.target.innerText)
})

function handlerFun(messageType, innerText) {
    active(message, innerText)
    let indexArr = activeValue()
    // 过滤数据
    let data = filter(indexArr, messageType)
    // 渲染数据到页面
    render(data)
}

function activeValue() {
    let lightArea = document.querySelector('.mod_body .main .area li[class=active]').innerText
    let lightVersion = document.querySelector('.mod_body .main .version li[class=active]').innerText

    let indexArr = [0, 0]
    // console.log(lightArea.innerText);
    for (let key in area) {
        if (lightArea.includes(area[key])) indexArr[0] = key
    }

    for (let key in verison) {
        if (lightVersion.includes(verison[key])) indexArr[1] = key
    }
    return indexArr
}

// 过滤数据
function filter(indexArr, messagetype) {
    let [areaIndex, versionIndex] = indexArr

    let filterMessage = messagetype.filter((item) => {
        if ((areaIndex == 0 || item.area == areaIndex) && (versionIndex == 0 || item.verison == versionIndex)) return true
    })
    return filterMessage
}

// 渲染数据到页面
function render(data) {
    let d = new Date()
    let datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
    // ul.innerHTML=''
    let html = ''
    let singersName
    data.forEach((item) => {
        singersName = ''
        item.singers.forEach((i, index) => {
            if (index == 0) singersName += i.name
            else singersName += ' / ' + i.name
        })

        let tempLi = `
            <li>
                <a target="_blank" href="./detail.html?title=${item.title}&singer=${singersName}">
                    <img src="${item.picurl}" alt="">
                    <span class="coverMask"></span>
                    <span class="iconPlay"></span>
                </a>
                <a class="title">${item.title}</a>
                <a class="singer">${singersName}</a>
                <div class="info">
                    <span>${item.playcnt}</span>
                    <span>${datetime}</span>
                </div>
            </li>
        `
        html += tempLi
    })
    ul.innerHTML = html
}
