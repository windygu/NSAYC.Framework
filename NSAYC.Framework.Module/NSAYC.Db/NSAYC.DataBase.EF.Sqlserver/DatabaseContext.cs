﻿using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Migrations;
using System.Data.Entity.ModelConfiguration;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;

namespace NSAYC.DataBase.SqlServer
{
    /// <summary>
    /// 版 本 NSAYCFrameWork V1.1.0 爱养车开发框架
    /// Copyright (c) 2013-2017 广州市爱养车汽车服务有限公司
    /// 创建人：爱养车-框架开发组
    /// 日 期：2017.03.04
    /// 描 述：数据访问(SqlServer) 上下文
    /// </summary>
    public class DatabaseContext : DbContext, IDisposable, IObjectContextAdapter
    {
        #region 构造函数
        /// <summary>
        /// 初始化一个 使用指定数据连接名称或连接串 的数据访问上下文类 的新实例
        /// </summary>
        /// <param name="connString">连接字串</param>
        public DatabaseContext(string connString)
            : base(new SqlConnection(connString), true)
        {
            this.Configuration.AutoDetectChangesEnabled = false;
            this.Configuration.ValidateOnSaveEnabled = false;
            this.Configuration.LazyLoadingEnabled = false;
            this.Configuration.ProxyCreationEnabled = false; 
        }
        #endregion

        #region 重载
        /// <summary>
        /// 模型创建重载
        /// </summary>
        /// <param name="modelBuilder">模型创建器</param>
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            System.Data.Entity.Database.SetInitializer<DatabaseContext>(null);  

            string assembleFileName = Assembly.GetExecutingAssembly().CodeBase.Replace("NSAYC.DataBase.SqlServer.DLL", "NSAYC.Application.Mapping.DLL").Replace("file:///", "");
            Assembly asm = Assembly.LoadFile(assembleFileName);
            var typesToRegister = asm.GetTypes()
            .Where(type => !String.IsNullOrEmpty(type.Namespace))
            .Where(type => type.BaseType != null && type.BaseType.IsGenericType && type.BaseType.GetGenericTypeDefinition() == typeof(EntityTypeConfiguration<>));
            foreach (var type in typesToRegister)
            {
                dynamic configurationInstance = Activator.CreateInstance(type);
                modelBuilder.Configurations.Add(configurationInstance);
            }
            base.OnModelCreating(modelBuilder);
        }
        #endregion
    }
}
