const poses = [
  { image: "pose1.png", title: "虚無", comment: "本人は満足そうです。" },
  { image: "pose2.png", title: "見つめちゃうぞ💕", comment: "かわいいは正義です。" },
  { image: "pose3.png", title: "充電中", comment: "触ると再起動します。" },
  { image: "pose4.png", title: "急いでます。", comment: "新幹線より早い。" },
  { image: "pose5.png", title: "貫禄", comment: "よっこらせっと。" },
  { image: "pose6.png", title: "休憩", comment: "動くのはあとで考えます。" },
  { image: "pose7.png", title: "床との和解", comment: "完全に馴染みました。" },
  { image: "pose8.png", title: "あと５分", comment: "あと５分したら絶対動くぞ、絶対に。" },
  { image: "pose9.png", title: "居酒屋", comment: "やってる？" },
  { image: "pose10.png", title: "プリンッ", comment: "特に意味はありません。" }
];

const image = document.getElementById("rouletteImage");
const title = document.getElementById("title");
const comment = document.getElementById("comment");
const button = document.getElementById("startButton");

let isRunning = false;

function getRandomPose() {
  return poses[Math.floor(Math.random() * poses.length)];
}

function showPose(pose) {
  image.src = pose.image;
  title.textContent = pose.title;
  comment.textContent = pose.comment;
}

function popButton() {
  button.classList.remove("buttonPop");
  void button.offsetWidth;
  button.classList.add("buttonPop");

  setTimeout(() => {
    button.classList.remove("buttonPop");
  }, 350);
}

function shakeImage() {
  image.animate(
    [
      { transform: "rotate(0deg) scale(1)" },
      { transform: "rotate(-8deg) scale(1.08)" },
      { transform: "rotate(8deg) scale(1.08)" },
      { transform: "rotate(-6deg) scale(1.05)" },
      { transform: "rotate(6deg) scale(1.05)" },
      { transform: "rotate(0deg) scale(1)" }
    ],
    {
      duration: 700,
      easing: "ease-in-out"
    }
  );
}

function bounceImage() {
  image.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.25)" },
      { transform: "scale(0.9)" },
      { transform: "scale(1.12)" },
      { transform: "scale(1)" }
    ],
    {
      duration: 800,
      easing: "ease-out"
    }
  );
}

function startRoulette() {
  if (isRunning) return;

  isRunning = true;
  popButton();

  button.textContent = "🍡 選定中…";
  button.disabled = true;

  title.textContent = "ぐるぐる中…";
  comment.textContent = "今日のお団子を選んでいます。";

  let count = 0;
  let speed = 60;
  const maxCount = 24;

  function spin() {
    const pose = getRandomPose();
    showPose(pose);

    count++;

    if (count > 10) speed += 20;
    if (count > 17) speed += 35;
    if (count > 21) speed += 55;

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
      }, 700);
    }
  }

  spin();
}

button.addEventListener("click", startRoulette);
