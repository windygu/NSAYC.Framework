﻿using NSAYC.Application.WorkFlow;
using System.Data.Entity.ModelConfiguration;

namespace NSAYC.Application.Mapping
{
    /// <summary>
    /// 版 本 NSAYCFrameWork V1.1.0 爱养车开发框架
    /// Copyright (c) 2013-2017 广州市爱养车汽车服务有限公司
    /// 创建人：爱养车-框架开发组
    /// 日 期：2017.04.17
    /// 描 述：工作流委托规则与工作流模板关联规则
    /// </summary>
    public class WfDelegateRuleRelationMap : EntityTypeConfiguration<WfDelegateRuleRelationEntity>
    {
        public WfDelegateRuleRelationMap()
        {
            #region 表、主键
            //表
            this.ToTable("LR_WF_DELEGATERULERELATION");
            //主键
            this.HasKey(t => t.F_Id);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}