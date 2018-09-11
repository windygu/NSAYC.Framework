﻿/*
 * 版 本 NSAYCFrameWork V1.1.0 爱养车开发框架(http://www.NSAYC.cn)
 * Copyright (c) 2013-2017 广州市爱养车汽车服务有限公司
 * 创建人：爱养车-前端开发组
 * 日 期：2017.04.05
 * 描 述：自定义表单设计	
 */
var keyValue = request('keyValue');
var categoryId = request('categoryId');
var dbTable = [];
var dbId = '';

var selectedRow = null;
var bootstrap = function ($, learun) {
    "use strict";
    
    

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        /*绑定事件和初始化控件*/
        bind: function () {
            // 加载导向
            $('#wizard').wizard().on('change', function (e, data) {
                var $finish = $("#btn_finish");
                var $next = $("#btn_next");
                if (data.direction == "next") {
                    if (data.step == 1) {
                        if (!$('#step-1').lrValidform()) {
                            return false;
                        }
                    } else if (data.step == 2) {
                        dbTable = $('#girdtable').jfGridGet('rowdatas');
                        if (dbId == '' || dbTable.length == 0) {
                            NSAYC.alert.error('至少选择一张数据表');
                            return false;
                        }
                        $('#step-3').lrCustmerFormDesigner('updatedb', { dbId: dbId, dbTable: dbTable });

                        $finish.removeAttr('disabled');
                        $next.attr('disabled', 'disabled');
                    }
                    else {
                        $finish.attr('disabled', 'disabled');
                    }
                } else {
                    $finish.attr('disabled', 'disabled');
                    $next.removeAttr('disabled');
                }
            });

            // 数据库表选择
            $('#F_DbId').lrselect({
                url: top.$.rootUrl + '/SystemModule/DatabaseLink/GetTreeList',
                type: 'tree',
                placeholder:'请选择数据库',
                allowSearch: true,
                select: function (item) {
                    if (item.hasChildren) {
                        dbId = '';
                        dbTable = [];
                        $('#girdtable').jfGridSet('refreshdata', { rowdatas: [] });
                    }
                    else if (dbId != item.id) {
                        dbId = item.id;
                        dbTable = [];
                        $('#girdtable').jfGridSet('refreshdata', { rowdatas: [] });
                    }
                }
            });
            $('#F_Category').lrDataItemSelect({ code: 'FormSort' });
            $('#F_Category').lrselectSet(categoryId);
            // 新增
            $('#lr_db_add').on('click', function () {
                dbTable = $('#girdtable').jfGridGet('rowdatas');
                selectedRow = null;
                NSAYC.layerForm({
                    id: 'DataTableForm',
                    title: '添加数据表',
                    url: top.$.rootUrl + '/FormModule/Custmerform/DataTableForm?dbId=' + dbId,
                    width: 600,
                    height: 400,
                    callBack: function (id) {
                        return top[id].acceptClick(function (data) {
                            $('#girdtable').jfGridSet('addRow', { row: data });
                        });
                    }
                });
            });
            // 编辑
            $('#lr_db_edit').on('click', function () {
                dbTable = $('#girdtable').jfGridGet('rowdatas');
                selectedRow = $('#girdtable').jfGridGet('rowdata');
                var keyValue = $('#girdtable').jfGridValue('name');
                if (NSAYC.checkrow(keyValue)) {
                    NSAYC.layerForm({
                        id: 'DataTableForm',
                        title: '编辑数据表',
                        url: top.$.rootUrl + '/FormModule/Custmerform/DataTableForm?dbId=' + dbId,
                        width: 600,
                        height: 400,
                        callBack: function (id) {
                            return top[id].acceptClick(function (data) {
                                $('#girdtable').jfGridSet('updateRow', { row: data });
                            });
                        }
                    });
                }
            });
            // 删除
            $('#lr_db_delete').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('name');
                if (NSAYC.checkrow(keyValue)) {
                    NSAYC.layerConfirm('是否确认删除该项！', function (res, index) {
                        if (res) {
                            $('#girdtable').jfGridSet('removeRow');
                            top.layer.close(index); //再执行关闭  
                        }
                    });
                }
            });
            $('#girdtable').jfGrid({
                headData: [
                    { label: "数据表名", name: "name", width: 200, align: "left" },
                    { label: "数据表字段", name: "field", width: 200, align: "left" },
                    { label: "被关联表", name: "relationName", width: 200, align: "left" },
                    { label: "被关联表字段", name: "relationField", width: 200, align: "left" }
                ],
                mainId: 'name',
                reloadSelected: true
            });



            // 设计页面初始化
            $('#step-3').lrCustmerFormDesigner('init');
            // 保存数据按钮
            $("#btn_finish").on('click', page.save);
            $("#btn_draft").on('click', page.draftsave);
        },

        /*初始化数据*/
        initData: function () {
            if (!!keyValue) {
                $.lrSetForm(top.$.rootUrl + '/FormModule/Custmerform/GetFormData?keyValue=' + keyValue, function (data) {//
                    $('#step-1').lrSetFormData(data.schemeInfoEntity);
                    var scheme = JSON.parse(data.schemeEntity.F_Scheme);
                    $('#F_DbId').lrselectSet(scheme.dbId);
                    $('#girdtable').jfGridSet('refreshdata', { rowdatas: scheme.dbTable });
                    $('#step-3').lrCustmerFormDesigner('set', scheme);
                });
            }
        },
        /*保存数据*/
        save: function () {
            var schemeInfo = $('#step-1').lrGetFormData(keyValue);
            if (!$('#step-3').lrCustmerFormDesigner('valid')) {
                return false;
            }
            var scheme = $('#step-3').lrCustmerFormDesigner('get');
            schemeInfo.F_Type = 0;
            schemeInfo.F_EnabledMark = 1;
            var postData = {
                keyValue: keyValue,
                schemeInfo: JSON.stringify(schemeInfo),
                scheme: JSON.stringify(scheme),
                type: 1
            };
           
            $.lrSaveForm(top.$.rootUrl + '/FormModule/Custmerform/SaveForm', postData, function (res) {
                // 保存成功后才回调
                NSAYC.frameTab.currentIframe().refreshGirdData();
            });
        },
        /*保存草稿数据*/
        draftsave: function () {
            var schemeInfo = $('#step-1').lrGetFormData(keyValue);
            var scheme = $('#step-3').lrCustmerFormDesigner('get');

            dbTable = $('#girdtable').jfGridGet('rowdatas');
            scheme.dbId = dbId;
            scheme.dbTable = dbTable;
            schemeInfo.F_EnabledMark = 0;
            schemeInfo.F_Type = 0;
            var postData = {
                keyValue: keyValue,
                schemeInfo: JSON.stringify(schemeInfo),
                scheme: JSON.stringify(scheme),
                type: 2
            };

            $.lrSaveForm(top.$.rootUrl + '/FormModule/Custmerform/SaveForm', postData, function (res) {
                // 保存成功后才回调
                NSAYC.frameTab.currentIframe().refreshGirdData();
            });
        }
    };

    page.init();
}