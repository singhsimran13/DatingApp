using System.Text.Json;
using API.Helpers;

namespace API.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse response, PaginationHeader header)
        {
            var jsonOptions = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

            if (!response.Headers.ContainsKey("Pagination"))
            {
                response.Headers.Add("Pagination", JsonSerializer.Serialize(header, jsonOptions));
            }
            
            if (!response.Headers.ContainsKey("Access-Control-Expose-Headers"))
            {
                response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
            }
        }
    }

}
