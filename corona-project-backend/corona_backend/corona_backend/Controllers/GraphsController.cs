using corona_backend.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace corona_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GraphsController : ControllerBase
    {
        private readonly IGraphsRepository _graphsRepository;

        public GraphsController(IGraphsRepository graphsRepository)
        {
            _graphsRepository = graphsRepository;
        }

        [HttpPost("")]
        public async Task<IActionResult> Upload()
        {
            var data = await _graphsRepository.ReadExcelAsync();
            return Ok(data);
        }

        [HttpGet("")]
        public async Task<IActionResult> GetSevenDaysCasesAverageGraph()
        {
            var result = _graphsRepository.GetSevenDaysCasesAverageGraph();
            return Ok(result);
        }

        [HttpGet("DailyCases30Days")]
        public async Task<IActionResult> GetDailyCasesLast30Days()
        {
            var result = _graphsRepository.GetDailyCasesLast30Days();
            return Ok(result);
        }

        [HttpGet("DailyCasesAll")]
        public async Task<IActionResult> GetDailyCasesAll()
        {
            var result = _graphsRepository.GetDailyCasesAll();
            return Ok(result);
        }

        [HttpGet("DailyCases3Months")]
        public async Task<IActionResult> GetDailyCasesLast3Months()
        {
            var result = _graphsRepository.GetDailyCasesLast3Months();
            return Ok(result);
        }

        [HttpGet("DailyCases6Months")]
        public async Task<IActionResult> GetDailyCasesLast6Months()
        {
            var result = _graphsRepository.GetDailyCasesLast6Months();
            return Ok(result);
        }

        [HttpGet("DailyCases1Year")]
        public async Task<IActionResult> GetDailyCasesLastYear()
        {
            var result = _graphsRepository.GetDailyCasesLastYear();
            return Ok(result);
        }
    }
}
