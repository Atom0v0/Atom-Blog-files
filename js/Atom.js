/* eslint-disable */
(function ($) {
  "use strict";
  function setTabs() {
    const $tabs = $(".tabs");
    if ($tabs.length === 0) return;
    let $navs = $tabs.find(".nav-tabs .tab");
    for (var i = 0; i < $navs.length; i++) {
      let $a = $tabs.find($navs[i].children[0]);
      $a.addClass($a.attr("href"));
      $a.removeAttr("href");
    }
    $(".tabs .nav-tabs").on("click", "a", (e) => {
      e.preventDefault();
      e.stopPropagation();
      let $tab = $(e.target.parentElement.parentElement.parentElement);
      $tab.find(".nav-tabs .active").removeClass("active");
      $tab.find(e.target.parentElement).addClass("active");
      $tab.find(".tab-content .active").removeClass("active");
      $tab.find($(e.target).attr("class")).addClass("active");
      return false;
    });
  }

  $(function () {
    setTabs();
    // $(".article .video-container").fitVids();
    $(".scroll-down").on("click", function () {
      scrolltoElement(".l_body");
    });
    setTimeout(function () {
      $("#loading-bar-wrapper").fadeOut(500);
    }, 300);
  });
})(jQuery);


/* 禁止控制台 */
/* --------------------------------------------------------------------------------------------------- */
//禁止浏览器默认右键菜单
document.oncontextmenu = function(event) {
  event.preventDefault();
};
//禁止文本选中
/*if (document.all) {
  document.onselectstart = function() {
    return false;
  }; //for ie
} else {
  document.onmousedown = function() {
    return false;
  };
  document.onmouseup = function() {
    return true;
  };
}
document.onselectstart = new Function('event.returnValue=false;');*/

//禁止copy
/*document.oncopy = function(event) {
  if (window.event) {
    event = window.event;
  }
  try {
    var the = event.srcElement;
    if (
      !((the.tagName == 'INPUT' && the.type.toLowerCase() == 'text') || the.tagName == 'TEXTAREA')
    ) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};*/

//禁止通过F12来打开
document.onkeydown = document.onkeyup = document.onkeypress = function(event) {
  var e = event || window.event || arguments.callee.caller.arguments[0];

  if (e && e.keyCode == 123) {
    e.returnValue = false;
    return false;
  }
};

var ConsoleManager = {
  onOpen: function() {
    alert('Console is opened');
  },
  onClose: function() {
    alert('Console is closed');
  },
  init: function() {
    var self = this;
    var x = document.createElement('div');
    var isOpening = false,
      isOpened = false;
    Object.defineProperty(x, 'id', {
      get: function() {
        if (!isOpening) {
          self.onOpen();
          isOpening = true;
        }
        isOpened = true;
      },
    });

    setInterval(function() {
      isOpened = false;
      console.info(x);
      console.clear();
      if (!isOpened && isOpening) {
        self.onClose();
        isOpening = false;
      }
    }, 200);
  },
};

//打开控制台，跳转到其他页面
ConsoleManager.onOpen = function() {
  try {
    window.location.href = '/404';
  } catch (err) {
    window.location.href = '/404';
    var a = document.createElement('button');
    a.onclick = function() {
      window.location.href = '/404';
    };
    a.click();
  }
};
ConsoleManager.onClose = function() {
  alert('Console is closed!!!!!');
};
ConsoleManager.init();

//禁用页面的ctrl功能，来禁止ctrl+s保存功能
window.addEventListener('keydown', function (e) {
  if(e.keyCode == 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)){
      e.preventDefault();
  }
})