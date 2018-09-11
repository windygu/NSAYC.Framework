﻿/*
 * 版 本 NSAYCFrameWork V1.1.0 爱养车开发框架(http://www.NSAYC.cn)
 * Copyright (c) 2013-2017 广州市爱养车汽车服务有限公司
 * 创建人：爱养车-前端开发组
 * 日 期：2017.04.18
 * 描 述：表单权限字段导入
 */
var acceptClick;
var fieldName = '';
var bootstrap = function ($, learun) {
    "use strict";
    var page = {
        init: function () {
            page.bind();
        },
        bind: function () {
            $('#FieldId').lrselect({
                placeholder: '请选择字段',
                maxHeight: 80,
                allowSearch: true,
                select: function (item) {
                    fieldName = item.text;
                }
            });

            $('#FormId').lrselect({
                placeholder: '请选择表单',
                text: 'F_Name',
                value: 'F_Id',
                url: top.$.rootUrl + '/FormModule/Custmerform/GetSchemeInfoList',
                maxHeight: 80,
                allowSearch: true,
                select: function (item) {
                    $.lrSetForm(top.$.rootUrl + '/FormModule/Custmerform/GetFormData?keyValue=' + item.F_Id, function (data) {
                        var scheme = JSON.parse(data.schemeEntity.F_Scheme);
                        var fields = [];
                        for (var i = 0, l = scheme.data.length; i < l; i++) {
                            var componts = scheme.data[i].componts;
                            for (var j = 0, jl = componts.length; j < jl; j++) {
                                var compont = componts[j];
                                if (!!compont.title && !!compont.field)
                                {
                                    var point = { text: compont.title, id: compont.id };
                                    fields.push(point);
                                }
                            }
                        }
                        $('#FieldId').lrselectRefresh({ data: fields });
                    });
                }
            });
            $('#lr_preview').on('click', function () {
                var formId = $('#FormId').lrselectGet();
                if (!!formId) {
                    NSAYC.layerForm({
                        id: 'custmerForm_PreviewForm',
                        title: '预览当前表单',
                        url: top.$.rootUrl + '/FormModule/Custmerform/PreviewForm?schemeInfoId=' + formId,
                        width: 800,
                        height: 600,
                        maxmin: true,
                        btn: null
                    });
                }
                else {
                    NSAYC.alert.warning('请选择表单！');
                }
            });
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('.lr-form-wrap').lrValidform()) {
            return false;
        }
        var formData = $('.lr-form-wrap').lrGetFormData();
        formData.fieldName = fieldName;
        callBack(formData);
        return true;
    };
    page.init();
}