import { Injectable } from '@angular/core';
import { TRANSLATIONS } from 'src/assets/i18n/translations';
import { LanguageService } from './language.service';
import { SupportedLanguage } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private languageService: LanguageService) {}

  getTranslation(key: string): string {
    const lang = this.languageService.getLanguage();
    return TRANSLATIONS[key]?.[lang] || '';
  }
}
