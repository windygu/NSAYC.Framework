﻿/*
 * 版 本 NSAYCFrameWork V1.1.0 爱养车开发框架(http://www.NSAYC.cn)
 * Copyright (c) 2013-2017 广州市爱养车汽车服务有限公司
 * 创建人：爱养车-前端开发组
 * 日 期：2017.04.17
 * 描 述：表单设计	
 */
var refreshGirdData; // 更新数据
var categoryId;
var nowschemeId;

var bootstrap = function ($, learun) {
    "use strict";
    var page = {
        init: function () {
            page.initGird();
            page.bind();
        },
        bind: function () {
            // 左侧数据加载
            $('#lr_left_tree').lrtree({
                url: top.$.rootUrl + '/SystemModule/DataItem/GetDetailTree',
                param: { itemCode: 'FormSort' },
                nodeClick: function (item) {
                    categoryId = item.value;
                    $('#titleinfo').text(item.text);
                    page.search();
                }
            });
            // 查询
            $('#btn_Search').on('click', function () {
                var keyword = $('#txt_Keyword').val();
                page.search({ keyword: keyword });
            });
            // 刷新
            $('#lr_refresh').on('click', function () {
                location.reload();
            });
            // 新增
            $('#lr_add').on('click', function () {
                NSAYC.layerForm({
                    id: 'Form',
                    title: '自定义表单新增',
                    url: top.$.rootUrl + '/FormModule/Custmerform/Form?categoryId=' + categoryId,
                    width: 1200,
                    height: 700,
                    maxmin: true,
                    btn:null
                });
            });
            // 编辑
            $('#lr_edit').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_Id');
                if (NSAYC.checkrow(keyValue)) {
                    NSAYC.layerForm({
                        id: 'Form',
                        title: '自定义表单编辑',
                        url: top.$.rootUrl + '/FormModule/Custmerform/Form?categoryId=' + categoryId + "&keyValue=" + keyValue,
                        width: 1200,
                        height: 700,
                        maxmin: true,
                        btn: null
                    });
                }
            });
            // 删除
            $('#lr_delete').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_Id');
                if (NSAYC.checkrow(keyValue)) {
                    NSAYC.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            NSAYC.deleteForm(top.$.rootUrl + '/FormModule/Custmerform/DeleteForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });

            // 预览表单
            $('#lr_preview').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_Id');
                if (NSAYC.checkrow(keyValue)) {
                    NSAYC.layerForm({
                        id: 'custmerForm_PreviewForm',
                        title: '预览当前表单',
                        url: top.$.rootUrl + '/FormModule/Custmerform/PreviewForm?schemeInfoId=' + keyValue,
                        width: 800,
                        height: 600,
                        maxmin: true,
                        btn: null
                    });
                }
            });

            // 启用
            $('#lr_enabled').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_Id');
                var enabledMark = $('#girdtable').jfGridValue('F_EnabledMark');

                var type = $('#girdtable').jfGridValue('F_Type');
                if (type == 2) {
                    NSAYC.alert.warning('草稿模板不能启用!');
                    return false;
                }

                if (NSAYC.checkrow(keyValue)) {
                    if (enabledMark != 1) {
                        NSAYC.layerConfirm('是否确认启用该表单模板！', function (res) {
                            if (res) {
                                NSAYC.postForm(top.$.rootUrl + '/FormModule/Custmerform/UpDateSate', { keyValue: keyValue, state: 1 }, function () {
                                    refreshGirdData();
                                });
                            }
                        });
                    }
                    else {
                        NSAYC.alert.warning('该表单已启用!');
                    }
                }
            });
            // 禁用
            $('#lr_disabled').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_Id');
                var enabledMark = $('#girdtable').jfGridValue('F_EnabledMark');

                var type = $('#girdtable').jfGridValue('F_Type');
                if (type == 2) {
                    NSAYC.alert.warning('草稿模板不能禁用!');
                    return false;
                }

                if (NSAYC.checkrow(keyValue)) {
                    if (enabledMark == 1) {
                        NSAYC.layerConfirm('是否确认禁用该表单模板！', function (res) {
                            if (res) {
                                NSAYC.postForm(top.$.rootUrl + '/FormModule/Custmerform/UpDateSate', { keyValue: keyValue, state: 0 }, function () {
                                    refreshGirdData();
                                });
                            }
                        });
                    }
                    else {
                        NSAYC.alert.warning('该表单已禁用!');
                    }
                }
            });
            // 查看历史记录
            $('#lr_history').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_Id');
                var Name = $('#girdtable').jfGridValue('F_Name');
                nowschemeId = $('#girdtable').jfGridValue('F_SchemeId');
                if (NSAYC.checkrow(keyValue)) {
                    NSAYC.layerForm({
                        id: 'HistoryForm',
                        title: '表单模板历史记录-' + Name,
                        url: top.$.rootUrl + '/FormModule/Custmerform/HistoryForm?&keyValue=' + keyValue,
                        width: 600,
                        height: 400,
                        maxmin: true,
                        btn: null
                    });
                }
            });

            /*分类管理*/
            $('#lr_category').on('click', function () {
                NSAYC.layerForm({
                    id: 'ClassifyIndex',
                    title: '分类管理',
                    url: top.$.rootUrl + '/SystemModule/DataItem/DetailIndex?itemCode=FormSort',
                    width: 800,
                    height: 500,
                    maxmin: true,
                    btn: null,
                    end: function () {
                        NSAYC.clientdata.update('dataItem');
                        location.reload();
                    }
                });
            });
        },
        initGird: function () {
            $('#girdtable').lrAuthorizeJfGrid({
                url: top.$.rootUrl + '/FormModule/Custmerform/GetPageList',
                headData: [
                    { label: "名称", name: "F_Name", width: 150, align: "left" },
                    {
                        label: "分类", name: "F_Category", width: 150, align: "center",
                        formatterAsync: function (callback, value, row) {
                            NSAYC.clientdata.getAsync('dataItem', {
                                key: value,
                                code: 'FormSort',
                                callback: function (_data) {
                                    callback(_data.text);
                                }
                            });
                        }
                    },
                    {
                        label: "状态", name: "F_EnabledMark", width: 50, align: "center",
                        formatter: function (cellvalue, row) {
                            if (row.F_Type == 1) {
                                if (cellvalue == 1) {
                                    return '<span class=\"label label-success\" style=\"cursor: pointer;\">启用</span>';
                                } else if (cellvalue == 0) {
                                    return '<span class=\"label label-default\" style=\"cursor: pointer;\">禁用</span>';
                                }
                            }
                            else {
                                return '<span class=\"label label-info\" style=\"cursor: pointer;\">草稿</span>';
                            }
                        }
                    },
                    { label: "创建人", name: "F_CreateUserName", width: 100, align: "center" },
                    {
                        label: "创建时间", name: "F_CreateDate", width: 150, align: "left",
                        formatter: function (cellvalue) {
                            return NSAYC.formatDate(cellvalue, 'yyyy-MM-dd');
                        }
                    },
                    { label: "备注", name: "F_Description", width: 500, align: "left" }
                ],
                mainId: 'F_Id',
                reloadSelected: true,
                isPage: true
            });
            page.search();
        },
        search: function (param) {
            param = param || {};
            param.category = categoryId;
            $('#girdtable').jfGridSet('reload', { param: param });
        }
    };

    // 保存数据后回调刷新
    refreshGirdData = function () {
        page.search();
    }

    page.init();
}