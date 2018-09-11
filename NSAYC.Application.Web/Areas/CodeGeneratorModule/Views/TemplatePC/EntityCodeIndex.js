﻿/*
 * 版 本 NSAYCFrameWork V1.1.0 爱养车开发框架(http://www.NSAYC.cn)
 * Copyright (c) 2013-2017 广州市爱养车汽车服务有限公司
 * 创建人：爱养车-前端开发组
 * 日 期：2017.04.05
 * 描 述：生成实体类和映射类	
 */
var bootstrap = function ($, learun) {
    "use strict";
    var databaseLinkId = '';

    var rootDirectory = $('#rootDirectory').val();
    var postData = {};
    var page = {
        init: function () {
            page.bind();
        },
        /*绑定事件和初始化控件*/
        bind: function () {
            // 加载导向
            $('#wizard').wizard().on('change', function (e, data) {
                var $finish = $("#btn_finish");
                var $next = $("#btn_next");
                if (data.direction == "next") {
                    if (data.step == 1) {
                        var dbTable = $('#dbtablegird').jfGridValue('name');
                        if (dbTable == '') {
                            NSAYC.alert.error('请选择数据表');
                            return false;
                        }
                    }
                    else if (data.step == 2) {
                        if (!$('#step-2').lrValidform()) {
                            return false;
                        }
                        var formData = $('#step-2').lrGetFormData();

                        postData = {
                            databaseLinkId: databaseLinkId,
                            tableNames: $('#dbtablegird').jfGridValue('name'),
                            name: formData.name,
                            describe: formData.describe,
                            backArea: formData.outputArea,
                            mapping: formData.outputArea,
                            mappingDirectory: $('#mappingDirectory').val(),
                            serviceDirectory: $('#serviceDirectory').val()
                        };
                        NSAYC.httpAsyncPost(top.$.rootUrl + '/CodeGeneratorModule/TemplatePC/LookEntityCode', postData, function (res) {
                            if (res.code == 200) {
                                $.each(res.data, function (id, item) {
                                    $('#' + id).html('<textarea name="SyntaxHighlighter" class="brush: c-sharp;">' + item + '</textarea>');
                                });
                                SyntaxHighlighter.highlight();
                            }
                        });
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

            // 数据表选择
            $('#dbId').lrselect({
                url: top.$.rootUrl + '/SystemModule/DatabaseLink/GetTreeList',
                type: 'tree',
                placeholder: '请选择数据库',
                allowSearch: true,
                select: function (item) {
                    if (item.hasChildren) {
                        databaseLinkId = '';
                        $('#dbtablegird').jfGridSet('refreshdata', { rowdatas: [] });
                    }
                    else if (dbId != item.id) {
                        databaseLinkId = item.id;
                        page.dbTableSearch();
                    }
                }
            });

            // 查询按钮
            $('#btn_Search').on('click', function () {
                var keyword = $('#txt_Keyword').val();
                page.dbTableSearch({ tableName: keyword });
            });

            $('#dbtablegird').jfGrid({
                url: top.$.rootUrl + '/SystemModule/DatabaseTable/GetList',
                headData: [
                    { label: "表名", name: "name", width: 300, align: "left" },
                    {
                        label: "记录数", name: "sumrows", width: 100, align: "center",
                        formatter: function (cellvalue) {
                            return cellvalue + "条";
                        }
                    },
                    { label: "使用大小", name: "reserved", width: 100, align: "center" },
                    { label: "索引使用大小", name: "index_size", width: 120, align: "center" },
                    { label: "说明", name: "tdescription", width: 350, align: "left" }
                ],

                isMultiselect: true,
                mainId: 'name',
                isSubGrid: true,             // 是否有子表
                subGridRowExpanded: function (subid, rowdata) {
                    $('#' + subid).jfGrid({
                        url: top.$.rootUrl + '/SystemModule/DatabaseTable/GetFieldList',
                        headData: [
                            { label: "列名", name: "f_column", width: 300, align: "left" },
                            { label: "数据类型", name: "f_datatype", width: 120, align: "center" },
                            { label: "长度", name: "f_length", width: 57, align: "center" },
                            {
                                label: "允许空", name: "f_isnullable", width: 50, align: "center",
                                formatter: function (cellvalue) {
                                    return cellvalue == 1 ? "<i class=\"fa fa-toggle-on\"></i>" : "<i class=\"fa fa-toggle-off\"></i>";
                                }
                            },
                            {
                                label: "标识", name: "f_identity", width: 58, align: "center",
                                formatter: function (cellvalue) {
                                    return cellvalue == 1 ? "<i class=\"fa fa-toggle-on\"></i>" : "<i class=\"fa fa-toggle-off\"></i>";
                                }
                            },
                            {
                                label: "主键", name: "f_key", width: 50, align: "center",
                                formatter: function (cellvalue) {
                                    return cellvalue == 1 ? "<i class=\"fa fa-toggle-on\"></i>" : "<i class=\"fa fa-toggle-off\"></i>";
                                }
                            },
                            { label: "默认值", name: "f_default", width: 120, align: "center" },
                            { label: "说明", name: "f_remark", width: 200, align: "left" }
                        ]
                    });
                    $('#' + subid).jfGridSet('reload', { param: { databaseLinkId: databaseLinkId, tableName: rowdata.name } });
                }// 子表展开后调用函数
            });
            // 基础信息配置
            var loginInfo = NSAYC.clientdata.get(['userinfo']);
            $('#createUser').val(loginInfo.realName);
            $('#outputArea').lrDataItemSelect({ code: 'outputArea' });

            $('#mappingDirectory').val(rootDirectory + $('#_mappingDirectory').val());
            $('#serviceDirectory').val(rootDirectory + $('#_serviceDirectory').val());

            // 代码查看
            $('#nav_tabs').lrFormTabEx();
            $('#tab_content>div').mCustomScrollbar({ // 优化滚动条
                theme: "minimal-dark"
            });

            // 保存数据按钮
            $("#btn_finish").on('click', page.save);
        },
        dbTableSearch: function (param) {
            param = param || {};
            param.databaseLinkId = databaseLinkId;
            $('#dbtablegird').jfGridSet('reload', { param: param });
        },
        /*保存数据*/
        save: function () {
            $.lrSaveForm(top.$.rootUrl + '/CodeGeneratorModule/TemplatePC/CreateEntityCode', postData, function (res) { });
        }
    };

    page.init();
}