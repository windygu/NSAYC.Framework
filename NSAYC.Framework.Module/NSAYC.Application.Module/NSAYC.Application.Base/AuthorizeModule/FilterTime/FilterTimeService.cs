﻿using NSAYC.DataBase.Repository;
using NSAYC.Util;
using System;
using System.Collections.Generic;
using System.Linq;

namespace NSAYC.Application.Base.AuthorizeModule
{
    /// <summary>
    /// 版 本 NSAYCFrameWork V1.1.0 爱养车开发框架
    /// Copyright (c) 2013-2017 广州市爱养车汽车服务有限公司
    /// 创建人：爱养车-框架开发组
    /// 日 期：2017.04.17
    /// 描 述：时段过滤
    /// </summary>
    public class FilterTimeService : RepositoryFactory
    {
        #region 获取数据
        /// <summary>
        /// 过滤时段实体
        /// </summary>
        /// <param name="keyValue">主键值</param>
        /// <returns></returns>
        public FilterTimeEntity GetEntity(string keyValue)
        {
            try
            {
                return this.BaseRepository().FindEntity<FilterTimeEntity>(keyValue);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowServiceException(ex);
                }
            }
        }
        #endregion

        #region 提交数据
        /// <summary>
        /// 删除过滤时段
        /// </summary>
        /// <param name="keyValue">主键</param>
        public void DeleteEntiy(string keyValue)
        {
            try
            {
                this.BaseRepository().Delete(new FilterTimeEntity { F_FilterTimeId = keyValue });
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowServiceException(ex);
                }
            }
        }
        /// <summary>
        /// 保存过滤时段表单（新增、修改）
        /// </summary>
        /// <param name="keyValue">主键值</param>
        /// <param name="filterTimeEntity">过滤时段实体</param>
        /// <returns></returns>
        public void SaveForm(string keyValue, FilterTimeEntity filterTimeEntity)
        {
            try
            {
                if (!string.IsNullOrEmpty(keyValue))
                {
                    filterTimeEntity.Modify();
                    this.BaseRepository().UpdateEx(filterTimeEntity);
                }
                else
                {
                    filterTimeEntity.Create();
                    this.BaseRepository().Insert(filterTimeEntity);
                }
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowServiceException(ex);
                }
            }
        }
        #endregion
    }
}
