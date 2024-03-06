using System;
using System.Collections.Generic;
using System.Text;

namespace SocialNetwork.Data.Common.Contracts
{
    public interface IDeletableEntity
    {
        bool IsDeleted { get; set; }

        DateTime? DeletedOn { get; set; }
    }
}
