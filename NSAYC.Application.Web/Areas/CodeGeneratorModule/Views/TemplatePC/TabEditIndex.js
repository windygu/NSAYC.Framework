﻿/*
 * 版 本 NSAYCFrameWork V1.1.0 爱养车开发框架(http://www.NSAYC.cn)
 * Copyright (c) 2013-2017 广州市爱养车汽车服务有限公司
 * 创建人：爱养车-前端开发组
 * 日 期：2017.04.17
 * 描 述：选项卡编辑	
 */
var selectedRow;


var bootstrap = function ($, learun) {
    "use strict";
    var tabList = top.layer_CustmerCodeIndex.tabList[0].ChildNodes;

    console.log(tabList);


    var page = {
        init: function () {
            page.initGird();
            page.bind();
        },
        bind: function () {
            // 新增
            $('#lr_add').on('click', function () {
                selectedRow = null;
                NSAYC.layerForm({
                    id: 'TabEditForm',
                    title: '添加选项卡',
                    url: top.$.rootUrl + '/CodeGeneratorModule/TemplatePC/TabEditForm',
                    width: 400,
                    height: 200,
                    callBack: function (id) {
                        return top[id].acceptClick(function (data) {
                            tabList.push(data);
                            tabList = tabList.sort(function (a, b) {
                                return parseInt(a.sort) - parseInt(b.sort);
                            });
                            $('#girdtable').jfGridSet('refreshdata', { rowdatas: tabList });
                        });
                    }
                });
            });
            // 编辑
            $('#lr_edit').on('click', function () {
                selectedRow = $('#girdtable').jfGridGet('rowdata');
                var keyValue = $('#girdtable').jfGridValue('id');
                if (NSAYC.checkrow(keyValue)) {
                    NSAYC.layerForm({
                        id: 'TabEditForm',
                        title: '编辑选项卡',
                        url: top.$.rootUrl + '/CodeGeneratorModule/TemplatePC/TabEditForm',
                        width: 400,
                        height: 200,
                        callBack: function (id) {
                            return top[id].acceptClick(function (data) {
                                $.each(tabList, function (id, item) {
                                    if (item.id == data.id) {
                                        tabList[id] = data;
                                        return false;
                                    }
                                });
                                tabList = tabList.sort(function (a, b) {
                                    return parseInt(a.sort) - parseInt(b.sort);
                                });
                                $('#girdtable').jfGridSet('refreshdata', { rowdatas: tabList });
                            });
                        }
                    });
                }
            });
            // 删除
            $('#lr_delete').on('click', function () {
                if (tabList.length == 1) {
                    NSAYC.alert.warning('必须保留一个选项卡！');
                    return false;
                }
                var _id = $('#girdtable').jfGridValue('id');
                if (NSAYC.checkrow(_id)) {
                    NSAYC.layerConfirm('是否确认删除该选项卡', function (res, index) {
                        if (res) {
                            $.each(tabList, function (id, item) {
                                if (item.id == _id) {
                                    tabList.splice(id, 1);
                                    return false;
                                }
                            });
                            $('#girdtable').jfGridSet('refreshdata', { rowdatas: tabList });
                            top.layer.close(index); //再执行关闭  
                        }
                    });
                }
            });
        },
        initGird: function () {
            $('#girdtable').jfGrid({
                headData: [
                    { label: "名称", name: "text", width: 340, align: "left" },
                    { label: "序号", name: "sort", width: 80, align: "center" }
                ],
                mainId: 'id',
                reloadSelected: true
            });

            $('#girdtable').jfGridSet('refreshdata', { rowdatas: tabList });
        }
    };
    page.init();
}