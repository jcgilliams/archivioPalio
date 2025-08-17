import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { LanguageService, SupportedLanguage } from '../services/language.service';
import { Subscription } from 'rxjs';
import { TranslationService } from '../services/translation.service';
import { ConfigService } from '../services/config.service'; 
import { PalioService } from '../services/palio.service';
import { PalioAnno, Palio } from 'src/datatypes/palio';
import { FantinoService } from '../services/fantino.service';
import { VintoGroupFantini } from 'src/datatypes/fantini';
import { CavalloService } from '../services/cavallo.service';
import { VintoGroupCavalli } from 'src/datatypes/cavalli';
import { StatisticheService } from '../services/statistiche.service';
import { ultimaVittoria, vittorieCitta, vittorieContrade } from 'src/datatypes/statistiche';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  @ViewChild(IonContent, { static: false }) content?: IonContent;
  palioAnno: PalioAnno[] = [];
  fantiniList: VintoGroupFantini[] = [];
  cavalliList: VintoGroupCavalli[] = [];
  palioList: Palio[] = [];
  ultimaVittoriaList: ultimaVittoria[] = [];
  vittorieCittaList: vittorieCitta[]= [];
  vittorieContradeList: vittorieContrade[] = [];
  loading = true;

  showPalio = true;
  showCavalli = true;
  showFantini = true;
  showPalioAnno = true;
  showWelcome = true;
  showContradeUltimo = true;
  showContradeVittorie = true;
  showApp = true;

  openAccordionValues: string[] = [];
  openFantiniAccordionValues: string[] = [];
  openCavalliAccordionValues: string[] = [];

  anno = '';

  currentLanguage: SupportedLanguage = 'it';
  private langSub?: Subscription;

  constructor(
    private languageService: LanguageService,
    private translationService: TranslationService,
    private configService: ConfigService, 
    private palioService: PalioService,
    private fantinoService: FantinoService,
    private cavalloService: CavalloService,
    private statisticheService: StatisticheService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      const config = await this.configService.retrieveConfig(1);

      if (config?.anno) {
        this.anno = config.anno;
      } else {
        console.warn('⚠️ Geen geldig anno gevonden in config.');
      }

      this.palioAnno =  await this.palioService.getPalioByAnno(this.anno)

      const fullListPalio = await this.palioService.getPalio();
      this.palioList = fullListPalio
        .filter(p => !!p.fantinoId)
        .sort((a, b) => {
          return b.id - a.id;
        })
        .slice(0, 10);      
      
        this.openFantiniAccordionValues = this.fantiniList.map(g => g.vinto.toString()); 

      const fullListFantini = await this.fantinoService.loadFantiniVintiOrdered();
      this.fantiniList = fullListFantini.filter(f => f.vinto > 8);    
      this.openFantiniAccordionValues = this.fantiniList.map(g => g.vinto.toString()); 

      const fullListCavalli = await this.cavalloService.loadCavalliVintiOrdered();
      this.cavalliList = fullListCavalli.filter(c => c.vinto > 4);    
      this.openCavalliAccordionValues = this.cavalliList.map(c => c.vinto.toString());  

      this.ultimaVittoriaList = await this.statisticheService.getUltimaVittoria();
      this.vittorieContradeList = await this.statisticheService.getVittorieContrade();
      this.vittorieCittaList = await this.statisticheService.getVittorieCitta();

    } catch (error) {
      console.error('❌ Fout bij ophalen van config:', error);
    } finally {
      this.loading = false;
    }
    this.langSub = this.languageService.language$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  ngOnDestroy() {
    this.langSub?.unsubscribe();
  }

  async ionViewWillEnter() {
    this.content?.scrollToTop(0);
  }

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }

  goToCavalloDetail(id: string) {
    this.router.navigate(['/cavallo', id]);
  }

  goToFantinoDetail(id: string) {
    this.router.navigate(['/fantino', id]);
  }  

  goToPalioDetail(slug: string) {
    this.router.navigate(['/palio', slug]);
  }  

  goToContradaDetail(contrada: string) {
    this.router.navigate(['/contrada', contrada.toLowerCase()]);
  }

  goToFantiniPage() {
    this.router.navigate(['/fantini']);
  }

  goToCavalliPage() {
    this.router.navigate(['/cavalli']);
  }

  goToVittoriePage() {
    this.router.navigate(['/vittorie']);
  }

  goToProtocolloPage() {
    this.router.navigate(['/albo-cavalli', this.anno]);
  }

  goTostatistichePage() {
    this.router.navigate(['/statistiche']);
  }

  toggleAccordion(value: string) {
    const index = this.openAccordionValues.indexOf(value);
    if(index > -1) {
      this.openAccordionValues.splice(index, 1);
    } else {
      this.openAccordionValues.push(value);
    }
  }

  toggleFantiniAccordion(value: string) {
    const index = this.openFantiniAccordionValues.indexOf(value);
    if (index > -1) {
      this.openFantiniAccordionValues.splice(index, 1);
    } else {
      this.openFantiniAccordionValues.push(value);
    }
  }

  toggleCavalliAccordion(value: string) {
    const index = this.openCavalliAccordionValues.indexOf(value);
    if (index > -1) {
      this.openCavalliAccordionValues.splice(index, 1);
    } else {
      this.openCavalliAccordionValues.push(value);
    }
  }  
     
  scrollToTop() {
    this.content?.scrollToTop(500);
  }

  get palioPerId(): PalioAnno[] {
    if (!this.palioAnno || this.palioAnno.length === 0) return [];

    // Groepeer op palioId
    const grouped: { [id: string]: PalioAnno[] } = {};

    this.palioAnno.forEach(item => {
      const key = item.palioId;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(item);
    });

    // Sorteer palioIds aflopend
    const sortedIds = Object.keys(grouped)
      .map(id => Number(id))
      .sort((a, b) => b - a);

    const result: PalioAnno[] = [];

    for (const id of sortedIds) {
      const records = grouped[id];
      const winner = records.find(r => r.vinto === true);

      if (winner) {
        result.push(winner); // Enkel de winnaar tonen
      } else {
        result.push(records[0]); // Enkel 1 regel tonen
      }
    }

    return result;
  }
}
