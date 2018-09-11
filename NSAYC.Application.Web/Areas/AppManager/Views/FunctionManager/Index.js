﻿/*
 * 版 本 NSAYCFrameWork V1.1.0 爱养车开发框架(http://www.NSAYC.cn)
 * Copyright (c) 2013-2017 广州市爱养车汽车服务有限公司
 * 创建人：爱养车-前端开发组
 * 日 期：2017.04.17
 * 描 述：流程模板管理	
 */
var refreshGirdData; // 更新数据
var bootstrap = function ($, learun) {
    "use strict";
    var type = '';

    var page = {
        init: function () {
            page.initGird();
            page.bind();
        },
        bind: function () {
            // 左侧数据加载
            $('#lr_left_tree').lrtree({
                url: top.$.rootUrl + '/SystemModule/DataItem/GetDetailTree',
                param: { itemCode: 'function' },
                nodeClick: function (item) {
                    type = item.value;
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
                    title: '新增移动功能',
                    url: top.$.rootUrl + '/AppManager/FunctionManager/Form?type=' + type,
                    width: 600,
                    height: 450,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGirdData);
                    }
                });
            });
            // 编辑
            $('#lr_edit').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_Id');                                                 
                if (NSAYC.checkrow(keyValue)) {
                    NSAYC.layerForm({
                        id: 'Form',
                        title: '编辑移动功能',
                        url: top.$.rootUrl + '/AppManager/FunctionManager/Form?keyValue=' + keyValue,
                        width: 600,
                        height: 450,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
            // 删除
            $('#lr_delete').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_Id');
                if (NSAYC.checkrow(keyValue)) {
                    NSAYC.layerConfirm('是否确认删除该功能！', function (res) {
                        if (res) {
                            NSAYC.deleteForm(top.$.rootUrl + '/AppManager/FunctionManager/DeleteForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });

            // 启用
            $('#lr_enable').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_Id');
                var enabledMark = $('#girdtable').jfGridValue('F_EnabledMark');
                if (NSAYC.checkrow(keyValue)) {
                    if (enabledMark != 1) {
                        NSAYC.layerConfirm('是否启用该功能！', function (res) {
                            if (res) {
                                NSAYC.postForm(top.$.rootUrl + '/AppManager/FunctionManager/UpDateSate', { keyValue: keyValue, state: 1 }, function () {
                                    refreshGirdData();
                                });
                            }
                        });
                    }
                    else {
                        NSAYC.alert.warning('该功能已启用!');
                    }
                }
            });
            // 禁用
            $('#lr_disabled').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_Id');
                var enabledMark = $('#girdtable').jfGridValue('F_EnabledMark');

                if (NSAYC.checkrow(keyValue)) {
                    if (enabledMark == 1) {
                        NSAYC.layerConfirm('是否禁用该功能！', function (res) {
                            if (res) {
                                NSAYC.postForm(top.$.rootUrl + '/AppManager/FunctionManager/UpDateSate', { keyValue: keyValue, state: 0 }, function () {
                                    refreshGirdData();
                                });
                            }
                        });
                    }
                    else {
                        NSAYC.alert.warning('该功能已禁用!');
                    }
                }
            });
           
            /*分类管理*/
            $('#lr_category').on('click', function () {
                NSAYC.layerForm({
                    id: 'ClassifyIndex',
                    title: '分类管理',
                    url: top.$.rootUrl + '/SystemModule/DataItem/DetailIndex?itemCode=function',
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
                url: top.$.rootUrl + '/AppManager/FunctionManager/GetPageList',
                headData: [
                    { label: "功能名称", name: "F_Name", width: 150, align: "left" },
                    {
                        label: "分类", name: "F_Type", width: 120, align: "left",
                        formatterAsync: function (callback, value, row) {
                            NSAYC.clientdata.getAsync('dataItem', {
                                key: value,
                                code: 'function',
                                callback: function (_data) {
                                    callback(_data.text);
                                }
                            });
                        }
                    },
                    {
                        label: "状态", name: "F_EnabledMark", width: 60, align: "center",
                        formatter: function (cellvalue, row) {
                            if (cellvalue == 1) {
                                return '<span class=\"label label-success\" style=\"cursor: pointer;\">正常</span>';
                            } else if (cellvalue == 0) {
                                return '<span class=\"label label-default\" style=\"cursor: pointer;\">禁用</span>';
                            }
                        }
                    },
                    { label: "编辑人", name: "F_CreateUserName", width: 120, align: "left" },
                    {
                        label: "编辑时间", name: "F_CreateDate", width: 150, align: "left",
                        formatter: function (cellvalue) {
                            return NSAYC.formatDate(cellvalue, 'yyyy-MM-dd');
                        },
                        sort: true
                    }
                ],
                mainId: 'F_SortCode',
                reloadSelected: true,
                isPage: true
            });
            page.search();
        },
        search: function (param) {
            param = param || {};
            param.type = type;
            $('#girdtable').jfGridSet('reload', { param: param });
        }
    };

    // 保存数据后回调刷新
    refreshGirdData = function () {
        page.search();
    }

    page.init();
}


