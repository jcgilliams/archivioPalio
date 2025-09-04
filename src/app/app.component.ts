import { Component } from '@angular/core';
import { LanguageService, SupportedLanguage } from './services/language.service';
import { MenuController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';

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
      nl: 'Home',
      de: 'Home'
    },
    cavalli: {
      it: 'Cavalli',
      en: 'Horses',
      nl: 'Paarden',
      de: 'Pferde'
    },
    fantini: {
      it: 'Fantini',
      en: 'Jockeys',
      nl: 'Ruiters',
      de: 'Jockeys'
    },
    elenco: {
      it: 'Vittorie',
      en: 'Victories',
      nl: 'Overwinningen',
      de: 'Siege'
    },
    contrade: {
      it: 'Contrade',
      en: 'Districts',
      nl: 'Wijken',
      de: 'Contrade'
    },
    statistiche: {
      it: 'Statistiche',
      en: 'Statistics',
      nl: 'Statistieken',
      de: 'Statistiken'
    }
  };

  constructor(private languageService: LanguageService, private menuCtrl: MenuController,private router: Router,  private swUpdate: SwUpdate) {
    this.selectedLanguage = this.languageService.getLanguage();
    console.log('Actieve taal:', this.selectedLanguage); 
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        const ionApp = document.querySelector('ion-app');
        if (!ionApp) return;

        ionApp.classList.remove('bg-cavalli', 'bg-fantini', 'bg-palio', 'bg-contrade', 'bg-statistiche', 'bg-default');

        const cavalliRoutes = ['/cavallo/', '/cavalli', '/albo-cavalli/'];
        const fantiniRoutes = ['/fantini', '/fantino/'];
        const palioRoutes = ['/palio', '/vittorie'];
        const contradeRoutes = ['/contrade', '/contrada'];
        const statisticheRoutes = ['/statistiche'];

        const url = e.urlAfterRedirects;

        if (cavalliRoutes.some(route => url.includes(route))) {
          ionApp.classList.add('bg-cavalli');
        } else if (fantiniRoutes.some(route => url.includes(route))) {
          ionApp.classList.add('bg-fantini');
        } else if (palioRoutes.some(route => url.includes(route))) {
          ionApp.classList.add('bg-palio');
        } else if (contradeRoutes.some(route => url.includes(route))) {
          ionApp.classList.add('bg-contrade');    
        } else if (statisticheRoutes.some(route => url.includes(route))) {
          ionApp.classList.add('bg-statistiche');                    
        } else {
          ionApp.classList.add('bg-default');
        }
      });

      if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates
        .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
        .subscribe(() => {
          console.log('Nieuwe versie gevonden, herladen...');
          window.location.reload();
        });
    }
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
