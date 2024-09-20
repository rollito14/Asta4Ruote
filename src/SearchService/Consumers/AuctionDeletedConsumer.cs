using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Entities;

namespace SearchService.Consumers;

public class AuctionDeletedConsumer() : IConsumer<AuctionDeleted>
{
    public async Task Consume(ConsumeContext<AuctionDeleted> context)
    {
        Console.WriteLine("--> Consuming auction deleted : " + context.Message.Id);
        var auctionId = context.Message.Id;
        var result = await DB.DeleteAsync<Item>(auctionId);
        if (!result.IsAcknowledged) throw new MessageException(typeof(AuctionDeleted), "Problem Deleting auction");

    }
}