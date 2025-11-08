import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CssService } from '../services/css-service/css.service';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  constructor(private translate: TranslateService, private cssService: CssService)
  {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  @ViewChild('overview', { read: ElementRef }) overview!: ElementRef;
  @ViewChild('keyData', { read: ElementRef }) keyData!: ElementRef;
  @ViewChild('generalMorbidityIndicators', { read: ElementRef }) generalMorbidityIndicators!: ElementRef;
  @ViewChild('importedCases', { read: ElementRef }) importedCases!: ElementRef;
  @ViewChild('traffic', { read: ElementRef }) traffic!: ElementRef;
  @ViewChild('childCases', { read: ElementRef }) childCases!: ElementRef;
  @ViewChild('vaccinationEffectiveness', { read: ElementRef }) vaccinationEffectiveness!: ElementRef;
  @ViewChild('deaths', { read: ElementRef }) deaths!: ElementRef;
  @ViewChild('testing', { read: ElementRef }) testing!: ElementRef;
  @ViewChild('vaccination', { read: ElementRef }) vaccination!: ElementRef;

  isTranslateOn!: boolean;

  ngOnInit(): void {
    this.cssService.isTranslateOn$.subscribe(
      (response) => {this.isTranslateOn = response}
    );
  }

  scrollToSection(section: string) {
    const sections: { [key: string]: ElementRef } =
    {
      overview: this.overview,
      keyData: this.keyData,
      generalMorbidityIndicators: this.generalMorbidityIndicators,
      importedCases: this.importedCases,
      traffic: this.traffic,
      childCases: this.childCases,
      vaccinationEffectiveness: this.vaccinationEffectiveness,
      deaths: this.deaths,
      testing: this.testing,
      vaccination: this.vaccination,
    }

    const target = sections[section];
    if (target) {
      target.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
}
