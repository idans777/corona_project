import { Component, Input } from '@angular/core';
import { City } from '../models/cityModel';
import { Hospital } from '../models/hospitalModel';
import { Country } from '../models/countryModel';

@Component({
  selector: 'app-general-table-card',
  standalone: false,
  templateUrl: './general-table-card.component.html',
  styleUrl: './general-table-card.component.scss'
})
export class GeneralTableCardComponent {
  @Input() title!: string;
  @Input() info!: string;
  @Input() share!: string;
  @Input() download!: string;
  @Input() ok!: string;
  @Input() cancel!: string;
  @Input() noData!: string;
  @Input() colors?: string[];

  @Input() allData!: Hospital[] | Country[] | City[];
  @Input() selectedItemsNames!: string[];
  @Input() filteredItems!: Hospital[] | Country[] | City[];
  @Input() tempSelection!: string[];

  isOptionsOpen: boolean = false;
  showDropdown: boolean = false;

  @Input() cardNgClass!: string;
  @Input() filterNotSelected!: string;
  @Input() filterSelected!: string;

  toggleIsOptionOpen()
  {
    this.isOptionsOpen = !this.isOptionsOpen;
  }

  toggleDropdown()
  {
    this.tempSelection = [...this.selectedItemsNames];
    this.showDropdown = !this.showDropdown;
  }

  isTempSelected(itemName: string): boolean
  {
    return this.tempSelection.includes(itemName);
  }

  toggleTempItemsSelection(itemName: string) 
  {
    const index = this.tempSelection.indexOf(itemName);
    if (index === -1) {
      this.tempSelection.push(itemName);
    } else {
      this.tempSelection.splice(index, 1);
    }
  }

  confirmSelection()
  {
    this.selectedItemsNames = [...this.tempSelection];
    if(this.selectedItemsNames.length === 0)
    {
      this.filteredItems = this.allData;
    }
    else
    {
      this.filteredItems = this.allData.filter(i => this.selectedItemsNames.includes(i.name));
    }

    this.showDropdown = false;
  }

  cancelSelection()
  {
    this.showDropdown = false;
  }
}
