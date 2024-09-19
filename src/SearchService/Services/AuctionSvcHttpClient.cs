﻿using System.Globalization;
using MongoDB.Entities;
using SearchService.Entities;

namespace SearchService.Services;

public class AuctionSvcHttpClient(HttpClient httpClient, IConfiguration config)
{
    public async Task<List<Item>> GetItemsForSearchDb()
    {
        var lastUpdated = await DB.Find<Item, string>().Sort(x => x.Descending(x => x.UpdatedAt))
            .Project(x => x.UpdatedAt.ToString()).ExecuteFirstAsync();
        return await httpClient.GetFromJsonAsync<List<Item>>(config["AuctionServiceUrl"]
            + "/api/auctions?date=" + lastUpdated);
    }
    
}