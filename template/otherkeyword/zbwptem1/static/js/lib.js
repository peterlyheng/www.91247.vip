/*!
jquery.lazy1.9.1
*/
(function ($, window, document, undefined) {
  var $window = $(window);
  $.fn.lazyload = function (options) {
    var elements = this;
    var $container;
    var settings = {
      threshold: 0,
      failure_limit: 0,
      event: "scroll",
      effect: "show",
      container: window,
      data_attribute: "original",
      skip_invisible: true,
      appear: null,
      load: null,
      placeholder:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC",
    };
    function update() {
      var counter = 0;
      elements.each(function () {
        var $this = $(this);
        if (settings.skip_invisible && !$this.is(":visible")) {
          return;
        }
        if ($.abovethetop(this, settings) || $.leftofbegin(this, settings)) {
        } else if (
          !$.belowthefold(this, settings) &&
          !$.rightoffold(this, settings)
        ) {
          $this.trigger("appear");
          counter = 0;
        } else {
          if (++counter > settings.failure_limit) {
            return false;
          }
        }
      });
    }
    if (options) {
      if (undefined !== options.failurelimit) {
        options.failure_limit = options.failurelimit;
        delete options.failurelimit;
      }
      if (undefined !== options.effectspeed) {
        options.effect_speed = options.effectspeed;
        delete options.effectspeed;
      }
      $.extend(settings, options);
    }
    $container =
      settings.container === undefined || settings.container === window
        ? $window
        : $(settings.container);
    if (0 === settings.event.indexOf("scroll")) {
      $container.bind(settings.event, function () {
        return update();
      });
    }
    this.each(function () {
      var self = this;
      var $self = $(self);
      self.loaded = false;
      if ($self.attr("src") === undefined || $self.attr("src") === false) {
        if ($self.is("img")) {
          $self.attr("src", settings.placeholder);
        }
      }
      $self.one("appear", function () {
        if (!this.loaded) {
          if (settings.appear) {
            var elements_left = elements.length;
            settings.appear.call(self, elements_left, settings);
          }
          $("<img />")
            .bind("load", function () {
              var original = $self.attr("data-" + settings.data_attribute);
              $self.hide();
              if ($self.is("img")) {
                $self.attr("src", original);
              } else {
                $self.css("background-image", "url('" + original + "')");
              }
              $self[settings.effect](settings.effect_speed);
              self.loaded = true;
              var temp = $.grep(elements, function (element) {
                return !element.loaded;
              });
              elements = $(temp);
              if (settings.load) {
                var elements_left = elements.length;
                settings.load.call(self, elements_left, settings);
              }
            })
            .attr("src", $self.attr("data-" + settings.data_attribute));
        }
      });
      if (0 !== settings.event.indexOf("scroll")) {
        $self.bind(settings.event, function () {
          if (!self.loaded) {
            $self.trigger("appear");
          }
        });
      }
    });
    $window.bind("resize", function () {
      update();
    });
    if (/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)) {
      $window.bind("pageshow", function (event) {
        if (event.originalEvent && event.originalEvent.persisted) {
          elements.each(function () {
            $(this).trigger("appear");
          });
        }
      });
    }
    $(document).ready(function () {
      update();
    });
    return this;
  };
  $.belowthefold = function (element, settings) {
    var fold;
    if (settings.container === undefined || settings.container === window) {
      fold =
        (window.innerHeight ? window.innerHeight : $window.height()) +
        $window.scrollTop();
    } else {
      fold =
        $(settings.container).offset().top + $(settings.container).height();
    }
    return fold <= $(element).offset().top - settings.threshold;
  };
  $.rightoffold = function (element, settings) {
    var fold;
    if (settings.container === undefined || settings.container === window) {
      fold = $window.width() + $window.scrollLeft();
    } else {
      fold =
        $(settings.container).offset().left + $(settings.container).width();
    }
    return fold <= $(element).offset().left - settings.threshold;
  };
  $.abovethetop = function (element, settings) {
    var fold;
    if (settings.container === undefined || settings.container === window) {
      fold = $window.scrollTop();
    } else {
      fold = $(settings.container).offset().top;
    }
    return (
      fold >= $(element).offset().top + settings.threshold + $(element).height()
    );
  };
  $.leftofbegin = function (element, settings) {
    var fold;
    if (settings.container === undefined || settings.container === window) {
      fold = $window.scrollLeft();
    } else {
      fold = $(settings.container).offset().left;
    }
    return (
      fold >= $(element).offset().left + settings.threshold + $(element).width()
    );
  };
  $.inviewport = function (element, settings) {
    return (
      !$.rightoffold(element, settings) &&
      !$.leftofbegin(element, settings) &&
      !$.belowthefold(element, settings) &&
      !$.abovethetop(element, settings)
    );
  };
  $.extend($.expr[":"], {
    "below-the-fold": function (a) {
      return $.belowthefold(a, { threshold: 0 });
    },
    "above-the-top": function (a) {
      return !$.belowthefold(a, { threshold: 0 });
    },
    "right-of-screen": function (a) {
      return $.rightoffold(a, { threshold: 0 });
    },
    "left-of-screen": function (a) {
      return !$.rightoffold(a, { threshold: 0 });
    },
    "in-viewport": function (a) {
      return $.inviewport(a, { threshold: 0 });
    },
    "above-the-fold": function (a) {
      return !$.belowthefold(a, { threshold: 0 });
    },
    "right-of-fold": function (a) {
      return $.rightoffold(a, { threshold: 0 });
    },
    "left-of-fold": function (a) {
      return !$.rightoffold(a, { threshold: 0 });
    },
  });
})(jQuery, window, document);

/*!手拉风琴;*/
("use strict");
!(function (t, i) {
  var e = { id: "#cardArea", sid: ".item" };
  i.fn.cardArea = function (t) {
    var t = i.extend({}, e, t);
    return this.each(function () {
      var e = i(t.id),
        n = e.find(t.sid);
      n.on("mouseenter", function () {
        i(this).addClass("active").siblings().removeClass("active");
      });
    });
  };
})(window, jQuery);
/*!WOW - v1.1.3 - 2016-05-06
 * Copyright (c) 2016 Matthieu Aussaguel;*/
(function () {
  var a,
    B,
    b,
    I,
    g,
    Z = function (a, B) {
      return function () {
        return a.apply(B, arguments);
      };
    },
    c =
      [].indexOf ||
      function (a) {
        for (var B = 0, b = this.length; b > B; B++)
          if (B in this && this[B] === a) return B;
        return -1;
      };
  (B = (function () {
    function a() {}
    return (
      (a.prototype.extend = function (a, B) {
        var b, I;
        for (b in B) (I = B[b]), null == a[b] && (a[b] = I);
        return a;
      }),
      (a.prototype.isMobile = function (a) {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          a
        );
      }),
      (a.prototype.createEvent = function (a, B, b, I) {
        var g;
        return (
          null == B && (B = !1),
          null == b && (b = !1),
          null == I && (I = null),
          null != document.createEvent
            ? ((g = document.createEvent("CustomEvent")),
              g.initCustomEvent(a, B, b, I))
            : null != document.createEventObject
            ? ((g = document.createEventObject()), (g.eventType = a))
            : (g.eventName = a),
          g
        );
      }),
      (a.prototype.emitEvent = function (a, B) {
        return null != a.dispatchEvent
          ? a.dispatchEvent(B)
          : B in (null != a)
          ? a[B]()
          : "on" + B in (null != a)
          ? a["on" + B]()
          : void 0;
      }),
      (a.prototype.addEvent = function (a, B, b) {
        return null != a.addEventListener
          ? a.addEventListener(B, b, !1)
          : null != a.attachEvent
          ? a.attachEvent("on" + B, b)
          : (a[B] = b);
      }),
      (a.prototype.removeEvent = function (a, B, b) {
        return null != a.removeEventListener
          ? a.removeEventListener(B, b, !1)
          : null != a.detachEvent
          ? a.detachEvent("on" + B, b)
          : delete a[B];
      }),
      (a.prototype.innerHeight = function () {
        return "innerHeight" in window
          ? window.innerHeight
          : document.documentElement.clientHeight;
      }),
      a
    );
  })()),
    (b =
      this.WeakMap ||
      this.MozWeakMap ||
      (b = (function () {
        function a() {
          (this.keys = []), (this.values = []);
        }
        return (
          (a.prototype.get = function (a) {
            var B, b, I, g, Z;
            for (Z = this.keys, B = I = 0, g = Z.length; g > I; B = ++I)
              if (((b = Z[B]), b === a)) return this.values[B];
          }),
          (a.prototype.set = function (a, B) {
            var b, I, g, Z, c;
            for (c = this.keys, b = g = 0, Z = c.length; Z > g; b = ++g)
              if (((I = c[b]), I === a)) return void (this.values[b] = B);
            return this.keys.push(a), this.values.push(B);
          }),
          a
        );
      })())),
    (a =
      this.MutationObserver ||
      this.WebkitMutationObserver ||
      this.MozMutationObserver ||
      (a = (function () {
        function a() {
          "undefined" != typeof console &&
            null !== console &&
            console.warn("MutationObserver is not supported by your browser."),
            "undefined" != typeof console &&
              null !== console &&
              console.warn(
                "WOW.js cannot detect dom mutations, please call .sync() after loading new content."
              );
        }
        return (a.notSupported = !0), (a.prototype.observe = function () {}), a;
      })())),
    (I =
      this.getComputedStyle ||
      function (a, B) {
        return (
          (this.getPropertyValue = function (B) {
            var b;
            return (
              "float" === B && (B = "styleFloat"),
              g.test(B) &&
                B.replace(g, function (a, B) {
                  return B.toUpperCase();
                }),
              (null != (b = a.currentStyle) ? b[B] : void 0) || null
            );
          }),
          this
        );
      }),
    (g = /(\-([a-z]){1})/g),
    (this.WOW = (function () {
      function g(a) {
        null == a && (a = {}),
          (this.scrollCallback = Z(this.scrollCallback, this)),
          (this.scrollHandler = Z(this.scrollHandler, this)),
          (this.resetAnimation = Z(this.resetAnimation, this)),
          (this.start = Z(this.start, this)),
          (this.scrolled = !0),
          (this.config = this.util().extend(a, this.defaults)),
          null != a.scrollContainer &&
            (this.config.scrollContainer = document.querySelector(
              a.scrollContainer
            )),
          (this.animationNameCache = new b()),
          (this.wowEvent = this.util().createEvent(this.config.boxClass));
      }
      return (
        (g.prototype.defaults = {
          boxClass: "wow",
          animateClass: "animated",
          offset: 0,
          mobile: !0,
          live: !0,
          callback: null,
          scrollContainer: null,
        }),
        (g.prototype.init = function () {
          var a;
          return (
            (this.element = window.document.documentElement),
            "interactive" === (a = document.readyState) || "complete" === a
              ? this.start()
              : this.util().addEvent(document, "DOMContentLoaded", this.start),
            (this.finished = [])
          );
        }),
        (g.prototype.start = function () {
          var B, b, I, g;
          if (
            ((this.stopped = !1),
            (this.boxes = function () {
              var a, b, I, g;
              for (
                I = this.element.querySelectorAll("." + this.config.boxClass),
                  g = [],
                  a = 0,
                  b = I.length;
                b > a;
                a++
              )
                (B = I[a]), g.push(B);
              return g;
            }.call(this)),
            (this.all = function () {
              var a, b, I, g;
              for (I = this.boxes, g = [], a = 0, b = I.length; b > a; a++)
                (B = I[a]), g.push(B);
              return g;
            }.call(this)),
            this.boxes.length)
          )
            if (this.disabled()) this.resetStyle();
            else
              for (g = this.boxes, b = 0, I = g.length; I > b; b++)
                (B = g[b]), this.applyStyle(B, !0);
          return (
            this.disabled() ||
              (this.util().addEvent(
                this.config.scrollContainer || window,
                "scroll",
                this.scrollHandler
              ),
              this.util().addEvent(window, "resize", this.scrollHandler),
              (this.interval = setInterval(this.scrollCallback, 50))),
            this.config.live
              ? new a(
                  (function (a) {
                    return function (B) {
                      var b, I, g, Z, c;
                      for (c = [], b = 0, I = B.length; I > b; b++)
                        (Z = B[b]),
                          c.push(
                            function () {
                              var a, B, b, I;
                              for (
                                b = Z.addedNodes || [],
                                  I = [],
                                  a = 0,
                                  B = b.length;
                                B > a;
                                a++
                              )
                                (g = b[a]), I.push(this.doSync(g));
                              return I;
                            }.call(a)
                          );
                      return c;
                    };
                  })(this)
                ).observe(document.body, { childList: !0, subtree: !0 })
              : void 0
          );
        }),
        (g.prototype.stop = function () {
          return (
            (this.stopped = !0),
            this.util().removeEvent(
              this.config.scrollContainer || window,
              "scroll",
              this.scrollHandler
            ),
            this.util().removeEvent(window, "resize", this.scrollHandler),
            null != this.interval ? clearInterval(this.interval) : void 0
          );
        }),
        (g.prototype.sync = function (B) {
          return a.notSupported ? this.doSync(this.element) : void 0;
        }),
        (g.prototype.doSync = function (a) {
          var B, b, I, g, Z;
          if ((null == a && (a = this.element), 1 === a.nodeType)) {
            for (
              a = a.parentNode || a,
                g = a.querySelectorAll("." + this.config.boxClass),
                Z = [],
                b = 0,
                I = g.length;
              I > b;
              b++
            )
              (B = g[b]),
                c.call(this.all, B) < 0
                  ? (this.boxes.push(B),
                    this.all.push(B),
                    this.stopped || this.disabled()
                      ? this.resetStyle()
                      : this.applyStyle(B, !0),
                    Z.push((this.scrolled = !0)))
                  : Z.push(void 0);
            return Z;
          }
        }),
        (g.prototype.show = function (a) {
          return (
            this.applyStyle(a),
            (a.className = a.className + " " + this.config.animateClass),
            null != this.config.callback && this.config.callback(a),
            this.util().emitEvent(a, this.wowEvent),
            this.util().addEvent(a, "animationend", this.resetAnimation),
            this.util().addEvent(a, "oanimationend", this.resetAnimation),
            this.util().addEvent(a, "webkitAnimationEnd", this.resetAnimation),
            this.util().addEvent(a, "MSAnimationEnd", this.resetAnimation),
            a
          );
        }),
        (g.prototype.applyStyle = function (a, B) {
          var b, I, g;
          return (
            (I = a.getAttribute("data-wow-duration")),
            (b = a.getAttribute("data-wow-delay")),
            (g = a.getAttribute("data-wow-iteration")),
            this.animate(
              (function (Z) {
                return function () {
                  return Z.customStyle(a, B, I, b, g);
                };
              })(this)
            )
          );
        }),
        (g.prototype.animate = (function () {
          return "requestAnimationFrame" in window
            ? function (a) {
                return window.requestAnimationFrame(a);
              }
            : function (a) {
                return a();
              };
        })()),
        (g.prototype.resetStyle = function () {
          var a, B, b, I, g;
          for (I = this.boxes, g = [], B = 0, b = I.length; b > B; B++)
            (a = I[B]), g.push((a.style.visibility = "visible"));
          return g;
        }),
        (g.prototype.resetAnimation = function (a) {
          var B;
          return a.type.toLowerCase().indexOf("animationend") >= 0
            ? ((B = a.target || a.srcElement),
              (B.className = B.className
                .replace(this.config.animateClass, "")
                .trim()))
            : void 0;
        }),
        (g.prototype.customStyle = function (a, B, b, I, g) {
          return (
            B && this.cacheAnimationName(a),
            (a.style.visibility = B ? "hidden" : "visible"),
            b && this.vendorSet(a.style, { animationDuration: b }),
            I && this.vendorSet(a.style, { animationDelay: I }),
            g && this.vendorSet(a.style, { animationIterationCount: g }),
            this.vendorSet(a.style, {
              animationName: B ? "none" : this.cachedAnimationName(a),
            }),
            a
          );
        }),
        (g.prototype.vendors = ["moz", "webkit"]),
        (g.prototype.vendorSet = function (a, B) {
          var b, I, g, Z;
          I = [];
          for (b in B)
            (g = B[b]),
              (a["" + b] = g),
              I.push(
                function () {
                  var B, I, c, j;
                  for (
                    c = this.vendors, j = [], B = 0, I = c.length;
                    I > B;
                    B++
                  )
                    (Z = c[B]),
                      j.push(
                        (a["" + Z + b.charAt(0).toUpperCase() + b.substr(1)] =
                          g)
                      );
                  return j;
                }.call(this)
              );
          return I;
        }),
        (g.prototype.vendorCSS = function (a, B) {
          var b, g, Z, c, j, d;
          for (
            j = I(a),
              c = j.getPropertyCSSValue(B),
              Z = this.vendors,
              b = 0,
              g = Z.length;
            g > b;
            b++
          )
            (d = Z[b]), (c = c || j.getPropertyCSSValue("-" + d + "-" + B));
          return c;
        }),
        (g.prototype.animationName = function (a) {
          var B;
          try {
            B = this.vendorCSS(a, "animation-name").cssText;
          } catch (b) {
            B = I(a).getPropertyValue("animation-name");
          }
          return "none" === B ? "" : B;
        }),
        (g.prototype.cacheAnimationName = function (a) {
          return this.animationNameCache.set(a, this.animationName(a));
        }),
        (g.prototype.cachedAnimationName = function (a) {
          return this.animationNameCache.get(a);
        }),
        (g.prototype.scrollHandler = function () {
          return (this.scrolled = !0);
        }),
        (g.prototype.scrollCallback = function () {
          var a;
          return !this.scrolled ||
            ((this.scrolled = !1),
            (this.boxes = function () {
              var B, b, I, g;
              for (I = this.boxes, g = [], B = 0, b = I.length; b > B; B++)
                (a = I[B]), a && (this.isVisible(a) ? this.show(a) : g.push(a));
              return g;
            }.call(this)),
            this.boxes.length || this.config.live)
            ? void 0
            : this.stop();
        }),
        (g.prototype.offsetTop = function (a) {
          for (var B; void 0 === a.offsetTop; ) a = a.parentNode;
          for (B = a.offsetTop; (a = a.offsetParent); ) B += a.offsetTop;
          return B;
        }),
        (g.prototype.isVisible = function (a) {
          var B, b, I, g, Z;
          return (
            (b = a.getAttribute("data-wow-offset") || this.config.offset),
            (Z =
              (this.config.scrollContainer &&
                this.config.scrollContainer.scrollTop) ||
              window.pageYOffset),
            (g =
              Z +
              Math.min(this.element.clientHeight, this.util().innerHeight()) -
              b),
            (I = this.offsetTop(a)),
            (B = I + a.clientHeight),
            g >= I && B >= Z
          );
        }),
        (g.prototype.util = function () {
          return null != this._util ? this._util : (this._util = new B());
        }),
        (g.prototype.disabled = function () {
          return (
            !this.config.mobile && this.util().isMobile(navigator.userAgent)
          );
        }),
        g
      );
    })());
}.call(this));
!(function (a, B, b, I) {
  function g(B, b) {
    (this.settings = null),
      (this.options = a.extend({}, g.Defaults, b)),
      (this.$element = a(B)),
      (this._handlers = {}),
      (this._plugins = {}),
      (this._supress = {}),
      (this._current = null),
      (this._speed = null),
      (this._coordinates = []),
      (this._breakpoint = null),
      (this._width = null),
      (this._items = []),
      (this._clones = []),
      (this._mergers = []),
      (this._widths = []),
      (this._invalidated = {}),
      (this._pipe = []),
      (this._drag = {
        time: null,
        target: null,
        pointer: null,
        stage: { start: null, current: null },
        direction: null,
      }),
      (this._states = {
        current: {},
        tags: {
          initializing: ["busy"],
          animating: ["busy"],
          dragging: ["interacting"],
        },
      }),
      a.each(
        ["onResize", "onThrottledResize"],
        a.proxy(function (B, b) {
          this._handlers[b] = a.proxy(this[b], this);
        }, this)
      ),
      a.each(
        g.Plugins,
        a.proxy(function (a, B) {
          this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new B(this);
        }, this)
      ),
      a.each(
        g.Workers,
        a.proxy(function (B, b) {
          this._pipe.push({ filter: b.filter, run: a.proxy(b.run, this) });
        }, this)
      ),
      this.setup(),
      this.initialize();
  }
  (g.Defaults = {
    items: 3,
    loop: !1,
    center: !1,
    rewind: !1,
    checkVisibility: !0,
    mouseDrag: !0,
    touchDrag: !0,
    pullDrag: !0,
    freeDrag: !1,
    margin: 0,
    stagePadding: 0,
    merge: !1,
    mergeFit: !0,
    autoWidth: !1,
    startPosition: 0,
    rtl: !1,
    smartSpeed: 250,
    fluidSpeed: !1,
    dragEndSpeed: !1,
    responsive: {},
    responsiveRefreshRate: 200,
    responsiveBaseElement: B,
    fallbackEasing: "swing",
    slideTransition: "",
    info: !1,
    nestedItemSelector: !1,
    itemElement: "div",
    stageElement: "div",
    refreshClass: "owl-refresh",
    loadedClass: "owl-loaded",
    loadingClass: "owl-loading",
    rtlClass: "owl-rtl",
    responsiveClass: "owl-responsive",
    dragClass: "owl-drag",
    itemClass: "owl-item",
    stageClass: "owl-stage",
    stageOuterClass: "owl-stage-outer",
    grabClass: "owl-grab",
  }),
    (g.Width = { Default: "default", Inner: "inner", Outer: "outer" }),
    (g.Type = { Event: "event", State: "state" }),
    (g.Plugins = {}),
    (g.Workers = [
      {
        filter: ["width", "settings"],
        run: function () {
          this._width = this.$element.width();
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          a.current = this._items && this._items[this.relative(this._current)];
        },
      },
      {
        filter: ["items", "settings"],
        run: function () {
          this.$stage.children(".cloned").remove();
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          var B = this.settings.margin || "",
            b = !this.settings.autoWidth,
            I = this.settings.rtl,
            g = {
              width: "auto",
              "margin-left": I ? B : "",
              "margin-right": I ? "" : B,
            };
          !b && this.$stage.children().css(g), (a.css = g);
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          var B =
              (this.width() / this.settings.items).toFixed(3) -
              this.settings.margin,
            b = null,
            I = this._items.length,
            g = !this.settings.autoWidth,
            Z = [];
          for (a.items = { merge: !1, width: B }; I--; )
            (b = this._mergers[I]),
              (b =
                (this.settings.mergeFit && Math.min(b, this.settings.items)) ||
                b),
              (a.items.merge = b > 1 || a.items.merge),
              (Z[I] = g ? B * b : this._items[I].width());
          this._widths = Z;
        },
      },
      {
        filter: ["items", "settings"],
        run: function () {
          var B = [],
            b = this._items,
            I = this.settings,
            g = Math.max(2 * I.items, 4),
            Z = 2 * Math.ceil(b.length / 2),
            c = I.loop && b.length ? (I.rewind ? g : Math.max(g, Z)) : 0,
            j = "",
            d = "";
          for (c /= 2; c > 0; )
            B.push(this.normalize(B.length / 2, !0)),
              (j += b[B[B.length - 1]][0].outerHTML),
              B.push(this.normalize(b.length - 1 - (B.length - 1) / 2, !0)),
              (d = b[B[B.length - 1]][0].outerHTML + d),
              (c -= 1);
          (this._clones = B),
            a(j).addClass("cloned").appendTo(this.$stage),
            a(d).addClass("cloned").prependTo(this.$stage);
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function () {
          for (
            var a = this.settings.rtl ? 1 : -1,
              B = this._clones.length + this._items.length,
              b = -1,
              I = 0,
              g = 0,
              Z = [];
            ++b < B;

          )
            (I = Z[b - 1] || 0),
              (g = this._widths[this.relative(b)] + this.settings.margin),
              Z.push(I + g * a);
          this._coordinates = Z;
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function () {
          var a = this.settings.stagePadding,
            B = this._coordinates,
            b = {
              width: Math.ceil(Math.abs(B[B.length - 1])) + 2 * a,
              "padding-left": a || "",
              "padding-right": a || "",
            };
          this.$stage.css(b);
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          var B = this._coordinates.length,
            b = !this.settings.autoWidth,
            I = this.$stage.children();
          if (b && a.items.merge)
            for (; B--; )
              (a.css.width = this._widths[this.relative(B)]),
                I.eq(B).css(a.css);
          else b && ((a.css.width = a.items.width), I.css(a.css));
        },
      },
      {
        filter: ["items"],
        run: function () {
          this._coordinates.length < 1 && this.$stage.removeAttr("style");
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          (a.current = a.current ? this.$stage.children().index(a.current) : 0),
            (a.current = Math.max(
              this.minimum(),
              Math.min(this.maximum(), a.current)
            )),
            this.reset(a.current);
        },
      },
      {
        filter: ["position"],
        run: function () {
          this.animate(this.coordinates(this._current));
        },
      },
      {
        filter: ["width", "position", "items", "settings"],
        run: function () {
          var a,
            B,
            b,
            I,
            g = this.settings.rtl ? 1 : -1,
            Z = 2 * this.settings.stagePadding,
            c = this.coordinates(this.current()) + Z,
            j = c + this.width() * g,
            d = [];
          for (b = 0, I = this._coordinates.length; b < I; b++)
            (a = this._coordinates[b - 1] || 0),
              (B = Math.abs(this._coordinates[b]) + Z * g),
              ((this.op(a, "<=", c) && this.op(a, ">", j)) ||
                (this.op(B, "<", c) && this.op(B, ">", j))) &&
                d.push(b);
          this.$stage.children(".active").removeClass("active"),
            this.$stage
              .children(":eq(" + d.join("), :eq(") + ")")
              .addClass("active"),
            this.$stage.children(".center").removeClass("center"),
            this.settings.center &&
              this.$stage.children().eq(this.current()).addClass("center");
        },
      },
    ]),
    (g.prototype.initializeStage = function () {
      (this.$stage = this.$element.find("." + this.settings.stageClass)),
        this.$stage.length ||
          (this.$element.addClass(this.options.loadingClass),
          (this.$stage = a("<" + this.settings.stageElement + ">", {
            class: this.settings.stageClass,
          }).wrap(a("<div/>", { class: this.settings.stageOuterClass }))),
          this.$element.append(this.$stage.parent()));
    }),
    (g.prototype.initializeItems = function () {
      var B = this.$element.find(".owl-item");
      if (B.length)
        return (
          (this._items = B.get().map(function (B) {
            return a(B);
          })),
          (this._mergers = this._items.map(function () {
            return 1;
          })),
          void this.refresh()
        );
      this.replace(this.$element.children().not(this.$stage.parent())),
        this.isVisible() ? this.refresh() : this.invalidate("width"),
        this.$element
          .removeClass(this.options.loadingClass)
          .addClass(this.options.loadedClass);
    }),
    (g.prototype.initialize = function () {
      if (
        (this.enter("initializing"),
        this.trigger("initialize"),
        this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl),
        this.settings.autoWidth && !this.is("pre-loading"))
      ) {
        var a, B, b;
        (a = this.$element.find("img")),
          (B = this.settings.nestedItemSelector
            ? "." + this.settings.nestedItemSelector
            : I),
          (b = this.$element.children(B).width()),
          a.length && b <= 0 && this.preloadAutoWidthImages(a);
      }
      this.initializeStage(),
        this.initializeItems(),
        this.registerEventHandlers(),
        this.leave("initializing"),
        this.trigger("initialized");
    }),
    (g.prototype.isVisible = function () {
      return !this.settings.checkVisibility || this.$element.is(":visible");
    }),
    (g.prototype.setup = function () {
      var B = this.viewport(),
        b = this.options.responsive,
        I = -1,
        g = null;
      b
        ? (a.each(b, function (a) {
            a <= B && a > I && (I = Number(a));
          }),
          (g = a.extend({}, this.options, b[I])),
          "function" == typeof g.stagePadding &&
            (g.stagePadding = g.stagePadding()),
          delete g.responsive,
          g.responsiveClass &&
            this.$element.attr(
              "class",
              this.$element
                .attr("class")
                .replace(
                  new RegExp(
                    "(" + this.options.responsiveClass + "-)\\S+\\s",
                    "g"
                  ),
                  "$1" + I
                )
            ))
        : (g = a.extend({}, this.options)),
        this.trigger("change", { property: { name: "settings", value: g } }),
        (this._breakpoint = I),
        (this.settings = g),
        this.invalidate("settings"),
        this.trigger("changed", {
          property: { name: "settings", value: this.settings },
        });
    }),
    (g.prototype.optionsLogic = function () {
      this.settings.autoWidth &&
        ((this.settings.stagePadding = !1), (this.settings.merge = !1));
    }),
    (g.prototype.prepare = function (B) {
      var b = this.trigger("prepare", { content: B });
      return (
        b.data ||
          (b.data = a("<" + this.settings.itemElement + "/>")
            .addClass(this.options.itemClass)
            .append(B)),
        this.trigger("prepared", { content: b.data }),
        b.data
      );
    }),
    (g.prototype.update = function () {
      for (
        var B = 0,
          b = this._pipe.length,
          I = a.proxy(function (a) {
            return this[a];
          }, this._invalidated),
          g = {};
        B < b;

      )
        (this._invalidated.all || a.grep(this._pipe[B].filter, I).length > 0) &&
          this._pipe[B].run(g),
          B++;
      (this._invalidated = {}), !this.is("valid") && this.enter("valid");
    }),
    (g.prototype.width = function (a) {
      switch ((a = a || g.Width.Default)) {
        case g.Width.Inner:
        case g.Width.Outer:
          return this._width;
        default:
          return (
            this._width - 2 * this.settings.stagePadding + this.settings.margin
          );
      }
    }),
    (g.prototype.refresh = function () {
      this.enter("refreshing"),
        this.trigger("refresh"),
        this.setup(),
        this.optionsLogic(),
        this.$element.addClass(this.options.refreshClass),
        this.update(),
        this.$element.removeClass(this.options.refreshClass),
        this.leave("refreshing"),
        this.trigger("refreshed");
    }),
    (g.prototype.onThrottledResize = function () {
      B.clearTimeout(this.resizeTimer),
        (this.resizeTimer = B.setTimeout(
          this._handlers.onResize,
          this.settings.responsiveRefreshRate
        ));
    }),
    (g.prototype.onResize = function () {
      return (
        !!this._items.length &&
        this._width !== this.$element.width() &&
        !!this.isVisible() &&
        (this.enter("resizing"),
        this.trigger("resize").isDefaultPrevented()
          ? (this.leave("resizing"), !1)
          : (this.invalidate("width"),
            this.refresh(),
            this.leave("resizing"),
            void this.trigger("resized")))
      );
    }),
    (g.prototype.registerEventHandlers = function () {
      a.support.transition &&
        this.$stage.on(
          a.support.transition.end + ".owl.core",
          a.proxy(this.onTransitionEnd, this)
        ),
        !1 !== this.settings.responsive &&
          this.on(B, "resize", this._handlers.onThrottledResize),
        this.settings.mouseDrag &&
          (this.$element.addClass(this.options.dragClass),
          this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)),
          this.$stage.on(
            "dragstart.owl.core selectstart.owl.core",
            function () {
              return !1;
            }
          )),
        this.settings.touchDrag &&
          (this.$stage.on(
            "touchstart.owl.core",
            a.proxy(this.onDragStart, this)
          ),
          this.$stage.on(
            "touchcancel.owl.core",
            a.proxy(this.onDragEnd, this)
          ));
    }),
    (g.prototype.onDragStart = function (B) {
      var I = null;
      3 !== B.which &&
        (a.support.transform
          ? ((I = this.$stage
              .css("transform")
              .replace(/.*\(|\)| /g, "")
              .split(",")),
            (I = {
              x: I[16 === I.length ? 12 : 4],
              y: I[16 === I.length ? 13 : 5],
            }))
          : ((I = this.$stage.position()),
            (I = {
              x: this.settings.rtl
                ? I.left +
                  this.$stage.width() -
                  this.width() +
                  this.settings.margin
                : I.left,
              y: I.top,
            })),
        this.is("animating") &&
          (a.support.transform ? this.animate(I.x) : this.$stage.stop(),
          this.invalidate("position")),
        this.$element.toggleClass(
          this.options.grabClass,
          "mousedown" === B.type
        ),
        this.speed(0),
        (this._drag.time = new Date().getTime()),
        (this._drag.target = a(B.target)),
        (this._drag.stage.start = I),
        (this._drag.stage.current = I),
        (this._drag.pointer = this.pointer(B)),
        a(b).on(
          "mouseup.owl.core touchend.owl.core",
          a.proxy(this.onDragEnd, this)
        ),
        a(b).one(
          "mousemove.owl.core touchmove.owl.core",
          a.proxy(function (B) {
            var I = this.difference(this._drag.pointer, this.pointer(B));
            a(b).on(
              "mousemove.owl.core touchmove.owl.core",
              a.proxy(this.onDragMove, this)
            ),
              (Math.abs(I.x) < Math.abs(I.y) && this.is("valid")) ||
                (B.preventDefault(),
                this.enter("dragging"),
                this.trigger("drag"));
          }, this)
        ));
    }),
    (g.prototype.onDragMove = function (a) {
      var B = null,
        b = null,
        I = null,
        g = this.difference(this._drag.pointer, this.pointer(a)),
        Z = this.difference(this._drag.stage.start, g);
      this.is("dragging") &&
        (a.preventDefault(),
        this.settings.loop
          ? ((B = this.coordinates(this.minimum())),
            (b = this.coordinates(this.maximum() + 1) - B),
            (Z.x = ((((Z.x - B) % b) + b) % b) + B))
          : ((B = this.settings.rtl
              ? this.coordinates(this.maximum())
              : this.coordinates(this.minimum())),
            (b = this.settings.rtl
              ? this.coordinates(this.minimum())
              : this.coordinates(this.maximum())),
            (I = this.settings.pullDrag ? (-1 * g.x) / 5 : 0),
            (Z.x = Math.max(Math.min(Z.x, B + I), b + I))),
        (this._drag.stage.current = Z),
        this.animate(Z.x));
    }),
    (g.prototype.onDragEnd = function (B) {
      var I = this.difference(this._drag.pointer, this.pointer(B)),
        g = this._drag.stage.current,
        Z = (I.x > 0) ^ this.settings.rtl ? "left" : "right";
      a(b).off(".owl.core"),
        this.$element.removeClass(this.options.grabClass),
        ((0 !== I.x && this.is("dragging")) || !this.is("valid")) &&
          (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
          this.current(this.closest(g.x, 0 !== I.x ? Z : this._drag.direction)),
          this.invalidate("position"),
          this.update(),
          (this._drag.direction = Z),
          (Math.abs(I.x) > 3 || new Date().getTime() - this._drag.time > 300) &&
            this._drag.target.one("click.owl.core", function () {
              return !1;
            })),
        this.is("dragging") &&
          (this.leave("dragging"), this.trigger("dragged"));
    }),
    (g.prototype.closest = function (B, b) {
      var g = -1,
        Z = 30,
        c = this.width(),
        j = this.coordinates();
      return (
        this.settings.freeDrag ||
          a.each(
            j,
            a.proxy(function (a, d) {
              return (
                "left" === b && B > d - Z && B < d + Z
                  ? (g = a)
                  : "right" === b && B > d - c - Z && B < d - c + Z
                  ? (g = a + 1)
                  : this.op(B, "<", d) &&
                    this.op(B, ">", j[a + 1] !== I ? j[a + 1] : d - c) &&
                    (g = "left" === b ? a + 1 : a),
                -1 === g
              );
            }, this)
          ),
        this.settings.loop ||
          (this.op(B, ">", j[this.minimum()])
            ? (g = B = this.minimum())
            : this.op(B, "<", j[this.maximum()]) && (g = B = this.maximum())),
        g
      );
    }),
    (g.prototype.animate = function (B) {
      var b = this.speed() > 0;
      this.is("animating") && this.onTransitionEnd(),
        b && (this.enter("animating"), this.trigger("translate")),
        a.support.transform3d && a.support.transition
          ? this.$stage.css({
              transform: "translate3d(" + B + "px,0px,0px)",
              transition:
                this.speed() / 1e3 +
                "s" +
                (this.settings.slideTransition
                  ? " " + this.settings.slideTransition
                  : ""),
            })
          : b
          ? this.$stage.animate(
              { left: B + "px" },
              this.speed(),
              this.settings.fallbackEasing,
              a.proxy(this.onTransitionEnd, this)
            )
          : this.$stage.css({ left: B + "px" });
    }),
    (g.prototype.is = function (a) {
      return this._states.current[a] && this._states.current[a] > 0;
    }),
    (g.prototype.current = function (a) {
      if (a === I) return this._current;
      if (0 === this._items.length) return I;
      if (((a = this.normalize(a)), this._current !== a)) {
        var B = this.trigger("change", {
          property: { name: "position", value: a },
        });
        B.data !== I && (a = this.normalize(B.data)),
          (this._current = a),
          this.invalidate("position"),
          this.trigger("changed", {
            property: { name: "position", value: this._current },
          });
      }
      return this._current;
    }),
    (g.prototype.invalidate = function (B) {
      return (
        "string" === a.type(B) &&
          ((this._invalidated[B] = !0),
          this.is("valid") && this.leave("valid")),
        a.map(this._invalidated, function (a, B) {
          return B;
        })
      );
    }),
    (g.prototype.reset = function (a) {
      (a = this.normalize(a)) !== I &&
        ((this._speed = 0),
        (this._current = a),
        this.suppress(["translate", "translated"]),
        this.animate(this.coordinates(a)),
        this.release(["translate", "translated"]));
    }),
    (g.prototype.normalize = function (a, B) {
      var b = this._items.length,
        g = B ? 0 : this._clones.length;
      return (
        !this.isNumeric(a) || b < 1
          ? (a = I)
          : (a < 0 || a >= b + g) &&
            (a = ((((a - g / 2) % b) + b) % b) + g / 2),
        a
      );
    }),
    (g.prototype.relative = function (a) {
      return (a -= this._clones.length / 2), this.normalize(a, !0);
    }),
    (g.prototype.maximum = function (a) {
      var B,
        b,
        I,
        g = this.settings,
        Z = this._coordinates.length;
      if (g.loop) Z = this._clones.length / 2 + this._items.length - 1;
      else if (g.autoWidth || g.merge) {
        if ((B = this._items.length))
          for (
            b = this._items[--B].width(), I = this.$element.width();
            B-- && !((b += this._items[B].width() + this.settings.margin) > I);

          );
        Z = B + 1;
      } else
        Z = g.center ? this._items.length - 1 : this._items.length - g.items;
      return a && (Z -= this._clones.length / 2), Math.max(Z, 0);
    }),
    (g.prototype.minimum = function (a) {
      return a ? 0 : this._clones.length / 2;
    }),
    (g.prototype.items = function (a) {
      return a === I
        ? this._items.slice()
        : ((a = this.normalize(a, !0)), this._items[a]);
    }),
    (g.prototype.mergers = function (a) {
      return a === I
        ? this._mergers.slice()
        : ((a = this.normalize(a, !0)), this._mergers[a]);
    }),
    (g.prototype.clones = function (B) {
      var b = this._clones.length / 2,
        g = b + this._items.length,
        Z = function (a) {
          return a % 2 == 0 ? g + a / 2 : b - (a + 1) / 2;
        };
      return B === I
        ? a.map(this._clones, function (a, B) {
            return Z(B);
          })
        : a.map(this._clones, function (a, b) {
            return a === B ? Z(b) : null;
          });
    }),
    (g.prototype.speed = function (a) {
      return a !== I && (this._speed = a), this._speed;
    }),
    (g.prototype.coordinates = function (B) {
      var b,
        g = 1,
        Z = B - 1;
      return B === I
        ? a.map(
            this._coordinates,
            a.proxy(function (a, B) {
              return this.coordinates(B);
            }, this)
          )
        : (this.settings.center
            ? (this.settings.rtl && ((g = -1), (Z = B + 1)),
              (b = this._coordinates[B]),
              (b += ((this.width() - b + (this._coordinates[Z] || 0)) / 2) * g))
            : (b = this._coordinates[Z] || 0),
          (b = Math.ceil(b)));
    }),
    (g.prototype.duration = function (a, B, b) {
      return 0 === b
        ? 0
        : Math.min(Math.max(Math.abs(B - a), 1), 6) *
            Math.abs(b || this.settings.smartSpeed);
    }),
    (g.prototype.to = function (a, B) {
      var b = this.current(),
        I = null,
        g = a - this.relative(b),
        Z = (g > 0) - (g < 0),
        c = this._items.length,
        j = this.minimum(),
        d = this.maximum();
      this.settings.loop
        ? (!this.settings.rewind && Math.abs(g) > c / 2 && (g += -1 * Z * c),
          (a = b + g),
          (I = ((((a - j) % c) + c) % c) + j) !== a &&
            I - g <= d &&
            I - g > 0 &&
            ((b = I - g), (a = I), this.reset(b)))
        : this.settings.rewind
        ? ((d += 1), (a = ((a % d) + d) % d))
        : (a = Math.max(j, Math.min(d, a))),
        this.speed(this.duration(b, a, B)),
        this.current(a),
        this.isVisible() && this.update();
    }),
    (g.prototype.next = function (a) {
      (a = a || !1), this.to(this.relative(this.current()) + 1, a);
    }),
    (g.prototype.prev = function (a) {
      (a = a || !1), this.to(this.relative(this.current()) - 1, a);
    }),
    (g.prototype.onTransitionEnd = function (a) {
      if (
        a !== I &&
        (a.stopPropagation(),
        (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))
      )
        return !1;
      this.leave("animating"), this.trigger("translated");
    }),
    (g.prototype.viewport = function () {
      var I;
      return (
        this.options.responsiveBaseElement !== B
          ? (I = a(this.options.responsiveBaseElement).width())
          : B.innerWidth
          ? (I = B.innerWidth)
          : b.documentElement && b.documentElement.clientWidth
          ? (I = b.documentElement.clientWidth)
          : console.warn("Can not detect viewport width."),
        I
      );
    }),
    (g.prototype.replace = function (B) {
      this.$stage.empty(),
        (this._items = []),
        B && (B = B instanceof jQuery ? B : a(B)),
        this.settings.nestedItemSelector &&
          (B = B.find("." + this.settings.nestedItemSelector)),
        B.filter(function () {
          return 1 === this.nodeType;
        }).each(
          a.proxy(function (a, B) {
            (B = this.prepare(B)),
              this.$stage.append(B),
              this._items.push(B),
              this._mergers.push(
                1 *
                  B.find("[data-merge]")
                    .addBack("[data-merge]")
                    .attr("data-merge") || 1
              );
          }, this)
        ),
        this.reset(
          this.isNumeric(this.settings.startPosition)
            ? this.settings.startPosition
            : 0
        ),
        this.invalidate("items");
    }),
    (g.prototype.add = function (B, b) {
      var g = this.relative(this._current);
      (b = b === I ? this._items.length : this.normalize(b, !0)),
        (B = B instanceof jQuery ? B : a(B)),
        this.trigger("add", { content: B, position: b }),
        (B = this.prepare(B)),
        0 === this._items.length || b === this._items.length
          ? (0 === this._items.length && this.$stage.append(B),
            0 !== this._items.length && this._items[b - 1].after(B),
            this._items.push(B),
            this._mergers.push(
              1 *
                B.find("[data-merge]")
                  .addBack("[data-merge]")
                  .attr("data-merge") || 1
            ))
          : (this._items[b].before(B),
            this._items.splice(b, 0, B),
            this._mergers.splice(
              b,
              0,
              1 *
                B.find("[data-merge]")
                  .addBack("[data-merge]")
                  .attr("data-merge") || 1
            )),
        this._items[g] && this.reset(this._items[g].index()),
        this.invalidate("items"),
        this.trigger("added", { content: B, position: b });
    }),
    (g.prototype.remove = function (a) {
      (a = this.normalize(a, !0)) !== I &&
        (this.trigger("remove", { content: this._items[a], position: a }),
        this._items[a].remove(),
        this._items.splice(a, 1),
        this._mergers.splice(a, 1),
        this.invalidate("items"),
        this.trigger("removed", { content: null, position: a }));
    }),
    (g.prototype.preloadAutoWidthImages = function (B) {
      B.each(
        a.proxy(function (B, b) {
          this.enter("pre-loading"),
            (b = a(b)),
            a(new Image())
              .one(
                "load",
                a.proxy(function (a) {
                  b.attr("src", a.target.src),
                    b.css("opacity", 1),
                    this.leave("pre-loading"),
                    !this.is("pre-loading") &&
                      !this.is("initializing") &&
                      this.refresh();
                }, this)
              )
              .attr(
                "src",
                b.attr("src") || b.attr("data-src") || b.attr("data-src-retina")
              );
        }, this)
      );
    }),
    (g.prototype.destroy = function () {
      this.$element.off(".owl.core"),
        this.$stage.off(".owl.core"),
        a(b).off(".owl.core"),
        !1 !== this.settings.responsive &&
          (B.clearTimeout(this.resizeTimer),
          this.off(B, "resize", this._handlers.onThrottledResize));
      for (var I in this._plugins) this._plugins[I].destroy();
      this.$stage.children(".cloned").remove(),
        this.$stage.unwrap(),
        this.$stage.children().contents().unwrap(),
        this.$stage.children().unwrap(),
        this.$stage.remove(),
        this.$element
          .removeClass(this.options.refreshClass)
          .removeClass(this.options.loadingClass)
          .removeClass(this.options.loadedClass)
          .removeClass(this.options.rtlClass)
          .removeClass(this.options.dragClass)
          .removeClass(this.options.grabClass)
          .attr(
            "class",
            this.$element
              .attr("class")
              .replace(
                new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"),
                ""
              )
          )
          .removeData("owl.carousel");
    }),
    (g.prototype.op = function (a, B, b) {
      var I = this.settings.rtl;
      switch (B) {
        case "<":
          return I ? a > b : a < b;
        case ">":
          return I ? a < b : a > b;
        case ">=":
          return I ? a <= b : a >= b;
        case "<=":
          return I ? a >= b : a <= b;
      }
    }),
    (g.prototype.on = function (a, B, b, I) {
      a.addEventListener
        ? a.addEventListener(B, b, I)
        : a.attachEvent && a.attachEvent("on" + B, b);
    }),
    (g.prototype.off = function (a, B, b, I) {
      a.removeEventListener
        ? a.removeEventListener(B, b, I)
        : a.detachEvent && a.detachEvent("on" + B, b);
    }),
    (g.prototype.trigger = function (B, b, I, Z, c) {
      var j = { item: { count: this._items.length, index: this.current() } },
        d = a.camelCase(
          a
            .grep(["on", B, I], function (a) {
              return a;
            })
            .join("-")
            .toLowerCase()
        ),
        E = a.Event(
          [B, "owl", I || "carousel"].join(".").toLowerCase(),
          a.extend({ relatedTarget: this }, j, b)
        );
      return (
        this._supress[B] ||
          (a.each(this._plugins, function (a, B) {
            B.onTrigger && B.onTrigger(E);
          }),
          this.register({ type: g.Type.Event, name: B }),
          this.$element.trigger(E),
          this.settings &&
            "function" == typeof this.settings[d] &&
            this.settings[d].call(this, E)),
        E
      );
    }),
    (g.prototype.enter = function (B) {
      a.each(
        [B].concat(this._states.tags[B] || []),
        a.proxy(function (a, B) {
          this._states.current[B] === I && (this._states.current[B] = 0),
            this._states.current[B]++;
        }, this)
      );
    }),
    (g.prototype.leave = function (B) {
      a.each(
        [B].concat(this._states.tags[B] || []),
        a.proxy(function (a, B) {
          this._states.current[B]--;
        }, this)
      );
    }),
    (g.prototype.register = function (B) {
      if (B.type === g.Type.Event) {
        if (
          (a.event.special[B.name] || (a.event.special[B.name] = {}),
          !a.event.special[B.name].owl)
        ) {
          var b = a.event.special[B.name]._default;
          (a.event.special[B.name]._default = function (a) {
            return !b ||
              !b.apply ||
              (a.namespace && -1 !== a.namespace.indexOf("owl"))
              ? a.namespace && a.namespace.indexOf("owl") > -1
              : b.apply(this, arguments);
          }),
            (a.event.special[B.name].owl = !0);
        }
      } else
        B.type === g.Type.State &&
          (this._states.tags[B.name]
            ? (this._states.tags[B.name] = this._states.tags[B.name].concat(
                B.tags
              ))
            : (this._states.tags[B.name] = B.tags),
          (this._states.tags[B.name] = a.grep(
            this._states.tags[B.name],
            a.proxy(function (b, I) {
              return a.inArray(b, this._states.tags[B.name]) === I;
            }, this)
          )));
    }),
    (g.prototype.suppress = function (B) {
      a.each(
        B,
        a.proxy(function (a, B) {
          this._supress[B] = !0;
        }, this)
      );
    }),
    (g.prototype.release = function (B) {
      a.each(
        B,
        a.proxy(function (a, B) {
          delete this._supress[B];
        }, this)
      );
    }),
    (g.prototype.pointer = function (a) {
      var b = { x: null, y: null };
      return (
        (a = a.originalEvent || a || B.event),
        (a =
          a.touches && a.touches.length
            ? a.touches[0]
            : a.changedTouches && a.changedTouches.length
            ? a.changedTouches[0]
            : a),
        a.pageX
          ? ((b.x = a.pageX), (b.y = a.pageY))
          : ((b.x = a.clientX), (b.y = a.clientY)),
        b
      );
    }),
    (g.prototype.isNumeric = function (a) {
      return !isNaN(parseFloat(a));
    }),
    (g.prototype.difference = function (a, B) {
      return { x: a.x - B.x, y: a.y - B.y };
    }),
    (a.fn.owlCarousel = function (B) {
      var b = Array.prototype.slice.call(arguments, 1);
      return this.each(function () {
        var I = a(this),
          Z = I.data("owl.carousel");
        Z ||
          ((Z = new g(this, "object" == typeof B && B)),
          I.data("owl.carousel", Z),
          a.each(
            [
              "next",
              "prev",
              "to",
              "destroy",
              "refresh",
              "replace",
              "add",
              "remove",
            ],
            function (B, b) {
              Z.register({ type: g.Type.Event, name: b }),
                Z.$element.on(
                  b + ".owl.carousel.core",
                  a.proxy(function (a) {
                    a.namespace &&
                      a.relatedTarget !== this &&
                      (this.suppress([b]),
                      Z[b].apply(this, [].slice.call(arguments, 1)),
                      this.release([b]));
                  }, Z)
                );
            }
          )),
          "string" == typeof B && "_" !== B.charAt(0) && Z[B].apply(Z, b);
      });
    }),
    (a.fn.owlCarousel.Constructor = g);
})(window.Zepto || window.jQuery, window, document),
  (function (a, B, b, I) {
    var g = function (B) {
      (this._core = B),
        (this._interval = null),
        (this._visible = null),
        (this._handlers = {
          "initialized.owl.carousel": a.proxy(function (a) {
            a.namespace && this._core.settings.autoRefresh && this.watch();
          }, this),
        }),
        (this._core.options = a.extend({}, g.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (g.Defaults = { autoRefresh: !0, autoRefreshInterval: 500 }),
      (g.prototype.watch = function () {
        this._interval ||
          ((this._visible = this._core.isVisible()),
          (this._interval = B.setInterval(
            a.proxy(this.refresh, this),
            this._core.settings.autoRefreshInterval
          )));
      }),
      (g.prototype.refresh = function () {
        this._core.isVisible() !== this._visible &&
          ((this._visible = !this._visible),
          this._core.$element.toggleClass("owl-hidden", !this._visible),
          this._visible &&
            this._core.invalidate("width") &&
            this._core.refresh());
      }),
      (g.prototype.destroy = function () {
        var a, b;
        B.clearInterval(this._interval);
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = g);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, B, b, I) {
    var g = function (B) {
      (this._core = B),
        (this._loaded = []),
        (this._handlers = {
          "initialized.owl.carousel change.owl.carousel resized.owl.carousel":
            a.proxy(function (B) {
              if (
                B.namespace &&
                this._core.settings &&
                this._core.settings.lazyLoad &&
                ((B.property && "position" == B.property.name) ||
                  "initialized" == B.type)
              ) {
                var b = this._core.settings,
                  g = (b.center && Math.ceil(b.items / 2)) || b.items,
                  Z = (b.center && -1 * g) || 0,
                  c =
                    (B.property && B.property.value !== I
                      ? B.property.value
                      : this._core.current()) + Z,
                  j = this._core.clones().length,
                  d = a.proxy(function (a, B) {
                    this.load(B);
                  }, this);
                for (
                  b.lazyLoadEager > 0 &&
                  ((g += b.lazyLoadEager),
                  b.loop && ((c -= b.lazyLoadEager), g++));
                  Z++ < g;

                )
                  this.load(j / 2 + this._core.relative(c)),
                    j && a.each(this._core.clones(this._core.relative(c)), d),
                    c++;
              }
            }, this),
        }),
        (this._core.options = a.extend({}, g.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (g.Defaults = { lazyLoad: !1, lazyLoadEager: 0 }),
      (g.prototype.load = function (b) {
        var I = this._core.$stage.children().eq(b),
          g = I && I.find(".owl-lazy");
        !g ||
          a.inArray(I.get(0), this._loaded) > -1 ||
          (g.each(
            a.proxy(function (b, I) {
              var g,
                Z = a(I),
                c =
                  (B.devicePixelRatio > 1 && Z.attr("data-src-retina")) ||
                  Z.attr("data-src") ||
                  Z.attr("data-srcset");
              this._core.trigger("load", { element: Z, url: c }, "lazy"),
                Z.is("img")
                  ? Z.one(
                      "load.owl.lazy",
                      a.proxy(function () {
                        Z.css("opacity", 1),
                          this._core.trigger(
                            "loaded",
                            { element: Z, url: c },
                            "lazy"
                          );
                      }, this)
                    ).attr("src", c)
                  : Z.is("source")
                  ? Z.one(
                      "load.owl.lazy",
                      a.proxy(function () {
                        this._core.trigger(
                          "loaded",
                          { element: Z, url: c },
                          "lazy"
                        );
                      }, this)
                    ).attr("srcset", c)
                  : ((g = new Image()),
                    (g.onload = a.proxy(function () {
                      Z.css({
                        "background-image": 'url("' + c + '")',
                        opacity: "1",
                      }),
                        this._core.trigger(
                          "loaded",
                          { element: Z, url: c },
                          "lazy"
                        );
                    }, this)),
                    (g.src = c));
            }, this)
          ),
          this._loaded.push(I.get(0)));
      }),
      (g.prototype.destroy = function () {
        var a, B;
        for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
        for (B in Object.getOwnPropertyNames(this))
          "function" != typeof this[B] && (this[B] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Lazy = g);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, B, b, I) {
    var g = function (b) {
      (this._core = b),
        (this._previousHeight = null),
        (this._handlers = {
          "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function (
            a
          ) {
            a.namespace && this._core.settings.autoHeight && this.update();
          },
          this),
          "changed.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.autoHeight &&
              "position" === a.property.name &&
              this.update();
          }, this),
          "loaded.owl.lazy": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.autoHeight &&
              a.element.closest("." + this._core.settings.itemClass).index() ===
                this._core.current() &&
              this.update();
          }, this),
        }),
        (this._core.options = a.extend({}, g.Defaults, this._core.options)),
        this._core.$element.on(this._handlers),
        (this._intervalId = null);
      var I = this;
      a(B).on("load", function () {
        I._core.settings.autoHeight && I.update();
      }),
        a(B).resize(function () {
          I._core.settings.autoHeight &&
            (null != I._intervalId && clearTimeout(I._intervalId),
            (I._intervalId = setTimeout(function () {
              I.update();
            }, 250)));
        });
    };
    (g.Defaults = { autoHeight: !1, autoHeightClass: "owl-height" }),
      (g.prototype.update = function () {
        var B = this._core._current,
          b = B + this._core.settings.items,
          I = this._core.settings.lazyLoad,
          g = this._core.$stage.children().toArray().slice(B, b),
          Z = [],
          c = 0;
        a.each(g, function (B, b) {
          Z.push(a(b).height());
        }),
          (c = Math.max.apply(null, Z)),
          c <= 1 && I && this._previousHeight && (c = this._previousHeight),
          (this._previousHeight = c),
          this._core.$stage
            .parent()
            .height(c)
            .addClass(this._core.settings.autoHeightClass);
      }),
      (g.prototype.destroy = function () {
        var a, B;
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (B in Object.getOwnPropertyNames(this))
          "function" != typeof this[B] && (this[B] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.AutoHeight = g);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, B, b, I) {
    var g = function (B) {
      (this._core = B),
        (this._videos = {}),
        (this._playing = null),
        (this._handlers = {
          "initialized.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.register({
                type: "state",
                name: "playing",
                tags: ["interacting"],
              });
          }, this),
          "resize.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.video &&
              this.isInFullScreen() &&
              a.preventDefault();
          }, this),
          "refreshed.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.is("resizing") &&
              this._core.$stage.find(".cloned .owl-video-frame").remove();
          }, this),
          "changed.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              "position" === a.property.name &&
              this._playing &&
              this.stop();
          }, this),
          "prepared.owl.carousel": a.proxy(function (B) {
            if (B.namespace) {
              var b = a(B.content).find(".owl-video");
              b.length &&
                (b.css("display", "none"), this.fetch(b, a(B.content)));
            }
          }, this),
        }),
        (this._core.options = a.extend({}, g.Defaults, this._core.options)),
        this._core.$element.on(this._handlers),
        this._core.$element.on(
          "click.owl.video",
          ".owl-video-play-icon",
          a.proxy(function (a) {
            this.play(a);
          }, this)
        );
    };
    (g.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }),
      (g.prototype.fetch = function (a, B) {
        var b = (function () {
            return a.attr("data-vimeo-id")
              ? "vimeo"
              : a.attr("data-vzaar-id")
              ? "vzaar"
              : "youtube";
          })(),
          I =
            a.attr("data-vimeo-id") ||
            a.attr("data-youtube-id") ||
            a.attr("data-vzaar-id"),
          g = a.attr("data-width") || this._core.settings.videoWidth,
          Z = a.attr("data-height") || this._core.settings.videoHeight,
          c = a.attr("href");
        if (!c) throw new Error("Missing video URL.");
        if (
          ((I = c.match(
            /(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
          )),
          I[3].indexOf("youtu") > -1)
        )
          b = "youtube";
        else if (I[3].indexOf("vimeo") > -1) b = "vimeo";
        else {
          if (!(I[3].indexOf("vzaar") > -1))
            throw new Error("Video URL not supported.");
          b = "vzaar";
        }
        (I = I[6]),
          (this._videos[c] = { type: b, id: I, width: g, height: Z }),
          B.attr("data-video", c),
          this.thumbnail(a, this._videos[c]);
      }),
      (g.prototype.thumbnail = function (B, b) {
        var I,
          g,
          Z,
          c =
            b.width && b.height
              ? "width:" + b.width + "px;height:" + b.height + "px;"
              : "",
          j = B.find("img"),
          d = "src",
          E = "",
          f = this._core.settings,
          A = function (b) {
            (g = '<div class="owl-video-play-icon"></div>'),
              (I = f.lazyLoad
                ? a("<div/>", { class: "owl-video-tn " + E, srcType: b })
                : a("<div/>", {
                    class: "owl-video-tn",
                    style: "opacity:1;background-image:url(" + b + ")",
                  })),
              B.after(I),
              B.after(g);
          };
        if (
          (B.wrap(a("<div/>", { class: "owl-video-wrapper", style: c })),
          this._core.settings.lazyLoad && ((d = "data-src"), (E = "owl-lazy")),
          j.length)
        )
          return A(j.attr(d)), j.remove(), !1;
        "youtube" === b.type
          ? ((Z = "//img.youtube.com/vi/" + b.id + "/hqdefault.jpg"), A(Z))
          : "vimeo" === b.type
          ? a.ajax({
              type: "GET",
              url: "//vimeo.com/api/v2/video/" + b.id + ".json",
              jsonp: "callback",
              dataType: "jsonp",
              success: function (a) {
                (Z = a[0].thumbnail_large), A(Z);
              },
            })
          : "vzaar" === b.type &&
            a.ajax({
              type: "GET",
              url: "//vzaar.com/api/videos/" + b.id + ".json",
              jsonp: "callback",
              dataType: "jsonp",
              success: function (a) {
                (Z = a.framegrab_url), A(Z);
              },
            });
      }),
      (g.prototype.stop = function () {
        this._core.trigger("stop", null, "video"),
          this._playing.find(".owl-video-frame").remove(),
          this._playing.removeClass("owl-video-playing"),
          (this._playing = null),
          this._core.leave("playing"),
          this._core.trigger("stopped", null, "video");
      }),
      (g.prototype.play = function (B) {
        var b,
          I = a(B.target),
          g = I.closest("." + this._core.settings.itemClass),
          Z = this._videos[g.attr("data-video")],
          c = Z.width || "100%",
          j = Z.height || this._core.$stage.height();
        this._playing ||
          (this._core.enter("playing"),
          this._core.trigger("play", null, "video"),
          (g = this._core.items(this._core.relative(g.index()))),
          this._core.reset(g.index()),
          (b = a(
            '<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'
          )),
          b.attr("height", j),
          b.attr("width", c),
          "youtube" === Z.type
            ? b.attr(
                "src",
                "//www.youtube.com/embed/" +
                  Z.id +
                  "?autoplay=1&rel=0&v=" +
                  Z.id
              )
            : "vimeo" === Z.type
            ? b.attr("src", "//player.vimeo.com/video/" + Z.id + "?autoplay=1")
            : "vzaar" === Z.type &&
              b.attr(
                "src",
                "//view.vzaar.com/" + Z.id + "/player?autoplay=true"
              ),
          a(b)
            .wrap('<div class="owl-video-frame" />')
            .insertAfter(g.find(".owl-video")),
          (this._playing = g.addClass("owl-video-playing")));
      }),
      (g.prototype.isInFullScreen = function () {
        var B =
          b.fullscreenElement ||
          b.mozFullScreenElement ||
          b.webkitFullscreenElement;
        return B && a(B).parent().hasClass("owl-video-frame");
      }),
      (g.prototype.destroy = function () {
        var a, B;
        this._core.$element.off("click.owl.video");
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (B in Object.getOwnPropertyNames(this))
          "function" != typeof this[B] && (this[B] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Video = g);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, B, b, I) {
    var g = function (B) {
      (this.core = B),
        (this.core.options = a.extend({}, g.Defaults, this.core.options)),
        (this.swapping = !0),
        (this.previous = I),
        (this.next = I),
        (this.handlers = {
          "change.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              "position" == a.property.name &&
              ((this.previous = this.core.current()),
              (this.next = a.property.value));
          }, this),
          "drag.owl.carousel dragged.owl.carousel translated.owl.carousel":
            a.proxy(function (a) {
              a.namespace && (this.swapping = "translated" == a.type);
            }, this),
          "translate.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this.swapping &&
              (this.core.options.animateOut || this.core.options.animateIn) &&
              this.swap();
          }, this),
        }),
        this.core.$element.on(this.handlers);
    };
    (g.Defaults = { animateOut: !1, animateIn: !1 }),
      (g.prototype.swap = function () {
        if (
          1 === this.core.settings.items &&
          a.support.animation &&
          a.support.transition
        ) {
          this.core.speed(0);
          var B,
            b = a.proxy(this.clear, this),
            I = this.core.$stage.children().eq(this.previous),
            g = this.core.$stage.children().eq(this.next),
            Z = this.core.settings.animateIn,
            c = this.core.settings.animateOut;
          this.core.current() !== this.previous &&
            (c &&
              ((B =
                this.core.coordinates(this.previous) -
                this.core.coordinates(this.next)),
              I.one(a.support.animation.end, b)
                .css({ left: B + "px" })
                .addClass("animated owl-animated-out")
                .addClass(c)),
            Z &&
              g
                .one(a.support.animation.end, b)
                .addClass("animated owl-animated-in")
                .addClass(Z));
        }
      }),
      (g.prototype.clear = function (B) {
        a(B.target)
          .css({ left: "" })
          .removeClass("animated owl-animated-out owl-animated-in")
          .removeClass(this.core.settings.animateIn)
          .removeClass(this.core.settings.animateOut),
          this.core.onTransitionEnd();
      }),
      (g.prototype.destroy = function () {
        var a, B;
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (B in Object.getOwnPropertyNames(this))
          "function" != typeof this[B] && (this[B] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Animate = g);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, B, b, I) {
    var g = function (B) {
      (this._core = B),
        (this._call = null),
        (this._time = 0),
        (this._timeout = 0),
        (this._paused = !0),
        (this._handlers = {
          "changed.owl.carousel": a.proxy(function (a) {
            a.namespace && "settings" === a.property.name
              ? this._core.settings.autoplay
                ? this.play()
                : this.stop()
              : a.namespace &&
                "position" === a.property.name &&
                this._paused &&
                (this._time = 0);
          }, this),
          "initialized.owl.carousel": a.proxy(function (a) {
            a.namespace && this._core.settings.autoplay && this.play();
          }, this),
          "play.owl.autoplay": a.proxy(function (a, B, b) {
            a.namespace && this.play(B, b);
          }, this),
          "stop.owl.autoplay": a.proxy(function (a) {
            a.namespace && this.stop();
          }, this),
          "mouseover.owl.autoplay": a.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.pause();
          }, this),
          "mouseleave.owl.autoplay": a.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.play();
          }, this),
          "touchstart.owl.core": a.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.pause();
          }, this),
          "touchend.owl.core": a.proxy(function () {
            this._core.settings.autoplayHoverPause && this.play();
          }, this),
        }),
        this._core.$element.on(this._handlers),
        (this._core.options = a.extend({}, g.Defaults, this._core.options));
    };
    (g.Defaults = {
      autoplay: !1,
      autoplayTimeout: 5e3,
      autoplayHoverPause: !1,
      autoplaySpeed: !1,
    }),
      (g.prototype._next = function (I) {
        (this._call = B.setTimeout(
          a.proxy(this._next, this, I),
          this._timeout * (Math.round(this.read() / this._timeout) + 1) -
            this.read()
        )),
          this._core.is("interacting") ||
            b.hidden ||
            this._core.next(I || this._core.settings.autoplaySpeed);
      }),
      (g.prototype.read = function () {
        return new Date().getTime() - this._time;
      }),
      (g.prototype.play = function (b, I) {
        var g;
        this._core.is("rotating") || this._core.enter("rotating"),
          (b = b || this._core.settings.autoplayTimeout),
          (g = Math.min(this._time % (this._timeout || b), b)),
          this._paused
            ? ((this._time = this.read()), (this._paused = !1))
            : B.clearTimeout(this._call),
          (this._time += (this.read() % b) - g),
          (this._timeout = b),
          (this._call = B.setTimeout(a.proxy(this._next, this, I), b - g));
      }),
      (g.prototype.stop = function () {
        this._core.is("rotating") &&
          ((this._time = 0),
          (this._paused = !0),
          B.clearTimeout(this._call),
          this._core.leave("rotating"));
      }),
      (g.prototype.pause = function () {
        this._core.is("rotating") &&
          !this._paused &&
          ((this._time = this.read()),
          (this._paused = !0),
          B.clearTimeout(this._call));
      }),
      (g.prototype.destroy = function () {
        var a, B;
        this.stop();
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (B in Object.getOwnPropertyNames(this))
          "function" != typeof this[B] && (this[B] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.autoplay = g);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, B, b, I) {
    "use strict";
    var g = function (B) {
      (this._core = B),
        (this._initialized = !1),
        (this._pages = []),
        (this._controls = {}),
        (this._templates = []),
        (this.$element = this._core.$element),
        (this._overrides = {
          next: this._core.next,
          prev: this._core.prev,
          to: this._core.to,
        }),
        (this._handlers = {
          "prepared.owl.carousel": a.proxy(function (B) {
            B.namespace &&
              this._core.settings.dotsData &&
              this._templates.push(
                '<div class="' +
                  this._core.settings.dotClass +
                  '">' +
                  a(B.content)
                    .find("[data-dot]")
                    .addBack("[data-dot]")
                    .attr("data-dot") +
                  "</div>"
              );
          }, this),
          "added.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.dotsData &&
              this._templates.splice(a.position, 0, this._templates.pop());
          }, this),
          "remove.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.dotsData &&
              this._templates.splice(a.position, 1);
          }, this),
          "changed.owl.carousel": a.proxy(function (a) {
            a.namespace && "position" == a.property.name && this.draw();
          }, this),
          "initialized.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              !this._initialized &&
              (this._core.trigger("initialize", null, "navigation"),
              this.initialize(),
              this.update(),
              this.draw(),
              (this._initialized = !0),
              this._core.trigger("initialized", null, "navigation"));
          }, this),
          "refreshed.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._initialized &&
              (this._core.trigger("refresh", null, "navigation"),
              this.update(),
              this.draw(),
              this._core.trigger("refreshed", null, "navigation"));
          }, this),
        }),
        (this._core.options = a.extend({}, g.Defaults, this._core.options)),
        this.$element.on(this._handlers);
    };
    (g.Defaults = {
      nav: !1,
      navText: [
        '<span aria-label="Previous">&#x2039;</span>',
        '<span aria-label="Next">&#x203a;</span>',
      ],
      navSpeed: !1,
      navElement: 'button type="button" role="presentation"',
      navContainer: !1,
      navContainerClass: "owl-nav",
      navClass: ["owl-prev", "owl-next"],
      slideBy: 1,
      dotClass: "owl-dot",
      dotsClass: "owl-dots",
      dots: !0,
      dotsEach: !1,
      dotsData: !1,
      dotsSpeed: !1,
      dotsContainer: !1,
    }),
      (g.prototype.initialize = function () {
        var B,
          b = this._core.settings;
        (this._controls.$relative = (
          b.navContainer
            ? a(b.navContainer)
            : a("<div>").addClass(b.navContainerClass).appendTo(this.$element)
        ).addClass("disabled")),
          (this._controls.$previous = a("<" + b.navElement + ">")
            .addClass(b.navClass[0])
            .html(b.navText[0])
            .prependTo(this._controls.$relative)
            .on(
              "click",
              a.proxy(function (a) {
                this.prev(b.navSpeed);
              }, this)
            )),
          (this._controls.$next = a("<" + b.navElement + ">")
            .addClass(b.navClass[1])
            .html(b.navText[1])
            .appendTo(this._controls.$relative)
            .on(
              "click",
              a.proxy(function (a) {
                this.next(b.navSpeed);
              }, this)
            )),
          b.dotsData ||
            (this._templates = [
              a('<button role="button">')
                .addClass(b.dotClass)
                .append(a("<span>"))
                .prop("outerHTML"),
            ]),
          (this._controls.$absolute = (
            b.dotsContainer
              ? a(b.dotsContainer)
              : a("<div>").addClass(b.dotsClass).appendTo(this.$element)
          ).addClass("disabled")),
          this._controls.$absolute.on(
            "click",
            "button",
            a.proxy(function (B) {
              var I = a(B.target).parent().is(this._controls.$absolute)
                ? a(B.target).index()
                : a(B.target).parent().index();
              B.preventDefault(), this.to(I, b.dotsSpeed);
            }, this)
          );
        for (B in this._overrides) this._core[B] = a.proxy(this[B], this);
      }),
      (g.prototype.destroy = function () {
        var a, B, b, I, g;
        g = this._core.settings;
        for (a in this._handlers) this.$element.off(a, this._handlers[a]);
        for (B in this._controls)
          "$relative" === B && g.navContainer
            ? this._controls[B].html("")
            : this._controls[B].remove();
        for (I in this.overides) this._core[I] = this._overrides[I];
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (g.prototype.update = function () {
        var a,
          B,
          b,
          I = this._core.clones().length / 2,
          g = I + this._core.items().length,
          Z = this._core.maximum(!0),
          c = this._core.settings,
          j = c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items;
        if (
          ("page" !== c.slideBy && (c.slideBy = Math.min(c.slideBy, c.items)),
          c.dots || "page" == c.slideBy)
        )
          for (this._pages = [], a = I, B = 0, b = 0; a < g; a++) {
            if (B >= j || 0 === B) {
              if (
                (this._pages.push({
                  start: Math.min(Z, a - I),
                  end: a - I + j - 1,
                }),
                Math.min(Z, a - I) === Z)
              )
                break;
              (B = 0), ++b;
            }
            B += this._core.mergers(this._core.relative(a));
          }
      }),
      (g.prototype.draw = function () {
        var B,
          b = this._core.settings,
          I = this._core.items().length <= b.items,
          g = this._core.relative(this._core.current()),
          Z = b.loop || b.rewind;
        this._controls.$relative.toggleClass("disabled", !b.nav || I),
          b.nav &&
            (this._controls.$previous.toggleClass(
              "disabled",
              !Z && g <= this._core.minimum(!0)
            ),
            this._controls.$next.toggleClass(
              "disabled",
              !Z && g >= this._core.maximum(!0)
            )),
          this._controls.$absolute.toggleClass("disabled", !b.dots || I),
          b.dots &&
            ((B =
              this._pages.length - this._controls.$absolute.children().length),
            b.dotsData && 0 !== B
              ? this._controls.$absolute.html(this._templates.join(""))
              : B > 0
              ? this._controls.$absolute.append(
                  new Array(B + 1).join(this._templates[0])
                )
              : B < 0 && this._controls.$absolute.children().slice(B).remove(),
            this._controls.$absolute.find(".active").removeClass("active"),
            this._controls.$absolute
              .children()
              .eq(a.inArray(this.current(), this._pages))
              .addClass("active"));
      }),
      (g.prototype.onTrigger = function (B) {
        var b = this._core.settings;
        B.page = {
          index: a.inArray(this.current(), this._pages),
          count: this._pages.length,
          size:
            b &&
            (b.center || b.autoWidth || b.dotsData ? 1 : b.dotsEach || b.items),
        };
      }),
      (g.prototype.current = function () {
        var B = this._core.relative(this._core.current());
        return a
          .grep(
            this._pages,
            a.proxy(function (a, b) {
              return a.start <= B && a.end >= B;
            }, this)
          )
          .pop();
      }),
      (g.prototype.getPosition = function (B) {
        var b,
          I,
          g = this._core.settings;
        return (
          "page" == g.slideBy
            ? ((b = a.inArray(this.current(), this._pages)),
              (I = this._pages.length),
              B ? ++b : --b,
              (b = this._pages[((b % I) + I) % I].start))
            : ((b = this._core.relative(this._core.current())),
              (I = this._core.items().length),
              B ? (b += g.slideBy) : (b -= g.slideBy)),
          b
        );
      }),
      (g.prototype.next = function (B) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!0), B);
      }),
      (g.prototype.prev = function (B) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!1), B);
      }),
      (g.prototype.to = function (B, b, I) {
        var g;
        !I && this._pages.length
          ? ((g = this._pages.length),
            a.proxy(this._overrides.to, this._core)(
              this._pages[((B % g) + g) % g].start,
              b
            ))
          : a.proxy(this._overrides.to, this._core)(B, b);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Navigation = g);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, B, b, I) {
    "use strict";
    var g = function (b) {
      (this._core = b),
        (this._hashes = {}),
        (this.$element = this._core.$element),
        (this._handlers = {
          "initialized.owl.carousel": a.proxy(function (b) {
            b.namespace &&
              "URLHash" === this._core.settings.startPosition &&
              a(B).trigger("hashchange.owl.navigation");
          }, this),
          "prepared.owl.carousel": a.proxy(function (B) {
            if (B.namespace) {
              var b = a(B.content)
                .find("[data-hash]")
                .addBack("[data-hash]")
                .attr("data-hash");
              if (!b) return;
              this._hashes[b] = B.content;
            }
          }, this),
          "changed.owl.carousel": a.proxy(function (b) {
            if (b.namespace && "position" === b.property.name) {
              var I = this._core.items(
                  this._core.relative(this._core.current())
                ),
                g = a
                  .map(this._hashes, function (a, B) {
                    return a === I ? B : null;
                  })
                  .join();
              if (!g || B.location.hash.slice(1) === g) return;
              B.location.hash = g;
            }
          }, this),
        }),
        (this._core.options = a.extend({}, g.Defaults, this._core.options)),
        this.$element.on(this._handlers),
        a(B).on(
          "hashchange.owl.navigation",
          a.proxy(function (a) {
            var b = B.location.hash.substring(1),
              g = this._core.$stage.children(),
              Z = this._hashes[b] && g.index(this._hashes[b]);
            Z !== I &&
              Z !== this._core.current() &&
              this._core.to(this._core.relative(Z), !1, !0);
          }, this)
        );
    };
    (g.Defaults = { URLhashListener: !1 }),
      (g.prototype.destroy = function () {
        var b, I;
        a(B).off("hashchange.owl.navigation");
        for (b in this._handlers) this._core.$element.off(b, this._handlers[b]);
        for (I in Object.getOwnPropertyNames(this))
          "function" != typeof this[I] && (this[I] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Hash = g);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, B, b, I) {
    function g(B, b) {
      var g = !1,
        Z = B.charAt(0).toUpperCase() + B.slice(1);
      return (
        a.each((B + " " + j.join(Z + " ") + Z).split(" "), function (a, B) {
          if (c[B] !== I) return (g = !b || B), !1;
        }),
        g
      );
    }
    function Z(a) {
      return g(a, !0);
    }
    var c = a("<support>").get(0).style,
      j = "Webkit Moz O ms".split(" "),
      d = {
        transition: {
          end: {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd",
            transition: "transitionend",
          },
        },
        animation: {
          end: {
            WebkitAnimation: "webkitAnimationEnd",
            MozAnimation: "animationend",
            OAnimation: "oAnimationEnd",
            animation: "animationend",
          },
        },
      },
      E = {
        csstransforms: function () {
          return !!g("transform");
        },
        csstransforms3d: function () {
          return !!g("perspective");
        },
        csstransitions: function () {
          return !!g("transition");
        },
        cssanimations: function () {
          return !!g("animation");
        },
      };
    E.csstransitions() &&
      ((a.support.transition = new String(Z("transition"))),
      (a.support.transition.end = d.transition.end[a.support.transition])),
      E.cssanimations() &&
        ((a.support.animation = new String(Z("animation"))),
        (a.support.animation.end = d.animation.end[a.support.animation])),
      E.csstransforms() &&
        ((a.support.transform = new String(Z("transform"))),
        (a.support.transform3d = E.csstransforms3d()));
  })(window.Zepto || window.jQuery, window, document);
(function (a) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], a);
  } else {
    if (typeof exports === "object") {
      a(require("jquery"));
    } else {
      a(jQuery);
    }
  }
})(function (a) {
  var B = function (b, I) {
    this.$element = a(b);
    this.options = a.extend({}, B.DEFAULTS, this.dataOptions(), I);
    this.init();
  };
  B.DEFAULTS = {
    from: 0,
    to: 0,
    speed: 1e3,
    refreshInterval: 100,
    decimals: 0,
    formatter: b,
    onUpdate: null,
    onComplete: null,
  };
  B.prototype.init = function () {
    this.value = this.options.from;
    this.loops = Math.ceil(this.options.speed / this.options.refreshInterval);
    this.loopCount = 0;
    this.increment = (this.options.to - this.options.from) / this.loops;
  };
  B.prototype.dataOptions = function () {
    var a = {
      from: this.$element.data("from"),
      to: this.$element.data("to"),
      speed: this.$element.data("speed"),
      refreshInterval: this.$element.data("refresh-interval"),
      decimals: this.$element.data("decimals"),
    };
    var B = Object.keys(a);
    for (var b in B) {
      var I = B[b];
      if (typeof a[I] === "undefined") {
        delete a[I];
      }
    }
    return a;
  };
  B.prototype.update = function () {
    this.value += this.increment;
    this.loopCount++;
    this.render();
    if (typeof this.options.onUpdate == "function") {
      this.options.onUpdate.call(this.$element, this.value);
    }
    if (this.loopCount >= this.loops) {
      clearInterval(this.interval);
      this.value = this.options.to;
      if (typeof this.options.onComplete == "function") {
        this.options.onComplete.call(this.$element, this.value);
      }
    }
  };
  B.prototype.render = function () {
    var a = this.options.formatter.call(
      this.$element,
      this.value,
      this.options
    );
    this.$element.text(a);
  };
  B.prototype.restart = function () {
    this.stop();
    this.init();
    this.start();
  };
  B.prototype.start = function () {
    this.stop();
    this.render();
    this.interval = setInterval(
      this.update.bind(this),
      this.options.refreshInterval
    );
  };
  B.prototype.stop = function () {
    if (this.interval) {
      clearInterval(this.interval);
    }
  };
  B.prototype.toggle = function () {
    if (this.interval) {
      this.stop();
    } else {
      this.start();
    }
  };
  function b(a, B) {
    return a.toFixed(B.decimals);
  }
  a.fn.countTo = function (b) {
    return this.each(function () {
      var I = a(this);
      var g = I.data("countTo");
      var Z = !g || typeof b === "object";
      var c = typeof b === "object" ? b : {};
      var j = typeof b === "string" ? b : "start";
      if (Z) {
        if (g) {
          g.stop();
        }
        I.data("countTo", (g = new B(this, c)));
      }
      g[j].call(g);
    });
  };
});
(function (a) {
  a.fn.appear = function (B, b) {
    var I = a.extend({ data: undefined, one: true, accX: 0, accY: 0 }, b);
    return this.each(function () {
      var b = a(this);
      b.appeared = false;
      if (!B) {
        b.trigger("appear", I.data);
        return;
      }
      var g = a(window);
      var Z = function () {
        if (!b.is(":visible")) {
          b.appeared = false;
          return;
        }
        var a = g.scrollLeft();
        var B = g.scrollTop();
        var Z = b.offset();
        var c = Z.left;
        var j = Z.top;
        var d = I.accX;
        var E = I.accY;
        var f = b.height();
        var A = g.height();
        var aJ = b.width();
        var fh = g.width();
        if (
          j + f + E >= B &&
          j <= B + A + E &&
          c + aJ + d >= a &&
          c <= a + fh + d
        ) {
          if (!b.appeared) {
            b.trigger("appear", I.data);
          }
        } else {
          b.appeared = false;
        }
      };
      var c = function () {
        b.appeared = true;
        if (I.one) {
          g.unbind("scroll", Z);
          var c = a.inArray(Z, a.fn.appear.checks);
          if (c >= 0) {
            a.fn.appear.checks.splice(c, 1);
          }
        }
        B.apply(this, arguments);
      };
      if (I.one) {
        b.one("appear", I.data, c);
      } else {
        b.bind("appear", I.data, c);
      }
      g.scroll(Z);
      a.fn.appear.checks.push(Z);
      Z();
    });
  };
  a.extend(a.fn.appear, {
    checks: [],
    timeout: null,
    checkAll: function () {
      var B = a.fn.appear.checks.length;
      if (B > 0) {
        while (B--) {
          a.fn.appear.checks[B]();
        }
      }
    },
    run: function () {
      if (a.fn.appear.timeout) {
        clearTimeout(a.fn.appear.timeout);
      }
      a.fn.appear.timeout = setTimeout(a.fn.appear.checkAll, 20);
    },
  });
  a.each(
    [
      "append",
      "prepend",
      "after",
      "before",
      "attr",
      "removeAttr",
      "addClass",
      "removeClass",
      "toggleClass",
      "remove",
      "css",
      "show",
      "hide",
    ],
    function (B, b) {
      var I = a.fn[b];
      if (I) {
        a.fn[b] = function () {
          var B = I.apply(this, arguments);
          a.fn.appear.run();
          return B;
        };
      }
    }
  );
})(jQuery);
/**!
 * MixItUp v3.3.1
 * A high-performance, dependency-free library for animated filtering, sorting and more
 * Build 94e0fbf6-cd0b-4987-b3c0-14b59b67b8a0
 *
 * @copyright Copyright 2014-2018 KunkaLabs Limited.
 * @author    KunkaLabs Limited.
 * @link      https://www.kunkalabs.com/mixitup/
 *
 * @license   Commercial use requires a commercial license.
 *            https://www.kunkalabs.com/mixitup/licenses/
 *
 *            Non-commercial use permitted under same terms as CC BY-NC 3.0 license.
 *            http://creativecommons.org/licenses/by-nc/3.0/
 */
!(function (a) {
  "use strict";
  var B = null,
    b = null;
  !(function () {
    var B = ["webkit", "moz", "o", "ms"],
      b = a.document.createElement("div"),
      I = -1;
    for (I = 0; I < B.length && !a.requestAnimationFrame; I++)
      a.requestAnimationFrame = a[B[I] + "RequestAnimationFrame"];
    "undefined" == typeof b.nextElementSibling &&
      Object.defineProperty(a.Element.prototype, "nextElementSibling", {
        get: function () {
          for (var a = this.nextSibling; a; ) {
            if (1 === a.nodeType) return a;
            a = a.nextSibling;
          }
          return null;
        },
      }),
      (function (a) {
        a.matches =
          a.matches ||
          a.machesSelector ||
          a.mozMatchesSelector ||
          a.msMatchesSelector ||
          a.oMatchesSelector ||
          a.webkitMatchesSelector ||
          function (a) {
            return (
              Array.prototype.indexOf.call(
                this.parentElement.querySelectorAll(a),
                this
              ) > -1
            );
          };
      })(a.Element.prototype),
      Object.keys ||
        (Object.keys = (function () {
          var a = Object.prototype.hasOwnProperty,
            B = !1,
            b = [],
            I = -1;
          return (
            (B = !{ toString: null }.propertyIsEnumerable("toString")),
            (b = [
              "toString",
              "toLocaleString",
              "valueOf",
              "hasOwnProperty",
              "isPrototypeOf",
              "propertyIsEnumerable",
              "constructor",
            ]),
            (I = b.length),
            function (g) {
              var Z = [],
                c = "",
                j = -1;
              if (
                "object" != typeof g &&
                ("function" != typeof g || null === g)
              )
                throw new TypeError("Object.keys called on non-object");
              for (c in g) a.call(g, c) && Z.push(c);
              if (B) for (j = 0; j < I; j++) a.call(g, b[j]) && Z.push(b[j]);
              return Z;
            }
          );
        })()),
      Array.isArray ||
        (Array.isArray = function (a) {
          return "[object Array]" === Object.prototype.toString.call(a);
        }),
      "function" != typeof Object.create &&
        (Object.create = (function (a) {
          var B = function () {};
          return function (b, I) {
            if (b !== Object(b) && null !== b)
              throw TypeError("Argument must be an object, or null");
            B.prototype = b || {};
            var g = new B();
            return (
              (B.prototype = null),
              I !== a && Object.defineProperties(g, I),
              null === b && (g.__proto__ = null),
              g
            );
          };
        })()),
      String.prototype.trim ||
        (String.prototype.trim = function () {
          return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
        }),
      Array.prototype.indexOf ||
        (Array.prototype.indexOf = function (a) {
          var B, b, I, g;
          if (null === this) throw new TypeError();
          if (((I = Object(this)), (g = I.length >>> 0), 0 === g)) return -1;
          if (
            ((B = 0),
            arguments.length > 1 &&
              ((B = Number(arguments[1])),
              B !== B
                ? (B = 0)
                : 0 !== B &&
                  B !== 1 / 0 &&
                  B !== -(1 / 0) &&
                  (B = (B > 0 || -1) * Math.floor(Math.abs(B)))),
            B >= g)
          )
            return -1;
          for (b = B >= 0 ? B : Math.max(g - Math.abs(B), 0); b < g; b++)
            if (b in I && I[b] === a) return b;
          return -1;
        }),
      Function.prototype.bind ||
        (Function.prototype.bind = function (a) {
          var B, b, I, g;
          if ("function" != typeof this) throw new TypeError();
          return (
            (B = Array.prototype.slice.call(arguments, 1)),
            (b = this),
            (I = function () {}),
            (g = function () {
              return b.apply(
                this instanceof I ? this : a,
                B.concat(Array.prototype.slice.call(arguments))
              );
            }),
            this.prototype && (I.prototype = this.prototype),
            (g.prototype = new I()),
            g
          );
        }),
      a.Element.prototype.dispatchEvent ||
        (a.Element.prototype.dispatchEvent = function (a) {
          try {
            return this.fireEvent("on" + a.type, a);
          } catch (a) {}
        });
  })(),
    (B = function (I, g, Z) {
      var c = null,
        j = !1,
        d = null,
        E = null,
        f = null,
        A = null,
        aJ = [],
        fh = "",
        e = [],
        ab = -1;
      if (
        ((f = Z || a.document),
        (j = arguments[3]) && (j = "boolean" == typeof j),
        "string" == typeof I)
      )
        e = f.querySelectorAll(I);
      else if (I && "object" == typeof I && b.isElement(I, f)) e = [I];
      else {
        if (!I || "object" != typeof I || !I.length)
          throw new Error(B.messages.errorFactoryInvalidContainer());
        e = I;
      }
      if (e.length < 1)
        throw new Error(B.messages.errorFactoryContainerNotFound());
      for (ab = 0; (c = e[ab]) && (!(ab > 0) || j); ab++)
        c.id ? (fh = c.id) : ((fh = "MixItUp" + b.randomHex()), (c.id = fh)),
          B.instances[fh] instanceof B.Mixer
            ? ((d = B.instances[fh]),
              (!g || (g && g.debug && g.debug.showWarnings !== !1)) &&
                console.warn(B.messages.warningFactoryPreexistingInstance()))
            : ((d = new B.Mixer()),
              d.attach(c, f, fh, g),
              (B.instances[fh] = d)),
          (E = new B.Facade(d)),
          g && g.debug && g.debug.enable ? aJ.push(d) : aJ.push(E);
      return (A = j ? new B.Collection(aJ) : aJ[0]);
    }),
    (B.use = function (a) {
      B.Base.prototype.callActions.call(B, "beforeUse", arguments),
        "function" == typeof a && "mixitup-extension" === a.TYPE
          ? "undefined" == typeof B.extensions[a.NAME] &&
            (a(B), (B.extensions[a.NAME] = a))
          : a.fn && a.fn.jquery && (B.libraries.$ = a),
        B.Base.prototype.callActions.call(B, "afterUse", arguments);
    }),
    (B.instances = {}),
    (B.extensions = {}),
    (B.libraries = {}),
    (b = {
      hasClass: function (a, B) {
        return !!a.className.match(new RegExp("(\\s|^)" + B + "(\\s|$)"));
      },
      addClass: function (a, B) {
        this.hasClass(a, B) || (a.className += a.className ? " " + B : B);
      },
      removeClass: function (a, B) {
        if (this.hasClass(a, B)) {
          var b = new RegExp("(\\s|^)" + B + "(\\s|$)");
          a.className = a.className.replace(b, " ").trim();
        }
      },
      extend: function (a, B, b, I) {
        var g = [],
          Z = "",
          c = -1;
        (b = b || !1), (I = I || !1);
        try {
          if (Array.isArray(B)) for (c = 0; c < B.length; c++) g.push(c);
          else B && (g = Object.keys(B));
          for (c = 0; c < g.length; c++)
            (Z = g[c]),
              !b || "object" != typeof B[Z] || this.isElement(B[Z])
                ? (a[Z] = B[Z])
                : Array.isArray(B[Z])
                ? (a[Z] || (a[Z] = []), this.extend(a[Z], B[Z], b, I))
                : (a[Z] || (a[Z] = {}), this.extend(a[Z], B[Z], b, I));
        } catch (B) {
          if (!I) throw B;
          this.handleExtendError(B, a);
        }
        return a;
      },
      handleExtendError: function (a, b) {
        var I = /property "?(\w*)"?[,:] object/i,
          g = null,
          Z = "",
          c = "",
          j = "",
          d = "",
          E = "",
          f = -1,
          A = -1;
        if (a instanceof TypeError && (g = I.exec(a.message))) {
          Z = g[1];
          for (E in b) {
            for (A = 0; A < Z.length && Z.charAt(A) === E.charAt(A); ) A++;
            A > f && ((f = A), (d = E));
          }
          throw (
            (f > 1 &&
              (j = B.messages.errorConfigInvalidPropertySuggestion({
                probableMatch: d,
              })),
            (c = B.messages.errorConfigInvalidProperty({
              erroneous: Z,
              suggestion: j,
            })),
            new TypeError(c))
          );
        }
        throw a;
      },
      template: function (a) {
        for (var B = /\${([\w]*)}/g, b = {}, I = null; (I = B.exec(a)); )
          b[I[1]] = new RegExp("\\${" + I[1] + "}", "g");
        return function (B) {
          var I = "",
            g = a;
          B = B || {};
          for (I in b)
            g = g.replace(b[I], "undefined" != typeof B[I] ? B[I] : "");
          return g;
        };
      },
      on: function (B, b, I, g) {
        B &&
          (B.addEventListener
            ? B.addEventListener(b, I, g)
            : B.attachEvent &&
              ((B["e" + b + I] = I),
              (B[b + I] = function () {
                B["e" + b + I](a.event);
              }),
              B.attachEvent("on" + b, B[b + I])));
      },
      off: function (a, B, b) {
        a &&
          (a.removeEventListener
            ? a.removeEventListener(B, b, !1)
            : a.detachEvent &&
              (a.detachEvent("on" + B, a[B + b]), (a[B + b] = null)));
      },
      getCustomEvent: function (B, b, I) {
        var g = null;
        return (
          (I = I || a.document),
          "function" == typeof a.CustomEvent
            ? (g = new a.CustomEvent(B, {
                detail: b,
                bubbles: !0,
                cancelable: !0,
              }))
            : "function" == typeof I.createEvent
            ? ((g = I.createEvent("CustomEvent")),
              g.initCustomEvent(B, !0, !0, b))
            : ((g = I.createEventObject()),
              (g.type = B),
              (g.returnValue = !1),
              (g.cancelBubble = !1),
              (g.detail = b)),
          g
        );
      },
      getOriginalEvent: function (a) {
        return a.touches && a.touches.length
          ? a.touches[0]
          : a.changedTouches && a.changedTouches.length
          ? a.changedTouches[0]
          : a;
      },
      index: function (a, B) {
        for (var b = 0; null !== (a = a.previousElementSibling); )
          (B && !a.matches(B)) || ++b;
        return b;
      },
      camelCase: function (a) {
        return a.toLowerCase().replace(/([_-][a-z])/g, function (a) {
          return a.toUpperCase().replace(/[_-]/, "");
        });
      },
      pascalCase: function (a) {
        return (a = this.camelCase(a)).charAt(0).toUpperCase() + a.slice(1);
      },
      dashCase: function (a) {
        return a
          .replace(/([A-Z])/g, "-$1")
          .replace(/^-/, "")
          .toLowerCase();
      },
      isElement: function (B, b) {
        return (
          (b = b || a.document),
          !!(a.HTMLElement && B instanceof a.HTMLElement) ||
            !!(
              b.defaultView &&
              b.defaultView.HTMLElement &&
              B instanceof b.defaultView.HTMLElement
            ) ||
            (null !== B && 1 === B.nodeType && "string" == typeof B.nodeName)
        );
      },
      createElement: function (B, b) {
        var I = null,
          g = null;
        for (
          b = b || a.document,
            I = b.createDocumentFragment(),
            g = b.createElement("div"),
            g.innerHTML = B.trim();
          g.firstChild;

        )
          I.appendChild(g.firstChild);
        return I;
      },
      removeWhitespace: function (a) {
        for (var B; a && "#text" === a.nodeName; )
          (B = a),
            (a = a.previousSibling),
            B.parentElement && B.parentElement.removeChild(B);
      },
      isEqualArray: function (a, B) {
        var b = a.length;
        if (b !== B.length) return !1;
        for (; b--; ) if (a[b] !== B[b]) return !1;
        return !0;
      },
      deepEquals: function (a, B) {
        var b;
        if ("object" == typeof a && a && "object" == typeof B && B) {
          if (Object.keys(a).length !== Object.keys(B).length) return !1;
          for (b in a)
            if (!B.hasOwnProperty(b) || !this.deepEquals(a[b], B[b])) return !1;
        } else if (a !== B) return !1;
        return !0;
      },
      arrayShuffle: function (a) {
        for (var B = a.slice(), b = B.length, I = b, g = -1, Z = []; I--; )
          (g = ~~(Math.random() * b)), (Z = B[I]), (B[I] = B[g]), (B[g] = Z);
        return B;
      },
      arrayFromList: function (a) {
        var B, b;
        try {
          return Array.prototype.slice.call(a);
        } catch (I) {
          for (B = [], b = 0; b < a.length; b++) B.push(a[b]);
          return B;
        }
      },
      debounce: function (a, B, b) {
        var I;
        return function () {
          var g = this,
            Z = arguments,
            c = b && !I,
            j = null;
          (j = function () {
            (I = null), b || a.apply(g, Z);
          }),
            clearTimeout(I),
            (I = setTimeout(j, B)),
            c && a.apply(g, Z);
        };
      },
      position: function (a) {
        for (var B = 0, b = 0, I = a; a; )
          (B -= a.scrollLeft),
            (b -= a.scrollTop),
            a === I &&
              ((B += a.offsetLeft), (b += a.offsetTop), (I = a.offsetParent)),
            (a = a.parentElement);
        return { x: B, y: b };
      },
      getHypotenuse: function (a, B) {
        var b = a.x - B.x,
          I = a.y - B.y;
        return (
          (b = b < 0 ? b * -1 : b),
          (I = I < 0 ? I * -1 : I),
          Math.sqrt(Math.pow(b, 2) + Math.pow(I, 2))
        );
      },
      getIntersectionRatio: function (a, B) {
        var b = a.width * a.height,
          I = -1,
          g = -1,
          Z = -1,
          c = -1;
        return (
          (I = Math.max(
            0,
            Math.min(a.left + a.width, B.left + B.width) -
              Math.max(a.left, B.left)
          )),
          (g = Math.max(
            0,
            Math.min(a.top + a.height, B.top + B.height) -
              Math.max(a.top, B.top)
          )),
          (Z = g * I),
          (c = Z / b)
        );
      },
      closestParent: function (B, b, I, g) {
        var Z = B.parentNode;
        if (((g = g || a.document), I && B.matches(b))) return B;
        for (; Z && Z != g.body; ) {
          if (Z.matches && Z.matches(b)) return Z;
          if (!Z.parentNode) return null;
          Z = Z.parentNode;
        }
        return null;
      },
      children: function (B, b, I) {
        var g = [],
          Z = "";
        return (
          (I = I || a.doc),
          B &&
            (B.id || ((Z = "Temp" + this.randomHexKey()), (B.id = Z)),
            (g = I.querySelectorAll("#" + B.id + " > " + b)),
            Z && B.removeAttribute("id")),
          g
        );
      },
      clean: function (a) {
        var B = [],
          b = -1;
        for (b = 0; b < a.length; b++) "" !== a[b] && B.push(a[b]);
        return B;
      },
      defer: function (b) {
        var I = null,
          g = null,
          Z = null;
        return (
          (g = new this.Deferred()),
          B.features.has.promises
            ? (g.promise = new Promise(function (a, B) {
                (g.resolve = a), (g.reject = B);
              }))
            : (Z = a.jQuery || b.$) && "function" == typeof Z.Deferred
            ? ((I = Z.Deferred()),
              (g.promise = I.promise()),
              (g.resolve = I.resolve),
              (g.reject = I.reject))
            : a.console &&
              console.warn(B.messages.warningNoPromiseImplementation()),
          g
        );
      },
      all: function (b, I) {
        var g = null;
        return B.features.has.promises
          ? Promise.all(b)
          : (g = a.jQuery || I.$) && "function" == typeof g.when
          ? g.when.apply(g, b).done(function () {
              return arguments;
            })
          : (a.console &&
              console.warn(B.messages.warningNoPromiseImplementation()),
            []);
      },
      getPrefix: function (a, B, I) {
        var g = -1,
          Z = "";
        if (b.dashCase(B) in a.style) return "";
        for (g = 0; (Z = I[g]); g++)
          if (Z + B in a.style) return Z.toLowerCase();
        return "unsupported";
      },
      randomHex: function () {
        return ("00000" + ((16777216 * Math.random()) << 0).toString(16))
          .substr(-6)
          .toUpperCase();
      },
      getDocumentState: function (B) {
        return (
          (B = "object" == typeof B.body ? B : a.document),
          {
            scrollTop: a.pageYOffset,
            scrollLeft: a.pageXOffset,
            docHeight: B.documentElement.scrollHeight,
            docWidth: B.documentElement.scrollWidth,
            viewportHeight: B.documentElement.clientHeight,
            viewportWidth: B.documentElement.clientWidth,
          }
        );
      },
      bind: function (a, B) {
        return function () {
          return B.apply(a, arguments);
        };
      },
      isVisible: function (B) {
        var b = null;
        return (
          !!B.offsetParent ||
          ((b = a.getComputedStyle(B)),
          "fixed" === b.position &&
            "hidden" !== b.visibility &&
            "0" !== b.opacity)
        );
      },
      seal: function (a) {
        "function" == typeof Object.seal && Object.seal(a);
      },
      freeze: function (a) {
        "function" == typeof Object.freeze && Object.freeze(a);
      },
      compareVersions: function (a, B) {
        var b = a.split("."),
          I = B.split("."),
          g = -1,
          Z = -1,
          c = -1;
        for (c = 0; c < b.length; c++) {
          if (
            ((g = parseInt(b[c].replace(/[^\d.]/g, ""))),
            (Z = parseInt(I[c].replace(/[^\d.]/g, "") || 0)),
            Z < g)
          )
            return !1;
          if (Z > g) return !0;
        }
        return !0;
      },
      Deferred: function () {
        (this.promise = null),
          (this.resolve = null),
          (this.reject = null),
          (this.id = b.randomHex());
      },
      isEmptyObject: function (a) {
        var B = "";
        if ("function" == typeof Object.keys)
          return 0 === Object.keys(a).length;
        for (B in a) if (a.hasOwnProperty(B)) return !1;
        return !0;
      },
      getClassname: function (a, B, b) {
        var I = "";
        return (
          (I += a.block),
          I.length && (I += a.delineatorElement),
          (I += a["element" + this.pascalCase(B)]),
          b ? (I.length && (I += a.delineatorModifier), (I += b)) : I
        );
      },
      getProperty: function (a, B) {
        var b = B.split("."),
          I = null,
          g = "",
          Z = 0;
        if (!B) return a;
        for (
          I = function (a) {
            return a ? a[g] : null;
          };
          Z < b.length;

        )
          (g = b[Z]), (a = I(a)), Z++;
        return "undefined" != typeof a ? a : null;
      },
    }),
    (B.h = b),
    (B.Base = function () {}),
    (B.Base.prototype = {
      constructor: B.Base,
      callActions: function (a, B) {
        var I = this,
          g = I.constructor.actions[a],
          Z = "";
        if (g && !b.isEmptyObject(g)) for (Z in g) g[Z].apply(I, B);
      },
      callFilters: function (a, B, I) {
        var g = this,
          Z = g.constructor.filters[a],
          c = B,
          j = "";
        if (!Z || b.isEmptyObject(Z)) return c;
        I = I || [];
        for (j in Z)
          (I = b.arrayFromList(I)), I.unshift(c), (c = Z[j].apply(g, I));
        return c;
      },
    }),
    (B.BaseStatic = function () {
      (this.actions = {}),
        (this.filters = {}),
        (this.extend = function (a) {
          b.extend(this.prototype, a);
        }),
        (this.registerAction = function (a, B, b) {
          (this.actions[a] = this.actions[a] || {})[B] = b;
        }),
        (this.registerFilter = function (a, B, b) {
          (this.filters[a] = this.filters[a] || {})[B] = b;
        });
    }),
    (B.Features = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.boxSizingPrefix = ""),
        (this.transformPrefix = ""),
        (this.transitionPrefix = ""),
        (this.boxSizingPrefix = ""),
        (this.transformProp = ""),
        (this.transformRule = ""),
        (this.transitionProp = ""),
        (this.perspectiveProp = ""),
        (this.perspectiveOriginProp = ""),
        (this.has = new B.Has()),
        (this.canary = null),
        (this.BOX_SIZING_PROP = "boxSizing"),
        (this.TRANSITION_PROP = "transition"),
        (this.TRANSFORM_PROP = "transform"),
        (this.PERSPECTIVE_PROP = "perspective"),
        (this.PERSPECTIVE_ORIGIN_PROP = "perspectiveOrigin"),
        (this.VENDORS = ["Webkit", "moz", "O", "ms"]),
        (this.TWEENABLE = [
          "opacity",
          "width",
          "height",
          "marginRight",
          "marginBottom",
          "x",
          "y",
          "scale",
          "translateX",
          "translateY",
          "translateZ",
          "rotateX",
          "rotateY",
          "rotateZ",
        ]),
        this.callActions("afterConstruct");
    }),
    B.BaseStatic.call(B.Features),
    (B.Features.prototype = Object.create(B.Base.prototype)),
    b.extend(B.Features.prototype, {
      constructor: B.Features,
      init: function () {
        var a = this;
        a.callActions("beforeInit", arguments),
          (a.canary = document.createElement("div")),
          a.setPrefixes(),
          a.runTests(),
          a.callActions("beforeInit", arguments);
      },
      runTests: function () {
        var B = this;
        B.callActions("beforeRunTests", arguments),
          (B.has.promises = "function" == typeof a.Promise),
          (B.has.transitions = "unsupported" !== B.transitionPrefix),
          B.callActions("afterRunTests", arguments),
          b.freeze(B.has);
      },
      setPrefixes: function () {
        var a = this;
        a.callActions("beforeSetPrefixes", arguments),
          (a.transitionPrefix = b.getPrefix(a.canary, "Transition", a.VENDORS)),
          (a.transformPrefix = b.getPrefix(a.canary, "Transform", a.VENDORS)),
          (a.boxSizingPrefix = b.getPrefix(a.canary, "BoxSizing", a.VENDORS)),
          (a.boxSizingProp = a.boxSizingPrefix
            ? a.boxSizingPrefix + b.pascalCase(a.BOX_SIZING_PROP)
            : a.BOX_SIZING_PROP),
          (a.transitionProp = a.transitionPrefix
            ? a.transitionPrefix + b.pascalCase(a.TRANSITION_PROP)
            : a.TRANSITION_PROP),
          (a.transformProp = a.transformPrefix
            ? a.transformPrefix + b.pascalCase(a.TRANSFORM_PROP)
            : a.TRANSFORM_PROP),
          (a.transformRule = a.transformPrefix
            ? "-" + a.transformPrefix + "-" + a.TRANSFORM_PROP
            : a.TRANSFORM_PROP),
          (a.perspectiveProp = a.transformPrefix
            ? a.transformPrefix + b.pascalCase(a.PERSPECTIVE_PROP)
            : a.PERSPECTIVE_PROP),
          (a.perspectiveOriginProp = a.transformPrefix
            ? a.transformPrefix + b.pascalCase(a.PERSPECTIVE_ORIGIN_PROP)
            : a.PERSPECTIVE_ORIGIN_PROP),
          a.callActions("afterSetPrefixes", arguments);
      },
    }),
    (B.Has = function () {
      (this.transitions = !1), (this.promises = !1), b.seal(this);
    }),
    (B.features = new B.Features()),
    B.features.init(),
    (B.ConfigAnimation = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.enable = !0),
        (this.effects = "fade scale"),
        (this.effectsIn = ""),
        (this.effectsOut = ""),
        (this.duration = 600),
        (this.easing = "ease"),
        (this.applyPerspective = !0),
        (this.perspectiveDistance = "3000px"),
        (this.perspectiveOrigin = "50% 50%"),
        (this.queue = !0),
        (this.queueLimit = 3),
        (this.animateResizeContainer = !0),
        (this.animateResizeTargets = !1),
        (this.staggerSequence = null),
        (this.reverseOut = !1),
        (this.nudge = !0),
        (this.clampHeight = !0),
        (this.clampWidth = !0),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.ConfigAnimation),
    (B.ConfigAnimation.prototype = Object.create(B.Base.prototype)),
    (B.ConfigAnimation.prototype.constructor = B.ConfigAnimation),
    (B.ConfigBehavior = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.liveSort = !1),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.ConfigBehavior),
    (B.ConfigBehavior.prototype = Object.create(B.Base.prototype)),
    (B.ConfigBehavior.prototype.constructor = B.ConfigBehavior),
    (B.ConfigCallbacks = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.onMixStart = null),
        (this.onMixBusy = null),
        (this.onMixEnd = null),
        (this.onMixFail = null),
        (this.onMixClick = null),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.ConfigCallbacks),
    (B.ConfigCallbacks.prototype = Object.create(B.Base.prototype)),
    (B.ConfigCallbacks.prototype.constructor = B.ConfigCallbacks),
    (B.ConfigControls = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.enable = !0),
        (this.live = !1),
        (this.scope = "global"),
        (this.toggleLogic = "or"),
        (this.toggleDefault = "all"),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.ConfigControls),
    (B.ConfigControls.prototype = Object.create(B.Base.prototype)),
    (B.ConfigControls.prototype.constructor = B.ConfigControls),
    (B.ConfigClassNames = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.block = "mixitup"),
        (this.elementContainer = "container"),
        (this.elementFilter = "control"),
        (this.elementSort = "control"),
        (this.elementMultimix = "control"),
        (this.elementToggle = "control"),
        (this.modifierActive = "active"),
        (this.modifierDisabled = "disabled"),
        (this.modifierFailed = "failed"),
        (this.delineatorElement = "-"),
        (this.delineatorModifier = "-"),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.ConfigClassNames),
    (B.ConfigClassNames.prototype = Object.create(B.Base.prototype)),
    (B.ConfigClassNames.prototype.constructor = B.ConfigClassNames),
    (B.ConfigData = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.uidKey = ""),
        (this.dirtyCheck = !1),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.ConfigData),
    (B.ConfigData.prototype = Object.create(B.Base.prototype)),
    (B.ConfigData.prototype.constructor = B.ConfigData),
    (B.ConfigDebug = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.enable = !1),
        (this.showWarnings = !0),
        (this.fauxAsync = !1),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.ConfigDebug),
    (B.ConfigDebug.prototype = Object.create(B.Base.prototype)),
    (B.ConfigDebug.prototype.constructor = B.ConfigDebug),
    (B.ConfigLayout = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.allowNestedTargets = !0),
        (this.containerClassName = ""),
        (this.siblingBefore = null),
        (this.siblingAfter = null),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.ConfigLayout),
    (B.ConfigLayout.prototype = Object.create(B.Base.prototype)),
    (B.ConfigLayout.prototype.constructor = B.ConfigLayout),
    (B.ConfigLoad = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.filter = "all"),
        (this.sort = "default:asc"),
        (this.dataset = null),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.ConfigLoad),
    (B.ConfigLoad.prototype = Object.create(B.Base.prototype)),
    (B.ConfigLoad.prototype.constructor = B.ConfigLoad),
    (B.ConfigSelectors = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.target = ".mix"),
        (this.control = ""),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.ConfigSelectors),
    (B.ConfigSelectors.prototype = Object.create(B.Base.prototype)),
    (B.ConfigSelectors.prototype.constructor = B.ConfigSelectors),
    (B.ConfigRender = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.target = null),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.ConfigRender),
    (B.ConfigRender.prototype = Object.create(B.Base.prototype)),
    (B.ConfigRender.prototype.constructor = B.ConfigRender),
    (B.ConfigTemplates = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.ConfigTemplates),
    (B.ConfigTemplates.prototype = Object.create(B.Base.prototype)),
    (B.ConfigTemplates.prototype.constructor = B.ConfigTemplates),
    (B.Config = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.animation = new B.ConfigAnimation()),
        (this.behavior = new B.ConfigBehavior()),
        (this.callbacks = new B.ConfigCallbacks()),
        (this.controls = new B.ConfigControls()),
        (this.classNames = new B.ConfigClassNames()),
        (this.data = new B.ConfigData()),
        (this.debug = new B.ConfigDebug()),
        (this.layout = new B.ConfigLayout()),
        (this.load = new B.ConfigLoad()),
        (this.selectors = new B.ConfigSelectors()),
        (this.render = new B.ConfigRender()),
        (this.templates = new B.ConfigTemplates()),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.Config),
    (B.Config.prototype = Object.create(B.Base.prototype)),
    (B.Config.prototype.constructor = B.Config),
    (B.MixerDom = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.document = null),
        (this.body = null),
        (this.container = null),
        (this.parent = null),
        (this.targets = []),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.MixerDom),
    (B.MixerDom.prototype = Object.create(B.Base.prototype)),
    (B.MixerDom.prototype.constructor = B.MixerDom),
    (B.UiClassNames = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.base = ""),
        (this.active = ""),
        (this.disabled = ""),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.UiClassNames),
    (B.UiClassNames.prototype = Object.create(B.Base.prototype)),
    (B.UiClassNames.prototype.constructor = B.UiClassNames),
    (B.CommandDataset = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.dataset = null),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.CommandDataset),
    (B.CommandDataset.prototype = Object.create(B.Base.prototype)),
    (B.CommandDataset.prototype.constructor = B.CommandDataset),
    (B.CommandMultimix = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.filter = null),
        (this.sort = null),
        (this.insert = null),
        (this.remove = null),
        (this.changeLayout = null),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.CommandMultimix),
    (B.CommandMultimix.prototype = Object.create(B.Base.prototype)),
    (B.CommandMultimix.prototype.constructor = B.CommandMultimix),
    (B.CommandFilter = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.selector = ""),
        (this.collection = null),
        (this.action = "show"),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.CommandFilter),
    (B.CommandFilter.prototype = Object.create(B.Base.prototype)),
    (B.CommandFilter.prototype.constructor = B.CommandFilter),
    (B.CommandSort = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.sortString = ""),
        (this.attribute = ""),
        (this.order = "asc"),
        (this.collection = null),
        (this.next = null),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.CommandSort),
    (B.CommandSort.prototype = Object.create(B.Base.prototype)),
    (B.CommandSort.prototype.constructor = B.CommandSort),
    (B.CommandInsert = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.index = 0),
        (this.collection = []),
        (this.position = "before"),
        (this.sibling = null),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.CommandInsert),
    (B.CommandInsert.prototype = Object.create(B.Base.prototype)),
    (B.CommandInsert.prototype.constructor = B.CommandInsert),
    (B.CommandRemove = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.targets = []),
        (this.collection = []),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.CommandRemove),
    (B.CommandRemove.prototype = Object.create(B.Base.prototype)),
    (B.CommandRemove.prototype.constructor = B.CommandRemove),
    (B.CommandChangeLayout = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.containerClassName = ""),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.CommandChangeLayout),
    (B.CommandChangeLayout.prototype = Object.create(B.Base.prototype)),
    (B.CommandChangeLayout.prototype.constructor = B.CommandChangeLayout),
    (B.ControlDefinition = function (a, I, g, Z) {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.type = a),
        (this.selector = I),
        (this.live = g || !1),
        (this.parent = Z || ""),
        this.callActions("afterConstruct"),
        b.freeze(this),
        b.seal(this);
    }),
    B.BaseStatic.call(B.ControlDefinition),
    (B.ControlDefinition.prototype = Object.create(B.Base.prototype)),
    (B.ControlDefinition.prototype.constructor = B.ControlDefinition),
    (B.controlDefinitions = []),
    B.controlDefinitions.push(
      new B.ControlDefinition("multimix", "[data-filter][data-sort]")
    ),
    B.controlDefinitions.push(
      new B.ControlDefinition("filter", "[data-filter]")
    ),
    B.controlDefinitions.push(new B.ControlDefinition("sort", "[data-sort]")),
    B.controlDefinitions.push(
      new B.ControlDefinition("toggle", "[data-toggle]")
    ),
    (B.Control = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.el = null),
        (this.selector = ""),
        (this.bound = []),
        (this.pending = -1),
        (this.type = ""),
        (this.status = "inactive"),
        (this.filter = ""),
        (this.sort = ""),
        (this.canDisable = !1),
        (this.handler = null),
        (this.classNames = new B.UiClassNames()),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.Control),
    (B.Control.prototype = Object.create(B.Base.prototype)),
    b.extend(B.Control.prototype, {
      constructor: B.Control,
      init: function (a, b, I) {
        var g = this;
        if (
          (this.callActions("beforeInit", arguments),
          (g.el = a),
          (g.type = b),
          (g.selector = I),
          g.selector)
        )
          g.status = "live";
        else
          switch (((g.canDisable = "boolean" == typeof g.el.disable), g.type)) {
            case "filter":
              g.filter = g.el.getAttribute("data-filter");
              break;
            case "toggle":
              g.filter = g.el.getAttribute("data-toggle");
              break;
            case "sort":
              g.sort = g.el.getAttribute("data-sort");
              break;
            case "multimix":
              (g.filter = g.el.getAttribute("data-filter")),
                (g.sort = g.el.getAttribute("data-sort"));
          }
        g.bindClick(),
          B.controls.push(g),
          this.callActions("afterInit", arguments);
      },
      isBound: function (a) {
        var B = this,
          b = !1;
        return (
          this.callActions("beforeIsBound", arguments),
          (b = B.bound.indexOf(a) > -1),
          B.callFilters("afterIsBound", b, arguments)
        );
      },
      addBinding: function (a) {
        var B = this;
        this.callActions("beforeAddBinding", arguments),
          B.isBound() || B.bound.push(a),
          this.callActions("afterAddBinding", arguments);
      },
      removeBinding: function (a) {
        var b = this,
          I = -1;
        this.callActions("beforeRemoveBinding", arguments),
          (I = b.bound.indexOf(a)) > -1 && b.bound.splice(I, 1),
          b.bound.length < 1 &&
            (b.unbindClick(),
            (I = B.controls.indexOf(b)),
            B.controls.splice(I, 1),
            "active" === b.status && b.renderStatus(b.el, "inactive")),
          this.callActions("afterRemoveBinding", arguments);
      },
      bindClick: function () {
        var a = this;
        this.callActions("beforeBindClick", arguments),
          (a.handler = function (B) {
            a.handleClick(B);
          }),
          b.on(a.el, "click", a.handler),
          this.callActions("afterBindClick", arguments);
      },
      unbindClick: function () {
        var a = this;
        this.callActions("beforeUnbindClick", arguments),
          b.off(a.el, "click", a.handler),
          (a.handler = null),
          this.callActions("afterUnbindClick", arguments);
      },
      handleClick: function (a) {
        var I = this,
          g = null,
          Z = null,
          c = !1,
          j = void 0,
          d = {},
          E = null,
          f = [],
          A = -1;
        if (
          (this.callActions("beforeHandleClick", arguments),
          (this.pending = 0),
          (Z = I.bound[0]),
          (g = I.selector
            ? b.closestParent(
                a.target,
                Z.config.selectors.control + I.selector,
                !0,
                Z.dom.document
              )
            : I.el),
          !g)
        )
          return void I.callActions("afterHandleClick", arguments);
        switch (I.type) {
          case "filter":
            d.filter = I.filter || g.getAttribute("data-filter");
            break;
          case "sort":
            d.sort = I.sort || g.getAttribute("data-sort");
            break;
          case "multimix":
            (d.filter = I.filter || g.getAttribute("data-filter")),
              (d.sort = I.sort || g.getAttribute("data-sort"));
            break;
          case "toggle":
            (d.filter = I.filter || g.getAttribute("data-toggle")),
              (c =
                "live" === I.status
                  ? b.hasClass(g, I.classNames.active)
                  : "active" === I.status);
        }
        for (A = 0; A < I.bound.length; A++)
          (E = new B.CommandMultimix()), b.extend(E, d), f.push(E);
        for (
          f = I.callFilters("commandsHandleClick", f, arguments),
            I.pending = I.bound.length,
            A = 0;
          (Z = I.bound[A]);
          A++
        )
          (d = f[A]),
            d &&
              (Z.lastClicked || (Z.lastClicked = g),
              B.events.fire(
                "mixClick",
                Z.dom.container,
                {
                  state: Z.state,
                  instance: Z,
                  originalEvent: a,
                  control: Z.lastClicked,
                },
                Z.dom.document
              ),
              ("function" == typeof Z.config.callbacks.onMixClick &&
                ((j = Z.config.callbacks.onMixClick.call(
                  Z.lastClicked,
                  Z.state,
                  a,
                  Z
                )),
                j === !1)) ||
                ("toggle" === I.type
                  ? c
                    ? Z.toggleOff(d.filter)
                    : Z.toggleOn(d.filter)
                  : Z.multimix(d)));
        this.callActions("afterHandleClick", arguments);
      },
      update: function (a, b) {
        var I = this,
          g = new B.CommandMultimix();
        I.callActions("beforeUpdate", arguments),
          I.pending--,
          (I.pending = Math.max(0, I.pending)),
          I.pending > 0 ||
            ("live" === I.status
              ? I.updateLive(a, b)
              : ((g.sort = I.sort),
                (g.filter = I.filter),
                I.callFilters("actionsUpdate", g, arguments),
                I.parseStatusChange(I.el, a, g, b)),
            I.callActions("afterUpdate", arguments));
      },
      updateLive: function (a, b) {
        var I = this,
          g = null,
          Z = null,
          c = null,
          j = -1;
        if ((I.callActions("beforeUpdateLive", arguments), I.el)) {
          for (g = I.el.querySelectorAll(I.selector), j = 0; (c = g[j]); j++) {
            switch (((Z = new B.CommandMultimix()), I.type)) {
              case "filter":
                Z.filter = c.getAttribute("data-filter");
                break;
              case "sort":
                Z.sort = c.getAttribute("data-sort");
                break;
              case "multimix":
                (Z.filter = c.getAttribute("data-filter")),
                  (Z.sort = c.getAttribute("data-sort"));
                break;
              case "toggle":
                Z.filter = c.getAttribute("data-toggle");
            }
            (Z = I.callFilters("actionsUpdateLive", Z, arguments)),
              I.parseStatusChange(c, a, Z, b);
          }
          I.callActions("afterUpdateLive", arguments);
        }
      },
      parseStatusChange: function (a, B, b, I) {
        var g = this,
          Z = "",
          c = "",
          j = -1;
        switch ((g.callActions("beforeParseStatusChange", arguments), g.type)) {
          case "filter":
            B.filter === b.filter
              ? g.renderStatus(a, "active")
              : g.renderStatus(a, "inactive");
            break;
          case "multimix":
            B.sort === b.sort && B.filter === b.filter
              ? g.renderStatus(a, "active")
              : g.renderStatus(a, "inactive");
            break;
          case "sort":
            B.sort.match(/:asc/g) && (Z = B.sort.replace(/:asc/g, "")),
              B.sort === b.sort || Z === b.sort
                ? g.renderStatus(a, "active")
                : g.renderStatus(a, "inactive");
            break;
          case "toggle":
            for (
              I.length < 1 && g.renderStatus(a, "inactive"),
                B.filter === b.filter && g.renderStatus(a, "active"),
                j = 0;
              j < I.length;
              j++
            ) {
              if (((c = I[j]), c === b.filter)) {
                g.renderStatus(a, "active");
                break;
              }
              g.renderStatus(a, "inactive");
            }
        }
        g.callActions("afterParseStatusChange", arguments);
      },
      renderStatus: function (a, B) {
        var I = this;
        switch ((I.callActions("beforeRenderStatus", arguments), B)) {
          case "active":
            b.addClass(a, I.classNames.active),
              b.removeClass(a, I.classNames.disabled),
              I.canDisable && (I.el.disabled = !1);
            break;
          case "inactive":
            b.removeClass(a, I.classNames.active),
              b.removeClass(a, I.classNames.disabled),
              I.canDisable && (I.el.disabled = !1);
            break;
          case "disabled":
            I.canDisable && (I.el.disabled = !0),
              b.addClass(a, I.classNames.disabled),
              b.removeClass(a, I.classNames.active);
        }
        "live" !== I.status && (I.status = B),
          I.callActions("afterRenderStatus", arguments);
      },
    }),
    (B.controls = []),
    (B.StyleData = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.x = 0),
        (this.y = 0),
        (this.top = 0),
        (this.right = 0),
        (this.bottom = 0),
        (this.left = 0),
        (this.width = 0),
        (this.height = 0),
        (this.marginRight = 0),
        (this.marginBottom = 0),
        (this.opacity = 0),
        (this.scale = new B.TransformData()),
        (this.translateX = new B.TransformData()),
        (this.translateY = new B.TransformData()),
        (this.translateZ = new B.TransformData()),
        (this.rotateX = new B.TransformData()),
        (this.rotateY = new B.TransformData()),
        (this.rotateZ = new B.TransformData()),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.StyleData),
    (B.StyleData.prototype = Object.create(B.Base.prototype)),
    (B.StyleData.prototype.constructor = B.StyleData),
    (B.TransformData = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.value = 0),
        (this.unit = ""),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.TransformData),
    (B.TransformData.prototype = Object.create(B.Base.prototype)),
    (B.TransformData.prototype.constructor = B.TransformData),
    (B.TransformDefaults = function () {
      B.StyleData.apply(this),
        this.callActions("beforeConstruct"),
        (this.scale.value = 0.01),
        (this.scale.unit = ""),
        (this.translateX.value = 20),
        (this.translateX.unit = "px"),
        (this.translateY.value = 20),
        (this.translateY.unit = "px"),
        (this.translateZ.value = 20),
        (this.translateZ.unit = "px"),
        (this.rotateX.value = 90),
        (this.rotateX.unit = "deg"),
        (this.rotateY.value = 90),
        (this.rotateY.unit = "deg"),
        (this.rotateX.value = 90),
        (this.rotateX.unit = "deg"),
        (this.rotateZ.value = 180),
        (this.rotateZ.unit = "deg"),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.TransformDefaults),
    (B.TransformDefaults.prototype = Object.create(B.StyleData.prototype)),
    (B.TransformDefaults.prototype.constructor = B.TransformDefaults),
    (B.transformDefaults = new B.TransformDefaults()),
    (B.EventDetail = function () {
      (this.state = null),
        (this.futureState = null),
        (this.instance = null),
        (this.originalEvent = null);
    }),
    (B.Events = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.mixStart = null),
        (this.mixBusy = null),
        (this.mixEnd = null),
        (this.mixFail = null),
        (this.mixClick = null),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.Events),
    (B.Events.prototype = Object.create(B.Base.prototype)),
    (B.Events.prototype.constructor = B.Events),
    (B.Events.prototype.fire = function (a, I, g, Z) {
      var c = this,
        j = null,
        d = new B.EventDetail();
      if ((c.callActions("beforeFire", arguments), "undefined" == typeof c[a]))
        throw new Error('Event type "' + a + '" not found.');
      (d.state = new B.State()),
        b.extend(d.state, g.state),
        g.futureState &&
          ((d.futureState = new B.State()),
          b.extend(d.futureState, g.futureState)),
        (d.instance = g.instance),
        g.originalEvent && (d.originalEvent = g.originalEvent),
        (j = b.getCustomEvent(a, d, Z)),
        c.callFilters("eventFire", j, arguments),
        I.dispatchEvent(j);
    }),
    (B.events = new B.Events()),
    (B.QueueItem = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.args = []),
        (this.instruction = null),
        (this.triggerElement = null),
        (this.deferred = null),
        (this.isToggling = !1),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.QueueItem),
    (B.QueueItem.prototype = Object.create(B.Base.prototype)),
    (B.QueueItem.prototype.constructor = B.QueueItem),
    (B.Mixer = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.config = new B.Config()),
        (this.id = ""),
        (this.isBusy = !1),
        (this.isToggling = !1),
        (this.incPadding = !0),
        (this.controls = []),
        (this.targets = []),
        (this.origOrder = []),
        (this.cache = {}),
        (this.toggleArray = []),
        (this.targetsMoved = 0),
        (this.targetsImmovable = 0),
        (this.targetsBound = 0),
        (this.targetsDone = 0),
        (this.staggerDuration = 0),
        (this.effectsIn = null),
        (this.effectsOut = null),
        (this.transformIn = []),
        (this.transformOut = []),
        (this.queue = []),
        (this.state = null),
        (this.lastOperation = null),
        (this.lastClicked = null),
        (this.userCallback = null),
        (this.userDeferred = null),
        (this.dom = new B.MixerDom()),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.Mixer),
    (B.Mixer.prototype = Object.create(B.Base.prototype)),
    b.extend(B.Mixer.prototype, {
      constructor: B.Mixer,
      attach: function (I, g, Z, c) {
        var j = this,
          d = null,
          E = -1;
        for (
          j.callActions("beforeAttach", arguments),
            j.id = Z,
            c && b.extend(j.config, c, !0, !0),
            j.sanitizeConfig(),
            j.cacheDom(I, g),
            j.config.layout.containerClassName &&
              b.addClass(j.dom.container, j.config.layout.containerClassName),
            B.features.has.transitions || (j.config.animation.enable = !1),
            "undefined" == typeof a.console &&
              (j.config.debug.showWarnings = !1),
            j.config.data.uidKey && (j.config.controls.enable = !1),
            j.indexTargets(),
            j.state = j.getInitialState(),
            E = 0;
          (d = j.lastOperation.toHide[E]);
          E++
        )
          d.hide();
        j.config.controls.enable &&
          (j.initControls(),
          j.buildToggleArray(null, j.state),
          j.updateControls({
            filter: j.state.activeFilter,
            sort: j.state.activeSort,
          })),
          j.parseEffects(),
          j.callActions("afterAttach", arguments);
      },
      sanitizeConfig: function () {
        var a = this;
        a.callActions("beforeSanitizeConfig", arguments),
          (a.config.controls.scope = a.config.controls.scope
            .toLowerCase()
            .trim()),
          (a.config.controls.toggleLogic = a.config.controls.toggleLogic
            .toLowerCase()
            .trim()),
          (a.config.controls.toggleDefault = a.config.controls.toggleDefault
            .toLowerCase()
            .trim()),
          (a.config.animation.effects = a.config.animation.effects.trim()),
          a.callActions("afterSanitizeConfig", arguments);
      },
      getInitialState: function () {
        var a = this,
          b = new B.State(),
          I = new B.Operation();
        if (
          (a.callActions("beforeGetInitialState", arguments),
          (b.activeContainerClassName = a.config.layout.containerClassName),
          a.config.load.dataset)
        ) {
          if (!a.config.data.uidKey || "string" != typeof a.config.data.uidKey)
            throw new TypeError(B.messages.errorConfigDataUidKeyNotSet());
          (I.startDataset =
            I.newDataset =
            b.activeDataset =
              a.config.load.dataset.slice()),
            (I.startContainerClassName = I.newContainerClassName =
              b.activeContainerClassName),
            (I.show = a.targets.slice()),
            (b = a.callFilters("stateGetInitialState", b, arguments));
        } else
          (b.activeFilter = a.parseFilterArgs([a.config.load.filter]).command),
            (b.activeSort = a.parseSortArgs([a.config.load.sort]).command),
            (b.totalTargets = a.targets.length),
            (b = a.callFilters("stateGetInitialState", b, arguments)),
            b.activeSort.collection ||
            b.activeSort.attribute ||
            "random" === b.activeSort.order ||
            "desc" === b.activeSort.order
              ? ((I.newSort = b.activeSort),
                a.sortOperation(I),
                a.printSort(!1, I),
                (a.targets = I.newOrder))
              : (I.startOrder = I.newOrder = a.targets),
            (I.startFilter = I.newFilter = b.activeFilter),
            (I.startSort = I.newSort = b.activeSort),
            (I.startContainerClassName = I.newContainerClassName =
              b.activeContainerClassName),
            "all" === I.newFilter.selector
              ? (I.newFilter.selector = a.config.selectors.target)
              : "none" === I.newFilter.selector && (I.newFilter.selector = "");
        return (
          (I = a.callFilters("operationGetInitialState", I, [b])),
          (a.lastOperation = I),
          I.newFilter && a.filterOperation(I),
          (b = a.buildState(I))
        );
      },
      cacheDom: function (a, B) {
        var b = this;
        b.callActions("beforeCacheDom", arguments),
          (b.dom.document = B),
          (b.dom.body = b.dom.document.querySelector("body")),
          (b.dom.container = a),
          (b.dom.parent = a),
          b.callActions("afterCacheDom", arguments);
      },
      indexTargets: function () {
        var a = this,
          I = null,
          g = null,
          Z = null,
          c = -1;
        if (
          (a.callActions("beforeIndexTargets", arguments),
          (a.dom.targets = a.config.layout.allowNestedTargets
            ? a.dom.container.querySelectorAll(a.config.selectors.target)
            : b.children(
                a.dom.container,
                a.config.selectors.target,
                a.dom.document
              )),
          (a.dom.targets = b.arrayFromList(a.dom.targets)),
          (a.targets = []),
          (Z = a.config.load.dataset) && Z.length !== a.dom.targets.length)
        )
          throw new Error(B.messages.errorDatasetPrerenderedMismatch());
        if (a.dom.targets.length) {
          for (c = 0; (g = a.dom.targets[c]); c++)
            (I = new B.Target()),
              I.init(g, a, Z ? Z[c] : void 0),
              (I.isInDom = !0),
              a.targets.push(I);
          a.dom.parent =
            a.dom.targets[0].parentElement === a.dom.container
              ? a.dom.container
              : a.dom.targets[0].parentElement;
        }
        (a.origOrder = a.targets),
          a.callActions("afterIndexTargets", arguments);
      },
      initControls: function () {
        var a = this,
          b = "",
          I = null,
          g = null,
          Z = null,
          c = null,
          j = null,
          d = -1,
          E = -1;
        switch (
          (a.callActions("beforeInitControls", arguments),
          a.config.controls.scope)
        ) {
          case "local":
            Z = a.dom.container;
            break;
          case "global":
            Z = a.dom.document;
            break;
          default:
            throw new Error(B.messages.errorConfigInvalidControlsScope());
        }
        for (d = 0; (b = B.controlDefinitions[d]); d++)
          if (a.config.controls.live || b.live) {
            if (b.parent) {
              if (((c = a.dom[b.parent]), !c || c.length < 0)) continue;
              "number" != typeof c.length && (c = [c]);
            } else c = [Z];
            for (E = 0; (g = c[E]); E++)
              (j = a.getControl(g, b.type, b.selector)), a.controls.push(j);
          } else
            for (
              I = Z.querySelectorAll(a.config.selectors.control + b.selector),
                E = 0;
              (g = I[E]);
              E++
            )
              (j = a.getControl(g, b.type, "")), j && a.controls.push(j);
        a.callActions("afterInitControls", arguments);
      },
      getControl: function (a, I, g) {
        var Z = this,
          c = null,
          j = -1;
        if ((Z.callActions("beforeGetControl", arguments), !g))
          for (j = 0; (c = B.controls[j]); j++) {
            if (c.el === a && c.isBound(Z))
              return Z.callFilters("controlGetControl", null, arguments);
            if (c.el === a && c.type === I && c.selector === g)
              return (
                c.addBinding(Z),
                Z.callFilters("controlGetControl", c, arguments)
              );
          }
        return (
          (c = new B.Control()),
          c.init(a, I, g),
          (c.classNames.base = b.getClassname(Z.config.classNames, I)),
          (c.classNames.active = b.getClassname(
            Z.config.classNames,
            I,
            Z.config.classNames.modifierActive
          )),
          (c.classNames.disabled = b.getClassname(
            Z.config.classNames,
            I,
            Z.config.classNames.modifierDisabled
          )),
          c.addBinding(Z),
          Z.callFilters("controlGetControl", c, arguments)
        );
      },
      getToggleSelector: function () {
        var a = this,
          B = "or" === a.config.controls.toggleLogic ? ", " : "",
          I = "";
        return (
          a.callActions("beforeGetToggleSelector", arguments),
          (a.toggleArray = b.clean(a.toggleArray)),
          (I = a.toggleArray.join(B)),
          "" === I && (I = a.config.controls.toggleDefault),
          a.callFilters("selectorGetToggleSelector", I, arguments)
        );
      },
      buildToggleArray: function (a, B) {
        var I = this,
          g = "";
        if ((I.callActions("beforeBuildToggleArray", arguments), a && a.filter))
          g = a.filter.selector.replace(/\s/g, "");
        else {
          if (!B) return;
          g = B.activeFilter.selector.replace(/\s/g, "");
        }
        (g !== I.config.selectors.target && "all" !== g) || (g = ""),
          "or" === I.config.controls.toggleLogic
            ? (I.toggleArray = g.split(","))
            : (I.toggleArray = I.splitCompoundSelector(g)),
          (I.toggleArray = b.clean(I.toggleArray)),
          I.callActions("afterBuildToggleArray", arguments);
      },
      splitCompoundSelector: function (a) {
        var B = a.split(/([\.\[])/g),
          b = [],
          I = "",
          g = -1;
        for ("" === B[0] && B.shift(), g = 0; g < B.length; g++)
          g % 2 === 0 && (I = ""), (I += B[g]), g % 2 !== 0 && b.push(I);
        return b;
      },
      updateControls: function (a) {
        var I = this,
          g = null,
          Z = new B.CommandMultimix(),
          c = -1;
        for (
          I.callActions("beforeUpdateControls", arguments),
            a.filter
              ? (Z.filter = a.filter.selector)
              : (Z.filter = I.state.activeFilter.selector),
            a.sort
              ? (Z.sort = I.buildSortString(a.sort))
              : (Z.sort = I.buildSortString(I.state.activeSort)),
            Z.filter === I.config.selectors.target && (Z.filter = "all"),
            "" === Z.filter && (Z.filter = "none"),
            b.freeze(Z),
            c = 0;
          (g = I.controls[c]);
          c++
        )
          g.update(Z, I.toggleArray);
        I.callActions("afterUpdateControls", arguments);
      },
      buildSortString: function (a) {
        var B = this,
          b = "";
        return (
          (b += a.sortString),
          a.next && (b += " " + B.buildSortString(a.next)),
          b
        );
      },
      insertTargets: function (a, I) {
        var g = this,
          Z = null,
          c = -1,
          j = null,
          d = null,
          E = null,
          f = -1;
        if (
          (g.callActions("beforeInsertTargets", arguments),
          "undefined" == typeof a.index && (a.index = 0),
          (Z = g.getNextSibling(a.index, a.sibling, a.position)),
          (j = g.dom.document.createDocumentFragment()),
          (c = Z ? b.index(Z, g.config.selectors.target) : g.targets.length),
          a.collection)
        ) {
          for (f = 0; (E = a.collection[f]); f++) {
            if (g.dom.targets.indexOf(E) > -1)
              throw new Error(B.messages.errorInsertPreexistingElement());
            (E.style.display = "none"),
              j.appendChild(E),
              j.appendChild(g.dom.document.createTextNode(" ")),
              b.isElement(E, g.dom.document) &&
                E.matches(g.config.selectors.target) &&
                ((d = new B.Target()),
                d.init(E, g),
                (d.isInDom = !0),
                g.targets.splice(c, 0, d),
                c++);
          }
          g.dom.parent.insertBefore(j, Z);
        }
        (I.startOrder = g.origOrder = g.targets),
          g.callActions("afterInsertTargets", arguments);
      },
      getNextSibling: function (a, B, b) {
        var I = this,
          g = null;
        return (
          (a = Math.max(a, 0)),
          B && "before" === b
            ? (g = B)
            : B && "after" === b
            ? (g = B.nextElementSibling || null)
            : I.targets.length > 0 && "undefined" != typeof a
            ? (g =
                a < I.targets.length || !I.targets.length
                  ? I.targets[a].dom.el
                  : I.targets[I.targets.length - 1].dom.el.nextElementSibling)
            : 0 === I.targets.length &&
              I.dom.parent.children.length > 0 &&
              (I.config.layout.siblingAfter
                ? (g = I.config.layout.siblingAfter)
                : I.config.layout.siblingBefore
                ? (g = I.config.layout.siblingBefore.nextElementSibling)
                : I.dom.parent.children[0]),
          I.callFilters("elementGetNextSibling", g, arguments)
        );
      },
      filterOperation: function (a) {
        var B = this,
          b = !1,
          I = -1,
          g = "",
          Z = null,
          c = -1;
        for (
          B.callActions("beforeFilterOperation", arguments),
            g = a.newFilter.action,
            c = 0;
          (Z = a.newOrder[c]);
          c++
        )
          (b = a.newFilter.collection
            ? a.newFilter.collection.indexOf(Z.dom.el) > -1
            : "" !== a.newFilter.selector &&
              Z.dom.el.matches(a.newFilter.selector)),
            B.evaluateHideShow(b, Z, g, a);
        if (a.toRemove.length)
          for (c = 0; (Z = a.show[c]); c++)
            a.toRemove.indexOf(Z) > -1 &&
              (a.show.splice(c, 1),
              (I = a.toShow.indexOf(Z)) > -1 && a.toShow.splice(I, 1),
              a.toHide.push(Z),
              a.hide.push(Z),
              c--);
        (a.matching = a.show.slice()),
          0 === a.show.length &&
            "" !== a.newFilter.selector &&
            0 !== B.targets.length &&
            (a.hasFailed = !0),
          B.callActions("afterFilterOperation", arguments);
      },
      evaluateHideShow: function (a, B, b, I) {
        var g = this,
          Z = !1,
          c = Array.prototype.slice.call(arguments, 1);
        (Z = g.callFilters("testResultEvaluateHideShow", a, c)),
          g.callActions("beforeEvaluateHideShow", arguments),
          (Z === !0 && "show" === b) || (Z === !1 && "hide" === b)
            ? (I.show.push(B), !B.isShown && I.toShow.push(B))
            : (I.hide.push(B), B.isShown && I.toHide.push(B)),
          g.callActions("afterEvaluateHideShow", arguments);
      },
      sortOperation: function (a) {
        var I = this,
          g = [],
          Z = null,
          c = null,
          j = -1;
        if (
          (I.callActions("beforeSortOperation", arguments),
          (a.startOrder = I.targets),
          a.newSort.collection)
        ) {
          for (g = [], j = 0; (c = a.newSort.collection[j]); j++) {
            if (I.dom.targets.indexOf(c) < 0)
              throw new Error(B.messages.errorSortNonExistentElement());
            (Z = new B.Target()), Z.init(c, I), (Z.isInDom = !0), g.push(Z);
          }
          a.newOrder = g;
        } else
          "random" === a.newSort.order
            ? (a.newOrder = b.arrayShuffle(a.startOrder))
            : "" === a.newSort.attribute
            ? ((a.newOrder = I.origOrder.slice()),
              "desc" === a.newSort.order && a.newOrder.reverse())
            : ((a.newOrder = a.startOrder.slice()),
              a.newOrder.sort(function (B, b) {
                return I.compare(B, b, a.newSort);
              }));
        b.isEqualArray(a.newOrder, a.startOrder) && (a.willSort = !1),
          I.callActions("afterSortOperation", arguments);
      },
      compare: function (a, B, b) {
        var I = this,
          g = b.order,
          Z = I.getAttributeValue(a, b.attribute),
          c = I.getAttributeValue(B, b.attribute);
        return (
          isNaN(1 * Z) || isNaN(1 * c)
            ? ((Z = Z.toLowerCase()), (c = c.toLowerCase()))
            : ((Z = 1 * Z), (c = 1 * c)),
          Z < c
            ? "asc" === g
              ? -1
              : 1
            : Z > c
            ? "asc" === g
              ? 1
              : -1
            : Z === c && b.next
            ? I.compare(a, B, b.next)
            : 0
        );
      },
      getAttributeValue: function (a, b) {
        var I = this,
          g = "";
        return (
          (g = a.dom.el.getAttribute("data-" + b)),
          null === g &&
            I.config.debug.showWarnings &&
            console.warn(
              B.messages.warningInconsistentSortingAttributes({
                attribute: "data-" + b,
              })
            ),
          I.callFilters("valueGetAttributeValue", g || 0, arguments)
        );
      },
      printSort: function (B, I) {
        var g = this,
          Z = B ? I.newOrder : I.startOrder,
          c = B ? I.startOrder : I.newOrder,
          j = Z.length ? Z[Z.length - 1].dom.el.nextElementSibling : null,
          d = a.document.createDocumentFragment(),
          E = null,
          f = null,
          A = null,
          aJ = -1;
        for (
          g.callActions("beforePrintSort", arguments), aJ = 0;
          (f = Z[aJ]);
          aJ++
        )
          (A = f.dom.el),
            "absolute" !== A.style.position &&
              (b.removeWhitespace(A.previousSibling),
              A.parentElement.removeChild(A));
        for (
          E = j ? j.previousSibling : g.dom.parent.lastChild,
            E && "#text" === E.nodeName && b.removeWhitespace(E),
            aJ = 0;
          (f = c[aJ]);
          aJ++
        )
          (A = f.dom.el),
            b.isElement(d.lastChild) &&
              d.appendChild(a.document.createTextNode(" ")),
            d.appendChild(A);
        g.dom.parent.firstChild &&
          g.dom.parent.firstChild !== j &&
          d.insertBefore(a.document.createTextNode(" "), d.childNodes[0]),
          j
            ? (d.appendChild(a.document.createTextNode(" ")),
              g.dom.parent.insertBefore(d, j))
            : g.dom.parent.appendChild(d),
          g.callActions("afterPrintSort", arguments);
      },
      parseSortString: function (a, I) {
        var g = this,
          Z = a.split(" "),
          c = I,
          j = [],
          d = -1;
        for (d = 0; d < Z.length; d++) {
          switch (
            ((j = Z[d].split(":")),
            (c.sortString = Z[d]),
            (c.attribute = b.dashCase(j[0])),
            (c.order = j[1] || "asc"),
            c.attribute)
          ) {
            case "default":
              c.attribute = "";
              break;
            case "random":
              (c.attribute = ""), (c.order = "random");
          }
          if (!c.attribute || "random" === c.order) break;
          d < Z.length - 1 &&
            ((c.next = new B.CommandSort()), b.freeze(c), (c = c.next));
        }
        return g.callFilters("commandsParseSort", I, arguments);
      },
      parseEffects: function () {
        var a = this,
          b = "",
          I = a.config.animation.effectsIn || a.config.animation.effects,
          g = a.config.animation.effectsOut || a.config.animation.effects;
        a.callActions("beforeParseEffects", arguments),
          (a.effectsIn = new B.StyleData()),
          (a.effectsOut = new B.StyleData()),
          (a.transformIn = []),
          (a.transformOut = []),
          (a.effectsIn.opacity = a.effectsOut.opacity = 1),
          a.parseEffect("fade", I, a.effectsIn, a.transformIn),
          a.parseEffect("fade", g, a.effectsOut, a.transformOut, !0);
        for (b in B.transformDefaults)
          B.transformDefaults[b] instanceof B.TransformData &&
            (a.parseEffect(b, I, a.effectsIn, a.transformIn),
            a.parseEffect(b, g, a.effectsOut, a.transformOut, !0));
        a.parseEffect("stagger", I, a.effectsIn, a.transformIn),
          a.parseEffect("stagger", g, a.effectsOut, a.transformOut, !0),
          a.callActions("afterParseEffects", arguments);
      },
      parseEffect: function (a, b, I, g, Z) {
        var c = this,
          j = /\(([^)]+)\)/,
          d = -1,
          E = "",
          f = [],
          A = "",
          aJ = ["%", "px", "em", "rem", "vh", "vw", "deg"],
          fh = "",
          e = -1;
        if (
          (c.callActions("beforeParseEffect", arguments), "string" != typeof b)
        )
          throw new TypeError(B.messages.errorConfigInvalidAnimationEffects());
        if (b.indexOf(a) < 0)
          return void ("stagger" === a && (c.staggerDuration = 0));
        switch (
          ((d = b.indexOf(a + "(")),
          d > -1 && ((E = b.substring(d)), (f = j.exec(E)), (A = f[1])),
          a)
        ) {
          case "fade":
            I.opacity = A ? parseFloat(A) : 0;
            break;
          case "stagger":
            c.staggerDuration = A ? parseFloat(A) : 100;
            break;
          default:
            if (
              (Z && c.config.animation.reverseOut && "scale" !== a
                ? (I[a].value =
                    (A ? parseFloat(A) : B.transformDefaults[a].value) * -1)
                : (I[a].value = A
                    ? parseFloat(A)
                    : B.transformDefaults[a].value),
              A)
            ) {
              for (e = 0; (fh = aJ[e]); e++)
                if (A.indexOf(fh) > -1) {
                  I[a].unit = fh;
                  break;
                }
            } else I[a].unit = B.transformDefaults[a].unit;
            g.push(a + "(" + I[a].value + I[a].unit + ")");
        }
        c.callActions("afterParseEffect", arguments);
      },
      buildState: function (a) {
        var b = this,
          I = new B.State(),
          g = null,
          Z = -1;
        for (
          b.callActions("beforeBuildState", arguments), Z = 0;
          (g = b.targets[Z]);
          Z++
        )
          (!a.toRemove.length || a.toRemove.indexOf(g) < 0) &&
            I.targets.push(g.dom.el);
        for (Z = 0; (g = a.matching[Z]); Z++) I.matching.push(g.dom.el);
        for (Z = 0; (g = a.show[Z]); Z++) I.show.push(g.dom.el);
        for (Z = 0; (g = a.hide[Z]); Z++)
          (!a.toRemove.length || a.toRemove.indexOf(g) < 0) &&
            I.hide.push(g.dom.el);
        return (
          (I.id = b.id),
          (I.container = b.dom.container),
          (I.activeFilter = a.newFilter),
          (I.activeSort = a.newSort),
          (I.activeDataset = a.newDataset),
          (I.activeContainerClassName = a.newContainerClassName),
          (I.hasFailed = a.hasFailed),
          (I.totalTargets = b.targets.length),
          (I.totalShow = a.show.length),
          (I.totalHide = a.hide.length),
          (I.totalMatching = a.matching.length),
          (I.triggerElement = a.triggerElement),
          b.callFilters("stateBuildState", I, arguments)
        );
      },
      goMix: function (I, g) {
        var Z = this,
          c = null;
        return (
          Z.callActions("beforeGoMix", arguments),
          (Z.config.animation.duration &&
            Z.config.animation.effects &&
            b.isVisible(Z.dom.container)) ||
            (I = !1),
          g.toShow.length ||
            g.toHide.length ||
            g.willSort ||
            g.willChangeLayout ||
            (I = !1),
          g.startState.show.length || g.show.length || (I = !1),
          B.events.fire(
            "mixStart",
            Z.dom.container,
            { state: g.startState, futureState: g.newState, instance: Z },
            Z.dom.document
          ),
          "function" == typeof Z.config.callbacks.onMixStart &&
            Z.config.callbacks.onMixStart.call(
              Z.dom.container,
              g.startState,
              g.newState,
              Z
            ),
          b.removeClass(
            Z.dom.container,
            b.getClassname(
              Z.config.classNames,
              "container",
              Z.config.classNames.modifierFailed
            )
          ),
          (c = Z.userDeferred
            ? Z.userDeferred
            : (Z.userDeferred = b.defer(B.libraries))),
          (Z.isBusy = !0),
          I && B.features.has.transitions
            ? (a.pageYOffset !== g.docState.scrollTop &&
                a.scrollTo(g.docState.scrollLeft, g.docState.scrollTop),
              Z.config.animation.applyPerspective &&
                ((Z.dom.parent.style[B.features.perspectiveProp] =
                  Z.config.animation.perspectiveDistance),
                (Z.dom.parent.style[B.features.perspectiveOriginProp] =
                  Z.config.animation.perspectiveOrigin)),
              Z.config.animation.animateResizeContainer &&
                g.startHeight !== g.newHeight &&
                g.viewportDeltaY !== g.startHeight - g.newHeight &&
                (Z.dom.parent.style.height = g.startHeight + "px"),
              Z.config.animation.animateResizeContainer &&
                g.startWidth !== g.newWidth &&
                g.viewportDeltaX !== g.startWidth - g.newWidth &&
                (Z.dom.parent.style.width = g.startWidth + "px"),
              g.startHeight === g.newHeight &&
                (Z.dom.parent.style.height = g.startHeight + "px"),
              g.startWidth === g.newWidth &&
                (Z.dom.parent.style.width = g.startWidth + "px"),
              g.startHeight === g.newHeight &&
                g.startWidth === g.newWidth &&
                (Z.dom.parent.style.overflow = "hidden"),
              requestAnimationFrame(function () {
                Z.moveTargets(g);
              }),
              Z.callFilters("promiseGoMix", c.promise, arguments))
            : (Z.config.debug.fauxAsync
                ? setTimeout(function () {
                    Z.cleanUp(g);
                  }, Z.config.animation.duration)
                : Z.cleanUp(g),
              Z.callFilters("promiseGoMix", c.promise, arguments))
        );
      },
      getStartMixData: function (b) {
        var I = this,
          g = a.getComputedStyle(I.dom.parent),
          Z = I.dom.parent.getBoundingClientRect(),
          c = null,
          j = {},
          d = -1,
          E = g[B.features.boxSizingProp];
        for (
          I.incPadding = "border-box" === E,
            I.callActions("beforeGetStartMixData", arguments),
            d = 0;
          (c = b.show[d]);
          d++
        )
          (j = c.getPosData()), (b.showPosData[d] = { startPosData: j });
        for (d = 0; (c = b.toHide[d]); d++)
          (j = c.getPosData()), (b.toHidePosData[d] = { startPosData: j });
        (b.startX = Z.left),
          (b.startY = Z.top),
          (b.startHeight = I.incPadding
            ? Z.height
            : Z.height -
              parseFloat(g.paddingTop) -
              parseFloat(g.paddingBottom) -
              parseFloat(g.borderTop) -
              parseFloat(g.borderBottom)),
          (b.startWidth = I.incPadding
            ? Z.width
            : Z.width -
              parseFloat(g.paddingLeft) -
              parseFloat(g.paddingRight) -
              parseFloat(g.borderLeft) -
              parseFloat(g.borderRight)),
          I.callActions("afterGetStartMixData", arguments);
      },
      setInter: function (a) {
        var B = this,
          I = null,
          g = -1;
        for (
          B.callActions("beforeSetInter", arguments),
            B.config.animation.clampHeight &&
              ((B.dom.parent.style.height = a.startHeight + "px"),
              (B.dom.parent.style.overflow = "hidden")),
            B.config.animation.clampWidth &&
              ((B.dom.parent.style.width = a.startWidth + "px"),
              (B.dom.parent.style.overflow = "hidden")),
            g = 0;
          (I = a.toShow[g]);
          g++
        )
          I.show();
        a.willChangeLayout &&
          (b.removeClass(B.dom.container, a.startContainerClassName),
          b.addClass(B.dom.container, a.newContainerClassName)),
          B.callActions("afterSetInter", arguments);
      },
      getInterMixData: function (a) {
        var B = this,
          b = null,
          I = -1;
        for (
          B.callActions("beforeGetInterMixData", arguments), I = 0;
          (b = a.show[I]);
          I++
        )
          a.showPosData[I].interPosData = b.getPosData();
        for (I = 0; (b = a.toHide[I]); I++)
          a.toHidePosData[I].interPosData = b.getPosData();
        B.callActions("afterGetInterMixData", arguments);
      },
      setFinal: function (a) {
        var B = this,
          b = null,
          I = -1;
        for (
          B.callActions("beforeSetFinal", arguments),
            a.willSort && B.printSort(!1, a),
            I = 0;
          (b = a.toHide[I]);
          I++
        )
          b.hide();
        B.callActions("afterSetFinal", arguments);
      },
      getFinalMixData: function (B) {
        var I = this,
          g = null,
          Z = null,
          c = null,
          j = -1;
        for (
          I.callActions("beforeGetFinalMixData", arguments), j = 0;
          (c = B.show[j]);
          j++
        )
          B.showPosData[j].finalPosData = c.getPosData();
        for (j = 0; (c = B.toHide[j]); j++)
          B.toHidePosData[j].finalPosData = c.getPosData();
        for (
          (I.config.animation.clampHeight || I.config.animation.clampWidth) &&
            (I.dom.parent.style.height =
              I.dom.parent.style.width =
              I.dom.parent.style.overflow =
                ""),
            I.incPadding || (g = a.getComputedStyle(I.dom.parent)),
            Z = I.dom.parent.getBoundingClientRect(),
            B.newX = Z.left,
            B.newY = Z.top,
            B.newHeight = I.incPadding
              ? Z.height
              : Z.height -
                parseFloat(g.paddingTop) -
                parseFloat(g.paddingBottom) -
                parseFloat(g.borderTop) -
                parseFloat(g.borderBottom),
            B.newWidth = I.incPadding
              ? Z.width
              : Z.width -
                parseFloat(g.paddingLeft) -
                parseFloat(g.paddingRight) -
                parseFloat(g.borderLeft) -
                parseFloat(g.borderRight),
            B.viewportDeltaX =
              B.docState.viewportWidth -
              this.dom.document.documentElement.clientWidth,
            B.viewportDeltaY =
              B.docState.viewportHeight -
              this.dom.document.documentElement.clientHeight,
            B.willSort && I.printSort(!0, B),
            j = 0;
          (c = B.toShow[j]);
          j++
        )
          c.hide();
        for (j = 0; (c = B.toHide[j]); j++) c.show();
        B.willChangeLayout &&
          (b.removeClass(I.dom.container, B.newContainerClassName),
          b.addClass(I.dom.container, I.config.layout.containerClassName)),
          I.callActions("afterGetFinalMixData", arguments);
      },
      getTweenData: function (a) {
        var b = this,
          I = null,
          g = null,
          Z = Object.getOwnPropertyNames(b.effectsIn),
          c = "",
          j = null,
          d = -1,
          E = -1,
          f = -1,
          A = -1;
        for (
          b.callActions("beforeGetTweenData", arguments), f = 0;
          (I = a.show[f]);
          f++
        )
          for (
            g = a.showPosData[f],
              g.posIn = new B.StyleData(),
              g.posOut = new B.StyleData(),
              g.tweenData = new B.StyleData(),
              I.isShown
                ? ((g.posIn.x = g.startPosData.x - g.interPosData.x),
                  (g.posIn.y = g.startPosData.y - g.interPosData.y))
                : (g.posIn.x = g.posIn.y = 0),
              g.posOut.x = g.finalPosData.x - g.interPosData.x,
              g.posOut.y = g.finalPosData.y - g.interPosData.y,
              g.posIn.opacity = I.isShown ? 1 : b.effectsIn.opacity,
              g.posOut.opacity = 1,
              g.tweenData.opacity = g.posOut.opacity - g.posIn.opacity,
              I.isShown ||
                b.config.animation.nudge ||
                ((g.posIn.x = g.posOut.x), (g.posIn.y = g.posOut.y)),
              g.tweenData.x = g.posOut.x - g.posIn.x,
              g.tweenData.y = g.posOut.y - g.posIn.y,
              b.config.animation.animateResizeTargets &&
                ((g.posIn.width = g.startPosData.width),
                (g.posIn.height = g.startPosData.height),
                (d =
                  (g.startPosData.width || g.finalPosData.width) -
                  g.interPosData.width),
                (g.posIn.marginRight = g.startPosData.marginRight - d),
                (E =
                  (g.startPosData.height || g.finalPosData.height) -
                  g.interPosData.height),
                (g.posIn.marginBottom = g.startPosData.marginBottom - E),
                (g.posOut.width = g.finalPosData.width),
                (g.posOut.height = g.finalPosData.height),
                (d =
                  (g.finalPosData.width || g.startPosData.width) -
                  g.interPosData.width),
                (g.posOut.marginRight = g.finalPosData.marginRight - d),
                (E =
                  (g.finalPosData.height || g.startPosData.height) -
                  g.interPosData.height),
                (g.posOut.marginBottom = g.finalPosData.marginBottom - E),
                (g.tweenData.width = g.posOut.width - g.posIn.width),
                (g.tweenData.height = g.posOut.height - g.posIn.height),
                (g.tweenData.marginRight =
                  g.posOut.marginRight - g.posIn.marginRight),
                (g.tweenData.marginBottom =
                  g.posOut.marginBottom - g.posIn.marginBottom)),
              A = 0;
            (c = Z[A]);
            A++
          )
            (j = b.effectsIn[c]),
              j instanceof B.TransformData &&
                j.value &&
                ((g.posIn[c].value = j.value),
                (g.posOut[c].value = 0),
                (g.tweenData[c].value = g.posOut[c].value - g.posIn[c].value),
                (g.posIn[c].unit =
                  g.posOut[c].unit =
                  g.tweenData[c].unit =
                    j.unit));
        for (f = 0; (I = a.toHide[f]); f++)
          for (
            g = a.toHidePosData[f],
              g.posIn = new B.StyleData(),
              g.posOut = new B.StyleData(),
              g.tweenData = new B.StyleData(),
              g.posIn.x = I.isShown ? g.startPosData.x - g.interPosData.x : 0,
              g.posIn.y = I.isShown ? g.startPosData.y - g.interPosData.y : 0,
              g.posOut.x = b.config.animation.nudge ? 0 : g.posIn.x,
              g.posOut.y = b.config.animation.nudge ? 0 : g.posIn.y,
              g.tweenData.x = g.posOut.x - g.posIn.x,
              g.tweenData.y = g.posOut.y - g.posIn.y,
              b.config.animation.animateResizeTargets &&
                ((g.posIn.width = g.startPosData.width),
                (g.posIn.height = g.startPosData.height),
                (d = g.startPosData.width - g.interPosData.width),
                (g.posIn.marginRight = g.startPosData.marginRight - d),
                (E = g.startPosData.height - g.interPosData.height),
                (g.posIn.marginBottom = g.startPosData.marginBottom - E)),
              g.posIn.opacity = 1,
              g.posOut.opacity = b.effectsOut.opacity,
              g.tweenData.opacity = g.posOut.opacity - g.posIn.opacity,
              A = 0;
            (c = Z[A]);
            A++
          )
            (j = b.effectsOut[c]),
              j instanceof B.TransformData &&
                j.value &&
                ((g.posIn[c].value = 0),
                (g.posOut[c].value = j.value),
                (g.tweenData[c].value = g.posOut[c].value - g.posIn[c].value),
                (g.posIn[c].unit =
                  g.posOut[c].unit =
                  g.tweenData[c].unit =
                    j.unit));
        b.callActions("afterGetTweenData", arguments);
      },
      moveTargets: function (a) {
        var I = this,
          g = null,
          Z = null,
          c = null,
          j = "",
          d = !1,
          E = -1,
          f = -1,
          A = I.checkProgress.bind(I);
        for (
          I.callActions("beforeMoveTargets", arguments), f = 0;
          (g = a.show[f]);
          f++
        )
          (Z = new B.IMoveData()),
            (c = a.showPosData[f]),
            (j = g.isShown ? "none" : "show"),
            (d = I.willTransition(j, a.hasEffect, c.posIn, c.posOut)),
            d && E++,
            g.show(),
            (Z.posIn = c.posIn),
            (Z.posOut = c.posOut),
            (Z.statusChange = j),
            (Z.staggerIndex = E),
            (Z.operation = a),
            (Z.callback = d ? A : null),
            g.move(Z);
        for (f = 0; (g = a.toHide[f]); f++)
          (c = a.toHidePosData[f]),
            (Z = new B.IMoveData()),
            (j = "hide"),
            (d = I.willTransition(j, c.posIn, c.posOut)),
            (Z.posIn = c.posIn),
            (Z.posOut = c.posOut),
            (Z.statusChange = j),
            (Z.staggerIndex = f),
            (Z.operation = a),
            (Z.callback = d ? A : null),
            g.move(Z);
        I.config.animation.animateResizeContainer &&
          ((I.dom.parent.style[B.features.transitionProp] =
            "height " +
            I.config.animation.duration +
            "ms ease, width " +
            I.config.animation.duration +
            "ms ease "),
          requestAnimationFrame(function () {
            a.startHeight !== a.newHeight &&
              a.viewportDeltaY !== a.startHeight - a.newHeight &&
              (I.dom.parent.style.height = a.newHeight + "px"),
              a.startWidth !== a.newWidth &&
                a.viewportDeltaX !== a.startWidth - a.newWidth &&
                (I.dom.parent.style.width = a.newWidth + "px");
          })),
          a.willChangeLayout &&
            (b.removeClass(I.dom.container, I.config.layout.ContainerClassName),
            b.addClass(I.dom.container, a.newContainerClassName)),
          I.callActions("afterMoveTargets", arguments);
      },
      hasEffect: function () {
        var a = this,
          B = [
            "scale",
            "translateX",
            "translateY",
            "translateZ",
            "rotateX",
            "rotateY",
            "rotateZ",
          ],
          b = "",
          I = null,
          g = !1,
          Z = -1,
          c = -1;
        if (1 !== a.effectsIn.opacity)
          return a.callFilters("resultHasEffect", !0, arguments);
        for (c = 0; (b = B[c]); c++)
          if (
            ((I = a.effectsIn[b]),
            (Z = "undefined" !== I.value ? I.value : I),
            0 !== Z)
          ) {
            g = !0;
            break;
          }
        return a.callFilters("resultHasEffect", g, arguments);
      },
      willTransition: function (a, B, I, g) {
        var Z = this,
          c = !1;
        return (
          (c =
            !!b.isVisible(Z.dom.container) &&
            (!!(("none" !== a && B) || I.x !== g.x || I.y !== g.y) ||
              (!!Z.config.animation.animateResizeTargets &&
                (I.width !== g.width ||
                  I.height !== g.height ||
                  I.marginRight !== g.marginRight ||
                  I.marginTop !== g.marginTop)))),
          Z.callFilters("resultWillTransition", c, arguments)
        );
      },
      checkProgress: function (a) {
        var B = this;
        B.targetsDone++, B.targetsBound === B.targetsDone && B.cleanUp(a);
      },
      cleanUp: function (a) {
        var I = this,
          g = null,
          Z = null,
          c = null,
          j = null,
          d = -1;
        for (
          I.callActions("beforeCleanUp", arguments),
            I.targetsMoved =
              I.targetsImmovable =
              I.targetsBound =
              I.targetsDone =
                0,
            d = 0;
          (g = a.show[d]);
          d++
        )
          g.cleanUp(), g.show();
        for (d = 0; (g = a.toHide[d]); d++) g.cleanUp(), g.hide();
        if (
          (a.willSort && I.printSort(!1, a),
          (I.dom.parent.style[B.features.transitionProp] =
            I.dom.parent.style.height =
            I.dom.parent.style.width =
            I.dom.parent.style.overflow =
            I.dom.parent.style[B.features.perspectiveProp] =
            I.dom.parent.style[B.features.perspectiveOriginProp] =
              ""),
          a.willChangeLayout &&
            (b.removeClass(I.dom.container, a.startContainerClassName),
            b.addClass(I.dom.container, a.newContainerClassName)),
          a.toRemove.length)
        ) {
          for (d = 0; (g = I.targets[d]); d++)
            a.toRemove.indexOf(g) > -1 &&
              ((Z = g.dom.el.previousSibling) &&
                "#text" === Z.nodeName &&
                (c = g.dom.el.nextSibling) &&
                "#text" === c.nodeName &&
                b.removeWhitespace(Z),
              a.willSort || I.dom.parent.removeChild(g.dom.el),
              I.targets.splice(d, 1),
              (g.isInDom = !1),
              d--);
          I.origOrder = I.targets;
        }
        a.willSort && (I.targets = a.newOrder),
          (I.state = a.newState),
          (I.lastOperation = a),
          (I.dom.targets = I.state.targets),
          B.events.fire(
            "mixEnd",
            I.dom.container,
            { state: I.state, instance: I },
            I.dom.document
          ),
          "function" == typeof I.config.callbacks.onMixEnd &&
            I.config.callbacks.onMixEnd.call(I.dom.container, I.state, I),
          a.hasFailed &&
            (B.events.fire(
              "mixFail",
              I.dom.container,
              { state: I.state, instance: I },
              I.dom.document
            ),
            "function" == typeof I.config.callbacks.onMixFail &&
              I.config.callbacks.onMixFail.call(I.dom.container, I.state, I),
            b.addClass(
              I.dom.container,
              b.getClassname(
                I.config.classNames,
                "container",
                I.config.classNames.modifierFailed
              )
            )),
          "function" == typeof I.userCallback &&
            I.userCallback.call(I.dom.container, I.state, I),
          "function" == typeof I.userDeferred.resolve &&
            I.userDeferred.resolve(I.state),
          (I.userCallback = null),
          (I.userDeferred = null),
          (I.lastClicked = null),
          (I.isToggling = !1),
          (I.isBusy = !1),
          I.queue.length &&
            (I.callActions("beforeReadQueueCleanUp", arguments),
            (j = I.queue.shift()),
            (I.userDeferred = j.deferred),
            (I.isToggling = j.isToggling),
            (I.lastClicked = j.triggerElement),
            j.instruction.command instanceof B.CommandMultimix
              ? I.multimix.apply(I, j.args)
              : I.dataset.apply(I, j.args)),
          I.callActions("afterCleanUp", arguments);
      },
      parseMultimixArgs: function (a) {
        var I = this,
          g = new B.UserInstruction(),
          Z = null,
          c = -1;
        for (
          g.animate = I.config.animation.enable,
            g.command = new B.CommandMultimix(),
            c = 0;
          c < a.length;
          c++
        )
          (Z = a[c]),
            null !== Z &&
              ("object" == typeof Z
                ? b.extend(g.command, Z)
                : "boolean" == typeof Z
                ? (g.animate = Z)
                : "function" == typeof Z && (g.callback = Z));
        return (
          !g.command.insert ||
            g.command.insert instanceof B.CommandInsert ||
            (g.command.insert = I.parseInsertArgs([g.command.insert]).command),
          !g.command.remove ||
            g.command.remove instanceof B.CommandRemove ||
            (g.command.remove = I.parseRemoveArgs([g.command.remove]).command),
          !g.command.filter ||
            g.command.filter instanceof B.CommandFilter ||
            (g.command.filter = I.parseFilterArgs([g.command.filter]).command),
          !g.command.sort ||
            g.command.sort instanceof B.CommandSort ||
            (g.command.sort = I.parseSortArgs([g.command.sort]).command),
          !g.command.changeLayout ||
            g.command.changeLayout instanceof B.CommandChangeLayout ||
            (g.command.changeLayout = I.parseChangeLayoutArgs([
              g.command.changeLayout,
            ]).command),
          (g = I.callFilters("instructionParseMultimixArgs", g, arguments)),
          b.freeze(g),
          g
        );
      },
      parseFilterArgs: function (a) {
        var I = this,
          g = new B.UserInstruction(),
          Z = null,
          c = -1;
        for (
          g.animate = I.config.animation.enable,
            g.command = new B.CommandFilter(),
            c = 0;
          c < a.length;
          c++
        )
          (Z = a[c]),
            "string" == typeof Z
              ? (g.command.selector = Z)
              : null === Z
              ? (g.command.collection = [])
              : "object" == typeof Z && b.isElement(Z, I.dom.document)
              ? (g.command.collection = [Z])
              : "object" == typeof Z && "undefined" != typeof Z.length
              ? (g.command.collection = b.arrayFromList(Z))
              : "object" == typeof Z
              ? b.extend(g.command, Z)
              : "boolean" == typeof Z
              ? (g.animate = Z)
              : "function" == typeof Z && (g.callback = Z);
        if (g.command.selector && g.command.collection)
          throw new Error(B.messages.errorFilterInvalidArguments());
        return (
          (g = I.callFilters("instructionParseFilterArgs", g, arguments)),
          b.freeze(g),
          g
        );
      },
      parseSortArgs: function (a) {
        var I = this,
          g = new B.UserInstruction(),
          Z = null,
          c = "",
          j = -1;
        for (
          g.animate = I.config.animation.enable,
            g.command = new B.CommandSort(),
            j = 0;
          j < a.length;
          j++
        )
          if (((Z = a[j]), null !== Z))
            switch (typeof Z) {
              case "string":
                c = Z;
                break;
              case "object":
                Z.length && (g.command.collection = b.arrayFromList(Z));
                break;
              case "boolean":
                g.animate = Z;
                break;
              case "function":
                g.callback = Z;
            }
        return (
          c && (g.command = I.parseSortString(c, g.command)),
          (g = I.callFilters("instructionParseSortArgs", g, arguments)),
          b.freeze(g),
          g
        );
      },
      parseInsertArgs: function (a) {
        var I = this,
          g = new B.UserInstruction(),
          Z = null,
          c = -1;
        for (
          g.animate = I.config.animation.enable,
            g.command = new B.CommandInsert(),
            c = 0;
          c < a.length;
          c++
        )
          (Z = a[c]),
            null !== Z &&
              ("number" == typeof Z
                ? (g.command.index = Z)
                : "string" == typeof Z && ["before", "after"].indexOf(Z) > -1
                ? (g.command.position = Z)
                : "string" == typeof Z
                ? (g.command.collection = b.arrayFromList(
                    b.createElement(Z).childNodes
                  ))
                : "object" == typeof Z && b.isElement(Z, I.dom.document)
                ? g.command.collection.length
                  ? (g.command.sibling = Z)
                  : (g.command.collection = [Z])
                : "object" == typeof Z && Z.length
                ? g.command.collection.length
                  ? (g.command.sibling = Z[0])
                  : (g.command.collection = Z)
                : "object" == typeof Z && Z.childNodes && Z.childNodes.length
                ? g.command.collection.length
                  ? (g.command.sibling = Z.childNodes[0])
                  : (g.command.collection = b.arrayFromList(Z.childNodes))
                : "object" == typeof Z
                ? b.extend(g.command, Z)
                : "boolean" == typeof Z
                ? (g.animate = Z)
                : "function" == typeof Z && (g.callback = Z));
        if (g.command.index && g.command.sibling)
          throw new Error(B.messages.errorInsertInvalidArguments());
        return (
          !g.command.collection.length &&
            I.config.debug.showWarnings &&
            console.warn(B.messages.warningInsertNoElements()),
          (g = I.callFilters("instructionParseInsertArgs", g, arguments)),
          b.freeze(g),
          g
        );
      },
      parseRemoveArgs: function (a) {
        var I = this,
          g = new B.UserInstruction(),
          Z = null,
          c = null,
          j = -1;
        for (
          g.animate = I.config.animation.enable,
            g.command = new B.CommandRemove(),
            j = 0;
          j < a.length;
          j++
        )
          if (((c = a[j]), null !== c))
            switch (typeof c) {
              case "number":
                I.targets[c] && (g.command.targets[0] = I.targets[c]);
                break;
              case "string":
                g.command.collection = b.arrayFromList(
                  I.dom.parent.querySelectorAll(c)
                );
                break;
              case "object":
                c && c.length
                  ? (g.command.collection = c)
                  : b.isElement(c, I.dom.document)
                  ? (g.command.collection = [c])
                  : b.extend(g.command, c);
                break;
              case "boolean":
                g.animate = c;
                break;
              case "function":
                g.callback = c;
            }
        if (g.command.collection.length)
          for (j = 0; (Z = I.targets[j]); j++)
            g.command.collection.indexOf(Z.dom.el) > -1 &&
              g.command.targets.push(Z);
        return (
          !g.command.targets.length &&
            I.config.debug.showWarnings &&
            console.warn(B.messages.warningRemoveNoElements()),
          b.freeze(g),
          g
        );
      },
      parseDatasetArgs: function (a) {
        var I = this,
          g = new B.UserInstruction(),
          Z = null,
          c = -1;
        for (
          g.animate = I.config.animation.enable,
            g.command = new B.CommandDataset(),
            c = 0;
          c < a.length;
          c++
        )
          if (((Z = a[c]), null !== Z))
            switch (typeof Z) {
              case "object":
                Array.isArray(Z) || "number" == typeof Z.length
                  ? (g.command.dataset = Z)
                  : b.extend(g.command, Z);
                break;
              case "boolean":
                g.animate = Z;
                break;
              case "function":
                g.callback = Z;
            }
        return b.freeze(g), g;
      },
      parseChangeLayoutArgs: function (a) {
        var I = this,
          g = new B.UserInstruction(),
          Z = null,
          c = -1;
        for (
          g.animate = I.config.animation.enable,
            g.command = new B.CommandChangeLayout(),
            c = 0;
          c < a.length;
          c++
        )
          if (((Z = a[c]), null !== Z))
            switch (typeof Z) {
              case "string":
                g.command.containerClassName = Z;
                break;
              case "object":
                b.extend(g.command, Z);
                break;
              case "boolean":
                g.animate = Z;
                break;
              case "function":
                g.callback = Z;
            }
        return b.freeze(g), g;
      },
      queueMix: function (a) {
        var I = this,
          g = null,
          Z = "";
        return (
          I.callActions("beforeQueueMix", arguments),
          (g = b.defer(B.libraries)),
          I.config.animation.queue &&
          I.queue.length < I.config.animation.queueLimit
            ? ((a.deferred = g),
              I.queue.push(a),
              I.config.controls.enable &&
                (I.isToggling
                  ? (I.buildToggleArray(a.instruction.command),
                    (Z = I.getToggleSelector()),
                    I.updateControls({ filter: { selector: Z } }))
                  : I.updateControls(a.instruction.command)))
            : (I.config.debug.showWarnings &&
                console.warn(B.messages.warningMultimixInstanceQueueFull()),
              g.resolve(I.state),
              B.events.fire(
                "mixBusy",
                I.dom.container,
                { state: I.state, instance: I },
                I.dom.document
              ),
              "function" == typeof I.config.callbacks.onMixBusy &&
                I.config.callbacks.onMixBusy.call(I.dom.container, I.state, I)),
          I.callFilters("promiseQueueMix", g.promise, arguments)
        );
      },
      getDataOperation: function (a) {
        var I = this,
          g = new B.Operation(),
          Z = [];
        if (
          ((g = I.callFilters(
            "operationUnmappedGetDataOperation",
            g,
            arguments
          )),
          I.dom.targets.length && !(Z = I.state.activeDataset || []).length)
        )
          throw new Error(B.messages.errorDatasetNotSet());
        return (
          (g.id = b.randomHex()),
          (g.startState = I.state),
          (g.startDataset = Z),
          (g.newDataset = a.slice()),
          I.diffDatasets(g),
          (g.startOrder = I.targets),
          (g.newOrder = g.show),
          I.config.animation.enable &&
            (I.getStartMixData(g),
            I.setInter(g),
            (g.docState = b.getDocumentState(I.dom.document)),
            I.getInterMixData(g),
            I.setFinal(g),
            I.getFinalMixData(g),
            I.parseEffects(),
            (g.hasEffect = I.hasEffect()),
            I.getTweenData(g)),
          (I.targets = g.show.slice()),
          (g.newState = I.buildState(g)),
          Array.prototype.push.apply(I.targets, g.toRemove),
          (g = I.callFilters("operationMappedGetDataOperation", g, arguments))
        );
      },
      diffDatasets: function (a) {
        var I = this,
          g = [],
          Z = [],
          c = [],
          j = null,
          d = null,
          E = null,
          f = null,
          A = null,
          aJ = {},
          fh = "",
          e = -1;
        for (
          I.callActions("beforeDiffDatasets", arguments), e = 0;
          (j = a.newDataset[e]);
          e++
        ) {
          if (
            "undefined" == typeof (fh = j[I.config.data.uidKey]) ||
            fh.toString().length < 1
          )
            throw new TypeError(
              B.messages.errorDatasetInvalidUidKey({
                uidKey: I.config.data.uidKey,
              })
            );
          if (aJ[fh])
            throw new Error(B.messages.errorDatasetDuplicateUid({ uid: fh }));
          (aJ[fh] = !0),
            (d = I.cache[fh]) instanceof B.Target
              ? (I.config.data.dirtyCheck &&
                  !b.deepEquals(j, d.data) &&
                  ((E = d.render(j)),
                  (d.data = j),
                  E !== d.dom.el &&
                    (d.isInDom &&
                      (d.unbindEvents(),
                      I.dom.parent.replaceChild(E, d.dom.el)),
                    d.isShown || (E.style.display = "none"),
                    (d.dom.el = E),
                    d.isInDom && d.bindEvents())),
                (E = d.dom.el))
              : ((d = new B.Target()), d.init(null, I, j), d.hide()),
            d.isInDom
              ? ((A = d.dom.el.nextElementSibling),
                Z.push(fh),
                f &&
                  (f.lastElementChild &&
                    f.appendChild(I.dom.document.createTextNode(" ")),
                  I.insertDatasetFrag(f, d.dom.el, c),
                  (f = null)))
              : (f || (f = I.dom.document.createDocumentFragment()),
                f.lastElementChild &&
                  f.appendChild(I.dom.document.createTextNode(" ")),
                f.appendChild(d.dom.el),
                (d.isInDom = !0),
                d.unbindEvents(),
                d.bindEvents(),
                d.hide(),
                a.toShow.push(d),
                c.push(d)),
            a.show.push(d);
        }
        for (
          f &&
            ((A = A || I.config.layout.siblingAfter),
            A && f.appendChild(I.dom.document.createTextNode(" ")),
            I.insertDatasetFrag(f, A, c)),
            e = 0;
          (j = a.startDataset[e]);
          e++
        )
          (fh = j[I.config.data.uidKey]),
            (d = I.cache[fh]),
            a.show.indexOf(d) < 0
              ? (a.hide.push(d), a.toHide.push(d), a.toRemove.push(d))
              : g.push(fh);
        b.isEqualArray(g, Z) || (a.willSort = !0),
          I.callActions("afterDiffDatasets", arguments);
      },
      insertDatasetFrag: function (a, B, I) {
        var g = this,
          Z = B
            ? b.arrayFromList(g.dom.parent.children).indexOf(B)
            : g.targets.length;
        for (g.dom.parent.insertBefore(a, B); I.length; )
          g.targets.splice(Z, 0, I.shift()), Z++;
      },
      willSort: function (a, B) {
        var b = this,
          I = !1;
        return (
          (I =
            !!(
              b.config.behavior.liveSort ||
              "random" === a.order ||
              a.attribute !== B.attribute ||
              a.order !== B.order ||
              a.collection !== B.collection ||
              (null === a.next && B.next) ||
              (a.next && null === B.next)
            ) ||
            (!(!a.next || !B.next) && b.willSort(a.next, B.next))),
          b.callFilters("resultWillSort", I, arguments)
        );
      },
      show: function () {
        var a = this;
        return a.filter("all");
      },
      hide: function () {
        var a = this;
        return a.filter("none");
      },
      isMixing: function () {
        var a = this;
        return a.isBusy;
      },
      filter: function () {
        var a = this,
          B = a.parseFilterArgs(arguments);
        return a.multimix({ filter: B.command }, B.animate, B.callback);
      },
      toggleOn: function () {
        var a = this,
          B = a.parseFilterArgs(arguments),
          b = B.command.selector,
          I = "";
        return (
          (a.isToggling = !0),
          a.toggleArray.indexOf(b) < 0 && a.toggleArray.push(b),
          (I = a.getToggleSelector()),
          a.multimix({ filter: I }, B.animate, B.callback)
        );
      },
      toggleOff: function () {
        var a = this,
          B = a.parseFilterArgs(arguments),
          b = B.command.selector,
          I = a.toggleArray.indexOf(b),
          g = "";
        return (
          (a.isToggling = !0),
          I > -1 && a.toggleArray.splice(I, 1),
          (g = a.getToggleSelector()),
          a.multimix({ filter: g }, B.animate, B.callback)
        );
      },
      sort: function () {
        var a = this,
          B = a.parseSortArgs(arguments);
        return a.multimix({ sort: B.command }, B.animate, B.callback);
      },
      changeLayout: function () {
        var a = this,
          B = a.parseChangeLayoutArgs(arguments);
        return a.multimix({ changeLayout: B.command }, B.animate, B.callback);
      },
      dataset: function () {
        var a = this,
          b = a.parseDatasetArgs(arguments),
          I = null,
          g = null,
          Z = !1;
        return (
          a.callActions("beforeDataset", arguments),
          a.isBusy
            ? ((g = new B.QueueItem()),
              (g.args = arguments),
              (g.instruction = b),
              a.queueMix(g))
            : (b.callback && (a.userCallback = b.callback),
              (Z =
                b.animate ^ a.config.animation.enable
                  ? b.animate
                  : a.config.animation.enable),
              (I = a.getDataOperation(b.command.dataset)),
              a.goMix(Z, I))
        );
      },
      multimix: function () {
        var a = this,
          b = null,
          I = !1,
          g = null,
          Z = a.parseMultimixArgs(arguments);
        return (
          a.callActions("beforeMultimix", arguments),
          a.isBusy
            ? ((g = new B.QueueItem()),
              (g.args = arguments),
              (g.instruction = Z),
              (g.triggerElement = a.lastClicked),
              (g.isToggling = a.isToggling),
              a.queueMix(g))
            : ((b = a.getOperation(Z.command)),
              a.config.controls.enable &&
                (Z.command.filter &&
                  !a.isToggling &&
                  ((a.toggleArray.length = 0), a.buildToggleArray(b.command)),
                a.queue.length < 1 && a.updateControls(b.command)),
              Z.callback && (a.userCallback = Z.callback),
              (I =
                Z.animate ^ a.config.animation.enable
                  ? Z.animate
                  : a.config.animation.enable),
              a.callFilters("operationMultimix", b, arguments),
              a.goMix(I, b))
        );
      },
      getOperation: function (a) {
        var I = this,
          g = a.sort,
          Z = a.filter,
          c = a.changeLayout,
          j = a.remove,
          d = a.insert,
          E = new B.Operation();
        return (
          (E = I.callFilters("operationUnmappedGetOperation", E, arguments)),
          (E.id = b.randomHex()),
          (E.command = a),
          (E.startState = I.state),
          (E.triggerElement = I.lastClicked),
          I.isBusy
            ? (I.config.debug.showWarnings &&
                console.warn(B.messages.warningGetOperationInstanceBusy()),
              null)
            : (d && I.insertTargets(d, E),
              j && (E.toRemove = j.targets),
              (E.startSort = E.newSort = E.startState.activeSort),
              (E.startOrder = E.newOrder = I.targets),
              g &&
                ((E.startSort = E.startState.activeSort),
                (E.newSort = g),
                (E.willSort = I.willSort(g, E.startState.activeSort)),
                E.willSort && I.sortOperation(E)),
              (E.startFilter = E.startState.activeFilter),
              Z
                ? (E.newFilter = Z)
                : (E.newFilter = b.extend(
                    new B.CommandFilter(),
                    E.startFilter
                  )),
              "all" === E.newFilter.selector
                ? (E.newFilter.selector = I.config.selectors.target)
                : "none" === E.newFilter.selector &&
                  (E.newFilter.selector = ""),
              I.filterOperation(E),
              (E.startContainerClassName =
                E.startState.activeContainerClassName),
              c
                ? ((E.newContainerClassName = c.containerClassName),
                  E.newContainerClassName !== E.startContainerClassName &&
                    (E.willChangeLayout = !0))
                : (E.newContainerClassName = E.startContainerClassName),
              I.config.animation.enable &&
                (I.getStartMixData(E),
                I.setInter(E),
                (E.docState = b.getDocumentState(I.dom.document)),
                I.getInterMixData(E),
                I.setFinal(E),
                I.getFinalMixData(E),
                I.parseEffects(),
                (E.hasEffect = I.hasEffect()),
                I.getTweenData(E)),
              E.willSort && (I.targets = E.newOrder),
              (E.newState = I.buildState(E)),
              I.callFilters("operationMappedGetOperation", E, arguments))
        );
      },
      tween: function (a, B) {
        var b = null,
          I = null,
          g = -1,
          Z = -1;
        for (
          B = Math.min(B, 1), B = Math.max(B, 0), Z = 0;
          (b = a.show[Z]);
          Z++
        )
          (I = a.showPosData[Z]), b.applyTween(I, B);
        for (Z = 0; (b = a.hide[Z]); Z++)
          b.isShown && b.hide(),
            (g = a.toHide.indexOf(b)) > -1 &&
              ((I = a.toHidePosData[g]),
              b.isShown || b.show(),
              b.applyTween(I, B));
      },
      insert: function () {
        var a = this,
          B = a.parseInsertArgs(arguments);
        return a.multimix({ insert: B.command }, B.animate, B.callback);
      },
      insertBefore: function () {
        var a = this,
          B = a.parseInsertArgs(arguments);
        return a.insert(
          B.command.collection,
          "before",
          B.command.sibling,
          B.animate,
          B.callback
        );
      },
      insertAfter: function () {
        var a = this,
          B = a.parseInsertArgs(arguments);
        return a.insert(
          B.command.collection,
          "after",
          B.command.sibling,
          B.animate,
          B.callback
        );
      },
      prepend: function () {
        var a = this,
          B = a.parseInsertArgs(arguments);
        return a.insert(0, B.command.collection, B.animate, B.callback);
      },
      append: function () {
        var a = this,
          B = a.parseInsertArgs(arguments);
        return a.insert(
          a.state.totalTargets,
          B.command.collection,
          B.animate,
          B.callback
        );
      },
      remove: function () {
        var a = this,
          B = a.parseRemoveArgs(arguments);
        return a.multimix({ remove: B.command }, B.animate, B.callback);
      },
      getConfig: function (a) {
        var B = this,
          I = null;
        return (
          (I = a ? b.getProperty(B.config, a) : B.config),
          B.callFilters("valueGetConfig", I, arguments)
        );
      },
      configure: function (a) {
        var B = this;
        B.callActions("beforeConfigure", arguments),
          b.extend(B.config, a, !0, !0),
          B.callActions("afterConfigure", arguments);
      },
      getState: function () {
        var a = this,
          I = null;
        return (
          (I = new B.State()),
          b.extend(I, a.state),
          b.freeze(I),
          a.callFilters("stateGetState", I, arguments)
        );
      },
      forceRefresh: function () {
        var a = this;
        a.indexTargets();
      },
      forceRender: function () {
        var a = this,
          B = null,
          b = null,
          I = "";
        for (I in a.cache)
          (B = a.cache[I]),
            (b = B.render(B.data)),
            b !== B.dom.el &&
              (B.isInDom &&
                (B.unbindEvents(), a.dom.parent.replaceChild(b, B.dom.el)),
              B.isShown || (b.style.display = "none"),
              (B.dom.el = b),
              B.isInDom && B.bindEvents());
        a.state = a.buildState(a.lastOperation);
      },
      destroy: function (a) {
        var b = this,
          I = null,
          g = null,
          Z = 0;
        for (
          b.callActions("beforeDestroy", arguments), Z = 0;
          (I = b.controls[Z]);
          Z++
        )
          I.removeBinding(b);
        for (Z = 0; (g = b.targets[Z]); Z++) a && g.show(), g.unbindEvents();
        b.dom.container.id.match(/^MixItUp/) &&
          b.dom.container.removeAttribute("id"),
          delete B.instances[b.id],
          b.callActions("afterDestroy", arguments);
      },
    }),
    (B.IMoveData = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.posIn = null),
        (this.posOut = null),
        (this.operation = null),
        (this.callback = null),
        (this.statusChange = ""),
        (this.duration = -1),
        (this.staggerIndex = -1),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.IMoveData),
    (B.IMoveData.prototype = Object.create(B.Base.prototype)),
    (B.IMoveData.prototype.constructor = B.IMoveData),
    (B.TargetDom = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.el = null),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.TargetDom),
    (B.TargetDom.prototype = Object.create(B.Base.prototype)),
    (B.TargetDom.prototype.constructor = B.TargetDom),
    (B.Target = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.id = ""),
        (this.sortString = ""),
        (this.mixer = null),
        (this.callback = null),
        (this.isShown = !1),
        (this.isBound = !1),
        (this.isExcluded = !1),
        (this.isInDom = !1),
        (this.handler = null),
        (this.operation = null),
        (this.data = null),
        (this.dom = new B.TargetDom()),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.Target),
    (B.Target.prototype = Object.create(B.Base.prototype)),
    b.extend(B.Target.prototype, {
      constructor: B.Target,
      init: function (a, b, I) {
        var g = this,
          Z = "";
        if (
          (g.callActions("beforeInit", arguments),
          (g.mixer = b),
          a || (a = g.render(I)),
          g.cacheDom(a),
          g.bindEvents(),
          "none" !== g.dom.el.style.display && (g.isShown = !0),
          I && b.config.data.uidKey)
        ) {
          if (
            "undefined" == typeof (Z = I[b.config.data.uidKey]) ||
            Z.toString().length < 1
          )
            throw new TypeError(
              B.messages.errorDatasetInvalidUidKey({
                uidKey: b.config.data.uidKey,
              })
            );
          (g.id = Z), (g.data = I), (b.cache[Z] = g);
        }
        g.callActions("afterInit", arguments);
      },
      render: function (a) {
        var I = this,
          g = null,
          Z = null,
          c = null,
          j = "";
        if (
          (I.callActions("beforeRender", arguments),
          (g = I.callFilters(
            "renderRender",
            I.mixer.config.render.target,
            arguments
          )),
          "function" != typeof g)
        )
          throw new TypeError(B.messages.errorDatasetRendererNotSet());
        return (
          (j = g(a)),
          j && "object" == typeof j && b.isElement(j)
            ? (Z = j)
            : "string" == typeof j &&
              ((c = document.createElement("div")),
              (c.innerHTML = j),
              (Z = c.firstElementChild)),
          I.callFilters("elRender", Z, arguments)
        );
      },
      cacheDom: function (a) {
        var B = this;
        B.callActions("beforeCacheDom", arguments),
          (B.dom.el = a),
          B.callActions("afterCacheDom", arguments);
      },
      getSortString: function (a) {
        var B = this,
          b = B.dom.el.getAttribute("data-" + a) || "";
        B.callActions("beforeGetSortString", arguments),
          (b = isNaN(1 * b) ? b.toLowerCase() : 1 * b),
          (B.sortString = b),
          B.callActions("afterGetSortString", arguments);
      },
      show: function () {
        var a = this;
        a.callActions("beforeShow", arguments),
          a.isShown || ((a.dom.el.style.display = ""), (a.isShown = !0)),
          a.callActions("afterShow", arguments);
      },
      hide: function () {
        var a = this;
        a.callActions("beforeHide", arguments),
          a.isShown && ((a.dom.el.style.display = "none"), (a.isShown = !1)),
          a.callActions("afterHide", arguments);
      },
      move: function (a) {
        var B = this;
        B.callActions("beforeMove", arguments),
          B.isExcluded || B.mixer.targetsMoved++,
          B.applyStylesIn(a),
          requestAnimationFrame(function () {
            B.applyStylesOut(a);
          }),
          B.callActions("afterMove", arguments);
      },
      applyTween: function (a, b) {
        var I = this,
          g = "",
          Z = null,
          c = a.posIn,
          j = [],
          d = new B.StyleData(),
          E = -1;
        for (
          I.callActions("beforeApplyTween", arguments),
            d.x = c.x,
            d.y = c.y,
            0 === b ? I.hide() : I.isShown || I.show(),
            E = 0;
          (g = B.features.TWEENABLE[E]);
          E++
        )
          if (((Z = a.tweenData[g]), "x" === g)) {
            if (!Z) continue;
            d.x = c.x + Z * b;
          } else if ("y" === g) {
            if (!Z) continue;
            d.y = c.y + Z * b;
          } else if (Z instanceof B.TransformData) {
            if (!Z.value) continue;
            (d[g].value = c[g].value + Z.value * b),
              (d[g].unit = Z.unit),
              j.push(g + "(" + d[g].value + Z.unit + ")");
          } else {
            if (!Z) continue;
            (d[g] = c[g] + Z * b), (I.dom.el.style[g] = d[g]);
          }
        (d.x || d.y) && j.unshift("translate(" + d.x + "px, " + d.y + "px)"),
          j.length && (I.dom.el.style[B.features.transformProp] = j.join(" ")),
          I.callActions("afterApplyTween", arguments);
      },
      applyStylesIn: function (a) {
        var b = this,
          I = a.posIn,
          g = 1 !== b.mixer.effectsIn.opacity,
          Z = [];
        b.callActions("beforeApplyStylesIn", arguments),
          Z.push("translate(" + I.x + "px, " + I.y + "px)"),
          b.mixer.config.animation.animateResizeTargets &&
            ("show" !== a.statusChange &&
              ((b.dom.el.style.width = I.width + "px"),
              (b.dom.el.style.height = I.height + "px")),
            (b.dom.el.style.marginRight = I.marginRight + "px"),
            (b.dom.el.style.marginBottom = I.marginBottom + "px")),
          g && (b.dom.el.style.opacity = I.opacity),
          "show" === a.statusChange && (Z = Z.concat(b.mixer.transformIn)),
          (b.dom.el.style[B.features.transformProp] = Z.join(" ")),
          b.callActions("afterApplyStylesIn", arguments);
      },
      applyStylesOut: function (a) {
        var b = this,
          I = [],
          g = [],
          Z = b.mixer.config.animation.animateResizeTargets,
          c = "undefined" != typeof b.mixer.effectsIn.opacity;
        if (
          (b.callActions("beforeApplyStylesOut", arguments),
          I.push(
            b.writeTransitionRule(B.features.transformRule, a.staggerIndex)
          ),
          "none" !== a.statusChange &&
            I.push(
              b.writeTransitionRule("opacity", a.staggerIndex, a.duration)
            ),
          Z &&
            (I.push(b.writeTransitionRule("width", a.staggerIndex, a.duration)),
            I.push(b.writeTransitionRule("height", a.staggerIndex, a.duration)),
            I.push(
              b.writeTransitionRule("margin", a.staggerIndex, a.duration)
            )),
          !a.callback)
        )
          return (
            b.mixer.targetsImmovable++,
            void (
              b.mixer.targetsMoved === b.mixer.targetsImmovable &&
              b.mixer.cleanUp(a.operation)
            )
          );
        switch (
          ((b.operation = a.operation),
          (b.callback = a.callback),
          !b.isExcluded && b.mixer.targetsBound++,
          (b.isBound = !0),
          b.applyTransition(I),
          Z &&
            a.posOut.width > 0 &&
            a.posOut.height > 0 &&
            ((b.dom.el.style.width = a.posOut.width + "px"),
            (b.dom.el.style.height = a.posOut.height + "px"),
            (b.dom.el.style.marginRight = a.posOut.marginRight + "px"),
            (b.dom.el.style.marginBottom = a.posOut.marginBottom + "px")),
          b.mixer.config.animation.nudge ||
            "hide" !== a.statusChange ||
            g.push("translate(" + a.posOut.x + "px, " + a.posOut.y + "px)"),
          a.statusChange)
        ) {
          case "hide":
            c && (b.dom.el.style.opacity = b.mixer.effectsOut.opacity),
              (g = g.concat(b.mixer.transformOut));
            break;
          case "show":
            c && (b.dom.el.style.opacity = 1);
        }
        (b.mixer.config.animation.nudge ||
          (!b.mixer.config.animation.nudge && "hide" !== a.statusChange)) &&
          g.push("translate(" + a.posOut.x + "px, " + a.posOut.y + "px)"),
          (b.dom.el.style[B.features.transformProp] = g.join(" ")),
          b.callActions("afterApplyStylesOut", arguments);
      },
      writeTransitionRule: function (a, B, b) {
        var I = this,
          g = I.getDelay(B),
          Z = "";
        return (
          (Z =
            a +
            " " +
            (b > 0 ? b : I.mixer.config.animation.duration) +
            "ms " +
            g +
            "ms " +
            ("opacity" === a ? "linear" : I.mixer.config.animation.easing)),
          I.callFilters("ruleWriteTransitionRule", Z, arguments)
        );
      },
      getDelay: function (a) {
        var B = this,
          b = -1;
        return (
          "function" == typeof B.mixer.config.animation.staggerSequence &&
            (a = B.mixer.config.animation.staggerSequence.call(B, a, B.state)),
          (b = B.mixer.staggerDuration ? a * B.mixer.staggerDuration : 0),
          B.callFilters("delayGetDelay", b, arguments)
        );
      },
      applyTransition: function (a) {
        var b = this,
          I = a.join(", ");
        b.callActions("beforeApplyTransition", arguments),
          (b.dom.el.style[B.features.transitionProp] = I),
          b.callActions("afterApplyTransition", arguments);
      },
      handleTransitionEnd: function (a) {
        var B = this,
          b = a.propertyName,
          I = B.mixer.config.animation.animateResizeTargets;
        B.callActions("beforeHandleTransitionEnd", arguments),
          B.isBound &&
            a.target.matches(B.mixer.config.selectors.target) &&
            (b.indexOf("transform") > -1 ||
              b.indexOf("opacity") > -1 ||
              (I && b.indexOf("height") > -1) ||
              (I && b.indexOf("width") > -1) ||
              (I && b.indexOf("margin") > -1)) &&
            (B.callback.call(B, B.operation),
            (B.isBound = !1),
            (B.callback = null),
            (B.operation = null)),
          B.callActions("afterHandleTransitionEnd", arguments);
      },
      eventBus: function (a) {
        var B = this;
        switch ((B.callActions("beforeEventBus", arguments), a.type)) {
          case "webkitTransitionEnd":
          case "transitionend":
            B.handleTransitionEnd(a);
        }
        B.callActions("afterEventBus", arguments);
      },
      unbindEvents: function () {
        var a = this;
        a.callActions("beforeUnbindEvents", arguments),
          b.off(a.dom.el, "webkitTransitionEnd", a.handler),
          b.off(a.dom.el, "transitionend", a.handler),
          a.callActions("afterUnbindEvents", arguments);
      },
      bindEvents: function () {
        var a = this,
          I = "";
        a.callActions("beforeBindEvents", arguments),
          (I =
            "webkit" === B.features.transitionPrefix
              ? "webkitTransitionEnd"
              : "transitionend"),
          (a.handler = function (B) {
            return a.eventBus(B);
          }),
          b.on(a.dom.el, I, a.handler),
          a.callActions("afterBindEvents", arguments);
      },
      getPosData: function (b) {
        var I = this,
          g = {},
          Z = null,
          c = new B.StyleData();
        return (
          I.callActions("beforeGetPosData", arguments),
          (c.x = I.dom.el.offsetLeft),
          (c.y = I.dom.el.offsetTop),
          (I.mixer.config.animation.animateResizeTargets || b) &&
            ((Z = I.dom.el.getBoundingClientRect()),
            (c.top = Z.top),
            (c.right = Z.right),
            (c.bottom = Z.bottom),
            (c.left = Z.left),
            (c.width = Z.width),
            (c.height = Z.height)),
          I.mixer.config.animation.animateResizeTargets &&
            ((g = a.getComputedStyle(I.dom.el)),
            (c.marginBottom = parseFloat(g.marginBottom)),
            (c.marginRight = parseFloat(g.marginRight))),
          I.callFilters("posDataGetPosData", c, arguments)
        );
      },
      cleanUp: function () {
        var a = this;
        a.callActions("beforeCleanUp", arguments),
          (a.dom.el.style[B.features.transformProp] = ""),
          (a.dom.el.style[B.features.transitionProp] = ""),
          (a.dom.el.style.opacity = ""),
          a.mixer.config.animation.animateResizeTargets &&
            ((a.dom.el.style.width = ""),
            (a.dom.el.style.height = ""),
            (a.dom.el.style.marginRight = ""),
            (a.dom.el.style.marginBottom = "")),
          a.callActions("afterCleanUp", arguments);
      },
    }),
    (B.Collection = function (a) {
      var B = null,
        I = -1;
      for (this.callActions("beforeConstruct"), I = 0; (B = a[I]); I++)
        this[I] = B;
      (this.length = a.length),
        this.callActions("afterConstruct"),
        b.freeze(this);
    }),
    B.BaseStatic.call(B.Collection),
    (B.Collection.prototype = Object.create(B.Base.prototype)),
    b.extend(B.Collection.prototype, {
      constructor: B.Collection,
      mixitup: function (a) {
        var I = this,
          g = null,
          Z = Array.prototype.slice.call(arguments),
          c = [],
          j = -1;
        for (
          this.callActions("beforeMixitup"), Z.shift(), j = 0;
          (g = I[j]);
          j++
        )
          c.push(g[a].apply(g, Z));
        return I.callFilters(
          "promiseMixitup",
          b.all(c, B.libraries),
          arguments
        );
      },
    }),
    (B.Operation = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.id = ""),
        (this.args = []),
        (this.command = null),
        (this.showPosData = []),
        (this.toHidePosData = []),
        (this.startState = null),
        (this.newState = null),
        (this.docState = null),
        (this.willSort = !1),
        (this.willChangeLayout = !1),
        (this.hasEffect = !1),
        (this.hasFailed = !1),
        (this.triggerElement = null),
        (this.show = []),
        (this.hide = []),
        (this.matching = []),
        (this.toShow = []),
        (this.toHide = []),
        (this.toMove = []),
        (this.toRemove = []),
        (this.startOrder = []),
        (this.newOrder = []),
        (this.startSort = null),
        (this.newSort = null),
        (this.startFilter = null),
        (this.newFilter = null),
        (this.startDataset = null),
        (this.newDataset = null),
        (this.viewportDeltaX = 0),
        (this.viewportDeltaY = 0),
        (this.startX = 0),
        (this.startY = 0),
        (this.startHeight = 0),
        (this.startWidth = 0),
        (this.newX = 0),
        (this.newY = 0),
        (this.newHeight = 0),
        (this.newWidth = 0),
        (this.startContainerClassName = ""),
        (this.startDisplay = ""),
        (this.newContainerClassName = ""),
        (this.newDisplay = ""),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.Operation),
    (B.Operation.prototype = Object.create(B.Base.prototype)),
    (B.Operation.prototype.constructor = B.Operation),
    (B.State = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.id = ""),
        (this.activeFilter = null),
        (this.activeSort = null),
        (this.activeContainerClassName = ""),
        (this.container = null),
        (this.targets = []),
        (this.hide = []),
        (this.show = []),
        (this.matching = []),
        (this.totalTargets = -1),
        (this.totalShow = -1),
        (this.totalHide = -1),
        (this.totalMatching = -1),
        (this.hasFailed = !1),
        (this.triggerElement = null),
        (this.activeDataset = null),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.State),
    (B.State.prototype = Object.create(B.Base.prototype)),
    (B.State.prototype.constructor = B.State),
    (B.UserInstruction = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.command = {}),
        (this.animate = !1),
        (this.callback = null),
        this.callActions("afterConstruct"),
        b.seal(this);
    }),
    B.BaseStatic.call(B.UserInstruction),
    (B.UserInstruction.prototype = Object.create(B.Base.prototype)),
    (B.UserInstruction.prototype.constructor = B.UserInstruction),
    (B.Messages = function () {
      B.Base.call(this),
        this.callActions("beforeConstruct"),
        (this.ERROR_FACTORY_INVALID_CONTAINER =
          "[MixItUp] An invalid selector or element reference was passed to the mixitup factory function"),
        (this.ERROR_FACTORY_CONTAINER_NOT_FOUND =
          "[MixItUp] The provided selector yielded no container element"),
        (this.ERROR_CONFIG_INVALID_ANIMATION_EFFECTS =
          "[MixItUp] Invalid value for `animation.effects`"),
        (this.ERROR_CONFIG_INVALID_CONTROLS_SCOPE =
          "[MixItUp] Invalid value for `controls.scope`"),
        (this.ERROR_CONFIG_INVALID_PROPERTY =
          '[MixitUp] Invalid configuration object property "${erroneous}"${suggestion}'),
        (this.ERROR_CONFIG_INVALID_PROPERTY_SUGGESTION =
          '. Did you mean "${probableMatch}"?'),
        (this.ERROR_CONFIG_DATA_UID_KEY_NOT_SET =
          "[MixItUp] To use the dataset API, a UID key must be specified using `data.uidKey`"),
        (this.ERROR_DATASET_INVALID_UID_KEY =
          '[MixItUp] The specified UID key "${uidKey}" is not present on one or more dataset items'),
        (this.ERROR_DATASET_DUPLICATE_UID =
          '[MixItUp] The UID "${uid}" was found on two or more dataset items. UIDs must be unique.'),
        (this.ERROR_INSERT_INVALID_ARGUMENTS =
          "[MixItUp] Please provider either an index or a sibling and position to insert, not both"),
        (this.ERROR_INSERT_PREEXISTING_ELEMENT =
          "[MixItUp] An element to be inserted already exists in the container"),
        (this.ERROR_FILTER_INVALID_ARGUMENTS =
          "[MixItUp] Please provide either a selector or collection `.filter()`, not both"),
        (this.ERROR_DATASET_NOT_SET =
          "[MixItUp] To use the dataset API with pre-rendered targets, a starting dataset must be set using `load.dataset`"),
        (this.ERROR_DATASET_PRERENDERED_MISMATCH =
          "[MixItUp] `load.dataset` does not match pre-rendered targets"),
        (this.ERROR_DATASET_RENDERER_NOT_SET =
          "[MixItUp] To insert an element via the dataset API, a target renderer function must be provided to `render.target`"),
        (this.ERROR_SORT_NON_EXISTENT_ELEMENT =
          "[MixItUp] An element to be sorted does not already exist in the container"),
        (this.WARNING_FACTORY_PREEXISTING_INSTANCE =
          "[MixItUp] WARNING: This element already has an active MixItUp instance. The provided configuration object will be ignored. If you wish to perform additional methods on this instance, please create a reference."),
        (this.WARNING_INSERT_NO_ELEMENTS =
          "[MixItUp] WARNING: No valid elements were passed to `.insert()`"),
        (this.WARNING_REMOVE_NO_ELEMENTS =
          "[MixItUp] WARNING: No valid elements were passed to `.remove()`"),
        (this.WARNING_MULTIMIX_INSTANCE_QUEUE_FULL =
          "[MixItUp] WARNING: An operation was requested but the MixItUp instance was busy. The operation was rejected because the queue is full or queuing is disabled."),
        (this.WARNING_GET_OPERATION_INSTANCE_BUSY =
          "[MixItUp] WARNING: Operations can be be created while the MixItUp instance is busy."),
        (this.WARNING_NO_PROMISE_IMPLEMENTATION =
          "[MixItUp] WARNING: No Promise implementations could be found. If you wish to use promises with MixItUp please install an ES6 Promise polyfill."),
        (this.WARNING_INCONSISTENT_SORTING_ATTRIBUTES =
          '[MixItUp] WARNING: The requested sorting data attribute "${attribute}" was not present on one or more target elements which may product unexpected sort output'),
        this.callActions("afterConstruct"),
        this.compileTemplates(),
        b.seal(this);
    }),
    B.BaseStatic.call(B.Messages),
    (B.Messages.prototype = Object.create(B.Base.prototype)),
    (B.Messages.prototype.constructor = B.Messages),
    (B.Messages.prototype.compileTemplates = function () {
      var a = "",
        B = "";
      for (a in this)
        "string" == typeof (B = this[a]) &&
          (this[b.camelCase(a)] = b.template(B));
    }),
    (B.messages = new B.Messages()),
    (B.Facade = function (a) {
      B.Base.call(this),
        this.callActions("beforeConstruct", arguments),
        (this.configure = a.configure.bind(a)),
        (this.show = a.show.bind(a)),
        (this.hide = a.hide.bind(a)),
        (this.filter = a.filter.bind(a)),
        (this.toggleOn = a.toggleOn.bind(a)),
        (this.toggleOff = a.toggleOff.bind(a)),
        (this.sort = a.sort.bind(a)),
        (this.changeLayout = a.changeLayout.bind(a)),
        (this.multimix = a.multimix.bind(a)),
        (this.dataset = a.dataset.bind(a)),
        (this.tween = a.tween.bind(a)),
        (this.insert = a.insert.bind(a)),
        (this.insertBefore = a.insertBefore.bind(a)),
        (this.insertAfter = a.insertAfter.bind(a)),
        (this.prepend = a.prepend.bind(a)),
        (this.append = a.append.bind(a)),
        (this.remove = a.remove.bind(a)),
        (this.destroy = a.destroy.bind(a)),
        (this.forceRefresh = a.forceRefresh.bind(a)),
        (this.forceRender = a.forceRender.bind(a)),
        (this.isMixing = a.isMixing.bind(a)),
        (this.getOperation = a.getOperation.bind(a)),
        (this.getConfig = a.getConfig.bind(a)),
        (this.getState = a.getState.bind(a)),
        this.callActions("afterConstruct", arguments),
        b.freeze(this),
        b.seal(this);
    }),
    B.BaseStatic.call(B.Facade),
    (B.Facade.prototype = Object.create(B.Base.prototype)),
    (B.Facade.prototype.constructor = B.Facade),
    "object" == typeof exports && "object" == typeof module
      ? (module.exports = B)
      : "function" == typeof define && define.amd
      ? define(function () {
          return B;
        })
      : ("undefined" != typeof a.mixitup && "function" == typeof a.mixitup) ||
        (a.mixitup = B),
    B.BaseStatic.call(B.constructor),
    (B.NAME = "mixitup"),
    (B.CORE_VERSION = "3.3.1");
})(window);

$(document).ready(function () {
  var a = document.location;
  $("#divNavBar a").each(function () {
    if (this.href == a.toString().split("#")[0]) {
      $(this).addClass("on");
      return false;
    }
  });
});

zbp.plugin.unbind("comment.reply.start", "system");
zbp.plugin.on("comment.reply.start", "UmBGold", function (a) {
  var B = a;
  $("#inpRevID").val(B);
  var b = $("#divCommentPost"),
    I = $("#cancel-reply");
  b.before($("<div id='temp-frm' style='display:none'>")).addClass("reply-frm");
  $("#AjaxComment" + B).before(b);
  I.show().click(function () {
    var a = $("#temp-frm");
    $("#inpRevID").val(0);
    if (!a.length || !b.length) return;
    a.before(b);
    a.remove();
    $(this).hide();
    b.removeClass("reply-frm");
    return false;
  });
  try {
    $("#txaArticle").focus();
  } catch (a) {}
  return false;
});
zbp.plugin.on("comment.get", "UmBGold", function (a, B) {
  $("span.commentspage").html("Waiting...");
  $.get(
    bloghost + "zb_system/cmd.php?act=getcmt&postid=" + a + "&page=" + B,
    function (a) {
      $("#AjaxCommentBegin").nextUntil("#AjaxCommentEnd").remove();
      $("#AjaxCommentEnd").before(a);
      $("#cancel-reply").click();
    }
  );
});
zbp.plugin.on("comment.post.success", "UmBGold", function () {
  $("#cancel-reply").click();
});
