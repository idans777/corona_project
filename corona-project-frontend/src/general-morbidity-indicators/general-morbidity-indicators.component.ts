import { Component, OnInit } from '@angular/core';
import { Hospital } from '../models/hospitalModel';
import { CssService } from '../services/css-service/css.service';

@Component({
  selector: 'app-general-morbidity-indicators',
  standalone: false,
  templateUrl: './general-morbidity-indicators.component.html',
  styleUrl: './general-morbidity-indicators.component.scss'
})
export class GeneralMorbidityIndicatorsComponent implements OnInit {

  constructor(private cssService: CssService)
  {

  }

  isOptionsOpen: boolean = false;

  //orderTableBy: string = 'default';

  clickerCountHospital: number = 0;

  clickerCountOverallOccupancy: number = 0;

  clickerCountInternalWardOccupancy: number = 0;

  isTranslateOn!: boolean;


  
  selectedDate = 'Updated to: 06.06.23';
  
  allHospitals!: Hospital[];
  
  filteredHospitals!: Hospital[];

  showDropdown = false;
  selectedHospitalNames: string[] = [];
  tempSelection: string[] = [];

  ngOnInit(): void {
    this.cssService.isTranslateOn$.subscribe(
      (response) => {
        this.isTranslateOn = response

        this.allHospitals = [
          { name: this.isTranslateOn === false ? 'Rabin Medical Center' : 'מרכז רפואי רבין' },
          { name: this.isTranslateOn === false ? 'Soroka' : 'סורוקה' },
          { name: this.isTranslateOn === false ? 'Hadassa' : 'הדסה' },
          { name: this.isTranslateOn === false ? 'Sheba' : 'שיבה' }
        ]

        this.filteredHospitals = this.allHospitals;
      }
    );
  }

  toggleDropdown() {
    this.tempSelection = [...this.selectedHospitalNames];
    this.showDropdown = !this.showDropdown;
  }

  toggleTempHospitalSelection(hospitalName: string) {
    const index = this.tempSelection.indexOf(hospitalName);
    if (index === -1) {
      this.tempSelection.push(hospitalName);
    } else {
      this.tempSelection.splice(index, 1);
    }
  }

  isTempSelected(hospitalName: string): boolean {
    return this.tempSelection.includes(hospitalName);
  }

  confirmSelection() {
    this.selectedHospitalNames = [...this.tempSelection];
    if(this.selectedHospitalNames.length === 0)
    {
      this.filteredHospitals = this.allHospitals;
    }
    else
    {
      this.filteredHospitals = this.allHospitals.filter(h => this.selectedHospitalNames.includes(h.name));
    }

    this.showDropdown = false;
  }

  cancelSelection() {
    this.showDropdown = false;
  }

  // get filteredHospitals(): Hospital[] {
  //   if (this.selectedHospitalNames.length === 0) {
  //     return this.allHospitals;
  //   }
  //   return this.allHospitals.filter(h =>
  //     this.selectedHospitalNames.includes(h.name)
  //   );
  // }

  changeTableOrderHospital()
  {
    this.clickerCountHospital++;
    if(this.clickerCountHospital >= 3)
    {
      this.clickerCountHospital = 0;
    }
    switch(this.clickerCountHospital)
    {
      case 0:
        if(this.selectedHospitalNames.length === 0)
        {
          this.filteredHospitals = this.allHospitals;
        }
        else
        {
          this.filteredHospitals = this.allHospitals.filter(h => this.selectedHospitalNames.includes(h.name));
        }
      break;

      case 1:
        this.filteredHospitals = [...this.filteredHospitals].sort((a, b) => 
          a.name.localeCompare(b.name));
      break;

      case 2:
        this.filteredHospitals = [...this.filteredHospitals].sort((a, b) => 
          b.name.localeCompare(a.name));
      break;
    }
  }

  changeTableOrderOverallOccupancy()
  {
    this.clickerCountOverallOccupancy++;
    if(this.clickerCountOverallOccupancy >= 3)
    {
      this.clickerCountOverallOccupancy = 0;
    }
    switch(this.clickerCountOverallOccupancy)
    {
      case 0:
        if(this.selectedHospitalNames.length === 0)
        {
          this.filteredHospitals = this.allHospitals;
        }
        else
        {
          this.filteredHospitals = this.allHospitals.filter(h => this.selectedHospitalNames.includes(h.name));
        }
      break;

      case 1:
        this.filteredHospitals = [...this.filteredHospitals].sort((a, b) => {
          if (a.overallOccupancy == null && b.overallOccupancy == null) return 0;
          if (a.overallOccupancy == null) return 1;
          if (b.overallOccupancy == null) return -1;
          return b.overallOccupancy - a.overallOccupancy;
        });
      break;

      case 2:
        this.filteredHospitals = [...this.filteredHospitals].sort((a, b) => {
          if (a.overallOccupancy == null && b.overallOccupancy == null) return 0;
          if (a.overallOccupancy == null) return 1;
          if (b.overallOccupancy == null) return -1;
          return a.overallOccupancy - b.overallOccupancy;
        });
      break;
    }
  }

  changeTableOrderInternalWardOccupancy()
  {
    this.clickerCountInternalWardOccupancy++;
    if(this.clickerCountInternalWardOccupancy >= 3)
    {
      this.clickerCountInternalWardOccupancy = 0;
    }
    switch(this.clickerCountInternalWardOccupancy)
    {
      case 0:
        if(this.selectedHospitalNames.length === 0)
        {
          this.filteredHospitals = this.allHospitals;
        }
        else
        {
          this.filteredHospitals = this.allHospitals.filter(h => this.selectedHospitalNames.includes(h.name));
        }
      break;

      case 1:
        //filter by the data big to small
        this.filteredHospitals = [...this.filteredHospitals].sort((a, b) => {
          if (a.internalWardOccupancy == null && b.internalWardOccupancy == null) return 0;
          if (a.internalWardOccupancy == null) return 1;
          if (b.internalWardOccupancy == null) return -1;
          return b.internalWardOccupancy - a.internalWardOccupancy;
        });
      break;

      case 2:
        //filter by the data small to big
        this.filteredHospitals = [...this.filteredHospitals].sort((a, b) => {
          if (a.internalWardOccupancy == null && b.internalWardOccupancy == null) return 0;
          if (a.internalWardOccupancy == null) return 1;
          if (b.internalWardOccupancy == null) return -1;
          return a.internalWardOccupancy - b.internalWardOccupancy;
        });
      break;
    }
  }

  toggleIsOptionOpen()
  {
    this.isOptionsOpen = !this.isOptionsOpen;
  }
}
