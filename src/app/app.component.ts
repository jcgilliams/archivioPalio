import { Component } from '@angular/core';
import { LanguageService, SupportedLanguage } from './services/language.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent { 
  selectedLanguage: SupportedLanguage;

  translations: { [key: string]: { [lang: string]: string } } = {
    home: {
      it: 'Home',
      en: 'Home',
      nl: 'Home'
    },
    cavalli: {
      it: 'Cavalli',
      en: 'Horses',
      nl: 'Paarden'
    },
    fantini: {
      it: 'Fantini',
      en: 'Jockeys',
      nl: 'Ruiters'
    },
    elenco: {
      it: 'Vittorie',
      en: 'Victories',
      nl: 'Overwinningen'
    },
    contrade: {
      it: 'Contrade',
      en: 'Districts',
      nl: 'Wijken'
    },
    statistiche: {
      it: 'Statistiche',
      en: 'Statistics',
      nl: 'Statistiek'
    }
  };

  constructor(private languageService: LanguageService, private menuCtrl: MenuController) {
    this.selectedLanguage = this.languageService.getLanguage();
    console.log('Actieve taal:', this.selectedLanguage); 
  }

  changeLanguage(lang: any) {
    this.languageService.setLanguage(lang as SupportedLanguage);
    this.selectedLanguage = lang as SupportedLanguage;
    console.log('Actieve taal:', this.selectedLanguage); 
  }
  closeMenu() {
    this.menuCtrl.close();
  }

  getTranslation(key: string): string {
    return this.translations[key]?.[this.selectedLanguage] || key;
  }
}
