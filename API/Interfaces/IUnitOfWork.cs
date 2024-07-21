namespace API.Interfaces
{

    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        IMesageRepository MesageRepository { get; }
        ILikesRepository LikesRepository { get; }
        Task<bool> Complete();
        bool HasChanges();
    }

}
