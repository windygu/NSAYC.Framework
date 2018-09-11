﻿using NSAYC.Cache.Base;
using NSAYC.Cache.Factory;
using NSAYC.Util;
using System;
using System.Collections.Generic;

namespace NSAYC.Application.Base.AuthorizeModule
{
    /// <summary>
    /// 版 本 NSAYCFrameWork V1.1.0 爱养车开发框架
    /// Copyright (c) 2013-2017 广州市爱养车汽车服务有限公司
    /// 创建人：爱养车-框架开发组
    /// 日 期：2017.04.17
    /// 描 述：授權功能
    /// </summary>
    public class AuthorizeBLL : AuthorizeIBLL
    {
        private AuthorizeService authorizeService = new AuthorizeService();
        private ICache cache = CacheFactory.CaChe();
        private string cacheKey = "learun_adms_authorize_";

        #region 获取数据
        /// <summary>
        /// 获取被授权的功能的主键字串
        /// </summary>
        /// <param name="objectId">对象主键（角色,用户）</param>
        /// <param name="itemType">项目类型:1-菜单2-按钮3-视图</param>
        /// <returns></returns>
        public List<string> GetItemIdList(string objectId, int itemType)
        {
            try
            {
                List<string> reslist;
                reslist = cache.Read<List<string>>(cacheKey + itemType + "_" + objectId, CacheId.authorize);
                if (reslist == null)
                {
                    reslist = new List<string>();
                    var list = authorizeService.GetList(objectId, itemType);
                    foreach (var item in list)
                    {
                        reslist.Add(item.F_ItemId);
                    }
                    cache.Write<List<string>>(cacheKey + itemType + "_" + objectId, reslist, CacheId.authorize);
                }
                return reslist;
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }
        /// <summary>
        /// 获取被授权的功能的主键字串
        /// </summary>
        /// <param name="objectIds">对象主键串（角色,用户）</param>
        /// <param name="itemType">功能类型1菜单功能2按钮3视图列表</param>
        /// <returns></returns>
        public List<string> GetItemIdListByobjectIds(string objectIds, int itemType)
        {
            try
            {
                List<string> reslist = new List<string>();
                string[] objectIdlist = objectIds.Split(',');
                foreach (string objectId in objectIdlist)
                {
                    List<string> r = GetItemIdList(objectId, itemType);
                    reslist.AddRange(r);
                }
                return reslist;
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }
        #endregion

        #region 提交数据
        /// <summary>
        /// 添加授权
        /// </summary>
        /// <param name="objectType">权限分类-1角色2用户</param>
        /// <param name="objectId">对象Id</param>
        /// <param name="moduleIds">功能Id</param>
        /// <param name="moduleButtonIds">按钮Id</param>
        /// <param name="moduleColumnIds">视图Id</param>
        public void SaveAuthorize(int objectType, string objectId, string[] moduleIds, string[] moduleButtonIds, string[] moduleColumnIds)
        {
            try
            {
                authorizeService.SaveAuthorize(objectType, objectId, moduleIds, moduleButtonIds, moduleColumnIds);
                cache.Remove(cacheKey + "1_" + objectId, CacheId.authorize);
                cache.Remove(cacheKey + "2_" + objectId, CacheId.authorize);
                cache.Remove(cacheKey + "3_" + objectId, CacheId.authorize);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }
        #endregion
    }
}
