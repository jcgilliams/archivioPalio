import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { LanguageService, SupportedLanguage } from '../services/language.service';
import { Subscription } from 'rxjs';
import { TranslationService } from '../services/translation.service';
import { ConfigService } from '../services/config.service'; 
import { PalioService } from '../services/palio.service';
import { PalioAnno } from 'src/datatypes/palio';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  @ViewChild(IonContent, { static: false }) content?: IonContent;
  palioAnno: PalioAnno[] = [];
  loading = true;

  showPalio = true;
  showCavalli = true;
  showFantini = true;
  showPalioAnno = true;
  showWelcome = true;
  showContradeUltimo = true;
  showContradeVittorie = true;
  showBe = true;
  showEu = true;
  showApp = true;

  openAccordionValues: string[] = [];

  anno = '';

  currentLanguage: SupportedLanguage = 'it';
  private langSub?: Subscription;

  constructor(
    private languageService: LanguageService,
    private translationService: TranslationService,
    private configService: ConfigService, 
    private palioService: PalioService,
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

      this.palioAnno =  await this.palioService.getFantinoByAnno(this.anno)

    } catch (error) {
      console.error('❌ Fout bij ophalen van config:', error);
    } finally {
      this.loading = false;
    }
    console.log(this.anno)
    this.langSub = this.languageService.language$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  ngOnDestroy() {
    this.langSub?.unsubscribe();
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

  toggleAccordion(value: string) {
    const index = this.openAccordionValues.indexOf(value);
    if(index > -1) {
      this.openAccordionValues.splice(index, 1);
    } else {
      this.openAccordionValues.push(value);
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
