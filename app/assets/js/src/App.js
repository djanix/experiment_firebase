window.ring = require('ring');
window.$ = require('jquery');
window.jQuery = window.$;

var Firebase = require('firebase');
var View = require('./views/View');
var ViewHome = require('./views/ViewHome');


$.App = ring.create({
    constructor: function (el) {
        var self = this;
        self.el = $(el);
        self.init();
    },

    //-- Vars
    //--------------------------------------------------------------
    view: null,
    viewName: 'View',


    //-- Init
    //--------------------------------------------------------------
    init: function () {
        var self = this;
        var $view = self.el.find('[data-view]');

        if ($view) {
            self.viewName += $view.attr('data-view');
            self.view = new $[self.viewName](self.el.find('[data-view="' + self.el.find('[data-view]').attr('data-view') + '"]'));
        }

        self.setDeviceType();

        $(window).resize(function () {
            self.setDeviceType();
        });
    },

    setDeviceType: function () {
        var newDevice = window.getComputedStyle(document.body, ':after').getPropertyValue('content');

        if (newDevice != window.deviceType) {
            window.deviceType = newDevice;
        }
    }
});

$(function () {
    window.App = new $.App($('#site'));
});