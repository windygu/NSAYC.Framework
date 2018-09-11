﻿/*
 * 版 本 NSAYCFrameWork V1.1.0 爱养车开发框架(http://www.NSAYC.cn)
 * Copyright (c) 2013-2017 广州市爱养车汽车服务有限公司
 * 创建人：爱养车-前端开发组
 * 日 期：2017.03.22
 * 描 述：IP过滤设置	
 */
var objectId = request('objectId');
var objectType = request('objectType');

var refreshGirdData;
var bootstrap = function ($, learun) {
    "use strict";
    var visitType = '1';

    var page = {
        init: function () {
            page.initGird();
            page.bind();
        },
        bind: function () {
            // 切换白黑名单
            $('#btn_visitType a').on('click', function () {
                var $this = $(this);
                if (!$this.hasClass('active')) {
                    $("#btn_visitType a.active").removeClass('active');
                    $this.addClass('active');
                    visitType = $this.attr('data-value');
                    page.search();
                }
            });
            // 刷新
            $('#lr_refresh').on('click', function () {
                location.reload();
            });
            // 新增
            $('#lr_add').on('click', function () {
                NSAYC.layerForm({
                    id: 'form',
                    title: '添加IP地址',
                    url: top.$.rootUrl + '/AuthorizeModule/FilterIP/Form?objectId=' + objectId + '&objectType=' + objectType + "&visitType=" + visitType,
                    width: 400,
                    height: 240,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGirdData);
                    }
                });
            });
            // 编辑
            $('#lr_edit').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_FilterIPId');
                if (NSAYC.checkrow(keyValue)) {
                    NSAYC.layerForm({
                        id: 'form',
                        title: '编辑IP地址',
                        url: top.$.rootUrl + '/AuthorizeModule/FilterIP/Form?keyValue=' + keyValue,
                        width: 400,
                        height: 260,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
            // 删除
            $('#lr_delete').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_FilterIPId');
                if (NSAYC.checkrow(keyValue)) {
                    NSAYC.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            NSAYC.deleteForm(top.$.rootUrl + '/AuthorizeModule/FilterIP/DeleteForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
        },
        initGird: function () {
            $('#girdtable').jfGrid({
                url: top.$.rootUrl + '/AuthorizeModule/FilterIP/GetList',
                headData: [
                    {
                        label: "访问", name: "F_VisitType", width: 80, align: "center",
                        formatter: function (cellvalue) {
                            if (cellvalue == 0) {
                                return '<span value=' + cellvalue + ' class=\"label label-danger\">拒绝</span>';
                            } else {
                                return '<span value=' + cellvalue + ' class=\"label label-success\">授权</span>';
                            }
                        }
                    },
                    { label: "IP地址(子网掩码)", name: "F_IPLimit", width: 450, align: "left"}
                ]
            });
            page.search();
        },
        search: function () {
            $('#girdtable').jfGridSet('reload', { param: { visitType: visitType, objectId: objectId } });
        }
    };

    refreshGirdData = function () {
        page.search();
    };

    page.init();
}


