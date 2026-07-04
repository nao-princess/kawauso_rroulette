// ======================================
// 今日のお団子
// script.js Part1
// ======================================

// -------------------------
// ポーズ一覧
// -------------------------

const poses = [

{
    image:"pose1.png",
    title:"虚無",
    comment:"本人は満足そうです。"
},

{
    image:"pose2.png",
    title:"見つめちゃうぞ💕",
    comment:"かわいいは正義です。"
},

{
    image:"pose3.png",
    title:"充電中",
    comment:"触ると再起動します。"
},

{
    image:"pose4.png",
    title:"急いでます。",
    comment:"新幹線より早い。"
},

{
    image:"pose5.png",
    title:"貫禄",
    comment:"よっこらせっと。"
},

{
    image:"pose6.png",
    title:"休憩",
    comment:"動くのはあとで考えます。"
},

{
    image:"pose7.png",
    title:"床との和解",
    comment:"完全に馴染みました。"
},

    {
    image:"pose8.png",
    title:"あと５分",
    comment:"あと５分したら絶対動くぞ、絶対に"
},

    {
    image:"pose9.png",
    title:"居酒屋",
    comment:"やってる？"
},

   {
    image:"pose10.png",
    title:"プリンッ",
    comment:"特に意味はありません。"
}
    
];

// -------------------------

const image =
document.getElementById("rouletteImage");

const wrapper =
document.getElementById("imageWrapper");

const title =
document.getElementById("title");

const comment =
document.getElementById("comment");

const button =
document.getElementById("startButton");

// -------------------------

let rouletteTimer;

let currentIndex = 0;

let previousIndex = -1;

let spinning = false;

// -------------------------

button.addEventListener("click", startRoulette);

// ======================================
// スタート
// ======================================

function startRoulette(){

    if(spinning) return;

    spinning = true;

    button.disabled = true;

    button.textContent =
    "🎲 ルーレット中...";

    title.classList.remove("show");
    comment.classList.remove("show");

    // ふわふわ停止

    image.style.animation = "none";

    // ランダムな終了時間

    const duration =
    random(2300,3200);

    const start =
    Date.now();

    let interval = 40;

    roulette();

    function roulette(){

        showRandomPose();

        const elapsed =
        Date.now() - start;

        // 少しずつ減速

        interval =
        40 + Math.pow(elapsed / duration,2) * 160;

        if(elapsed < duration){

            rouletteTimer =
            setTimeout(
                roulette,
                interval
            );

        }else{

            stopRoulette();

        }

    }

}
// ======================================
// Part2
// ランダム表示・停止処理
// ======================================

// -------------------------
// ランダム表示
// -------------------------

function showRandomPose(){

    let index;

    // 同じ画像が連続しにくくする
    do{

        index =
        Math.floor(
            Math.random() * poses.length
        );

    }while(index === previousIndex);

    previousIndex = index;
    currentIndex = index;

    image.src =
    poses[index].image;

}

// ======================================
// 停止
// ======================================

function stopRoulette(){

    clearTimeout(rouletteTimer);

    const pose =
    poses[currentIndex];

    // タイトル
    title.textContent =
    pose.title;

    // コメント
    comment.textContent =
    pose.comment;

    // ブルッ開始
    wrapper.classList.add("shake");

    wrapper.addEventListener(
        "animationend",
        startZoom,
        { once:true }
    );

}

// ======================================
// ズーム開始
// ======================================

function startZoom(){

    wrapper.classList.remove("shake");

    image.classList.add("zoom");

    image.addEventListener(
        "animationend",
        finishRoulette,
        { once:true }
    );

}

// ======================================
// 終了
// ======================================

function finishRoulette(){

    image.classList.remove("zoom");

    // タイトル表示
    title.classList.add("show");

    // 少し遅れてコメント表示
    setTimeout(()=>{

        comment.classList.add("show");

    },180);

    // ふわふわ再開
    image.style.animation =
    "float 2.8s ease-in-out infinite";

    spinning = false;

    button.disabled = false;

    button.textContent =
    "🎲 もう一回！";

}

// ======================================
// Part3
// 完成
// ======================================

// ランダム整数
function random(min, max){

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;

}

// finishRouletteを置き換えてください
function finishRoulette(){

    image.classList.remove("zoom");

    const pose = poses[currentIndex];

    title.classList.add("show");

    // 「虚無」だけ少し間をあける（笑）
    let delay = 180;

    if(pose.title === "虚無"){
        delay = 700;
    }

    setTimeout(()=>{

        comment.classList.add("show");

    }, delay);

    // 少し待ってからふわふわ復帰
    setTimeout(()=>{

        image.style.animation =
        "float 2.8s ease-in-out infinite";

    },300);

    spinning = false;

    button.disabled = false;

    button.textContent =
    "🎲 もう一回！";

}

// ======================================
// 初期表示
// ======================================

window.addEventListener("load", ()=>{

    image.src = poses[0].image;

    title.textContent = "・・・";
    comment.textContent = "ボタンを押してね。";

    image.style.animation =
    "float 2.8s ease-in-out infinite";

});
