﻿/*
 * 版 本 NSAYCFrameWork V1.1.0 爱养车开发框架(http://www.NSAYC.cn)
 * Copyright (c) 2013-2017 广州市爱养车汽车服务有限公司
 * 创建人：爱养车-前端开发组
 * 日 期：2017.04.17
 * 描 述：流程模板记录数据	
 */
var keyValue = request('keyValue');

var refreshGirdData; // 更新数据
var bootstrap = function ($, learun) {
    "use strict";

    var nowschemeId = NSAYC.frameTab.currentIframe().nowschemeId;

    var page = {
        init: function () {
            page.initGird();
            page.bind();
        },
        bind: function () {
            // 刷新
            $('#lr_refresh').on('click', function () {
                location.reload();
            });
            // 预览表单
            $('#lr_preview').on('click', function () {
                var schemeId = $('#girdtable').jfGridValue('F_Id');
                if (NSAYC.checkrow(schemeId)) {
                    NSAYC.layerForm({
                        id: 'PreviewForm',
                        title: '预览当前模板',
                        url: top.$.rootUrl + '/WorkFlowModule/WfScheme/PreviewForm?schemeId=' + schemeId,
                        width: 1200,
                        height: 900,
                        maxmin: true,
                        btn: null
                    });
                }
            });

            // 更新到此版本
            $('#lr_update').on('click', function () {
                var schemeId = $('#girdtable').jfGridValue('F_Id');
                if (NSAYC.checkrow(schemeId)) {
                    if (schemeId != nowschemeId) {
                        NSAYC.layerConfirm('是否要更新到该版本！', function (res) {
                            if (res) {
                                NSAYC.postForm(top.$.rootUrl + '/WorkFlowModule/WfScheme/UpdateScheme', { schemeInfoId: keyValue, schemeId: schemeId }, function () {
                                    nowschemeId = schemeId;
                                    NSAYC.frameTab.currentIframe().nowschemeId = schemeId;
                                    NSAYC.frameTab.currentIframe().refreshGirdData();
                                    refreshGirdData();

                                });
                            }
                        });
                    }
                    else {
                        NSAYC.alert.warning('已更新到当前版本!');
                    }
                }
            });
        },
        initGird: function () {
            $('#girdtable').jfGrid({
                url: top.$.rootUrl + '/WorkFlowModule/WfScheme/GetSchemePageList',
                headData: [
                    { label: "创建人", name: "F_CreateUserName", width: 160, align: "left" },
                    {
                        label: "创建时间", name: "F_CreateDate", width: 160, align: "left",
                        formatter: function (cellvalue) {
                            return NSAYC.formatDate(cellvalue, 'yyyy-MM-dd hh:mm:ss');
                        }
                    },
                    {
                        label: "状态", name: "F_Type", width: 80, align: "center",
                        formatter: function (cellvalue, row) {
                            if (row.F_Type == 1) {
                                return '<span class=\"label label-success\" style=\"cursor: pointer;\">正式</span>';
                            }
                            else {
                                return '<span class=\"label label-info\" style=\"cursor: pointer;\">草稿</span>';
                            }
                        }
                    },
                    {
                        label: "", name: "F_Id", width: 80, align: "center",
                        formatter: function (cellvalue) {
                            if (cellvalue == nowschemeId) {
                                return '<span class=\"label label-danger\" style=\"cursor: pointer;\">当前版本</span>';
                            }
                        }
                    }
                ],
                mainId: 'F_Id',
                reloadSelected: true,
                isPage: true,
                sidx: 'F_CreateDate',
                sord: 'DESC'
            });
            page.search();
        },
        search: function (param) {
            $('#girdtable').jfGridSet('reload', { param: { schemeInfoId: keyValue } });
        }
    };

    // 保存数据后回调刷新
    refreshGirdData = function () {
        page.search();
    }

    page.init();
}