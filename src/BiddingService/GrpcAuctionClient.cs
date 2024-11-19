using AuctionService;
using BiddingService.Models;
using Grpc.Net.Client;

namespace BiddingService;

public class GrpcAuctionClient(ILogger<GrpcAuctionClient> logger, IConfiguration config)
{
    public Auction GetAuction(string id)
    {
        logger.LogInformation("==> calling Grpc Server");
        var channel = GrpcChannel.ForAddress(config["GrpcAuction"] ?? string.Empty);
        var client = new GrpcAuction.GrpcAuctionClient(channel);
        var request = new GetAuctionRequest
        {
            Id = id
        };
        try
        {
            var reply = client.GetAuction(request);
            var auction = new Auction
            {
                AuctionEnd = DateTime.Parse(reply.Auction.AuctionEnd),
                ID = reply.Auction.Id,
                ReservePrice = reply.Auction.ReservePrice,
                Seller = reply.Auction.Seller
            };
            return auction;
        }
        catch (Exception e)
        {
            logger.LogError(e, "could not call GRPC Server");
            return null;
        }
    }
}