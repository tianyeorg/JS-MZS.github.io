// 获取元素
const audio = document.getElementById("audio");
const playPauseButton = document.getElementById("play-pause");
const volumeSlider = document.getElementById("volume-slider");
const musicController = document.getElementById("music-controller");
const toggleButton = document.getElementById("toggle-button");
const statusText = document.getElementById("status-text");

// 自动播放尝试
audio.play().then(() => {
    playPauseButton.textContent = "⏸️"; // 成功播放，设置按钮为暂停状态
    statusText.textContent = "🎶 正在播放音乐"; // 设置状态文本为播放中
}).catch(() => {
    playPauseButton.textContent = "▶️"; // 未能自动播放，设置按钮为播放状态
    statusText.textContent = "🎶 音乐已暂停"; // 设置状态文本为暂停
});

// 播放/暂停功能
playPauseButton.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = "⏸️";
        statusText.textContent = "🎶 正在播放音乐";
    } else {
        audio.pause();
        playPauseButton.textContent = "▶️";
        statusText.textContent = "🎶 音乐已暂停";
    }
});

// 音量调节
volumeSlider.addEventListener("input", (event) => {
    audio.volume = event.target.value;
});

// 折叠/展开控制器
toggleButton.addEventListener("click", () => {
    musicController.classList.toggle("collapsed");
    toggleButton.textContent = musicController.classList.contains("collapsed") ? "▶️" : "×";
});

// 重置折叠计时器
let interactionTimer;
const resetInteractionTimer = () => {
    clearTimeout(interactionTimer);
    interactionTimer = setTimeout(() => {
        if (!musicController.matches(":hover")) { // 检查鼠标是否在播放器上
            musicController.classList.add("collapsed");
            toggleButton.textContent = "▶️";
        }
    }, 5000);
};

// 初始调用折叠计时器
resetInteractionTimer();

// 鼠标进入和离开播放器区域事件
musicController.addEventListener("mouseenter", resetInteractionTimer);
musicController.addEventListener("mouseleave", resetInteractionTimer);
musicController.addEventListener("click", resetInteractionTimer);
