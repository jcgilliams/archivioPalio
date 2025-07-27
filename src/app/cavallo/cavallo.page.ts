import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CavalloService } from '../services/cavallo.service';
import { CavalloDetail } from 'src/datatypes/cavalli';
import { IonContent } from '@ionic/angular';
import { LanguageService, SupportedLanguage } from '../services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cavallo',
  templateUrl: './cavallo.page.html',
  styleUrls: ['./cavallo.page.scss'],
  standalone: false,
})
export class CavalloPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content?: IonContent;
  cavallo: CavalloDetail | null = null;
  id: string | null = null;
  percentualeVinti = 0;
  loading = true;

  showInfo = true;
  showExperience = true;
  showPalio = true;

  openAccordionValues: string[] = [];
  isMobile = false;

  currentLanguage: SupportedLanguage = 'it';
  private langSub?: Subscription;

  translations: { [key: string]: { [lang: string]: string } } = {
    nome: {
      it: 'Nome',
      en: 'Name',
      nl: 'Naam'
    },
    sesso: {
      it: 'Sesso',
      en: 'Sex',
      nl: 'Geslacht'
    },
    proprietario: {
      it: 'Proprietario',
      en: 'Owner',
      nl: 'Eigenaar'
    },
    anno: {
      it: 'Anno di nascita',
      en: 'Year of birth',
      nl: 'Geboortejaar'
    },
    manto: {
      it: 'Manto',
      en: 'Coat',
      nl: 'Vacht'
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
    provedinotte: {
      it: 'Prove di Notte Corsi',
      en: 'Night trials Ridden',
      nl: 'Nachtritten gereden'
    },
    tratta: {
      it: 'Presenze alla Tratta',
      en: 'Presences at the Tratta',
      nl: 'Aangeboden op de Tratta'
    },
    scheda: {
      it: 'Scheda cavallo',
      en: 'Technical information horse',
      nl: 'Technische info paard'
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
    }
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private cavalloService: CavalloService,
    private languageService: LanguageService,
  ) { }

  ngOnInit() {
    this.checkScreenWidth();

    this.langSub = this.languageService.language$.subscribe(lang => {
      this.currentLanguage = lang;
    });

    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.loadCavallo(this.id);
      }
    });
    this.loading = false;
  }

  ngOnDestroy() {
    this.langSub?.unsubscribe();
  }

  private async loadCavallo(id: string) {
    try {
      const data = await this.cavalloService.getCavalloById(id);
      this.cavallo = data;

      // Vermijd delen door nul
      if (this.cavallo.paliiCorsi > 0) {
        this.percentualeVinti = Number(
          ((this.cavallo.paliiVinti / this.cavallo.paliiCorsi) * 100).toFixed(1)
        );
      } else {
        this.percentualeVinti = 0;
      }

    } catch (error) {
      console.error('Error on loading cavallo:', error);
      this.cavallo = null;
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

    @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  private checkScreenWidth() {
    this.isMobile = window.innerWidth <= 767;
  }

  get displayedCavalloName(): string {
    if (!this.cavallo?.nome) return '';
    if (this.isMobile) {
      return this.cavallo.nome.split('/')[0];
    }
    return this.cavallo.nome;
  }

  getTranslation(key: string): string {
    const lang = this.languageService.getLanguage();
    return this.translations[key]?.[lang] || '';
  }
}


