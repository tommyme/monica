// insert css table
const styleSheet = document.styleSheets[0]
styleSheet.insertRule('.hovered-prompt { background: #22ffcc66 !important; }', styleSheet.cssRules.length)

// 全局快捷键
document.addEventListener("keydown", function (event) {
  // 全局command p 触发 prompt
  if (event.keyCode === 80 && event.metaKey) {
    event.preventDefault();
    document.querySelector("#monica-main-window-root > div.chat-wrapper-jBfnZS > div > div > div.input-panel-yW-r2Y > div.toolbar-q5CtpT > div.lt-1wxSOZ > div.monica-popover-t0biBI > span").click()
    activeIndex = 0
    setActive();
  }
  // 全局command o 切换 语音/键盘输入
  if (event.keyCode === 79 && event.metaKey) {
    event.preventDefault();
    document.querySelector('.voice-text-switch-btn-zUnggj').click()
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
  // 如果prompt is showing 则处理箭头
  if (promptsIsShowing) {
    if ([38, 40, 13].includes(event.keyCode)) {
      let _log = "before:" + activeIndex;
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
      _log += " after:" +activeIndex
      console.log(_log)
    }
  }
});

// 设置一个时间间隔 然后逐一初始化
setTimeout(
  () => {
    // 初始化prompts
    // 取第一个对话框 也就是普通monica对话模型
    prompts = document.querySelectorAll(".chat-2wZbjE:first-child .item-44Y5HQ")
    console.log("您共有",prompts.length, "个 prompt")
    // TODO
    // 因为会有用户添加prompt的时候 所以我们需要给用户选择的空间 最好是创建一个按钮, 然后用户能够自己重新加载prompts

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
        // 防止吞剪贴板 使用回车的时候会在控制台打印输入的内容
        console.log(this.value)
      }
    });
  }, 1000
)
