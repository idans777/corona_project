import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CssService } from '../services/css-service/css.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  constructor(private cssService: CssService)
  {

  }

  @Output() sectionSelected = new EventEmitter<string>();

  isSideBarOpen: boolean = false;

  isDarkModeOn!: boolean;

  isTranslateOn!: boolean;

  isTranslateOptionOpen: boolean = false;

  ngOnInit(): void {
    this.cssService.isDarkModeOn$.subscribe(
      (response) => {this.isDarkModeOn = response}
    );

    this.cssService.isTranslateOn$.subscribe(
      (response) => {this.isTranslateOn = response}
    );
  }

  toggleSideBar()
  {
    this.isSideBarOpen = !this.isSideBarOpen;
  }


  navigateTo(section: string)
  {
    this.sectionSelected.emit(section);
  }

  toggleDarkMode()
  {
    this.cssService.toggleDarkMode();
    const body = document.body;
    if (this.isDarkModeOn) {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
  }

  toggleTranslate(event: Event)
  {
    const target = event.target as HTMLElement;
    const classList = target.classList;

    if(classList.contains('hebrew') && this.isTranslateOn)
    {
      return;
    }

    if(classList.contains('hebrew') && !this.isTranslateOn)
    {
      this.cssService.toggleTranslate();
      return;
    }

    if(classList.contains('english') && !this.isTranslateOn)
    {
      return;
    }

    if(classList.contains('english') && this.isTranslateOn)
    {
      this.cssService.toggleTranslate();
      return;
    }
  }

  toggleTranslateOption()
  {
    this.isTranslateOptionOpen = !this.isTranslateOptionOpen;
  }
}
