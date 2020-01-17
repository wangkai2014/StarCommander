using System;
using System.Collections.Generic;
using StarCommander.Domain;
using StarCommander.Domain.Players;
using StarCommander.Shared.Model.Payload;

namespace StarCommander.Application
{
	public static class NotificationRegistry
	{
		static readonly Dictionary<Type, Type> P = new Dictionary<Type, Type>();
		public static readonly IReadOnlyDictionary<Type, Type> Player = P;

		static NotificationRegistry()
		{
			AddPlayer<CaptainBoarded, OnCaptainBoarded>();
			AddPlayer<PlayerNameChanged, OnPlayerNameChanged>();
		}

		static void AddPlayer<TU, TV>() where TU : INotifyPlayer
		{
			P.Add(typeof(TU), typeof(TV));
		}
	}
}