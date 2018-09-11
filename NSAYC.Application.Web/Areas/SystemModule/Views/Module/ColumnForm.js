﻿/*
 * 版 本 NSAYCFrameWork V1.1.0 爱养车开发框架(http://www.NSAYC.cn)
 * Copyright (c) 2013-2017 广州市爱养车汽车服务有限公司
 * 创建人：爱养车-前端开发组
 * 日 期：2017.04.11
 * 描 述：功能视图模块	
 */
var currentColRow = top.layer_form.currentColRow;
var acceptClick;
var bootstrap = function ($, learun) {
    "use strict";

    var page = {
        init: function () {
            page.initData();
        },
        initData: function () {
            if (!!currentColRow) {
                $('#form').lrSetFormData(currentColRow);
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').lrValidform()) {
            return false;
        }
        var data = $('#form').lrGetFormData();
        data.F_ParentId = '0';
        if (!!callBack) {
            callBack(data);
        }
        return true;
    };
    page.init();
}