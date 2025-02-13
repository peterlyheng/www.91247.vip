function handlePreloader() {
  if ($(".preloader").length) {
    $(".preloader").delay(300).fadeOut(300);
    $("#umBody").css("overflow-y", "auto");
  }
}
$(function () {
  if (
    !/msie [6|7|8|9]/i.test(navigator.userAgent) &&
    $("html").hasClass("umAni")
  ) {
    var wow = new WOW({
      boxClass: "anim",
      offset: 100,
      mobile: true,
      live: true,
    });
    wow.init();
  }
  $("img.lazy").lazyload({ effect: "fadeIn", threshold: 200 });
  $("#cardArea").cardArea();
});

$(function () {
  handlePreloader();
  $(".moble").after(
    '<a class="search-btn"><i class="fa ri-search-2-line"></i></div><div class="search-bg"></a>'
  );
  $(".header .search-pup").clone(false).appendTo(".search-bg");
  $(".sbtn").click(function () {
    $(".searchBox,.page-bg").fadeIn(0);
  });
  $(".search-btn").click(function () {
    $(".page-bg,.search-bg").fadeIn(0);
  });

  $(".s-weixin").click(function () {
    $(".page-bg").fadeIn(0);
    $(".weixinBox").addClass("open");
  });

  $(".page-bg").click(function () {
    $(this).fadeOut(300);
    $(".search-bg,.searchBox").fadeOut(300);
    $(".weixinBox").removeClass("open");
  });
  $(".moble-bars").after('<div class="mLogo"></div>');
  $(".header .logo").clone(false).appendTo(".mLogo");
  $(".moble-bars").after('<nav id="nav" class="inner"></nav>');
  $(".header .navbar").clone(false).appendTo("#nav");
  $("#btn-bars i").click(function () {
    $("#nav").slideToggle("500");
  });

  $(".inner li i").click(function () {
    $(this).parent(".inner li").toggleClass("navOn");
  });

  $(".mapBtn").click(function () {
    $(".contactBg").toggleClass("on");
  });

  $("#navBox li").hover(
    function () {
      $(this).addClass("on");
    },
    function () {
      $(this).removeClass("on");
    }
  );

  if (navigator.userAgent.indexOf("Mac OS X") !== -1) {
    $("html").addClass("mac");
  } else {
    $("html").addClass("wds");
  }
});

//导航高亮
jQuery(document).ready(function ($) {
  var datatype = $("#navBox").attr("data-type");
  $(".navbar>li").each(function () {
    try {
      var myid = $(this).attr("id");
      if ("index" == datatype) {
        if (myid == "nvabar-item-index") {
          $("#nvabar-item-index").addClass("active");
        }
      } else if ("category" == datatype) {
        var infoid = $("#navBox").attr("data-infoid");
        if (infoid != null) {
          var b = infoid.split(" ");
          for (var i = 0; i < b.length; i++) {
            if (myid == "navbar-category-" + b[i]) {
              $("#navbar-category-" + b[i] + "").addClass("active");
            }
          }
        }
      } else if ("article" == datatype) {
        var infoid = $("#navBox").attr("data-infoid");
        if (infoid != null) {
          var b = infoid.split(" ");
          for (var i = 0; i < b.length; i++) {
            if (myid == "navbar-category-" + b[i]) {
              $("#navbar-category-" + b[i] + "").addClass("active");
            }
          }
        }
      } else if ("page" == datatype) {
        var infoid = $("#navBox").attr("data-infoid");
        if (infoid != null) {
          if (myid == "navbar-page-" + infoid) {
            $("#navbar-page-" + infoid + "").addClass("active");
          }
        }
      } else if ("tag" == datatype) {
        var infoid = $("#navBox").attr("data-infoid");
        if (infoid != null) {
          if (myid == "navbar-tag-" + infoid) {
            $("#navbar-tag-" + infoid + "").addClass("active");
          }
        }
      }
    } catch (E) {}
  });
  $("#navBox").delegate("a", "click", function () {
    $(".navbar>li").each(function () {
      $(this).removeClass("active");
    });
    if ($(this).closest("ul") != null && $(this).closest("ul").length != 0) {
      if ($(this).closest("ul").attr("id") == "munavber") {
        $(this).addClass("active");
      } else {
        $(this).closest("ul").closest("li").addClass("active");
      }
    }
  });
});

//子分类高亮
jQuery(document).ready(function ($) {
  var datatype = $("#subcate").attr("data-type");
  $(".subcate li").each(function () {
    try {
      var myid = $(this).attr("id");
      if ("category" == datatype) {
        var infoid = $("#subcate").attr("data-infoid");
        if (infoid != null) {
          var b = infoid.split(" ");
          for (var i = 0; i < b.length; i++) {
            if (myid == "cate-category-" + b[i]) {
              $("#cate-category-" + b[i] + "").addClass("active");
            }
          }
        }
      }
    } catch (E) {}
  });

  $("#subcate").delegate("a", "click", function () {
    $(".subcate li").each(function () {
      $(this).removeClass("active");
    });
    if ($(this).closest("ul") != null && $(this).closest("ul").length != 0) {
      if ($(this).closest("ul").attr("id") == "subcate") {
        $(this).addClass("active");
      } else {
        $(this).closest("ul").closest("li").addClass("active");
      }
    }
  });
});
//返回顶部，隐藏导航
$(function () {
  $(window).scroll(function () {
    if ($(window).scrollTop() > 500) {
      $("#gttop").fadeIn(300);
    } else {
      $("#gttop").fadeOut(300);
    }
  });
  $("#gttop,.gttop").click(function () {
    $("body,html").animate({ scrollTop: 0 }, 1200);
    return false;
  });
  $(window).resize(function () {
    var $width = $("body").width();
    if ($width > 480) {
      $(".fixed-search,.fixed-bg").hide();
    }
    if ($width > 950) {
      $("#nav").hide();
    }
  });
});

//////umtheme///////
var _0xodR = "jsjiami.com.v7";
function _0x380c(_0x5ad8fa, _0x157b7a) {
  var _0x4ac271 = _0x4ac2();
  return (
    (_0x380c = function (_0x380c54, _0x2ef613) {
      _0x380c54 = _0x380c54 - 0x1e4;
      var _0x26f559 = _0x4ac271[_0x380c54];
      if (_0x380c["HXjvSk"] === undefined) {
        var _0x3d565a = function (_0xa90846) {
          var _0x2075b0 =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=";
          var _0xc0a090 = "",
            _0x11b266 = "";
          for (
            var _0x1230f7 = 0x0, _0x5e44bc, _0xf4f777, _0x17b392 = 0x0;
            (_0xf4f777 = _0xa90846["charAt"](_0x17b392++));
            ~_0xf4f777 &&
            ((_0x5e44bc =
              _0x1230f7 % 0x4 ? _0x5e44bc * 0x40 + _0xf4f777 : _0xf4f777),
            _0x1230f7++ % 0x4)
              ? (_0xc0a090 += String["fromCharCode"](
                  0xff & (_0x5e44bc >> ((-0x2 * _0x1230f7) & 0x6))
                ))
              : 0x0
          ) {
            _0xf4f777 = _0x2075b0["indexOf"](_0xf4f777);
          }
          for (
            var _0x2cb093 = 0x0, _0x369df1 = _0xc0a090["length"];
            _0x2cb093 < _0x369df1;
            _0x2cb093++
          ) {
            _0x11b266 +=
              "%" +
              ("00" + _0xc0a090["charCodeAt"](_0x2cb093)["toString"](0x10))[
                "slice"
              ](-0x2);
          }
          return decodeURIComponent(_0x11b266);
        };
        var _0x58d5fd = function (_0x27af42, _0x52159d) {
          var _0x3b1031 = [],
            _0x4670fb = 0x0,
            _0x11e4db,
            _0x31f990 = "";
          _0x27af42 = _0x3d565a(_0x27af42);
          var _0x4ccff6;
          for (_0x4ccff6 = 0x0; _0x4ccff6 < 0x100; _0x4ccff6++) {
            _0x3b1031[_0x4ccff6] = _0x4ccff6;
          }
          for (_0x4ccff6 = 0x0; _0x4ccff6 < 0x100; _0x4ccff6++) {
            (_0x4670fb =
              (_0x4670fb +
                _0x3b1031[_0x4ccff6] +
                _0x52159d["charCodeAt"](_0x4ccff6 % _0x52159d["length"])) %
              0x100),
              (_0x11e4db = _0x3b1031[_0x4ccff6]),
              (_0x3b1031[_0x4ccff6] = _0x3b1031[_0x4670fb]),
              (_0x3b1031[_0x4670fb] = _0x11e4db);
          }
          (_0x4ccff6 = 0x0), (_0x4670fb = 0x0);
          for (
            var _0x2df4f9 = 0x0;
            _0x2df4f9 < _0x27af42["length"];
            _0x2df4f9++
          ) {
            (_0x4ccff6 = (_0x4ccff6 + 0x1) % 0x100),
              (_0x4670fb = (_0x4670fb + _0x3b1031[_0x4ccff6]) % 0x100),
              (_0x11e4db = _0x3b1031[_0x4ccff6]),
              (_0x3b1031[_0x4ccff6] = _0x3b1031[_0x4670fb]),
              (_0x3b1031[_0x4670fb] = _0x11e4db),
              (_0x31f990 += String["fromCharCode"](
                _0x27af42["charCodeAt"](_0x2df4f9) ^
                  _0x3b1031[
                    (_0x3b1031[_0x4ccff6] + _0x3b1031[_0x4670fb]) % 0x100
                  ]
              ));
          }
          return _0x31f990;
        };
        (_0x380c["KKQvnG"] = _0x58d5fd),
          (_0x5ad8fa = arguments),
          (_0x380c["HXjvSk"] = !![]);
      }
      var _0x5e1107 = _0x4ac271[0x0],
        _0x2e9127 = _0x380c54 + _0x5e1107,
        _0x13ef7b = _0x5ad8fa[_0x2e9127];
      return (
        !_0x13ef7b
          ? (_0x380c["XmTBPj"] === undefined && (_0x380c["XmTBPj"] = !![]),
            (_0x26f559 = _0x380c["KKQvnG"](_0x26f559, _0x2ef613)),
            (_0x5ad8fa[_0x2e9127] = _0x26f559))
          : (_0x26f559 = _0x13ef7b),
        _0x26f559
      );
    }),
    _0x380c(_0x5ad8fa, _0x157b7a)
  );
}
var _0x504e20 = _0x380c;
((function (
  _0x4daf4c,
  _0x66de59,
  _0x5d554d,
  _0x1bb589,
  _0x252a97,
  _0x52d830,
  _0x341650
) {
  return (
    (_0x4daf4c = _0x4daf4c >> 0x4),
    (_0x52d830 = "hs"),
    (_0x341650 = "hs"),
    (function (_0xc6bd07, _0x4695a5, _0x176b14, _0x1836d1, _0x48fb94) {
      var _0x36d24e = _0x380c;
      (_0x1836d1 = "tfi"),
        (_0x52d830 = _0x1836d1 + _0x52d830),
        (_0x48fb94 = "up"),
        (_0x341650 += _0x48fb94),
        (_0x52d830 = _0x176b14(_0x52d830)),
        (_0x341650 = _0x176b14(_0x341650)),
        (_0x176b14 = 0x0);
      var _0x2fb37f = _0xc6bd07();
      while (!![] && --_0x1bb589 + _0x4695a5) {
        try {
          _0x1836d1 =
            parseInt(_0x36d24e(0x289, ")ttH")) / 0x1 +
            -parseInt(_0x36d24e(0x273, "3gYM")) / 0x2 +
            (parseInt(_0x36d24e(0x297, "&tvU")) / 0x3) *
              (-parseInt(_0x36d24e(0x20b, "@QMP")) / 0x4) +
            (parseInt(_0x36d24e(0x218, "76QV")) / 0x5) *
              (parseInt(_0x36d24e(0x29a, "0n6D")) / 0x6) +
            (-parseInt(_0x36d24e(0x279, "Und6")) / 0x7) *
              (-parseInt(_0x36d24e(0x1e8, "z1X[")) / 0x8) +
            -parseInt(_0x36d24e(0x27b, "5fmg")) / 0x9 +
            (-parseInt(_0x36d24e(0x26b, "sxql")) / 0xa) *
              (-parseInt(_0x36d24e(0x202, "$V)k")) / 0xb);
        } catch (_0x3b7ebd) {
          _0x1836d1 = _0x176b14;
        } finally {
          _0x48fb94 = _0x2fb37f[_0x52d830]();
          if (_0x4daf4c <= _0x1bb589)
            _0x176b14
              ? _0x252a97
                ? (_0x1836d1 = _0x48fb94)
                : (_0x252a97 = _0x48fb94)
              : (_0x176b14 = _0x48fb94);
          else {
            if (
              _0x176b14 == _0x252a97["replace"](/[YBqIwTdWtRUGklFrCV=]/g, "")
            ) {
              if (_0x1836d1 === _0x4695a5) {
                _0x2fb37f["un" + _0x52d830](_0x48fb94);
                break;
              }
              _0x2fb37f[_0x341650](_0x48fb94);
            }
          }
        }
      }
    })(
      _0x5d554d,
      _0x66de59,
      function (
        _0xd30fc1,
        _0x2a596f,
        _0x1f44f8,
        _0x4718c8,
        _0x1304b1,
        _0x103d19,
        _0x42b020
      ) {
        return (
          (_0x2a596f = "\x73\x70\x6c\x69\x74"),
          (_0xd30fc1 = arguments[0x0]),
          (_0xd30fc1 = _0xd30fc1[_0x2a596f]("")),
          (_0x1f44f8 = "\x72\x65\x76\x65\x72\x73\x65"),
          (_0xd30fc1 = _0xd30fc1[_0x1f44f8]("\x76")),
          (_0x4718c8 = "\x6a\x6f\x69\x6e"),
          (0x18517d, _0xd30fc1[_0x4718c8](""))
        );
      }
    )
  );
})(0xcc0, 0xacdfb, _0x4ac2, 0xce),
_0x4ac2) && (_0xodR = _0x4ac2);
$(function () {
  var _0x28dbbc = _0x380c,
    _0x5ef058 = {
      wjdCd: function (_0x49ac90, _0x4d9b15) {
        return _0x49ac90(_0x4d9b15);
      },
      KCGVE: "selected",
      UrTXF: _0x28dbbc(0x208, "%XON"),
      LMIsy: function (_0x2fbb93, _0x351aa7) {
        return _0x2fbb93 == _0x351aa7;
      },
      CUDew: function (_0x5325fe, _0xa5e803) {
        return _0x5325fe(_0xa5e803);
      },
      btXAu: function (_0x1cdfac, _0xc6fdcc) {
        return _0x1cdfac == _0xc6fdcc;
      },
      BLdtt: _0x28dbbc(0x217, "ueSf"),
      nlSyf: _0x28dbbc(0x229, "d*Nz"),
      tDNMW: function (_0x3d901f, _0x408936) {
        return _0x3d901f(_0x408936);
      },
      uIFTk: _0x28dbbc(0x29d, "3gYM"),
      VxXSj: function (_0x2944cc, _0xf1fab4) {
        return _0x2944cc > _0xf1fab4;
      },
      fcUkZ: "header-nav\x20menu\x20fixed",
      ipets: function (_0x472dcb, _0x81974a) {
        return _0x472dcb === _0x81974a;
      },
      dhgim: "jotuy",
      EEczg: function (_0x556e7e) {
        return _0x556e7e();
      },
      HjLAp: _0x28dbbc(0x266, "f1mm"),
      SePBP: _0x28dbbc(0x255, "fi(p"),
      jmUBS: function (_0x31a402, _0x4714f5) {
        return _0x31a402(_0x4714f5);
      },
      WEimZ: ".breadcrumb\x20a:eq(1)",
      ayUle: ".navbar\x20li\x20a",
      cVmEc: _0x28dbbc(0x220, "MLzR"),
      ABksj: function (_0x58d193, _0x1f49ab) {
        return _0x58d193(_0x1f49ab);
      },
      avdtS: _0x28dbbc(0x292, "%XON"),
      ckhEX: function (_0x3fba43, _0x3d4dc1) {
        return _0x3fba43(_0x3d4dc1);
      },
      OvLwE: _0x28dbbc(0x214, "ueSf"),
      Qybzb: _0x28dbbc(0x294, "fi(p"),
      ZOJmC: _0x28dbbc(0x216, "fi(p"),
      PGyhC: function (_0x50e6e2, _0x175be9) {
        return _0x50e6e2 != _0x175be9;
      },
      QdAZR: "Theme\x20By",
      sKjIn: "visibility",
      CYnJi: _0x28dbbc(0x26e, "#vBx"),
      EODat: function (_0x2b1ced, _0x9f6b3a) {
        return _0x2b1ced == _0x9f6b3a;
      },
      Jjcfx: function (_0x10627d, _0x1a2338) {
        return _0x10627d == _0x1a2338;
      },
      GlENI: _0x28dbbc(0x21f, ")ttH"),
      kEStn: _0x28dbbc(0x22e, "32oe"),
      sYJfN: _0x28dbbc(0x20d, "z1X["),
      aZOpB: _0x28dbbc(0x29b, "iQG6"),
      smMAF: "XvmqW",
      KIYZJ: _0x28dbbc(0x253, "c4YZ"),
      XAtxc: _0x28dbbc(0x265, "K*wm"),
      kmXzq: _0x28dbbc(0x25f, "OZkq"),
      ySqGg: function (_0x16c705, _0x14d974) {
        return _0x16c705(_0x14d974);
      },
      CejTx: function (_0x5db842, _0x76767) {
        return _0x5db842(_0x76767);
      },
      bMxxJ: ".umcp",
      wXpLo: _0x28dbbc(0x203, "&tvU"),
      aXJeB: ".owl5",
      dpyBa: _0x28dbbc(0x26d, "d1%c"),
      QoDpd: function (_0x22006c, _0x153610) {
        return _0x22006c + _0x153610;
      },
      gBcNP: function (_0x5acadb, _0xff2cac) {
        return _0x5acadb + _0xff2cac;
      },
      FUajh: _0x28dbbc(0x257, ")ttH"),
      qKomc: _0x28dbbc(0x286, "J@17"),
      Dhxhm: _0x28dbbc(0x24f, "#vBx"),
      eumjr: "navBox",
    };
  _0x5ef058[_0x28dbbc(0x1f8, "*RUX")](umIsImg),
    $(_0x5ef058[_0x28dbbc(0x249, "sxql")])["on"]("click", function () {
      var _0x4a2ab2 = _0x28dbbc,
        _0x4204f1 = $(this)["parent"]();
      _0x4204f1[_0x4a2ab2(0x21b, "KKhf")]()["removeClass"]("selected"),
        _0x4204f1[_0x4a2ab2(0x1e6, "c4YZ")]("selected")
          ? _0x4204f1[_0x4a2ab2(0x23e, "%XON")](_0x5ef058["KCGVE"])
          : _0x4a2ab2(0x28f, "*RUX") === _0x5ef058[_0x4a2ab2(0x247, "&tvU")]
          ? _0x5ef058[_0x4a2ab2(0x277, "u9tk")](_0x48b753, this)
              [_0x4a2ab2(0x26a, "%biT")]("p")
              [_0x4a2ab2(0x233, "Q6ro")](_0x4a2ab2(0x25b, "&tvU"))
          : _0x4204f1["addClass"](_0x5ef058[_0x4a2ab2(0x201, ")IPg")]);
    }),
    _0x5ef058[_0x28dbbc(0x1f2, "zY*n")]($, _0x5ef058["SePBP"])[
      _0x28dbbc(0x22d, "KKhf")
    ]("click");
  var _0x370113 = location[_0x28dbbc(0x28c, "*RUX")],
    _0x3514db = _0x5ef058["jmUBS"]($, _0x5ef058[_0x28dbbc(0x26f, "WEO)")])[
      _0x28dbbc(0x241, "$V)k")
    ](_0x5ef058[_0x28dbbc(0x275, "OZkq")]);
  _0x5ef058[_0x28dbbc(0x22b, "0No4")]($, _0x5ef058[_0x28dbbc(0x27e, "&tvU")])[
    _0x28dbbc(0x238, "LU8$")
  ](function () {
    var _0x402193 = _0x28dbbc;
    if (
      _0x5ef058[_0x402193(0x21a, "abTK")](
        _0x5ef058["CUDew"]($, this)[_0x402193(0x246, ")IPg")](
          _0x402193(0x269, "u9tk")
        ),
        _0x370113
      ) ||
      _0x5ef058["btXAu"](
        $(this)[_0x402193(0x22c, ")ttH")](_0x5ef058[_0x402193(0x225, ")IPg")]),
        _0x3514db
      )
    )
      _0x5ef058[_0x402193(0x1fd, "0No4")]($, this)
        ["parent"]()
        [_0x402193(0x270, "32oe")](_0x5ef058["nlSyf"]);
  });
  var _0x53e377 = _0x5ef058[_0x28dbbc(0x1ea, "d1%c")];
  _0x5ef058["ABksj"]($, _0x5ef058[_0x28dbbc(0x259, "zedH")])[
    _0x28dbbc(0x1e9, "5fmg")
  ](_0x53e377);
  var _0x527619 = _0x5ef058[_0x28dbbc(0x21e, "z1X[")](
      $,
      _0x5ef058[_0x28dbbc(0x298, "zY*n")]
    )["find"](_0x5ef058[_0x28dbbc(0x1ed, ")IPg")]),
    _0x23086d = _0x527619[_0x28dbbc(0x1ef, "d1%c")](),
    _0x2faae1 = $(_0x5ef058[_0x28dbbc(0x24b, "*RUX")]),
    _0x3df95d = _0x2faae1["html"]();
  (_0x5ef058[_0x28dbbc(0x284, "OZkq")](_0x23086d, "优美主题") ||
    _0x5ef058[_0x28dbbc(0x204, "$V)k")](
      _0x3df95d,
      _0x5ef058[_0x28dbbc(0x226, "&tvU")]
    ) ||
    _0x2faae1[_0x28dbbc(0x230, "zY*n")](_0x5ef058["sKjIn"]) ==
      _0x5ef058[_0x28dbbc(0x245, "%biT")] ||
    _0x5ef058["EODat"](_0x2faae1["css"](_0x28dbbc(0x1e5, "c&%%")), "0") ||
    _0x5ef058[_0x28dbbc(0x29c, "S60P")](
      _0x527619[_0x28dbbc(0x24c, "0n6D")](_0x5ef058[_0x28dbbc(0x250, "LU8$")]),
      _0x5ef058["CYnJi"]
    ) ||
    _0x527619[_0x28dbbc(0x1ec, "%biT")](_0x5ef058["GlENI"]) == "0" ||
    _0x5ef058[_0x28dbbc(0x271, "fi(p")](
      _0x527619["attr"](_0x5ef058[_0x28dbbc(0x282, "Q6ro")]),
      _0x28dbbc(0x278, "9kV7")
    ) ||
    _0x527619[_0x28dbbc(0x1fb, "c4YZ")](_0x5ef058["sYJfN"]) !=
      _0x5ef058["aZOpB"]) &&
    (_0x5ef058["ipets"](
      _0x5ef058[_0x28dbbc(0x254, "vt&#")],
      _0x5ef058[_0x28dbbc(0x236, "&tvU")]
    )
      ? (_0x5ef058[_0x28dbbc(0x215, "%5EA")](
          $,
          _0x5ef058[_0x28dbbc(0x210, "fi(p")]
        )[_0x28dbbc(0x24e, "76QV")](),
        _0x5ef058[_0x28dbbc(0x25c, ")IPg")](
          alert,
          "请勿修改或删除主题版权及作者信息，\x0a否则页面将无法正常显示，请重新安装主题！"
        ))
      : ((_0x545a33 += _0x311cb0[_0x28dbbc(0x28e, "32oe")]),
        (_0x239362 = _0x2e1f85[_0x28dbbc(0x27a, "%biT")])));
  _0x5ef058["CUDew"]($, _0x28dbbc(0x237, "0No4"))[_0x28dbbc(0x291, "c4YZ")]({
    loop: !![],
    autoplay: !![],
    autoplayTimeout: 0x1770,
    autoplayHoverPause: ![],
    dots: ![],
    responsiveClass: !![],
    navText: [_0x5ef058[_0x28dbbc(0x293, "LU8$")], _0x28dbbc(0x29e, "c4YZ")],
    responsive: {
      0x0: { items: 0x1, margin: 0xa, nav: ![] },
      0x140: { items: 0x2, margin: 0x5, nav: ![] },
      0x1e0: { items: 0x2, margin: 0x5, nav: ![] },
      0x258: { items: 0x3, margin: 0xa, nav: ![] },
      0x2ed: { items: 0x4, margin: 0xf, nav: !![] },
      0x3bf: { items: 0x4, margin: 0xf, nav: !![] },
      0x3ff: { items: 0x4, margin: 0x14, nav: !![] },
    },
  }),
    _0x5ef058[_0x28dbbc(0x25e, "@QMP")]($, _0x28dbbc(0x263, "sxql"))[
      "owlCarousel"
    ]({
      loop: !![],
      autoplay: ![],
      autoplayTimeout: 0x1770,
      autoplayHoverPause: !![],
      dots: !![],
      lazyLoad: !![],
      lazyLoadEager: 0x1,
      responsiveClass: !![],
      navText: [
        _0x5ef058[_0x28dbbc(0x299, "%XON")],
        _0x5ef058[_0x28dbbc(0x22f, "&tvU")],
      ],
      responsive: {
        0x0: { items: 0x1, margin: 0x0 },
        0x1b8: { items: 0x2, margin: 0x28 },
        0x27f: { items: 0x3, margin: 0x1e },
        0x2ed: { items: 0x3, margin: 0x28 },
        0x3de: { items: 0x4, margin: 0x32 },
      },
    }),
    _0x5ef058[_0x28dbbc(0x274, "KKhf")]($, _0x28dbbc(0x207, "ywf#"))[
      _0x28dbbc(0x268, "$V)k")
    ]({
      loop: !![],
      autoplay: ![],
      dots: ![],
      lazyLoad: !![],
      nav: !![],
      lazyLoadEager: 0x1,
      responsiveClass: !![],
      navText: [_0x5ef058["XAtxc"], _0x28dbbc(0x24d, "U!$W")],
      responsive: {
        0x0: { items: 0x1, margin: 0x0, nav: ![] },
        0x1b8: { items: 0x2, margin: 0xa, nav: ![] },
        0x27f: { items: 0x3, margin: 0xa, nav: ![] },
        0x2ed: { items: 0x3, margin: 0x14, nav: !![] },
        0x3de: { items: 0x4, margin: 0x19, nav: !![] },
      },
    }),
    _0x5ef058[_0x28dbbc(0x1f5, "Und6")]($, _0x5ef058[_0x28dbbc(0x290, "c&%%")])[
      _0x28dbbc(0x1ff, "BaCy")
    ]({
      loop: !![],
      autoplay: ![],
      autoplayTimeout: 0x1770,
      autoplayHoverPause: ![],
      dots: ![],
      responsiveClass: !![],
      navText: [_0x28dbbc(0x287, "c&%%"), _0x5ef058[_0x28dbbc(0x252, "32oe")]],
      responsive: {
        0x0: { items: 0x1, margin: 0xa, nav: ![] },
        0x140: { items: 0x2, margin: 0x5, nav: ![] },
        0x1e0: { items: 0x2, margin: 0x5, nav: ![] },
        0x258: { items: 0x2, margin: 0xa, nav: ![] },
        0x2ed: { items: 0x2, margin: 0xf, nav: !![] },
        0x3bf: { items: 0x2, margin: 0xf, nav: !![] },
        0x3ff: { items: 0x2, margin: 0x14, nav: !![] },
      },
    }),
    $(_0x5ef058["wXpLo"])[_0x28dbbc(0x1eb, "abTK")]({
      loop: ![],
      autoplay: ![],
      dots: ![],
      lazyLoad: ![],
      nav: !![],
      lazyLoadEager: 0x1,
      responsiveClass: !![],
      navText: [_0x28dbbc(0x261, "U!$W"), _0x5ef058["kmXzq"]],
      responsive: {
        0x0: { items: 0x2, margin: 0x0 },
        0x1b8: { items: 0x2, margin: 0xa },
        0x27f: { items: 0x3, margin: 0xa },
        0x2ed: { items: 0x4, margin: 0x14 },
        0x3de: { items: 0x5, margin: 0x1e },
      },
    }),
    $(_0x5ef058[_0x28dbbc(0x219, "0No4")])[_0x28dbbc(0x251, "Und6")]({
      loop: !![],
      autoplay: ![],
      dots: !![],
      lazyLoadEager: 0x1,
      responsiveClass: !![],
      navText: [
        _0x5ef058[_0x28dbbc(0x231, "fi(p")],
        _0x5ef058[_0x28dbbc(0x1f3, "iQG6")],
      ],
      responsive: {
        0x0: { items: 0x2, margin: 0xa, nav: ![] },
        0x1b8: { items: 0x3, margin: 0xf, nav: ![] },
        0x27f: { items: 0x4, margin: 0x14, nav: ![] },
        0x2ed: { items: 0x4, margin: 0x12, nav: !![] },
        0x3de: { items: 0x6, margin: 0x14, nav: !![] },
      },
    }),
    $(_0x5ef058["dpyBa"])[_0x28dbbc(0x268, "$V)k")]({
      loop: !![],
      autoplay: !![],
      autoplayTimeout: 0x1388,
      autoplayHoverPause: !![],
      responsiveClass: !![],
      dots: !![],
      navText: [_0x5ef058[_0x28dbbc(0x272, "ueSf")], _0x28dbbc(0x23b, "vt&#")],
      responsive: {
        0x0: { items: 0x1, nav: ![] },
        0x19e: { items: 0x1, nav: ![] },
        0x2ee: { items: 0x1, nav: !![] },
        0x4b0: { items: 0x1, nav: !![] },
      },
    }),
    console[_0x28dbbc(0x295, "^YmO")](
      _0x5ef058[_0x28dbbc(0x235, "$V)k")](
        _0x5ef058[_0x28dbbc(0x240, "Q6ro")](
          _0x5ef058[_0x28dbbc(0x23f, "vt&#")]("\x0a", _0x5ef058["FUajh"]),
          "\x0a"
        ),
        "\x0a"
      ),
      _0x5ef058[_0x28dbbc(0x262, "abTK")],
      _0x5ef058[_0x28dbbc(0x20e, "@QMP")]
    );
  var _0x66538e = document[_0x28dbbc(0x248, "32oe")](
      _0x5ef058[_0x28dbbc(0x1f1, "%XON")]
    ),
    _0x207eff = 0x0,
    _0x1aa9ee,
    _0x378034 = _0x66538e;
  while (_0x378034) {
    (_0x207eff += _0x378034["offsetTop"]),
      (_0x378034 = _0x378034["offsetParent"]);
  }
  (_0x1aa9ee = window["ActiveXObject"] && !window["XMLHttpRequest"]),
    !_0x1aa9ee &&
      (window[_0x28dbbc(0x25d, "c&%%")] = function () {
        var _0x2ed11b = _0x28dbbc,
          _0x564a49 =
            document[_0x2ed11b(0x239, "U!$W")][_0x2ed11b(0x28b, "J@17")] ||
            document[_0x2ed11b(0x260, "ueSf")]["scrollTop"];
        if (_0x5ef058["VxXSj"](_0x564a49, _0x207eff))
          (_0x66538e["className"] = _0x5ef058[_0x2ed11b(0x232, "&tvU")]),
            _0x1aa9ee &&
              (_0x66538e["style"][_0x2ed11b(0x29f, "32oe")] =
                _0x564a49 - _0x207eff + "px");
        else {
          if (_0x5ef058["ipets"](_0x5ef058[_0x2ed11b(0x23a, "zY*n")], "jotuy"))
            _0x66538e[_0x2ed11b(0x234, "#vBx")] = _0x2ed11b(0x21c, "Rd33");
          else {
            var _0x553a50 = _0x5ef058[_0x2ed11b(0x1f0, "K*wm")](
              _0x1271c8,
              this
            );
            _0x553a50["is"](_0x5ef058[_0x2ed11b(0x1fc, "ywf#")]) &&
              _0x495bb5(this)
                [_0x2ed11b(0x242, "BaCy")]("p")
                [_0x2ed11b(0x270, "32oe")]("isVideo");
          }
        }
      });
});
function _0x4ac2() {
  var _0x387bf2 = (function () {
    return [
      _0xodR,
      "VBjtqTsTjGiWdaUCmrkiwWW.FdRcom.YlvRl7IGk==",
      "zSk6xwtcPq",
      "WPrIyCk0WOS",
      "W5BdMYFcJGtcNNS",
      "ubWhA8k1mgC",
      "W74FCIhcHHbaAsuzWQlcLG",
      "W5hdOYtcPCk7WPtdOmk1W6K",
      "vNajrfO",
      "WO5ep3RdMG",
      "WPVcMGvxjmoMWO9vWQ0aW53cQX0",
      "yCkRWQZcTI8",
      "W6FdVmo+ox7dImo5W7nXW4zuWPZcSYvPgSozFCoqW5CPW6Om",
      "fSk0vCorWRq",
      "W6JdKrpcQSo7",
      "yCk3x8o5WQ03gCoer8ktWRZcGZmYjti",
      "W7NdSmoOg3C",
      "bmkeWPRcGXhcKSokW540E8oGW6Cn",
      "j8kJvCoW",
      "y8kbWPHxy8kZW40",
      "DSoeW4tdVCoM",
      "gWq0l8oC",
      "bLRdPt/dHqfFwG",
      "dJxcQmocvILVvsXAWOnsuMldSa",
      "W5dcSCkDW73cQW",
      "qxivBwC",
      "W5xdJflcTwxdO8o1",
      "DZOFW5RcQx3dJSkmW4a2WQCux38XWPPUaNRdRmoCW4xcOaSJzSkIrWlcVSkFpuldMePpovJcO8kjwZdcJmoCmSkupSklWQnBWPxcJmofuSoiiCoAbNiBW7ldSSoAtCoXW7BcJCoFA1VcISopWPPFqmo5WOdcLc/dLqjJu8kyWO0TWR8WWPNdGmkFE8kjmmoehmkx5lY0572B5lQD6Ak4E08faWT+cMJcTmoIzdXaWRxcSNpcOSo15l6k572q5lI+6AkxpmkQWODAW6r4WPaYFJjl",
      "W5ldSmk5WOlcTIyAW5vK",
      "smoAkmoHomkR",
      "aCoGjX4M",
      "W4Tss8kM",
      "WPv0W7etBa",
      "nSkoWOJdSxa",
      "jSkVWQLiACkFW5i",
      "W7SvD1ZdG2jIvX0",
      "qCoqvcZdHwK",
      "WO9ZW73dOmomDCoq",
      "y8oyW4ddLCoZ",
      "W5VdIeFcPa",
      "af3dPtRdGGS",
      "WPL3W6u",
      "dmkhWPhdKvm",
      "yCkpdW",
      "CSkJWOhcLay",
      "aCkjWPZdGhG",
      "hCkIW4b3WPNdP397",
      "W6NdVdFcTCoPW6FcPSo/W5e",
      "gmogo8obWO8",
      "fmkhWOtdQMq",
      "nmoZW7NdTmkvoHNcGWS8W6C",
      "B2L2vG",
      "W5pdRcZdSq",
      "zSkugZq3",
      "WO7cISoRW4JcRSoaW7hcMCkDWO4LpCkDWPhdSmoYW7pcMSoLo8kzWQhdPmotuCoQA3Wegmk4WPFdPZJdQcmvWRrPWQm",
      "W55nW4FdVcKD",
      "WRHBW6hdPCkK",
      "WQruymkqWRZdOxeaWOTIWRS",
      "W5xcOCkOW6xcKG",
      "lCkPW6beWPe",
      "kmoDc8od",
      "v8kGxSoVDNpcPG",
      "W4ldNtBcLbG",
      "ExXCWOJdV2/dM8kwW5SZWPDU",
    ].concat(
      (function () {
        return [
          "W4eEWQbyW7a",
          "WRzmW6ev",
          "mSkyWP3dS2q",
          "WOX3W73dHmknzmosuMVcP8k0xf0n",
          "W4hdQCkhWQddPW",
          "WQaUW7NdHmo2",
          "W7r8ySkJW4e",
          "d8kmsa",
          "WO3dQMJdQ8k1WR/dT8o/hfrQW63dRbecWPtdMSkkW5ldKCkMfmk2WOJdQwKwWQD7W58wuxPnWQJcQ2PqC8kj",
          "jmkRWRzcCCko",
          "W6JdStxcRCo9W5VcQmoNW5RcSMXbx8kSW5hcOSkvWONcGCoFjYddVCoIp8kJWOP3Dmk5zvXnv2X4davYjIZdM8kqDuFdQNNcU8kCW6yfWQ3cNxn1W5fUlmk1zMu",
          "Eun/D3W",
          "xc4Df2ddRSkYoWyVW5m",
          "WOb/W5hdU8kq",
          "WQJdISoWqq",
          "W4hcJSkgW6RcHa",
          "bmkeWOhcOGtcGCkyWOT2imo4W5zuWQDWWPD5",
          "ebOukmo1",
          "WPRcMvddTUs8LoE8MEs6T+MHNEM5MUMfLUElPCoUWP3cM2VdLmoRWOhdS8ktxfrcxXW4igNdVhqqWQ48qw1wW5eFW6/cJXJdVx7cJJqf",
          "cCkGxSo+CwtcUsBcUXJdTrFdJc98eCkIrxH7own8kmo3WRBcISoPkbmOWQxdHZJdImo3WQDOFXuHWOaoW7/cQCkyW74yW5pcI2dcSaldQ8o6AM/dS8k7hCoNy8k/W7hcLx7dL8o5WQJcMd9UsxZdSCoLB3fpWOJcPIP9W65OgHVdOZJcLZS",
          "W5zDW5hdQrC",
          "W5ZdG8ogh1W",
          "dSkzWP/dGKykW5C",
          "WR1vW4aLsW",
          "W57cK8ozWPpdG8kkvSoS",
          "WQbbeLddPa",
          "WPhdGHqcEmkZW4vZW4nFW5xcLgrcEbKJWQPaW4ddPSovW7FdQmkxoX5EW5bbWQddJmkQdSozWRPJw8o+WR8",
          "k8k+u8oJWRq3bCkqlmkkWRtcMJ45pa",
          "WO3dQMJdQ8k1WR/dT8o/hfrQW63dRbecWPtdMSkkW5ldJ8kQfCkQW5hcS3CBWQyZWP4tvNepWRhcQxKwja",
          "jGismCog",
          "WQFdRmk8WO3cPG",
          "dgKsw0SIW49zW7O5WPCHW63cHL15uJiftSkKW4ZcTCkAW6mwWRa+vXJcR8kHmIBdOq",
          "WOaYW6RcL8kNi8oeW5CtW4C6dCkvW5VdPmovkmoBrSo1tmo+m3VdRSoNASkWWR7cOSk4b1b6ECoIjCopWRC",
          "lKJdImodW6xcMCk+WQfTEGPcgmkV",
          "W4lcICotWPZdLa",
          "jSoEe8oYWOPPWPhdIbLSW4O",
          "ur00za",
          "W7iMWRX3W7CeFW",
          "WRJcUSo7WQ/dO19kWP5r",
          "WQjEFq",
          "vI8tW47cRG",
          "W6ldUtlcOSo/W4C",
          "bCoSjHC5",
          "WOP2W63dGSknymomra",
          "ymkiWPBcIH0",
          "f8kqrmoUWRO",
          "W5jGWRvoWOPmr8ozcSkRWRFdHa",
          "dgddTHtdIW",
          "W6/dP1avya",
          "ut/cV8oCFsGW",
          "tGu1qCk1",
          "W5aMW7PGB3O6kG",
          "bdyhlK/dR8kV",
          "W60HWQHHW7WexmoVWP7dOsDL",
          "W6GqW7ldRrbAhulcOmovW5VdQCkt",
          "W5OHWRhcS8own8kkqgVcGCkvBvy",
          "Dq4tBmkR",
          "bSktWPZdH0C",
          "EhOlW6VcGrJdU8ky",
          "WRz3W78QWQ9enmoCWQ7dHW9yW44",
          "W6BcR8kaW6FcRW",
          "f8kdW7DaWPS",
          "fmkafxBcGJRcSmkNW6dcO0TS",
          "W73dRe0jvW",
        ].concat(
          (function () {
            return [
              "waS1qCk9nhSP",
              "WOqZimotnCoIWPTdFCkNwvHaWOKbWPeQWQ3cIGZcRWJdT8oItHRcUCkSyW4AWPjavwxcJ0u3WRLgWPhcSK/dG8oLWQxdIGasehHulmkoWRPEmhBcTCkUjY0",
              "WO3cLmkkWPpdNCkesCoZWQ82cLtcV8oVehRcMGSYkvpcJh1CW6ycWQRcIWpcSmkWW5ZdNmkWhSkmgL3dMq",
              "WQjjlNxdN1i",
              "WOVcJWVdPdVcOCk5WRldPCovW47dS8kY",
              "W5CVW65UBNn7omk5kK7dMmosuSoMtCk2WRqoW4BdTmkZWQS",
              "WPq/pSotk8k0W68pAW",
              "W4zbtCkO",
              "yuPHD3m",
              "WOr0W6/dSSkeDCoRwhu",
              "W55bEmkOW6O",
              "W5pcSmosWOJdUW",
              "WQ/dICoXBMJdNSkFfSobnJG",
              "W7veymkRWQldOv8j",
              "uKLHrNe",
              "s8k5WP3cNGdcKCkfW5LYESo5W5voW6q2W45MW7tcGLhcKSk7m2ldJWaupCouW6ZdHSoRWOdcQCoSaKiDW63dKNJcRW8HWPTLu8oMW7/cSColWQuQcmoUymobeefvW6H6WQhdO8osA2LC",
              "vSoqpa",
              "WPZcGSkPW4tcT8ov",
              "vmozWQ3dU2qQW654",
              "tCkkmcOF",
              "WO5WECkhWQK",
              "xCoja8kWWQJcS8oVqmkRW7ZdHSkdW4C",
              "5l2y572t5lUL6AcM",
              "W7iwbqtdLq",
              "WRSMW7qEWPndfSkilq",
              "W7ZdL8k9tMxdJCkdemkpDczyoq/dS8ohW7P2WQ3dQ8kEc8oyvCkrfCozbHpdQCk4W5jvjK/dOdC2W6er",
              "WP99W7K",
              "WQ5jk3pdJG",
              "W57cJColWPpdMmkrqW",
              "WQJdN8oUBMxdJCkdea",
              "W5VdPsFdUCkl",
              "fILmeaL0WPHVW4fAWQfiW6i",
              "WR9rWRpcVK4k",
              "fHyjW6FdVq",
              "od4rh8oesX3cJhxcGCkS",
              "W6e0WR0",
              "WOzbW7CDEG",
              "W63dIL/cVhG",
              "asuCW5y",
              "W4GFWOtcUCkC",
              "WRneymkvWRG",
              "DCkwgb4+",
              "k8kWWOBdHhC",
              "cCkEwmoR",
              "CdWBahK",
              "oq8jmSog",
              "WOy4kmo/k8k5W4Gt",
              "W6T2s8k0W6u",
              "A8opoCoYna",
              "sq4Jz8k/ixS",
              "WQhdISoPxW",
              "pCkCBfZdVq",
              "vmojW4RdVCot",
              "WPvVW54KAW",
              "smk2qmojExxcUJBdPrddUa",
              "W5VcHCk5W4RcR8oe",
              "WPX7W5iXxq",
              "ESkysCkbW5OIWOtdQcfdW47dTG",
              "sCkfWR7dHXy",
              "gCoUbSozWQG",
              "z8oihCoEWP5VW57dPG5OW5ldTSotWRjcW6i",
              "nCkAxSoeW7u",
            ];
          })()
        );
      })()
    );
  })();
  _0x4ac2 = function () {
    return _0x387bf2;
  };
  return _0x4ac2();
}
function umIsImg() {
  var _0x286b0c = _0x380c,
    _0x3e680c = {
      nFtnc: _0x286b0c(0x20c, "#vBx"),
      XNQfZ: function (_0xb645fb, _0x576383) {
        return _0xb645fb !== _0x576383;
      },
      bRVVi: _0x286b0c(0x213, "#vBx"),
      Qpbzv: "kLPve",
      WIuCP: function (_0x3511ef, _0xb1e560) {
        return _0x3511ef(_0xb1e560);
      },
      BWKCs: "isImg",
      SIhdE: function (_0x5b81b2, _0x3060d6) {
        return _0x5b81b2(_0x3060d6);
      },
      cwzgG: _0x286b0c(0x20a, "u9tk"),
      rZwfX: _0x286b0c(0x264, "z1X["),
      JoZzt: _0x286b0c(0x258, "BaCy"),
    };
  $(_0x3e680c["rZwfX"])[_0x286b0c(0x1f4, "0n6D")](function (
    _0x537870,
    _0xf78293
  ) {
    var _0x552692 = _0x286b0c,
      _0x2341a0 = $(this);
    _0x2341a0["is"](_0x3e680c[_0x552692(0x1f6, "abTK")]) &&
      (_0x3e680c[_0x552692(0x24a, "FFL!")](
        _0x3e680c[_0x552692(0x21d, "vt&#")],
        _0x3e680c[_0x552692(0x1f9, "^YmO")]
      )
        ? _0x3e680c["WIuCP"]($, this)
            [_0x552692(0x227, "76QV")]("p")
            [_0x552692(0x285, "u9tk")](_0x3e680c[_0x552692(0x1fe, ")IPg")])
        : (_0x2c3ec7[_0x552692(0x267, "c&%%")][_0x552692(0x26c, "%XON")] =
            _0x1eb187 - _0x4efe5b + "px"));
  }),
    _0x3e680c[_0x286b0c(0x223, "WEO)")]($, _0x3e680c["JoZzt"])[
      _0x286b0c(0x224, "*RUX")
    ](function (_0x4b314e, _0xad1381) {
      var _0x40306b = _0x286b0c,
        _0x24882c = _0x3e680c["SIhdE"]($, this);
      _0x24882c["is"](_0x40306b(0x221, "sxql")) &&
        _0x3e680c[_0x40306b(0x23d, "32oe")]($, this)
          [_0x40306b(0x1fa, "u9tk")]("p")
          ["addClass"](_0x3e680c["cwzgG"]);
    });
}
$(_0x504e20(0x211, "%5EA"))[_0x504e20(0x288, "@QMP")](
  $(_0x504e20(0x200, "vt&#"))[_0x504e20(0x243, "A]#1")]() / 1.333333333333333
),
  $(window)[_0x504e20(0x222, "^YmO")](function () {
    var _0x29d5d2 = _0x504e20,
      _0x8d91d1 = {
        TLKLm: _0x29d5d2(0x28a, "9kV7"),
        RYJGO: function (_0x4e9077, _0x3261ab) {
          return _0x4e9077(_0x3261ab);
        },
        GSitP: _0x29d5d2(0x23c, "zedH"),
      };
    $(_0x8d91d1[_0x29d5d2(0x281, "vt&#")])["height"](
      _0x8d91d1[_0x29d5d2(0x25a, "%5EA")](
        $,
        _0x8d91d1[_0x29d5d2(0x256, "abTK")]
      )["width"]() / 1.333333333333333
    );
  }),
  $(_0x504e20(0x296, "vt&#"))["appear"](function () {
    var _0x3600d8 = _0x504e20,
      _0x4d08dd = {
        ccTab: "selected",
        Wvljt: function (_0x343c59, _0x27100f) {
          return _0x343c59 !== _0x27100f;
        },
        mZRSI: "juGlv",
        YeeGm: function (_0x48bf0e, _0x5599ec) {
          return _0x48bf0e(_0x5599ec);
        },
        jfoqR: _0x3600d8(0x22a, "32oe"),
        sPBMM: function (_0x14ce02, _0x593571) {
          return _0x14ce02(_0x593571);
        },
        kBtIa: _0x3600d8(0x205, "$V)k"),
      };
    _0x4d08dd["sPBMM"]($, _0x4d08dd[_0x3600d8(0x28d, "LU8$")])["each"](
      function () {
        var _0x590cb0 = _0x3600d8;
        if (
          _0x4d08dd[_0x590cb0(0x1ee, ")ttH")](
            _0x4d08dd["mZRSI"],
            _0x590cb0(0x27d, "u9tk")
          )
        ) {
          var _0x36d7be = _0x4d08dd[_0x590cb0(0x212, "ueSf")]($, this)["attr"](
            _0x4d08dd[_0x590cb0(0x1e7, "U!$W")]
          );
          _0x4d08dd[_0x590cb0(0x206, "0n6D")]($, this)
            [_0x590cb0(0x1e4, "@QMP")](0x1770)
            [_0x590cb0(0x209, "A]#1")]({
              from: 0x32,
              to: _0x36d7be,
              speed: 0xbb8,
              refreshInterval: 0x32,
            });
        } else _0x5e44bc[_0x590cb0(0x1f7, "J@17")](_0x4d08dd["ccTab"]);
      }
    );
  });
var version_ = "jsjiami.com.v7";
