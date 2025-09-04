import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type SupportedLanguage = 'en' | 'nl' | 'it' | 'de' | 'fr';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<SupportedLanguage>('it');
  language$ = this.currentLanguageSubject.asObservable();

  constructor() {
    const saved = localStorage.getItem('lang') as SupportedLanguage;
    const initialLang = saved || 'it';
    this.currentLanguageSubject.next(initialLang);
  }
   
  setLanguage(lang: SupportedLanguage) {
    localStorage.setItem('lang', lang);
    this.currentLanguageSubject.next(lang);
  }

  getLanguage(): SupportedLanguage {
    return this.currentLanguageSubject.value;
  }
}
