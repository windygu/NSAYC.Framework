﻿/*
 * 版 本 NSAYCFrameWork V1.1.0 爱养车开发框架(http://www.NSAYC.cn)
 * Copyright (c) 2013-2017 广州市爱养车汽车服务有限公司
 * 创建人：爱养车-前端开发组
 * 日 期：2017.04.11
 * 描 述：表格选择项字段选择	
 */
//var dbId = request('dbId');
//var tableName = request('tableName');

var colDatas = top.layer_GridFieldIndex.colDatas;
var acceptClick;
var bootstrap = function ($, learun) {
    "use strict";
    var selectFieldData = top.layer_GridFieldForm.selectFieldData;
    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            // 绑定字段
            $('#value').lrselect({
                value: 'field',
                text: 'field',
                title: 'name',
                allowSearch: true,
                maxHeight: 160,
                data: colDatas
            });
            // 对齐方式
            $('#align').lrselect({ placeholder: false }).lrselectSet('left');
            // 是否隐藏
            $('#hide').lrselect({ placeholder: false }).lrselectSet('0');
        },
        initData: function () {
            if (!!selectFieldData) {
                $('#form').lrSetFormData(selectFieldData);
            }
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