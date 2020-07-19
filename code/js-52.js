if (typeof koe_52_style === 'undefined') {
  var koe_52_is_show = true;
  var koe_52_style = document.createElement('style');
  koe_52_style.innerText = `

  .koe_52_box,
  .koe_52_background,
  .koe_52_options,
  .koe_52_replys_ul,
  .koe_52_progress {
    position: fixed;
  }

  .koe_52_box {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99999;
  }

  .koe_52_background {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.8;
    z-index: -1;
  }

  .koe_52_options {
    top: 20px;
    left: 50px;
    width: 300px;
  }

  .koe_52_options li {
    margin-top: 30px;
    font-size: 24px;
    color: #FFF;
  }

  .koe_52_progress {
    top: 51px;
    left: 50px;
  }
  .koe_52_progress p {
    padding: 2px 5px;
    width: 180px;
    height: 30px;
    line-height: 30px;
    font-size: 26px;
    color: #FFF;
    text-align: center;
    border-bottom: 2px #666 solid;
  }
  .koe_52_progress span {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: #FFF;
  }

  .koe_52_text {
    padding: 2px 5px;
    width: 180px;
    height: 30px;
    line-height: 30px;
    font-size: 24px;
    color: #FFF;
    background: none;
    border: none;
    border-bottom: 2px #FFF solid;
    opacity: 0;
  }

  .koe_52_button {
    width: 100px;
    height: 32px;
    line-height: 32px;
    font-size: 22px;
    color: #FFF;
    background-color: #666;
    border: 1px #000 solid;
    border-radius: 5px;
  }

  .koe_52_button:active {
    background-color: #999;
  }

  .koe_52_replys_ul {
    top: 50px;
    left: 500px;
    width: 700px;
    height: 800px;
    overflow-y: auto;
  }

  .koe_52_replys_ul::-webkit-scrollbar {
    width : 5px;
    height: 1px;
  }
  .koe_52_replys_ul::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background   : #FFF;
  }
  .koe_52_replys_ul::-webkit-scrollbar-track {
    border-radius: 4px;
    background   : #666;
  }

  .koe_52_replys_ul li {
    position: relative;
    margin-top: 100px;
    cursor: pointer;
  }

  .koe_52_replys_ul li img {
    position: absolute;
    top: -35px;
    left: 0;
    width: 30px;
    height: 30px;
    border-radius: 100%;
  }

  .koe_52_replys_ul li span {
    position: absolute;
    top: -35px;
    left: 35px;
    width: 300px;
    height: 30px;
    line-height: 30px;
    font-size: 22px;
    color: #FFF;
  }

  .koe_52_replys_ul li p {
    margin: 35px 0 0 35px;
    font-size: 18px;
    color: #FFF;
  }

  .koe_52_search_options input {
    zoom: 1.5;
  }

`;

  var koe_52_box = document.createElement('div');
  koe_52_box.setAttribute('class', 'koe_52_box');
  koe_52_box.innerHTML = '<div class="koe_52_background"></div>';

  var koe_52_replys_ul = document.createElement('ul');
  koe_52_replys_ul.setAttribute('class', 'koe_52_replys_ul');

  var koe_52_options = document.createElement('ul');
  koe_52_options.setAttribute('class', 'koe_52_options');
  koe_52_options.innerHTML = `
  <li>
    <input type="text" class="koe_52_text"> <input type="button" value="搜索" onclick="koe_52_search()" class="koe_52_button">
  </li>
  <li class="koe_52_search_options">
    <p>搜索范围</p>
    <p><label><input type="checkbox" class="koe_52_checkbox_uname" checked> 用户名</label></p>
    <p><label><input type="checkbox" class="koe_52_checkbox_message" checked> 评论内容</label></p>
    <p><label><input type="checkbox" class="koe_52_checkbox_sign"> 用户签名</label></p>
  </li>
`;

  var koe_52_progress = document.createElement('div');
  koe_52_progress.setAttribute('class', 'koe_52_progress');

  var koe_52_progress_p = document.createElement('p');
  var koe_52_progress_span = document.createElement('span');
  koe_52_progress.appendChild(koe_52_progress_p);
  koe_52_progress.appendChild(koe_52_progress_span);

  koe_52_box.append(koe_52_replys_ul);
  koe_52_box.append(koe_52_options);
  koe_52_box.append(koe_52_progress);

  document.head.appendChild(koe_52_style);
  document.body.appendChild(koe_52_box);

  var koe_52_text = document.querySelector('.koe_52_text');
  var koe_52_checkbox_uname = document.querySelector('.koe_52_checkbox_uname');
  var koe_52_checkbox_message = document.querySelector(
    '.koe_52_checkbox_message'
  );
  var koe_52_checkbox_sign = document.querySelector('.koe_52_checkbox_sign');

  koe_52_text.addEventListener('keydown', function(e) {
    e = e || window.event;
    if(e.keyCode === 13) {
      koe_52_search();
    }
  });

  var koe_52_replys = new Array();
  var koe_52_reg = null;

  function koe_52_search() {
    koe_52_reg = new RegExp(
      '(' + koe_52_text.value.replace(',', '|') + ')',
      'g'
    );
    koe_52_replys_ul.innerHTML = '';

    koe_52_replys.forEach(function (item) {
      if (
        (koe_52_reg.test(item.uname) && koe_52_checkbox_uname.checked) ||
        (koe_52_reg.test(item.message) && koe_52_checkbox_message.checked) ||
        (koe_52_reg.test(item.sign) && koe_52_checkbox_sign.checked)
      ) {
        var koe_52_li = document.createElement('li');
        koe_52_li.innerHTML =
          '<img src="' +
          item.avatar +
          '"><span>' +
          koe_52_highlight(item.uname) +
          '</span><p>' +
          koe_52_highlight(item.message) +
          '</p>';

        koe_52_li.addEventListener('click', function () {
          window.open(
            'https://www.bilibili.com/video/' +
              __INITIAL_STATE__.bvid +
              '#reply' +
              item.rpid
          );
        });
        koe_52_replys_ul.appendChild(koe_52_li);
      }
    });
  }

  function koe_52_highlight(str) {
    if(koe_52_reg === null) return str;
    return str.replace(
      koe_52_reg,
      '<font style="font-weight:700;color:#000;background-color:#FF0;">$1</font>'
    );
  }

  function koe_52_getReply(page) {
    var url =
      'https://api.bilibili.com/x/v2/reply?jsonp=jsonp&type=1&sort=2&ps=40&pn=' +
      page +
      '&oid=' +
      __INITIAL_STATE__.videoData.aid;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.withCredentials = true;
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        if (json.data.replies === null) {
          return;
        }

        json.data.replies.forEach(function (item) {
          koe_52_replys.push({
            rpid: item.rpid,
            message: item.content.message,
            avatar: item.member.avatar,
            uname: item.member.uname,
            sign: item.member.sign,
          });
        });

        if (page * 40 <= json.data.page.count) {
          var progress = parseInt(((page * 40) / json.data.page.count) * 100);
          koe_52_progress_p.innerText = progress + '%';
          koe_52_progress_span.style.width = progress + '%';
          koe_52_getReply(++page);
        } else {
          koe_52_progress_p.innerText = '100%';
          koe_52_progress_span.style.width = '100%';
          koe_52_text.style.opacity = 1;
          setTimeout(function () {
            console.log(koe_52_text);
            koe_52_text.focus();
            koe_52_progress.style.display = 'none';
          }, 500);
        }
      }
    };
  }
  koe_52_getReply(1);
} else {
  if (koe_52_is_show) {
    koe_52_box.style.display = 'none';
    koe_52_is_show = false;
  } else {
    koe_52_box.style.display = 'block';
    koe_52_is_show = true;
  }
}
