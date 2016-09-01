var beforeModal;
/*
 * a:对话框id
 * t:提示
 * c:对话框内容
 * ac:下一步的操作名
 * time:自动关闭
 */
function dialog(diaObj) {
    if (typeof diaObj !== "object") {
        return false;
    }
    var c = diaObj.msg;
    var a = diaObj.id;
    var t = diaObj.title;
    var ac = diaObj.action;
    var acn = diaObj.actionName;
    var time = diaObj.time;
    var size = diaObj.modalSize;
    $('#' + beforeModal).modal('hide');
    if (typeof t === 'undefined' || t === '') {
        t = '提示';
    }
    if (typeof a === 'undefined' || a === '') {
        a = 'myDialog';
    }
    if (typeof ac === 'undefined') {
        ac = '';
    }
    if (typeof size === 'undefined') {
        size = '';
    }
    $('#' + a).remove();
    var longstr = '<div class="modal fade mymodal" id="' + a + '" tabindex="-1" role="dialog" aria-labelledby="' + a + 'Label" aria-hidden="true"><div class="modal-dialog '+size+'"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title" id="' + a + 'Label">' + t + '</h4></div><div class="modal-body">' + c + '</div><div class="modal-footer">';
    longstr += '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>';
    if (ac !== '' && typeof ac !== 'undefined') {
        var _t;
        if (acn !== '' && typeof acn !== 'undefined') {
            _t = acn;
        } else {
            _t = '确定';
        }
        longstr += '<button type="button" class="btn btn-primary" id="modal-extraAction-btn" action="' + ac + '" data-loading-text="Loading...">' + _t + '</button>';
    }
    longstr += '</div></div></div></div>';
    $("body").append(longstr);
    $('#' + a).modal({
        backdrop: false,
        keyboard: false
    });
    beforeModal = a;
    if (time > 0 && typeof time !== 'undefined') {
        setTimeout("closeDialog('" + a + "')", time * 1000);
    }
    $('#'+beforeModal).on('hidden.bs.modal', function (e) {
        $('#'+beforeModal).remove();
    })
}
function closeDialog(a) {
    if (!a) {
        a = 'myDialog';
    }
    $('#' + a).modal('hide');
    $('#' + a).remove();
    $("body").eq(0).removeClass('modal-open');
}
/*lazyload*/
!function (c, b, d, f) {
    var a = c(b);
    c.fn.lazyload = function (h) {
        function i() {
            var k = 0;
            e.each(function () {
                var l = c(this);
                if (!j.skip_invisible || l.is(":visible")) {
                    if (c.abovethetop(this, j) || c.leftofbegin(this, j)) {
                    } else {
                        if (c.belowthefold(this, j) || c.rightoffold(this, j)) {
                            if (++k > j.failure_limit) {
                                return !1
                            }
                        } else {
                            l.trigger("appear"), k = 0
                        }
                    }
                }
            })
        }
        var g, e = this, j = {threshold: 0, failure_limit: 0, event: "scroll", effect: "show", container: b, data_attribute: "original", skip_invisible: !0, appear: null, load: null};
        return h && (f !== h.failurelimit && (h.failure_limit = h.failurelimit, delete h.failurelimit), f !== h.effectspeed && (h.effect_speed = h.effectspeed, delete h.effectspeed), c.extend(j, h)), g = j.container === f || j.container === b ? a : c(j.container), 0 === j.event.indexOf("scroll") && g.bind(j.event, function () {
            return i()
        }), this.each(function () {
            var k = this, l = c(k);
            k.loaded = !1, l.one("appear", function () {
                if (!this.loaded) {
                    if (j.appear) {
                        var m = e.length;
                        j.appear.call(k, m, j)
                    }
                    c("<img />").bind("load", function () {
                        l.hide().attr("src", l.data(j.data_attribute))[j.effect](j.effect_speed), k.loaded = !0;
                        var p = c.grep(e, function (n) {
                            return !n.loaded
                        });
                        if (e = c(p), j.load) {
                            var o = e.length;
                            j.load.call(k, o, j)
                        }
                    }).attr("src", l.data(j.data_attribute))
                }
            }), 0 !== j.event.indexOf("scroll") && l.bind(j.event, function () {
                k.loaded || l.trigger("appear")
            })
        }), a.bind("resize", function () {
            i()
        }), /iphone|ipod|ipad.*os 5/gi.test(navigator.appVersion) && a.bind("pageshow", function (k) {
            k.originalEvent && k.originalEvent.persisted && e.each(function () {
                c(this).trigger("appear")
            })
        }), c(d).ready(function () {
            i()
        }), this
    }, c.belowthefold = function (h, e) {
        var g;
        return g = e.container === f || e.container === b ? a.height() + a.scrollTop() : c(e.container).offset().top + c(e.container).height(), g <= c(h).offset().top - e.threshold
    }, c.rightoffold = function (h, e) {
        var g;
        return g = e.container === f || e.container === b ? a.width() + a.scrollLeft() : c(e.container).offset().left + c(e.container).width(), g <= c(h).offset().left - e.threshold
    }, c.abovethetop = function (h, e) {
        var g;
        return g = e.container === f || e.container === b ? a.scrollTop() : c(e.container).offset().top, g >= c(h).offset().top + e.threshold + c(h).height()
    }, c.leftofbegin = function (h, e) {
        var g;
        return g = e.container === f || e.container === b ? a.scrollLeft() : c(e.container).offset().left, g >= c(h).offset().left + e.threshold + c(h).width()
    }, c.inviewport = function (e, g) {
        return !(c.rightoffold(e, g) || c.leftofbegin(e, g) || c.belowthefold(e, g) || c.abovethetop(e, g))
    }, c.extend(c.expr[":"], {"below-the-fold": function (e) {
            return c.belowthefold(e, {threshold: 0})
        }, "above-the-top": function (e) {
            return !c.belowthefold(e, {threshold: 0})
        }, "right-of-screen": function (e) {
            return c.rightoffold(e, {threshold: 0})
        }, "left-of-screen": function (e) {
            return !c.rightoffold(e, {threshold: 0})
        }, "in-viewport": function (e) {
            return c.inviewport(e, {threshold: 0})
        }, "above-the-fold": function (e) {
            return !c.belowthefold(e, {threshold: 0})
        }, "right-of-fold": function (e) {
            return c.rightoffold(e, {threshold: 0})
        }, "left-of-fold": function (e) {
            return !c.rightoffold(e, {threshold: 0})
        }})
}(jQuery, window, document);