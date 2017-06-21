"use strict";
const db = openDatabase('db-monitoring-js', '0.1', 'DB Monitoring', 20 * 1024 * 1024);
(function ($) {
    $.fn.monitoringJs = function (options) {
        var opcoesDefaults = {
            selector: {
                elementos: undefined,
                classes: undefined,
                ids: undefined,
                names: undefined
            }
        };
        var settings = $.extend({}, opcoesDefaults, options);

        createDb();

        if (settings.selector.elementos) {
            $.each(settings.selector.elementos.split(','), function (e, b) {
                $(b).click(function () {
                        db.transaction(function (sq) {
                            sq.executeSql('INSERT INTO auditoria (acao,elemento,data,hora) VALUES ("Click",?, ?, ?)' , [$(b)[0].outerHTML,new Date(), new Date().getTime()],
                            function(e,b){
                            },function(ex,error){
                            }
                            );
                        });
                    
                    
                });
            });
        }

    };
})(jQuery);

function createDb() {
    db.transaction(function (e) {
        e.executeSql('CREATE TABLE IF NOT EXISTS auditoria(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, acao TEXT NOT NULL, elemento TEXT NOT NULL, data DATETIME NOT NULL, hora)');
    });
}

function selectAuditoria() {
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM auditoria', [], function (tx, results) {
            var len = results.rows.length, i;
            console.log("Found rows: " + len);
            for (i = 0; i < len; i++) {
                console.log("ACAO  : " + results.rows.item(i).acao + " | ELEMENTO : " + results.rows.item(i).elemento + " | DATA : " + results.rows.item(i).data);
            }
        }, null);
    });
}

function deleteAuditoria() {
    db.transaction(function (tx) {
        tx.executeSql('DELETE FROM auditoria;');
    });
}

function dropTableAuditoria() {
    db.transaction(function (tx) {
        tx.executeSql('DROP TABLE auditoria;');
    });
}