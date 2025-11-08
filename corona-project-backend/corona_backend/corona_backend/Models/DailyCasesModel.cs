namespace corona_backend.Models
{
    public class DailyCasesModel
    {
        public string Date { get; set; }
        public int DailyNewCases { get; set; }
        public int SevenDaysAverage { get; set; }
        public int CumulativeConfirmedNewCases  { get; set; }
    }
}
