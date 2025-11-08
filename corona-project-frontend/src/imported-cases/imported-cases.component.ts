import { Component, OnInit } from '@angular/core';
import { Country } from '../models/countryModel';
import { CssService } from '../services/css-service/css.service';

@Component({
  selector: 'app-imported-cases',
  standalone: false,
  templateUrl: './imported-cases.component.html',
  styleUrl: './imported-cases.component.scss'
})
export class ImportedCasesComponent implements OnInit {

  constructor(private cssService: CssService){}
  
  isOptionsOpen: boolean = false;

  clickerCountCountry: number = 0;

  clickerCountColor: number = 0;

  clickerCountEnteringIsrael: number = 0;
  
  clickerCountConfirmedCitizend: number = 0;

  clickerCountConfirmedForeigners: number = 0;

  clickerCountPrecentageConfirmedEnters: number = 0;

  isTranslateOn!: boolean;

  colors: string[] = [
    'yellow', 'orange', 'red', 'black'
  ];

  allCountries!: Country[];

  filteredCountries!: Country[];


  showDropdown = false;
  selectedCountriesNames: string[] = [];
  tempSelection: string[] = [];

  ngOnInit(): void {
    this.cssService.isTranslateOn$.subscribe(
      (response) => {
        this.isTranslateOn = response

        this.allCountries = [
          { name: this.isTranslateOn === false ? 'Spain' : 'ספרד' },
          { name: this.isTranslateOn === false ? 'USA' : 'ארצות הברית' },
          { name:  this.isTranslateOn === false ? 'Italy' : 'איטליה' },
          { name:  this.isTranslateOn === false ? 'England' : 'אנגליה' }
        ]

        this.filteredCountries = this.allCountries;
      }
    );
  }

  toggleDropdown()
  {
    this.tempSelection = [...this.selectedCountriesNames];
    this.showDropdown = !this.showDropdown;
  }

  toggleTempCountrySelection(countryName: string)
  {
    const index = this.tempSelection.indexOf(countryName);
    if (index === -1) {
      this.tempSelection.push(countryName);
    } else {
      this.tempSelection.splice(index, 1);
    }
  }

  isTempSelected(countryName: string): boolean
  {
    return this.tempSelection.includes(countryName);
  }

  confirmSelection()
  {
    this.selectedCountriesNames = [...this.tempSelection];
    if(this.selectedCountriesNames.length === 0)
    {
      this.filteredCountries = this.allCountries;
    }
    else
    {
      this.filteredCountries = this.allCountries.filter(c => this.selectedCountriesNames.includes(c.name));
    }

    this.showDropdown = false;
  }

  cancelSelection()
  {
    this.showDropdown = false;
  }



  

  changeTableOrderCountry()
  {
    this.clickerCountCountry++;
    if(this.clickerCountCountry >= 3)
    {
      this.clickerCountCountry = 0;
    }
    switch(this.clickerCountCountry)
    {
      case 0:
        if(this.selectedCountriesNames.length === 0)
        {
          this.filteredCountries = this.allCountries;
        }
        else
        {
          this.filteredCountries = this.allCountries.filter(h => this.selectedCountriesNames.includes(h.name));
        }
      break;

      case 1:
        this.filteredCountries = [...this.filteredCountries].sort((a, b) => 
          a.name.localeCompare(b.name));
      break;

      case 2:
        this.filteredCountries = [...this.filteredCountries].sort((a, b) => 
          b.name.localeCompare(a.name));
      break;
    }
  }

  changeTableOrderColor()
  {

    const colorPriority: Record<string, number> = {
      red: 3,
      orange: 2,
      yellow: 1,
    };

    this.clickerCountColor++;
    if(this.clickerCountColor >= 3)
    {
      this.clickerCountColor = 0;
    }
    switch(this.clickerCountColor)
    {
      case 0:
        if(this.selectedCountriesNames.length === 0)
        {
          this.filteredCountries = this.allCountries;
        }
        else
        {
          this.filteredCountries = this.allCountries.filter(h => this.selectedCountriesNames.includes(h.name));
        }
      break;

      case 1:
        this.filteredCountries = [...this.filteredCountries].sort((a, b) => {
          const aPriority = a.color ? colorPriority[a.color] || 0 : 0;
          const bPriority = b.color ? colorPriority[b.color] || 0 : 0;
          return bPriority - aPriority;
        });
      break;

      case 2:
        this.filteredCountries = [...this.filteredCountries].sort((a, b) => {
          const aPriority = a.color ? colorPriority[a.color] || 0 : 0;
          const bPriority = b.color ? colorPriority[b.color] || 0 : 0;
          return aPriority - bPriority;
        });
      break;
    }
  }

  changeTableOrderEnteringIsrael()
  {
    this.clickerCountEnteringIsrael++;
    if(this.clickerCountEnteringIsrael >= 3)
    {
      this.clickerCountEnteringIsrael = 0;
    }
    switch(this.clickerCountEnteringIsrael)
    {
      case 0:
        if(this.selectedCountriesNames.length === 0)
        {
          this.filteredCountries = this.allCountries;
        }
        else
        {
          this.filteredCountries = this.allCountries.filter(h => this.selectedCountriesNames.includes(h.name));
        }
      break;

      case 1:
        this.filteredCountries = [...this.filteredCountries].sort((a, b) => {
          if (a.enteringIsrael == null && b.enteringIsrael == null) return 0;
          if (a.enteringIsrael == null) return 1;
          if (b.enteringIsrael == null) return -1;
          return b.enteringIsrael - a.enteringIsrael;
        });
      break;

      case 2:
        this.filteredCountries = [...this.filteredCountries].sort((a, b) => {
          if (a.enteringIsrael == null && b.enteringIsrael == null) return 0;
          if (a.enteringIsrael == null) return 1;
          if (b.enteringIsrael == null) return -1;
          return a.enteringIsrael - b.enteringIsrael;
        });
      break;
    }
  }

  changeTableOrderConfirmedCitizened()
  {
    this.clickerCountConfirmedCitizend++;
    if(this.clickerCountConfirmedCitizend >= 3)
    {
      this.clickerCountConfirmedCitizend = 0;
    }
    switch(this.clickerCountConfirmedCitizend)
    {
      case 0:
        if(this.selectedCountriesNames.length === 0)
        {
          this.filteredCountries = this.allCountries;
        }
        else
        {
          this.filteredCountries = this.allCountries.filter(h => this.selectedCountriesNames.includes(h.name));
        }
      break;

      case 1:
        this.filteredCountries = [...this.filteredCountries].sort((a, b) => {
          if (a.confirmedCitizened == null && b.confirmedCitizened == null) return 0;
          if (a.confirmedCitizened == null) return 1;
          if (b.confirmedCitizened == null) return -1;
          return b.confirmedCitizened - a.confirmedCitizened;
        });
      break;

      case 2:
        this.filteredCountries = [...this.filteredCountries].sort((a, b) => {
          if (a.confirmedCitizened == null && b.confirmedCitizened == null) return 0;
          if (a.confirmedCitizened == null) return 1;
          if (b.confirmedCitizened == null) return -1;
          return a.confirmedCitizened - b.confirmedCitizened;
        });
      break;
    }
  }

  changeTableOrderConfirmedForeigners()
  {
    this.clickerCountConfirmedForeigners++;
    if(this.clickerCountConfirmedForeigners >= 3)
    {
      this.clickerCountConfirmedForeigners = 0;
    }
    switch(this.clickerCountConfirmedForeigners)
    {
      case 0:
        if(this.selectedCountriesNames.length === 0)
        {
          this.filteredCountries = this.allCountries;
        }
        else
        {
          this.filteredCountries = this.allCountries.filter(h => this.selectedCountriesNames.includes(h.name));
        }
      break;

      case 1:
        this.filteredCountries = [...this.filteredCountries].sort((a, b) => {
          if (a.confirmedForeigners == null && b.confirmedForeigners == null) return 0;
          if (a.confirmedForeigners == null) return 1;
          if (b.confirmedForeigners == null) return -1;
          return b.confirmedForeigners - a.confirmedForeigners;
        });
      break;

      case 2:
        this.filteredCountries = [...this.filteredCountries].sort((a, b) => {
          if (a.confirmedForeigners == null && b.confirmedForeigners == null) return 0;
          if (a.confirmedForeigners == null) return 1;
          if (b.confirmedForeigners == null) return -1;
          return a.confirmedForeigners - b.confirmedForeigners;
        });
      break;
    }
  }

  changeTableOrderPrecentegeConfirmedEnters()
  {
    this.clickerCountPrecentageConfirmedEnters++;
    if(this.clickerCountPrecentageConfirmedEnters >= 3)
    {
      this.clickerCountPrecentageConfirmedEnters = 0;
    }
    switch(this.clickerCountPrecentageConfirmedEnters)
    {
      case 0:
        if(this.selectedCountriesNames.length === 0)
        {
          this.filteredCountries = this.allCountries;
        }
        else
        {
          this.filteredCountries = this.allCountries.filter(h => this.selectedCountriesNames.includes(h.name));
        }
      break;

      case 1:
        this.filteredCountries = [...this.filteredCountries].sort((a, b) => {
          if (a.precentageConfirmedFormEnters == null && b.precentageConfirmedFormEnters == null) return 0;
          if (a.precentageConfirmedFormEnters == null) return 1;
          if (b.precentageConfirmedFormEnters == null) return -1;
          return b.precentageConfirmedFormEnters - a.precentageConfirmedFormEnters;
        });
      break;

      case 2:
        this.filteredCountries = [...this.filteredCountries].sort((a, b) => {
          if (a.precentageConfirmedFormEnters == null && b.precentageConfirmedFormEnters == null) return 0;
          if (a.precentageConfirmedFormEnters == null) return 1;
          if (b.precentageConfirmedFormEnters == null) return -1;
          return a.precentageConfirmedFormEnters - b.precentageConfirmedFormEnters;
        });
      break;
    }
  }

  toggleIsOptionOpen()
  {
    this.isOptionsOpen = !this.isOptionsOpen;
  }

}
