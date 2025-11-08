import { Injectable } from '@angular/core';
import { BackendService } from '../backend.service';
import { graphsModel } from '../../models/graphsModel';
import { BehaviorSubject, Observable } from 'rxjs';
import { dailyCasesModel } from '../../models/dailyCasesModel';
import { sevenDaysCasesAverageModel } from '../../models/sevenDaysCasesAverageModel';

@Injectable({
  providedIn: 'root'
})
export class GraphsService {


  constructor(private backendService: BackendService)
  {
  
  }

  private _graphs: BehaviorSubject<graphsModel> = new BehaviorSubject<graphsModel>({sevenDaysCasesAverage: [], dailyCases: []})
  graphs$: Observable<graphsModel> = this._graphs.asObservable();
  updateDailyCasesOfGraphs(newDailyCases: dailyCasesModel[])
  {
    const currentValue = this._graphs.value;
    const updatedValue = {
      ...currentValue,
      dailyCases: newDailyCases
    };
    this._graphs.next(updatedValue);
  };

  updateSevenDaysAveOfGraphs(newSevenDaysAve: sevenDaysCasesAverageModel[])
  {
    const currentValue = this._graphs.value;
    const updatedValue = {
      ...currentValue,
      sevenDaysCasesAverage: newSevenDaysAve
    };
    this._graphs.next(updatedValue);
  };


  loadGraphs() {
    this.backendService.upload().subscribe(response => {
      console.log('UPLOAD RESPONSE:', response);
      this.backendService.getSevenDaysAverage().subscribe(
        (Res) => {
          this.updateSevenDaysAveOfGraphs(Res);
        }
      );

      this.backendService.get30LastDays().subscribe(
        (res) => {
          this.updateDailyCasesOfGraphs(res);
        }
      );
    });
  }
}
