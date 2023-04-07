// 全局command p 触发 prompt
document.addEventListener("keydown", function (event) {
  if (event.keyCode === 80 && event.metaKey) {
    event.preventDefault();
    document.querySelector("#monica-main-window-root > div.chat-wrapper-jBfnZS > div > div > div.input-panel-yW-r2Y > div.toolbar-q5CtpT > div.lt-1wxSOZ > div.monica-popover-t0biBI > span").click()
    activeIndex = 0
    setActive();
  }
})

function mod(n, m) {
  return ((n % m) + m) % m;
}

var activeIndex = 0
var prompts = []

function setActive() {
  // var hoverEvent = new MouseEvent('mouseenter');
  // console.log(activeIndex, prompts[activeIndex])
  // prompts[activeIndex].dispatchEvent(hoverEvent); 
  prompts[activeIndex].classList.add("hovered-prompt")

}
function unsetActive() {
  if (prompts[activeIndex].classList.contains("hovered-prompt")) {
    prompts[activeIndex].classList.remove("hovered-prompt");
  }
}

// 监听 prompt 显示时的方向键和回车键事件
document.addEventListener('keydown', function(event) {
  var promptsIsShowing = document.querySelector(".show-x13hfV")
  if (promptsIsShowing) {
    if (event.keyCode === 38) { // 上箭头
      event.preventDefault();
      unsetActive()
      activeIndex = mod((activeIndex - 1), prompts.length)
      setActive();
    } else if (event.keyCode === 40) { // 下箭头
      event.preventDefault();
      unsetActive()
      activeIndex = mod((activeIndex + 1), prompts.length)
      setActive();
    } else if (event.keyCode === 13) { // 回车键
      event.preventDefault();
      unsetActive()
      prompts[activeIndex].children[1].click();
    }
  }
});

setTimeout(
  () => {
    prompts = document.querySelectorAll(".item-44Y5HQ")
    console.log(document.querySelector("textarea"))
    // text area listen for command + enter
    document.querySelector("textarea").addEventListener('keydown', function(event) {
      // 判断按下的按键是否是回车键
      if (event.keyCode === 13 && event.metaKey) {
        // 阻止默认的按键事件
        event.preventDefault();
        // 获取输入框的值
        this.value += '\n'
      } else if (event.keyCode === 13) {
        // 防止吞剪贴板
        console.log(this.value)
      }
    });
  }, 1000
)
