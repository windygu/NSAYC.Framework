﻿/*
 * 版 本 NSAYCFrameWork V1.1.0 爱养车开发框架(http://www.NSAYC.cn)
 * Copyright (c) 2013-2017 广州市爱养车汽车服务有限公司
 * 创建人：爱养车-前端开发组
 * 日 期：2017.04.18
 * 描 述：角色添加	
 */
var flag = request('flag');

var acceptClick;
var auditorName = '';
var bootstrap = function ($, learun) {
    "use strict";
    var page = {
        init: function () {
            page.bind();
        },
        bind: function () {
            $('#auditorId').lrselect({
                url: top.$.rootUrl + '/OrganizationModule/Role/GetList',
                text: 'F_FullName',
                value: 'F_RoleId',
                select: function (item) {
                    auditorName = item.F_FullName;
                },
                maxHeight: 150,
                allowSearch:true
            });
            $('#condition').lrselect({// 限制条件1.同一个部门2.同一个公司
                data: [{ id: '1', text: '同一个部门' }, { id: '2', text: '同一个公司' }]
            });
            if (flag == 1) {
                $('#condition').parent().remove();
            }
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('#form').lrValidform()) {
            return false;
        }
        var formData = $('#form').lrGetFormData();
        formData.auditorName = auditorName;
        formData.type = '2';//审核者类型1.岗位2.角色3.用户
        callBack(formData);
        return true;
    };
    page.init();
}