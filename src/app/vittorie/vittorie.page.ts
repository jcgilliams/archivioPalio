import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { LanguageService, SupportedLanguage } from '../services/language.service';
import { Subscription } from 'rxjs';
import { TranslationService } from '../services/translation.service';
import { PalioService } from '../services/palio.service';
import { PalioLista } from 'src/datatypes/palio';
import { Router } from '@angular/router';
import { Contrade } from 'src/datatypes/contrade';
import { ContradaService } from '../services/contrada.service';

@Component({
  selector: 'app-vittorie',
  templateUrl: './vittorie.page.html',
  styleUrls: ['./vittorie.page.scss'],
  standalone: false,
})
export class VittoriePage implements OnInit {
  @ViewChild(IonContent, { static: false }) content?: IonContent;
  loading = true;

  showPalio = true;
  showFilter =true;

  allPalioList: PalioLista[] = [];  
  allContrade: Contrade[] = [];
  groupedPalioList: { [century: string]: PalioLista[] } = {};
  expandedCenturies: { [key: string]: boolean } = {};

  filterType: 'nietErkend' | 'erkend' = 'erkend';   
  searchTerm: string = '';
  contradaNaam = '';
  beginJaar: number | null = null;
  eindJaar: number | null = null;
  invalidYear = false;
  straordinario = false;
  rinviato = false;
  cappotto = false;

  currentLanguage: SupportedLanguage = 'it';
  private langSub?: Subscription;

  constructor(
    private languageService: LanguageService,
    private translationService: TranslationService,
    private palioService: PalioService,
    private router: Router,
    private contradaService: ContradaService,
  ) { }

  async ngOnInit() {
    this.langSub = this.languageService.language$.subscribe(lang => {
      this.currentLanguage = lang;
    });

    // Originele lijst ophalen
    this.allPalioList = await this.palioService.getPalioLista();
    this.allContrade = await this.contradaService.loadContrade();

    // Eerste keer groeperen
    this.applyFilters();

    this.loading = false;
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

  goToPalioDetail(slug: string) {
    this.router.navigate(['/palio', slug]);
  }  

  goToContradaDetail(contrada: string) {
    this.router.navigate(['/contrada', contrada.toLowerCase()]);
  }  
  
  scrollToTop() {
    this.content?.scrollToTop(500);
  }

  applyFilters() {
    // Stap 1: filter erkend/nietErkend
    let filteredList: PalioLista[] = [];
    if (this.filterType === 'erkend') {
      filteredList = this.allPalioList.filter(p => !p.palio?.trim().endsWith('*'));
    } else {
      filteredList = [...this.allPalioList]; // alles
    }

    // Stap 2: filter op contradaNaam
    if (this.contradaNaam && this.contradaNaam.trim() !== '') {
      filteredList = filteredList.filter(
        p => p.contrada === this.contradaNaam
      );
    }

    // Stap 3: zoekterm
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      const words = this.searchTerm
        .toLowerCase()
        .split(/\s+/)       
        .filter(w => w); 

      filteredList = filteredList.filter(p => {
        const searchable = [
          p.palio?.toLowerCase() || '',
          p.fantino?.toLowerCase() || '',
          p.cavallo?.toLowerCase() || '',
          p.contrada?.toLowerCase() || ''
        ].join(' ');

        // Elk woord moet ergens voorkomen
        return words.every(word => searchable.includes(word));
      });
    }

    // Stap 4: filter op beginJaar en eindJaar
    if (this.beginJaar && this.eindJaar) {
      filteredList = filteredList.filter(p => {
        if (!p.palioDate) return false;

        // Neem eerste 4 cijfers van palioDate als jaar
        const jaar = parseInt(p.palioDate.toString().substring(0, 4), 10);

        return jaar >= this.beginJaar! && jaar <= this.eindJaar!;
      });
    }

    // Stap 5: filter op straordinario, rinviato, cappotto
    if (this.straordinario) {
      filteredList = filteredList.filter(p => p.straordinario);
    }
    if (this.rinviato) {
      filteredList = filteredList.filter(p => p.rinviato);
    }
    if (this.cappotto) {
      filteredList = filteredList.filter(p => p.cappotto);
    }

    // Stap 6: groeperen per eeuw
    this.groupedPalioList = filteredList.reduce((groups: any, palio) => {
      if (!palio.palioDate) return groups;

      const yearStr = palio.palioDate.toString();
      if (yearStr.length < 2) return groups;

      const centuryPrefix = yearStr.substring(0, 2);
      const centuryStart = parseInt(centuryPrefix, 10) * 100;
      const centuryLabel = `${centuryStart}`;

      if (!groups[centuryLabel]) {
        groups[centuryLabel] = [];
      }
      groups[centuryLabel].push(palio);
      return groups;
    }, {});

    // Alles standaard open
    Object.keys(this.groupedPalioList).forEach(c => {
      this.expandedCenturies[c] = true;
    });
  }

  // Sorteer eeuwen: nieuwste eerst
  sortCenturies = (a: any, b: any) => {
    const startA = parseInt(a.key.split(' ')[0], 10);
    const startB = parseInt(b.key.split(' ')[0], 10);
    return startB - startA;
  }  

  getFilteredGroupedPalioList() {
    const filtered: { [century: string]: PalioLista[] } = {};

    Object.entries(this.groupedPalioList).forEach(([century, list]) => {
      let filteredList: PalioLista[];

      if (this.filterType === 'erkend') {
        filteredList = list.filter(p => !p.palio?.trim().endsWith('*'));
      } else {
        // nietErkend = alles tonen
        filteredList = list;
      }

      if (filteredList.length > 0) {
        filtered[century] = filteredList;
      }
    });

    return filtered;
  }

  searchElenco() {
    this.applyFilters();
  }  

  chooseContrada() {
    this.applyFilters();
  }

  vai() {
    this.invalidYear = false;

    if (!this.beginJaar && !this.eindJaar) {
      this.applyFilters();
      return;
    }

    const isBeginValid = this.beginJaar && this.beginJaar.toString().length === 4;
    const isEindValid = this.eindJaar && this.eindJaar.toString().length === 4;

    if (!isBeginValid || !isEindValid) {
      this.invalidYear = true;
      return;
    }

    // Zorg dat beginJaar altijd <= eindJaar is
    const begin = Math.min(this.beginJaar!, this.eindJaar!);
    const eind = Math.max(this.beginJaar!, this.eindJaar!);

    this.beginJaar = begin;
    this.eindJaar = eind;

    this.applyFilters();
  }

  isValidYear(year: number | null): boolean {
    return year !== null && year >= 1000 && year <= 9999;
  }

  wisJaarFilter() {
    this.beginJaar = null;
    this.eindJaar = null;
    this.invalidYear = false;
    this.applyFilters();
  }  

  resetFilters() {
    this.filterType = 'erkend';   
    this.searchTerm = '';
    this.contradaNaam = '';
    this.beginJaar = null;
    this.eindJaar = null;
    this.invalidYear = false;
    this.straordinario = false;
    this.rinviato = false;
    this.cappotto = false;
    this.applyFilters();
  }
}
