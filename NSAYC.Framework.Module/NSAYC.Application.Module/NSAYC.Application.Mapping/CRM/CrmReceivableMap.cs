using NSAYC.Application.CRM;
using System.Data.Entity.ModelConfiguration;

namespace  NSAYC.Application.Mapping
{
    /// <summary>
    /// �� �� NSAYCFrameWork V1.1.0 �������������
    /// Copyright (c) 2013-2017 �����а����������������޹�˾
    /// �� ������������Ա
    /// �� �ڣ�2017-07-11 14:48
    /// �� ����Ӧ���˿�
    /// </summary>
    public class LR_CRM_ReceivableMap : EntityTypeConfiguration<CrmReceivableEntity>
    {
        public LR_CRM_ReceivableMap()
        {
            #region ��������
            //��
            this.ToTable("LR_CRM_RECEIVABLE");
            //����
            this.HasKey(t => t.F_ReceivableId);
            #endregion

            #region ���ù�ϵ
            #endregion
        }
    }
}
