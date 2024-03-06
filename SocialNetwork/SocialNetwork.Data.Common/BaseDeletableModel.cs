namespace SocialNetwork.Data.Common
{
    using System;

    using SocialNetwork.Data.Common.Contracts;

    public abstract class BaseDeletableModel<Tkey> : BaseModel<Tkey>, IDeletableEntity
    {
        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }
    }
}
