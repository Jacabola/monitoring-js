"use strict";
(function ($) {
    $.fn.monitoringJs = function (options) {
        input = jQuery(this);
        var opcoesDefaults = {
            elementos: '',
            classes: '',
            ids: '',
            names: ''
        };
        var settings = $.extend({}, opcoesDefaults, options);

        createDb();
    };
})(jQuery);

function createDb() {
    const db = openDatabase('db-monitoring-js', '0.1', 'DB Monitoring', 20 * 1024 * 1024);
    db.transaction(function (e) {
        e.executeSql('CREATE TABLE IF NOT EXISTS auditoria(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, acao VARCHAR(100) NOT NULL, elemento VARCHAR(100) NOT NULL, data DATETIME NOT NULL, hora)');
    });
}
