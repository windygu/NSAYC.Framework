﻿/*
 * 版 本 NSAYCFrameWork V1.1.0 爱养车开发框架(http://www.NSAYC.cn)
 * Copyright (c) 2013-2017 广州市爱养车汽车服务有限公司
 * 创建人：爱养车-前端开发组
 * 日 期：2017.04.11
 * 描 述：字段导入	
 */
var acceptClick;
var bootstrap = function ($, learun) {
    "use strict";
    // 获取父弹层的数据
    var dbTable = top.layer_CustmerCodeIndex.dbTable;

    var page = {
        init: function () {
            page.bind();
        },
        bind: function () {
            // 数据表选择
            $('#tableName').lrselect({
                data: dbTable,
                value: 'name',
                text: 'name',
                maxHeight: 150,
                allowSearch: true
            });
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').lrValidform()) {
            return false;
        }
        var postData = $('#form').lrGetFormData();
        callBack(postData);
        return true;
    };
    page.init();
}