import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CssService {

  constructor(private translate: TranslateService) { }

  private _isDarkModeOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isDarkModeOn$: Observable<boolean> = this._isDarkModeOn.asObservable();
  toggleDarkMode()
  {
    const current = this._isDarkModeOn.getValue();
    this._isDarkModeOn.next(!current);
  }

  private _isTranslateOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isTranslateOn$: Observable<boolean> = this._isTranslateOn.asObservable();
  toggleTranslate()
  {
    const current = this._isTranslateOn.getValue();
    this._isTranslateOn.next(!current);
    if(this._isTranslateOn.getValue())
    {
      this.translate.use('he');
    }
    else
    {
      this.translate.use('en');
    }
  }
}
