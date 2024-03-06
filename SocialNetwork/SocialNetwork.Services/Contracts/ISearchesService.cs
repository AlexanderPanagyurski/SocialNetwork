namespace SocialNetwork.Services.Contracts
{
    using System.Threading.Tasks;

    public interface ISearchesService
    {
        Task<string[]> SearchesAsync();
    }
}
