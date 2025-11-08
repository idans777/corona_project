using corona_backend.Models;
using OfficeOpenXml;

namespace corona_backend.Repositories
{
    public class GraphsRepository : IGraphsRepository
    {
        private readonly GraphsModel _data = new();
        //private readonly IWebHostEnvironment _env;

        //public GraphsRepository(IWebHostEnvironment env)
        //{
            //_env = env;
        //}

        public async Task<GraphsModel> ReadExcelAsync()
        {
            ExcelPackage.License.SetNonCommercialPersonal("<My Name>");

            //var folderPath = Path.Combine(_env.ContentRootPath, "Service");
            var folderPath = @"C:\Talpiot\Corona-project\ExcelFiles";
            var filePaths = Directory.GetFiles(folderPath, "*.xlsx");

            foreach (var filePath in filePaths)
            {
                using var stream = new MemoryStream(await File.ReadAllBytesAsync(filePath));
                using var package = new ExcelPackage(stream);
                var worksheet = package.Workbook.Worksheets.First();

                if (IsGraph1Worksheet(worksheet))
                    ReadGraph1(worksheet);
                else if (IsGraph2Worksheet(worksheet))
                    ReadGraph2(worksheet);
            }
            return _data;
        }

        public List<SevenDaysCasesAverageModel> GetSevenDaysCasesAverageGraph()
        {
            return _data.SevenDaysCasesAverage;
        }
        public List<DailyCasesModel> GetDailyCasesAll()
        {
            return _data.DailyCases;
        }

        public List<DailyCasesModel> GetDailyCasesLast30Days()
        {
            var result = new List<DailyCasesModel>();

            for(var i = _data.DailyCases.Count - 1; i >= _data.DailyCases.Count - 30; i--)
            {
                result.Add(_data.DailyCases[i]);
            }

            return result;
        }

        public List<DailyCasesModel> GetDailyCasesLast3Months()
        {
            var result = new List<DailyCasesModel>();

            int i = _data.DailyCases.Count - 1;
            string dateStr = _data.DailyCases[i].Date.ToString();
            DateTime date = DateTime.ParseExact(dateStr, "dd-MM-yyyy", null);
            int month = date.Month;
            int day = date.Day;

            string indexDateStr;
            DateTime indexDate;
            int indexMonth;
            int indexDay;

            while (true)
            {
                if(i == _data.DailyCases.Count - 1)
                {
                    indexDateStr = dateStr;
                    indexDate = date;
                    indexMonth = month;
                    indexDay = day;
                }
                else
                {
                    indexDateStr = _data.DailyCases[i].Date.ToString();
                    indexDate = DateTime.ParseExact(indexDateStr, "dd-MM-yyyy", null);
                    indexMonth = indexDate.Month;
                    indexDay = indexDate.Day;
                }

                if((month - indexMonth + 12) % 12 == 3 && day > indexDay)
                {
                    break;
                }

                result.Add(_data.DailyCases[i]);

                i--;
            }

            return result;
        }

        public List<DailyCasesModel> GetDailyCasesLast6Months()
        {
            var result = new List<DailyCasesModel>();

            int i = _data.DailyCases.Count - 1;
            string dateStr = _data.DailyCases[i].Date.ToString();
            DateTime date = DateTime.ParseExact(dateStr, "dd-MM-yyyy", null);
            int month = date.Month;
            int day = date.Day;

            string indexDateStr;
            DateTime indexDate;
            int indexMonth;
            int indexDay;

            while (true)
            {
                if (i == _data.DailyCases.Count - 1)
                {
                    indexDateStr = dateStr;
                    indexDate = date;
                    indexMonth = month;
                    indexDay = day;
                }
                else
                {
                    indexDateStr = _data.DailyCases[i].Date.ToString();
                    indexDate = DateTime.ParseExact(indexDateStr, "dd-MM-yyyy", null);
                    indexMonth = indexDate.Month;
                    indexDay = indexDate.Day;
                }

                if ((month - indexMonth + 12) % 12 == 6 && day > indexDay)
                {
                    break;
                }

                result.Add(_data.DailyCases[i]);

                i--;
            }

            return result;
        }

        public List<DailyCasesModel> GetDailyCasesLastYear()
        {
            var result = new List<DailyCasesModel>();

            int i = _data.DailyCases.Count - 1;
            string dateStr = _data.DailyCases[i].Date.ToString();
            DateTime date = DateTime.ParseExact(dateStr, "dd-MM-yyyy", null);
            int month = date.Month;
            int day = date.Day;
            int year = date.Year;

            string indexDateStr;
            DateTime indexDate;
            int indexMonth;
            int indexDay;
            int indexYear;

            while (true)
            {
                if (i == _data.DailyCases.Count - 1)
                {
                    indexDateStr = dateStr;
                    indexDate = date;
                    indexMonth = month;
                    indexDay = day;
                    indexYear = year;
                }
                else
                {
                    indexDateStr = _data.DailyCases[i].Date.ToString();
                    indexDate = DateTime.ParseExact(indexDateStr, "dd-MM-yyyy", null);
                    indexMonth = indexDate.Month;
                    indexDay = indexDate.Day;
                    indexYear = indexDate.Year;
                }

                if (year - indexYear == 1 && month == indexMonth && day > indexDay)
                {
                    break;
                }

                result.Add(_data.DailyCases[i]);

                i--;
            }

            return result;
        }




        private bool IsGraph1Worksheet(ExcelWorksheet ws)
        {
            return ws.Cells[2, 1].Text.Contains("Date") && ws.Cells[2, 2].Text.Contains("Confirmed cases average");
        }
        private bool IsGraph2Worksheet(ExcelWorksheet ws)
        {
            return ws.Cells[1, 1].Text.Contains("Daily Cases");
        }

        private void ReadGraph1(ExcelWorksheet ws)
        {
            _data.SevenDaysCasesAverage = new List<SevenDaysCasesAverageModel>();
            for (int row = 3; row <= ws.Dimension.Rows; row++)
            {
                string weekRange = ws.Cells[row, 1].Text;
                string confirmedCasesAverage = ws.Cells[row, 2].Text;

                if (!string.IsNullOrEmpty(weekRange) && int.TryParse(confirmedCasesAverage, out int average))
                {
                    _data.SevenDaysCasesAverage.Add(new SevenDaysCasesAverageModel
                    {
                        Date = weekRange,
                        ConfirmedCasesAverage = average
                    });
                }
            }
        }
        private void ReadGraph2(ExcelWorksheet ws)
        {
            _data.DailyCases = new List<DailyCasesModel>();
            for (int row = 3; row <= ws.Dimension.Rows; row++)
            {
                string Date = ws.Cells[row, 1].Text;
                string dailyNewCases = ws.Cells[row, 2].Text;
                string sevenDaysAverage = ws.Cells[row, 3].Text;
                string cumulativeConfirmedNewCases = ws.Cells[row, 4].Text;


                if (!string.IsNullOrEmpty(Date) && int.TryParse(dailyNewCases, out int _dailyNewCases)
                    && int.TryParse(sevenDaysAverage, out int _sevenDaysAverage)
                    && int.TryParse(cumulativeConfirmedNewCases, out int _cumulativeConfirmedNewCases))
                {
                    _data.DailyCases.Add(new DailyCasesModel
                    {
                        Date = Date,
                        DailyNewCases = _dailyNewCases,
                        SevenDaysAverage = _sevenDaysAverage,
                        CumulativeConfirmedNewCases = _cumulativeConfirmedNewCases
                    });
                }
            }
        }

    }
}
