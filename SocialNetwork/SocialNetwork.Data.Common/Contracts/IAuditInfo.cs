using System;
using System.Collections.Generic;
using System.Text;

namespace SocialNetwork.Data.Common.Contracts
{
    public interface IAuditInfo
    {
        DateTime CreatedOn { get; set; }

        DateTime? ModifiedOn { get; set; }
    }
}
