import { Injectable } from '@angular/core';
import { TRANSLATIONS } from 'src/assets/i18n/translations';
import { LanguageService } from './language.service';
import { SupportedLanguage } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private languageService: LanguageService) {}

  getTranslation(key: string, params?: { [key: string]: any }): string {
    const lang = this.languageService.getLanguage();
    let translation = TRANSLATIONS[key]?.[lang] || '';

    if (params) {
      Object.keys(params).forEach(param => {
        const regex = new RegExp(`{{\\s*${param}\\s*}}`, 'g');
        translation = translation.replace(regex, params[param]);
      });
    }

    return translation;
  }
}
