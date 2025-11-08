using corona_backend.Models;

namespace corona_backend.Repositories
{
    public interface IGraphsRepository
    {
        Task<GraphsModel> ReadExcelAsync();

        List<SevenDaysCasesAverageModel> GetSevenDaysCasesAverageGraph();

        List<DailyCasesModel> GetDailyCasesLast30Days();

        List<DailyCasesModel> GetDailyCasesAll();

        List<DailyCasesModel> GetDailyCasesLast3Months();

        List<DailyCasesModel> GetDailyCasesLast6Months();

        List<DailyCasesModel> GetDailyCasesLastYear();
    }
}
