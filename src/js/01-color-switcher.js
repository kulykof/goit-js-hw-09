const refs = {
    backgroundEl: document.querySelector('body'),
    startBtnEl: document.querySelector('[data-start]'),
    stopBtnEl: document.querySelector('[data-stop]'),
};

let timerId = null;

refs.startBtnEl.addEventListener('click', () => {
    changeColor();
    timerId = setInterval(changeColor, 1000);
    refs.startBtnEl.setAttribute('disabled', 'true');
});

refs.stopBtnEl.addEventListener('click', () => {
    clearInterval(timerId);
    refs.startBtnEl.removeAttribute('disabled');
});

function changeColor() {
    refs.backgroundEl.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
