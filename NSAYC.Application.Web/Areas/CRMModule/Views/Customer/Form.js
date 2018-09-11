﻿/*
 * 版 本 NSAYCFrameWork V1.1.0 爱养车开发框架(http://www.NSAYC.cn)
 * Copyright (c) 2013-2017 广州市爱养车汽车服务有限公司
 * 创建人：爱养车-前端开发组
 * 日 期：2017.04.18
 * 描 述：公司管理	
 */

var acceptClick;
var keyValue = '';
var bootstrap = function ($, learun) {
    "use strict";
    var selectedRow = NSAYC.frameTab.currentIframe().selectedRow;
    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            // 客户级别
            $('#F_CustLevelId').lrDataItemSelect({ code: 'Client_Level', maxHeight: 230 });
            // 客户类别
            $('#F_CustTypeId').lrDataItemSelect({ code: 'Client_Sort', maxHeight: 230 });
            // 客户程度
            $('#F_CustDegreeId').lrDataItemSelect({ code: 'Client_Degree', maxHeight: 230 });
            //跟进人员
            $('#F_TraceUserId').lrformselect({
                layerUrl: top.$.rootUrl + '/OrganizationModule/User/SelectForm',
                layerUrlW: 800,
                layerUrlH: 520,
                dataUrl: top.$.rootUrl + '/OrganizationModule/User/GetListByUserIds'
            });
            //公司行业
            $('#F_CustIndustryId').lrDataItemSelect({ code: 'Client_Trade', maxHeight: 230 });


        },
        initData: function () {
            if (!!selectedRow) {
                keyValue = selectedRow.F_CustomerId;
                $('#form').lrSetFormData(selectedRow);
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').lrValidform()) {
            return false;
        }
        var postData = $('#form').lrGetFormData(keyValue);
        postData["F_TraceUserName"] = $("#TraceUserId").attr('data-text');
        $.lrSaveForm(top.$.rootUrl + '/CRMModule/Customer/SaveForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();
}