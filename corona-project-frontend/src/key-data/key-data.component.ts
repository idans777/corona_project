import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as echarts from 'echarts';
import { GraphsService } from '../services/graphsService/graphs.service';
import { dailyCasesModel } from '../models/dailyCasesModel';
import { sevenDaysCasesAverageModel } from '../models/sevenDaysCasesAverageModel';
import { BackendService } from '../services/backend.service';
import { CssService } from '../services/css-service/css.service';

@Component({
  selector: 'app-key-data',
  standalone: false,
  templateUrl: './key-data.component.html',
  styleUrl: './key-data.component.scss'
})
export class KeyDataComponent implements OnInit {

  constructor(private fb: FormBuilder, private graphsService: GraphsService, private backendService: BackendService, private cssService: CssService)
  {

  }

  isDarkModeOpen!: boolean;
  isTranslateOn!: boolean;

  sevenDaysAverage!: sevenDaysCasesAverageModel[];
  dailyCases!: dailyCasesModel[];

  chartOptions!: any;
  option!: any;

  selectedPeriod!: string;


  isLinksOpen: boolean = false;

  isOptionsOpenDailyCases: boolean = false;

  isOPtionsOpenSevenDaysAvg: boolean = false;

  isGraphFilterOpen: boolean = false;

  dailyCasesFilterForm!: FormGroup;

  periods!: any[]; 

  

  

  ngOnInit(): void {

    this.cssService.isTranslateOn$.subscribe(
      (response) => {
        this.isTranslateOn = response

        this.selectedPeriod = this.isTranslateOn === false ? 'Last 30 Days' : 'חודש אחרון';
      
        this.periods = [
          { label: this.isTranslateOn === false ? 'Entire Period' : 'עד עכשיו', value: 'entire' },
          { label: this.isTranslateOn === false ? 'Last 1 Year' : 'שנה', value: '1y' },
          { label: this.isTranslateOn === false ? 'Last 6 Months' : '6 חודשים', value: '6m' },
          { label: this.isTranslateOn === false ? 'Last 3 Months' : '3 חודשים', value: '3m' },
          { label: this.isTranslateOn === false ? 'Last 30 Days' : 'חודש אחרון', value: '30d' }
        ];
      }
    );

    this.dailyCasesFilterForm = this.fb.group({
      period: ['30d']
    });

    this.graphsService.loadGraphs();

    

    this.graphsService.graphs$.subscribe(
      (response) => {
        console.log('key-data response:', response);

        this.sevenDaysAverage = response.sevenDaysCasesAverage,
        this.dailyCases = response.dailyCases
        this.initDailyCasesChart();
        this.initSevenDaysAverageChart();
      }
    );
  }

  initDailyCasesChart(): void {

    this.cssService.isDarkModeOn$.subscribe(
      (response) => {
        this.isDarkModeOpen = response;

        this.option = {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['New cases', '7-days Avg.'],
            textStyle: {
              color: this.isDarkModeOpen ? '#fff' : '#000'
            }
          },
          xAxis: {
            type: 'category',
            data: this.dailyCases.map(d => d.date),
            axisLine: {
              lineStyle: {
                color: this.isDarkModeOpen ? '#aaa' : '#333'
              }
            },
          },
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: this.isDarkModeOpen ? '#aaa' : '#333'
              }
            },
          },
          series: [
            {
              name: 'New cases',
              type: 'bar',
              data: this.dailyCases.map(c => c.dailyNewCases),
              itemStyle: {
                color: 'skyblue'
              }
            },
            {
              name: '7-days Avg.',
              type: 'line',
              data: this.dailyCases.map(d => d.sevenDaysAverage),
              itemStyle: {
                color: this.isDarkModeOpen ? 'rgb(252, 197, 55)' : 'rgb(255, 125, 103)'
              },
              smooth: false
            }
          ]
        };
      }
    );

    
  }

  initSevenDaysAverageChart(): void {

    this.cssService.isDarkModeOn$.subscribe(
      (response) => {
        this.isDarkModeOpen = response;

        this.chartOptions = {
          tooltip: {
            trigger: 'axis',
          },
          
          xAxis: {
            type: 'category',
            data: this.sevenDaysAverage.map(d => d.date),
            axisLabel: 
            {
              rotate: 45,
              color: this.isDarkModeOpen ? '#aaa' : '#333'
            }
          },
          yAxis: {
              type: 'value',
              name: 'Average',
              nameTextStyle: {
                color: this.isDarkModeOpen ? '#fff' : '#333'
              },
              min: 0,
              max: 15,
              axisLabel: 
              {
                color: this.isDarkModeOpen ? '#aaa' : '#333'
              }
          },
          series: [
            {
              name: 'Average',
              type: 'line',
              step: 'end',
              data: this.sevenDaysAverage.map(a => a.confirmedCasesAverage),
              label:
              {
                show: true,
                position: 'top',
                color: this.isDarkModeOpen ? '#ddd' : '#333'
              },
              lineStyle:
              {
                color: '#00bfff',
                width: 2
              },
              itemStyle:
              {
                color: '#00bfff'
              }
            }
          ],
          grid:
          {
            left: '10%',
            right: '10%',
            bottom: '15%'
          }
        };
      }
    );
  }

  openGraphFilter()
  {
    this.isGraphFilterOpen = true;
  }

  onOk()
  {
    const formValue = this.dailyCasesFilterForm.value;
  
    this.selectedPeriod = formValue.period;
    console.log('Selected period:', this.selectedPeriod);
  
    switch(formValue.period)
    {
      case '30d':
        this.selectedPeriod = this.isTranslateOn === false ? 'Last 30 Days' : 'חודש אחרון';
        this.dailyCasesFilterForm = this.fb.group({
          period: ['30d']
        });
        this.backendService.get30LastDays().subscribe(
          (response) => {
            this.graphsService.updateDailyCasesOfGraphs(response);
          }
        );
      break;

      case '3m':
        this.selectedPeriod = this.isTranslateOn === false ? 'Last 3 Months' : '3 חודשים';
        this.dailyCasesFilterForm = this.fb.group({
          period: ['3m']
        });
        this.backendService.get3LastMonths().subscribe(
          (response) => {
            this.graphsService.updateDailyCasesOfGraphs(response);
          }
        );
      break;

      case '6m':
        this.selectedPeriod = this.isTranslateOn === false ? 'Last 6 Months' : '6 חודשים';
        this.dailyCasesFilterForm = this.fb.group({
          period: ['6m']
        });
        this.backendService.get6LastMonths().subscribe(
          (response) => {
            this.graphsService.updateDailyCasesOfGraphs(response);
          }
        );
      break;

      case '1y':
        this.selectedPeriod = this.isTranslateOn === false ? 'Last 1 Year' : 'שנה';
        this.dailyCasesFilterForm = this.fb.group({
          period: ['1y']
        });
        this.backendService.getLastYear().subscribe(
          (response) => {
            this.graphsService.updateDailyCasesOfGraphs(response);
          }
        );
      break;

      case 'entire':
        this.selectedPeriod = this.isTranslateOn === false ? 'Entire Period' : 'עד עכשיו';
        this.dailyCasesFilterForm = this.fb.group({
          period: ['entire']
        });
        this.backendService.getEntirePeriod().subscribe(
          (response) => {
            this.graphsService.updateDailyCasesOfGraphs(response);
          }
        );
      break;
    }
    this.isGraphFilterOpen = false;
  }

  onCancel()
  {
    this.isGraphFilterOpen = false;
  }

  toggleIsOptionOpenSevenDaysAvg()
  {
    this.isOPtionsOpenSevenDaysAvg = !this.isOPtionsOpenSevenDaysAvg;
  }

  toggleIsOptionsOpenDailyCases()
  {
    this.isOptionsOpenDailyCases = !this.isOptionsOpenDailyCases;
  }

}
