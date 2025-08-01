import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FantinoService } from '../services/fantino.service';
import { FantinoDetail } from 'src/datatypes/fantini';
import { IonContent } from '@ionic/angular';
import { LanguageService, SupportedLanguage } from '../services/language.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fantino',
  templateUrl: './fantino.page.html',
  styleUrls: ['./fantino.page.scss'],
  standalone: false,
})
export class FantinoPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content?: IonContent;
  fantino: FantinoDetail | null = null;
  id: string | null = null;
  percentualeVinti = 0;
  loading = true;

  showInfo = true;
  showExperience = true;
  showPalio = true;

  openAccordionValues: string[] = [];

  currentLanguage: SupportedLanguage = 'it';
  private langSub?: Subscription;

    translations: { [key: string]: { [lang: string]: string } } = {
    nome: {
      it: 'Nome',
      en: 'Name',
      nl: 'Naam'
    },
    soprannome: {
      it: 'Soprannome',
      en: 'Nickname',
      nl: 'Bijnaam'
    },
    anno: {
      it: 'Anno di nascita',
      en: 'Year of birth',
      nl: 'Geboortejaar'
    },
    corsi: {
      it: 'Palii corsi',
      en: 'Palios ridden',
      nl: 'Gereden palio\'s'
    },
    vinti: {
      it: 'Palii vinti',
      en: 'Palios won',
      nl: 'Gewonnen palio\'s'
    },
    percentuale: {
      it: 'Percentuale di vittorie',
      en: 'Win percentage',
      nl: 'Winstpercentage'
    },
    esordio: {
      it: 'Palio di esordio',
      en: 'Debut palio',
      nl: 'Debuut palio'
    },
    ultimo: {
      it: 'Ultimo palio',
      en: 'Last palio',
      nl: 'Laatste palio'
    },
    scheda: {
      it: 'Scheda fantino',
      en: 'Technical information jockey',
      nl: 'Technische info ruiter'
    },
    esperienza: {
      it: 'Esperienza in Piazza',
      en: 'Experience on the Piazza',
      nl: 'Ervaring op de Piazza'
    },
    elenco: {
      it: 'Palii corsi dal ',
      en: 'Ridden palios since ',
      nl: 'Gereden palio\'s sinds '
    },
    cavallo: {
      it: 'Cavallo',
      en: 'Horse',
      nl: 'Paard'
    }
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private fantinoService: FantinoService,
    private languageService: LanguageService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.langSub = this.languageService.language$.subscribe(lang => {
      this.currentLanguage = lang;
    });

    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.loadFantino(this.id);
      }
    });
    this.loading = false;
  }

  ngOnDestroy() {
    this.langSub?.unsubscribe();
  }

  private async loadFantino(id: string) {
    try {
      const data = await this.fantinoService.getFantinoById(id);
      this.fantino = data;
      console.log('Fantino data:', this.fantino);

      // Vermijd delen door nul
      if (this.fantino.paliiCorsi > 0) {
        this.percentualeVinti = Number(
          ((this.fantino.paliiVinti / this.fantino.paliiCorsi) * 100).toFixed(1)
        );
      } else {
        this.percentualeVinti = 0;
      }

    } catch (error) {
      console.error('Error on loading fantino:', error);
      this.fantino = null;
    }
  }
  scrollToTop() {
    this.content?.scrollToTop(500);
  }

  toggleAccordion(value: string) {
    const index = this.openAccordionValues.indexOf(value);
    if(index > -1) {
      this.openAccordionValues.splice(index, 1);
    } else {
      this.openAccordionValues.push(value);
    }
  }

  getTranslation(key: string): string {
    const lang = this.languageService.getLanguage();
    return this.translations[key]?.[lang] || '';
  }

  goToCavalloDetail(id: string) {
    this.router.navigate(['/cavallo', id]);
  }
}
