import { Component } from '@angular/core';
import { City } from '../models/cityModel';

@Component({
  selector: 'app-community-traffic-light-model',
  standalone: false,
  templateUrl: './community-traffic-light-model.component.html',
  styleUrl: './community-traffic-light-model.component.scss'
})
export class CommunityTrafficLightModelComponent {

  isOptionsOpen: boolean = false;

  clickerCountCityName: number = 0;

  clickerCountColor: number = 0;

  clickerCountNewCasesForEvery10000: number = 0;

  clickerCountPrecentagePositive: number = 0;

  clickerCountConfirmedChange: number = 0;

  clickerCountActiveCases: number = 0;

  colors: string[] = [
    'green', 'yellow', 'orange', 'red', 'black'
  ];

  allCities: City[] = [
    { name: 'Rishon' },
    { name: 'Tel-Aviv', color: 'orange' },
    { name: 'Eilat', color: 'green' },
    { name: 'Haifa' }
  ];

  filteredCities: City[] = this.allCities;
  
  showDropdown = false;
  selectedCitiesNames: string[] = [];
  tempSelection: string[] = [];

  toggleDropdown()
  {
    this.tempSelection = [...this.selectedCitiesNames];
    this.showDropdown = !this.showDropdown;
  }

  toggleTempCitiesSelection(cityName: string)
  {
    const index = this.tempSelection.indexOf(cityName);
    if (index === -1) {
      this.tempSelection.push(cityName);
    } else {
      this.tempSelection.splice(index, 1);
    }
  }

  isTempSelected(cityName: string): boolean
  {
    return this.tempSelection.includes(cityName);
  }

  confirmSelection()
  {
    this.selectedCitiesNames = [...this.tempSelection];
    if(this.selectedCitiesNames.length === 0)
    {
      this.filteredCities = this.allCities;
    }
    else
    {
      this.filteredCities = this.allCities.filter(c => this.selectedCitiesNames.includes(c.name));
    }

    this.showDropdown = false;
  }

  cancelSelection()
  {
    this.showDropdown = false;
  }



  changeTableOrderCity()
  {
    this.clickerCountCityName++;
    if(this.clickerCountCityName >= 3)
    {
      this.clickerCountCityName = 0;
    }
    switch(this.clickerCountCityName)
    {
      case 0:
        if(this.selectedCitiesNames.length === 0)
        {
          this.filteredCities = this.allCities;
        }
        else
        {
          this.filteredCities = this.allCities.filter(h => this.selectedCitiesNames.includes(h.name));
        }
      break;

      case 1:
        this.filteredCities = [...this.filteredCities].sort((a, b) => 
          a.name.localeCompare(b.name));
      break;

      case 2:
        this.filteredCities = [...this.filteredCities].sort((a, b) => 
          b.name.localeCompare(a.name));
      break;
    }
  }

  changeTableOrderColor()
  {

    const colorPriority: Record<string, number> = {
      green: 1,
      yellow: 2,
      orange: 3,
      red: 4
    };

    this.clickerCountColor++;
    if(this.clickerCountColor >= 3)
    {
      this.clickerCountColor = 0;
    }
    switch(this.clickerCountColor)
    {
      case 0:
        if(this.selectedCitiesNames.length === 0)
        {
          this.filteredCities = this.allCities;
        }
        else
        {
          this.filteredCities = this.allCities.filter(h => this.selectedCitiesNames.includes(h.name));
        }
      break;

      case 1:
        this.filteredCities = [...this.filteredCities].sort((a, b) => {
          const aPriority = a.color ? colorPriority[a.color] || 0 : 0;
          const bPriority = b.color ? colorPriority[b.color] || 0 : 0;
          return bPriority - aPriority;
        });
      break;

      case 2:
        this.filteredCities = [...this.filteredCities].sort((a, b) => {
          const aPriority = a.color ? colorPriority[a.color] || 0 : 0;
          const bPriority = b.color ? colorPriority[b.color] || 0 : 0;
          return aPriority - bPriority;
        });
      break;
    }
  }

  changeTableOrderNewCasesForEvery10000()
  {
    this.clickerCountNewCasesForEvery10000++;
    if(this.clickerCountNewCasesForEvery10000 >= 3)
    {
      this.clickerCountNewCasesForEvery10000 = 0;
    }
    switch(this.clickerCountNewCasesForEvery10000)
    {
      case 0:
        if(this.selectedCitiesNames.length === 0)
        {
          this.filteredCities = this.allCities;
        }
        else
        {
          this.filteredCities = this.allCities.filter(h => this.selectedCitiesNames.includes(h.name));
        }
      break;

      case 1:
        this.filteredCities = [...this.filteredCities].sort((a, b) => {
          if (a.newCasesForEvery10000 == null && b.newCasesForEvery10000 == null) return 0;
          if (a.newCasesForEvery10000 == null) return 1;
          if (b.newCasesForEvery10000 == null) return -1;
          return b.newCasesForEvery10000 - a.newCasesForEvery10000;
        });
      break;

      case 2:
        this.filteredCities = [...this.filteredCities].sort((a, b) => {
          if (a.newCasesForEvery10000 == null && b.newCasesForEvery10000 == null) return 0;
          if (a.newCasesForEvery10000 == null) return 1;
          if (b.newCasesForEvery10000 == null) return -1;
          return a.newCasesForEvery10000 - b.newCasesForEvery10000;
        });
      break;
    }
  }

  changeTableOrderPrecentagePositive()
  {
    this.clickerCountPrecentagePositive++;
    if(this.clickerCountPrecentagePositive >= 3)
    {
      this.clickerCountPrecentagePositive = 0;
    }
    switch(this.clickerCountPrecentagePositive)
    {
      case 0:
        if(this.selectedCitiesNames.length === 0)
        {
          this.filteredCities = this.allCities;
        }
        else
        {
          this.filteredCities = this.allCities.filter(h => this.selectedCitiesNames.includes(h.name));
        }
      break;

      case 1:
        this.filteredCities = [...this.filteredCities].sort((a, b) => {
          if (a.precentagePositive == null && b.precentagePositive == null) return 0;
          if (a.precentagePositive == null) return 1;
          if (b.precentagePositive == null) return -1;
          return b.precentagePositive - a.precentagePositive;
        });
      break;

      case 2:
        this.filteredCities = [...this.filteredCities].sort((a, b) => {
          if (a.precentagePositive == null && b.precentagePositive == null) return 0;
          if (a.precentagePositive == null) return 1;
          if (b.precentagePositive == null) return -1;
          return a.precentagePositive - b.precentagePositive;
        });
      break;
    }
  }

  changeTableOrderConfirmedChange()
  {
    this.clickerCountConfirmedChange++;
    if(this.clickerCountConfirmedChange >= 3)
    {
      this.clickerCountConfirmedChange = 0;
    }
    switch(this.clickerCountConfirmedChange)
    {
      case 0:
        if(this.selectedCitiesNames.length === 0)
        {
          this.filteredCities = this.allCities;
        }
        else
        {
          this.filteredCities = this.allCities.filter(h => this.selectedCitiesNames.includes(h.name));
        }
      break;

      case 1:
        this.filteredCities = [...this.filteredCities].sort((a, b) => {
          if (a.confirmedChange == null && b.confirmedChange == null) return 0;
          if (a.confirmedChange == null) return 1;
          if (b.confirmedChange == null) return -1;
          return b.confirmedChange - a.confirmedChange;
        });
      break;

      case 2:
        this.filteredCities = [...this.filteredCities].sort((a, b) => {
          if (a.confirmedChange == null && b.confirmedChange == null) return 0;
          if (a.confirmedChange == null) return 1;
          if (b.confirmedChange == null) return -1;
          return a.confirmedChange - b.confirmedChange;
        });
      break;
    }
  }

  changeTableOrderActiveCases()
  {
    this.clickerCountActiveCases++;
    if(this.clickerCountActiveCases >= 3)
    {
      this.clickerCountActiveCases = 0;
    }
    switch(this.clickerCountActiveCases)
    {
      case 0:
        if(this.selectedCitiesNames.length === 0)
        {
          this.filteredCities = this.allCities;
        }
        else
        {
          this.filteredCities = this.allCities.filter(h => this.selectedCitiesNames.includes(h.name));
        }
      break;

      case 1:
        this.filteredCities = [...this.filteredCities].sort((a, b) => {
          if (a.activeCases == null && b.activeCases == null) return 0;
          if (a.activeCases == null) return 1;
          if (b.activeCases == null) return -1;
          return b.activeCases - a.activeCases;
        });
      break;

      case 2:
        this.filteredCities = [...this.filteredCities].sort((a, b) => {
          if (a.activeCases == null && b.activeCases == null) return 0;
          if (a.activeCases == null) return 1;
          if (b.activeCases == null) return -1;
          return a.activeCases - b.activeCases;
        });
      break;
    }
  }

  toggleIsOptionOpen()
  {
    this.isOptionsOpen = !this.isOptionsOpen;
  }
}
