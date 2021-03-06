﻿
using System.Collections.Generic;
namespace NSAYC.Application.WorkFlow
{
    /// <summary>
    /// 版 本 NSAYCFrameWork V1.1.0 爱养车开发框架
    /// Copyright (c) 2013-2017 广州市爱养车汽车服务有限公司
    /// 创建人：爱养车-框架开发组
    /// 日 期：2017.04.17
    /// 描 述：流程引擎返回结果数据
    /// </summary>
    public class WfResult
    {
        /// <summary>
        /// 状态:1-成功，2-失败
        /// </summary>
        public int status { get; set; }
        /// <summary>
        /// 说明
        /// </summary>
        public string desc { get; set; }
    }
    /// <summary>
    /// 版 本 NSAYCFrameWork V1.1.0 爱养车开发框架
    /// Copyright (c) 2013-2017 广州市爱养车汽车服务有限公司
    /// 创建人：爱养车-框架开发组
    /// 日 期：2017.04.17
    /// 描 述：流程引擎返回结果数据
    /// </summary>
    public class WfResult<T> where T : class
    {
        /// <summary>
        /// 状态:1-成功，2-失败
        /// </summary>
        public int status { get; set; }
        /// <summary>
        /// 说明
        /// </summary>
        public string desc { get; set; }
        /// <summary>
        /// 数据
        /// </summary>
        public T data { get; set; }
    }

    /// <summary>
    /// 版 本 NSAYCFrameWork V1.1.0 爱养车开发框架
    /// Copyright (c) 2013-2017 广州市爱养车汽车服务有限公司
    /// 创建人：爱养车-框架开发组
    /// 日 期：2017.04.17
    /// 描 述：流程引擎返回的数据内容
    /// </summary>
    public class WfContent {
        /// <summary>
        /// 当前节点信息
        /// </summary>
        public WfNodeInfo currentNode { get; set; }
        /// <summary>
        /// 当前正在执行的任务节点ID数据
        /// </summary>
        public List<string> currentNodeIds { get; set; }
        /// <summary>
        /// 流程模板信息
        /// </summary>
        public string scheme { get; set; }
        /// <summary>
        /// 审核记录
        /// </summary>
        public List<WfTaskHistoryEntity> history { get; set; } 
    }
}
