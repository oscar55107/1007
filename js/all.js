
let list = document.querySelector('.list');
let selectMenu = document.querySelector('.selectMenu');
let title = document.querySelector('.title');
let goTopBtn = document.querySelector('.gotop');
let data = [];


selectMenu.addEventListener('change',updateListSel,false);
window.addEventListener("scroll", gotop);
goTopBtn.addEventListener('click', gotoTop)

var xhr = new XMLHttpRequest();
// true : 非同步 不會等資料傳回來 就會讓程式繼續往下跑 等到回傳資料才會自動回傳
//false : 同步 會等資料傳回來 才讓程式繼續往下跑
xhr.open('get','https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json',true)
xhr.send();
xhr.onload = function(){
    data = JSON.parse(xhr.responseText).result.records;
    selectOption();
    updateList(data);
}

function selectOption(){
    let zoneName = new Set();
    //沒有重複 就執行前面
    let zoneList = data.filter(item => !zoneName.has(item.Zone) ? zoneName.add(item.Zone):false);
    for(let i = 0; i < zoneList.length; i++){
        let addOption = document.createElement('option');
        addOption.textContent = zoneList[i].Zone;
        addOption.setAttribute = ('value', zoneList[i].Zone)
        selectMenu.appendChild(addOption);
    }
}
function updateListSel(e){
    let selectData = [];
    let str = selectMenu.value;
    console.log(str);
    title.textContent = str;
    for(let i = 0 ;i < data.length; i++){
        if(e.target.value === data[i].Zone){
            selectData.push(data[i]);
        }else if(e.target.value === '全區域景點'){
            selectData = data;
        }
    }
    updateList(selectData);
}
function updateList(data){
    let str = "";
    data.forEach((item) => {
        str +=
            `
            <div class=" col-lg-4 col-md-6 my-3">
                <div class="card text-center h-100">
                    <div class="card-header">
                        ${item.Name}
                    </div>
                    <div class="card-body">
                        <div class="card-img-top bg-cover d-flex justify-content-between align-items-end text-white" style="background-image: url(${item.Picture1}); height: 155px;">
                        </div>
                        <div class="d-flex flex-column align-items-start mt-3">
                            <div class="d-flex justify-content-between align-items-center">
                                <i class="fas fa-clock mr-2"></i>
                                <span class="card-text">${item.Opentime}</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <i class="fas fa-map-marker-alt mr-2"></i>
                                <span>${item.Add}</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <i class="fas fa-phone mr-2"></i>
                                <span>${item.Tel}</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer ">
                        <span>${item.Ticketinfo}</span>
                    </div>
                </div>
            </div>
        `
    });
    list.innerHTML = str;
}
function gotop() {
    if (window.scrollY >= 670) {
        goTopBtn.style.width = "40px";
    } else {
        goTopBtn.style.width = "0";
    }
}
function gotoTop() {
    if (window.scrollY != 0) {
        setTimeout(function () {
            window.scrollTo(0, window.scrollY - 40);
            gotoTop();
        }, 15);
    }
}
