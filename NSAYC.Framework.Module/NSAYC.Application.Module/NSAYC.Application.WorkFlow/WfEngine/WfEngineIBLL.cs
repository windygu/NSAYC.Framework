﻿
using NSAYC.Util;
using System.Collections.Generic;
namespace NSAYC.Application.WorkFlow
{
    /// <summary>
    /// 版 本 NSAYCFrameWork V1.1.0 爱养车开发框架
    /// Copyright (c) 2013-2017 广州市爱养车汽车服务有限公司
    /// 创建人：爱养车-框架开发组
    /// 日 期：2017.04.17
    /// 描 述：工作流引擎接口
    /// </summary>
    public interface WfEngineIBLL
    {
         /// <summary>
        /// 流程发起初始化接口
        /// </summary>
        /// <param name="parameter">流程参数</param>
        /// <returns></returns>
        WfResult<WfContent> Bootstraper(WfParameter parameter);
        /// <summary>
        /// 获取某个任务节点的信息
        /// </summary>
        /// <param name="parameter">流程参数</param>
        /// <returns></returns>
        WfResult<WfContent> GetTaskInfo(WfParameter parameter);
        /// <summary>
        /// 获取流程实例信息
        /// </summary>
        /// <param name="parameter">流程参数</param>
        /// <returns></returns>
        WfResult<WfContent> GetProcessInfo(WfParameter parameter);
        /// <summary>
        /// 创建流程实例
        /// </summary>
        /// <param name="parameter">流程参数</param>
        /// <returns></returns>
        WfResult Create(WfParameter parameter);
        /// <summary>
        /// 审核流程节点
        /// </summary>
        /// <param name="parameter">流程参数</param>
        /// <returns></returns>
        WfResult Audit(WfParameter parameter);

        /// <summary>
        /// 获取下一个节点审核者信息
        /// </summary>
        /// <param name="parameter"></param>
        /// <returns></returns>
        WfResult<List<object>> GetAuditer(WfParameter parameter);
        }
}
