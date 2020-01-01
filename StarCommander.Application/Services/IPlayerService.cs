using System.Threading.Tasks;
using StarCommander.Shared.Model;

namespace StarCommander.Application.Services
{
	public interface IPlayerService
	{
		Task<Session> SignUp(string callSign, string firstName, string lastName);
	}
}