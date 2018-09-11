﻿/*
 * 版 本 NSAYCFrameWork V1.1.0 爱养车开发框架(http://www.NSAYC.cn)
 * Copyright (c) 2013-2017 广州市爱养车汽车服务有限公司
 * 创建人：爱养车-前端开发组
 * 日 期：2017.04.17
 * 描 述：单据编码	
 */
var refreshGirdData; // 更新数据
var bootstrap = function ($, learun) {
    "use strict";

    var processId = '';
    var page = {
        init: function () {
            page.initGird();
            page.bind();
        },
        bind: function () {
            // 查询
            $('#btn_Search').on('click', function () {
                page.search();
            });
            // 刷新
            $('#lr_refresh').on('click', function () {
                location.reload();
            });
            // 新增
            $('#lr_add').on('click', function () {
                NSAYC.layerForm({
                    id: 'Form',
                    title: '新增请假单',
                    url: top.$.rootUrl + '/WorkFlowModule/WfSystemDemo/DemoLeaveForm',
                    width: 600,
                    height: 400,
                    callBack: function (id) {
                        var res = false;
                        // 验证数据
                        res = top[id].validForm();
                        // 保存数据
                        if (res) {
                            processId = NSAYC.newGuid();
                            res = top[id].save(processId, refreshGirdData);
                        }
                        return res;
                    }
                });
            });
            // 编辑
            $('#lr_edit').on('click', function () {
                var keyValue = $('#girdtable').jfGridValue('F_Id');
                if (NSAYC.checkrow(keyValue)) {
                    NSAYC.layerForm({
                        id: 'Form',
                        title: '编辑请假单',
                        url: top.$.rootUrl + '/WorkFlowModule/WfSystemDemo/DemoLeaveForm?keyValue=' + keyValue,
                        width: 600,
                        height: 400,
                        callBack: function (id) {
                            return top[id].save(keyValue, function () {
                                page.search();
                            });
                        }
                    });
                }
            });
        },
        initGird: function () {
            $('#girdtable').jfGrid({
                url: top.$.rootUrl + '/WorkFlowModule/WfSystemDemo/GetPageList',
                headData: [
                    {
                        label: '请假人', name: 'F_CreateUserId', width: 150, align: 'left',
                        formatterAsync: function (callback, value, row) {
                            NSAYC.clientdata.getAsync('user', {
                                key: value,
                                callback: function (item) {
                                    callback(item.name);
                                }
                            });
                        }
                    },
                    { label: '请假天数', name: 'F_Num', width: 100, align: 'center' },
                    {
                        label: '开始日期', name: 'F_Begin', width: 130, align: 'left',
                        formatter: function (cellvalue) {
                            return NSAYC.formatDate(cellvalue, 'yyyy-MM-dd hh:mm');
                        }
                    },
                    {
                        label: '结束日期', name: 'F_End', width: 130, align: 'left',
                        formatter: function (cellvalue) {
                            return NSAYC.formatDate(cellvalue, 'yyyy-MM-dd hh:mm');
                        }
                    },
                    { label: "请假理由", name: "F_Reason", width: 400, align: "left" }

                ],
                mainId: 'F_Id',
                reloadSelected: true,
                isPage: true,
                sidx: 'F_CreateDate'
            });
            page.search();
        },
        search: function () {
            $('#girdtable').jfGridSet('reload');
        }
    };

    // 保存数据后回调刷新
    refreshGirdData = function (res, postData) {
        if (res.code == 200)
        {
            // 发起流程
            NSAYC.workflowapi.create({
                isNew: true,
                schemeCode: 'wf00003',
                processId: processId,
                processName: '请假流程',
                processLevel: '1',
                description: '发起请假',
                formData: JSON.stringify(postData),
                callback: function (res, data) {
                }
            });

            console.log(res, processId);
            page.search();
        }

     
    }

    page.init();
}


