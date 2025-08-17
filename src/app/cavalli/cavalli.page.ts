import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CavalloService } from '../services/cavallo.service';
import { VintoGroupCavalli, cavalli, cavalliDecennium  } from 'src/datatypes/cavalli';
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
  periodes: string[] = [];
  periodesMetAantal: { periode: string; aantal: number }[] = [];

  cavalliVintiOrdered: VintoGroupCavalli[] = [];
  filteredCavalliVintiOrdered: VintoGroupCavalli[] = [];
  
  loading = true;

  showCavalli = true;
  showSearch = true;
  showDecennio = true;

  openAccordionValues: string[] = [];

  currentLanguage: SupportedLanguage = 'it';
  private langSub?: Subscription;

  private zoekTimeout: any;

  constructor(    
    private cavalloService: CavalloService,
    private languageService: LanguageService,
    private translationService: TranslationService,
    private router: Router) {
      for(let start = 2020; start >= 1900; start -= 10) {
        this.periodes.push(`${start}-${start+9}`);
      }
    }

  async ngOnInit() {
    try {
      this.cavalliVintiOrdered = await this.cavalloService.loadCavalliVintiOrdered();
      this.filteredCavalliVintiOrdered = [...this.cavalliVintiOrdered]; 
      this.openAccordionValues = this.filteredCavalliVintiOrdered.map(g => g.vinto.toString());

      await this.loadAantalPeriodes();

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

  async ionViewWillEnter() {
    this.content?.scrollToTop(0);
  }

  async loadAantalPeriodes() {
    this.periodesMetAantal = [];

    for (const periode of this.periodes) {
      const apiCode = periode.substring(0, 3);

      try {
        const cavalliDecenniumList: cavalliDecennium[] = await this.cavalloService.loadCavalliDecennium(apiCode);
        
        this.periodesMetAantal.push({
          periode,
          aantal: cavalliDecenniumList.length
        });
      } catch (error) {
        console.error(`Fout bij ophalen cavalli decennium voor ${periode}:`, error);
        this.periodesMetAantal.push({
          periode,
          aantal: 0
        });
      }
    }
  }  

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }

  goToCavalloDetail(id: string) {
    this.router.navigate(['/cavallo', id]);
  }

  goToDecennio(input: string) {
    this.router.navigate(['/cavalli/decennio', input]);
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



