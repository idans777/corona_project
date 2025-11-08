namespace corona_backend.Models
{
    public class GraphsModel
    {
        public List<SevenDaysCasesAverageModel> SevenDaysCasesAverage { get; set; }

        public List<DailyCasesModel> DailyCases {  get; set; }
    }
}
