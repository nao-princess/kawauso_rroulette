// ===============================
// 今日のお団子 script.js 完成版
// ===============================

// ポーズ一覧
const poses = [
  {
    image: "pose1.png",
    title: "虚無",
    comment: "本人は満足そうです。"
  },
  {
    image: "pose2.png",
    title: "見つめちゃうぞ💕",
    comment: "かわいいは正義です。"
  },
  {
    image: "pose3.png",
    title: "充電中",
    comment: "触ると再起動します。"
  },
  {
    image: "pose4.png",
    title: "急いでます。",
    comment: "新幹線より早い。"
  },
  {
    image: "pose5.png",
    title: "貫禄",
    comment: "よっこらせっと。"
  },
  {
    image: "pose6.png",
    title: "休憩",
    comment: "動くのはあとで考えます。"
  }

     {
    image: "pose7.png",
    title: "床との和解",
    comment: "完全に馴染みました。"
  },
  {
    image: "pose8.png",
    title: "あと５分",
    comment: "あと５分したら絶対動くぞ、絶対に。"
  },
  {
    image: "pose9.png",
    title: "居酒屋",
    comment: "やってる？"
  },
  {
    image: "pose10.png",
    title: "プリンッ",
    comment: "特に意味はありません。"
  }
];

// HTMLの要素を取得
const image = document.getElementById("rouletteImage");
const title = document.getElementById("title");
const comment = document.getElementById("comment");
const button = document.getElementById("startButton");

let isRunning = false;

// ランダムに1つ選ぶ
function getRandomPose() {
  const randomIndex = Math.floor(Math.random() * poses.length);
  return poses[randomIndex];
}

// 画像・タイトル・コメントを表示
function showPose(pose) {
  image.src = pose.image;
  title.textContent = pose.title;
  comment.textContent = pose.comment;
}

// ボタンぷにっ
function popButton() {
  button.classList.remove("buttonPop");
  void button.offsetWidth;
  button.classList.add("buttonPop");

  setTimeout(() => {
    button.classList.remove("buttonPop");
  }, 350);
}

// ぬいぐるみぷるぷる
function shakeImage() {
  image.animate(
    [
      { transform: "translateX(0) scale(1)" },
      { transform: "translateX(-6px) scale(1.03)" },
      { transform: "translateX(6px) scale(1.03)" },
      { transform: "translateX(-4px) scale(1.02)" },
      { transform: "translateX(4px) scale(1.02)" },
      { transform: "translateX(0) scale(1)" }
    ],
    {
      duration: 450,
      easing: "ease-in-out"
    }
  );
}

// 決定時ぽよん
function bounceImage() {
  image.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.15)" },
      { transform: "scale(0.96)" },
      { transform: "scale(1.06)" },
      { transform: "scale(1)" }
    ],
    {
      duration: 550,
      easing: "ease-out"
    }
  );
}

// ルーレット本体
function startRoulette() {
  if (isRunning) return;

  isRunning = true;
  popButton();

  title.textContent = "ぐるぐる中…";
  comment.textContent = "今日のお団子を選んでいます。";
  button.textContent = "🍡 選定中…";
  button.disabled = true;

  let count = 0;
  let speed = 55;
  const maxCount = 24;

  function spin() {
    const pose = getRandomPose();
    showPose(pose);

    count++;

    // 後半になるほど遅くする
    if (count > 10) speed += 18;
    if (count > 17) speed += 28;
    if (count > 21) speed += 45;

    if (count < maxCount) {
      setTimeout(spin, speed);
    } else {
      const finalPose = getRandomPose();

      showPose(finalPose);

      shakeImage();

      setTimeout(() => {
        bounceImage();
        button.textContent = "🎲 もう1回！";
        button.disabled = false;
        isRunning = false;
      }, 450);
    }
  }

  spin();
}

// ボタンクリックで開始
button.addEventListener("click", startRoulette);
