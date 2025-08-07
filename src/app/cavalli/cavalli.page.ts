import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CavalloService } from '../services/cavallo.service';
import { ConfigService } from '../services/config.service'; 
import { VintoGroup, cavalli, alboCavalli } from 'src/datatypes/cavalli';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { LanguageService, SupportedLanguage } from '../services/language.service';
import { Subscription } from 'rxjs';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-cavalli',
  templateUrl: './cavalli.page.html',
  styleUrls: ['./cavalli.page.scss'],
  standalone: false,
})
export class CavalliPage implements OnInit, OnDestroy {
  @ViewChild(IonContent, { static: false }) content?: IonContent;
  searchTerm: string = '';

  zoekterm: string = '';
  zoekResultaten: cavalli[] = [];

  cavalliVintiOrdered: VintoGroup[] = [];
  filteredCavalliVintiOrdered: VintoGroup[] = [];
  alboCavalli: alboCavalli[] = [];
  
  loading = true;

  showCavalli = true;
  showSearch = true;
  showProtocollo = true;

  openAccordionValues: string[] = [];

  anno = '';

  currentLanguage: SupportedLanguage = 'it';
  private langSub?: Subscription;

  private zoekTimeout: any;

  constructor(    
    private cavalloService: CavalloService,
    private configService: ConfigService,
    private languageService: LanguageService,
    private translationService: TranslationService,
    private router: Router) {}

  async ngOnInit() {
    try {
      const config = await this.configService.retrieveConfig(1);

      if (config?.anno) {
        this.anno = config.anno;
      } else {
        console.warn('⚠️ Geen geldig anno gevonden in config.');
      }

      this.cavalliVintiOrdered = await this.cavalloService.loadCavalliVintiOrdered();
      this.filteredCavalliVintiOrdered = [...this.cavalliVintiOrdered]; 
      this.openAccordionValues = this.filteredCavalliVintiOrdered.map(g => g.vinto.toString());

      this.alboCavalli = await this.cavalloService.loadAlboCavalliByYear(this.anno);

    } catch (error) {
      console.error('❌ Fout bij ophalen van config of cavalli-data:', error);
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

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }

  goToCavalloDetail(id: string) {
    this.router.navigate(['/cavallo', id]);
  }

  toggleAccordion(value: string) {
    const index = this.openAccordionValues.indexOf(value);
    if(index > -1) {
      this.openAccordionValues.splice(index, 1);
    } else {
      this.openAccordionValues.push(value);
    }
  }

  filterCavalli() {
    const term = this.searchTerm.toLowerCase();

    if (!term) {
      // Geen zoekterm, toon alle groepen zoals normaal
      this.filteredCavalliVintiOrdered = [...this.cavalliVintiOrdered];
    } else {
      // Filter elke groep, houd alleen cavalli die matchen op naam
      this.filteredCavalliVintiOrdered = this.cavalliVintiOrdered
        .map(group => {
          const filteredCavalli = group.cavalli.filter(cavallo =>
            cavallo.nome.toLowerCase().includes(term)
          );
          return {
            ...group,
            cavalli: filteredCavalli
          };
        })
        // optioneel: groepen zonder cavalli wegfilteren
        .filter(group => group.cavalli.length > 0);
    }

    // Open alle accordeons van de gefilterde groepen
    this.openAccordionValues = this.filteredCavalliVintiOrdered.map(g => g.vinto.toString());
  }
    
  scrollToTop() {
    this.content?.scrollToTop(500);
  }

  searchCavalli() {
    clearTimeout(this.zoekTimeout);

    const term = this.zoekterm.trim();

    if (term.length < 1) {
      this.zoekResultaten = [];
      return;
    }

    this.zoekTimeout = setTimeout(() => {
      this.cavalloService.searchCavalli(term).subscribe({
        next: (resultaten) => {
          this.zoekResultaten = resultaten;
        },
        error: (err) => {
          console.error('Fout bij zoeken:', err);
          this.zoekResultaten = [];
        }
      });
    }, 300);
  }

}



