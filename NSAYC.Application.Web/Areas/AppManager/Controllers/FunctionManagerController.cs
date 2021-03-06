﻿using NSAYC.Application.AppMagager;
using NSAYC.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NSAYC.Application.Web.Areas.AppManager.Controllers
{
    
    public class FunctionManagerController : MvcControllerBase
    {
        private FunctionIBLL functionIBLL = new FunctionBLL();


        #region 视图功能
        /// <summary>
        /// 管理页面
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// 表单页面
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult Form()
        {
            return View();
        }
        #endregion

        #region 获取数据
        /// <summary>
        /// 获取分页数据
        /// </summary>
        /// <param name="pagination">分页参数</param>
        /// <param name="keyword">关键字</param>
        /// <param name="type">类型</param>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetPageList(string pagination, string keyword, string type)
        {
            Pagination paginationobj = pagination.ToObject<Pagination>();
            var data = functionIBLL.GetPageList(paginationobj, keyword, type);
            var jsonData = new
            {
                rows = data,
                total = paginationobj.total,
                page = paginationobj.page,
                records = paginationobj.records,
            };
            return Success(jsonData);
        }
        /// <summary>
        /// 获取表单数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        [HttpGet]
        [AjaxOnly]
        public ActionResult GetForm(string keyValue) {

            FunctionEntity entity = functionIBLL.GetEntity(keyValue);
            FunctionSchemeEntity schemeEntity = functionIBLL.GetScheme(entity.F_SchemeId);

            var jsonData = new {
                entity= entity,
                schemeEntity= schemeEntity
            };
            return Success(jsonData);
        }

        #endregion

        #region 提交数据

        /// <summary>
        /// 删除表单数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        [HttpPost]
        [AjaxOnly]
        public ActionResult DeleteForm(string keyValue)
        {
            functionIBLL.Delete(keyValue);
            return Success("删除成功！");
        }
        /// <summary>
        /// 保存表单数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <param name="strEntity">实体对象字串</param>
        /// <param name="strSchemeEntity">模板实体对象字串</param>
        /// <returns></returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        [AjaxOnly]
        public ActionResult SaveForm(string keyValue, string strEntity, string strSchemeEntity)
        {
            FunctionEntity entity = strEntity.ToObject<FunctionEntity>();
            FunctionSchemeEntity schemeEntity = strSchemeEntity.ToObject<FunctionSchemeEntity>();
            functionIBLL.SaveEntity(keyValue, entity, schemeEntity);
            return Success("保存成功！");
        }

        /// <summary>
        /// 启用/停用表单
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <param name="state">状态1启用0禁用</param>
        /// <returns></returns>
        [HttpPost]
        [AjaxOnly]
        public ActionResult UpDateSate(string keyValue, int state)
        {
            functionIBLL.UpdateState(keyValue, state);
            return Success((state == 1 ? "启用" : "禁用") + "成功！");
        }
        #endregion
    }
}