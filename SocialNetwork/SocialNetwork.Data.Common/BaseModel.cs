namespace SocialNetwork.Data.Common
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using SocialNetwork.Data.Common.Contracts;

    public class BaseModel<TKey> : IAuditInfo
    {
        public BaseModel()
        {
            this.CreatedOn = DateTime.UtcNow;
        }

        [Key]
        public TKey Id { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }
    }
}