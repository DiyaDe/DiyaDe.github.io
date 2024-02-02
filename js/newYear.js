
function newYear() {
  if (!document.querySelector('#newYear')) return;
  // 新年时间戳 and 星期对象
  let SpringFestival = new Date('2024-02-10 00:00:00')
  let newYear = SpringFestival.getTime() / 1000,
    week = { 0: '周日', 1: '周一', 2: '周二', 3: '周三', 4: '周四', 5: '周五', 6: '周六' }
  function nol(h) { h = Number(h); return h > 9 ? h : '0' + h; }
  time();

  function time() {
    // 现在 时间对象
    let now = new Date();

    // 右下角 今天
    document.querySelector('#newYear .today').innerHTML = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + week[now.getDay()]

    // 现在与新年相差秒数
    let second = newYear - Math.round(now.getTime() / 1000);

    // 小于0则表示已经过年
    if (second < 0) {
      window.newYearTimer = null
      document.querySelector('#newYear .title').innerHTML = 'Happy New Year!';
      document.querySelector('#newYear .newYear-time').innerHTML = '<span class="happyNewYear">新年快乐</span>';
    } else {
      // 大于0则还未过年
      document.querySelector('#newYear .title').innerHTML = '距离' + SpringFestival.getFullYear() + '年春节：'
      // 大于一天则直接渲染天数
      if (second > 86400) {
        document.querySelector('#newYear .newYear-time').innerHTML = `<span class="day">${Math.ceil(second / 86400)}</span><span class="unit">天</span>`
      } else {
        // 小于一天则使用时分秒计时。
        let h = nol(parseInt(second / 3600));
        second %= 3600;
        let m = nol(parseInt(second / 60));
        second %= 60;
        let s = nol(second);
        document.querySelector('#newYear .newYear-time').innerHTML = `<span class="time">${h}:${m}:${s}</span></span>`;
        // 计时
        if (!window.newYearTimer) window.newYearTimer = setInterval(time, 1000);
      }
    }
  }
}

function newYearSwiper() {
  var swiper = new Swiper('.newYear-slider', {
    passiveListeners: true,
    loop: true,
    // autoplay: false,
    autoplay: {
      disableOnInteraction: true,
      delay: 5000
    },
    effect: 'fade',
    mousewheel: true,
    autoHeight: true
  });

  var comtainer = document.querySelector('.newYear-slider');
  if (comtainer !== null) {
    comtainer.onmouseenter = () => { swiper.autoplay.stop() };
    comtainer.onmouseleave = () => { swiper.autoplay.start() };
  }
}

// 适配了pjax
function whenDOMReady() {
  // pjax加载完成（切换页面）后需要执行的函数和代码
  newYear()
  newYearSwiper()
}

whenDOMReady() // 打开网站先执行一次
document.addEventListener("pjax:complete", whenDOMReady) // pjax加载完成（切换页面）后再执行一次