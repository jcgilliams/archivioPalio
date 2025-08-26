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
  showFilter = true;

  allPalioList: PalioLista[] = [];  
  allContrade: Contrade[] = [];
  filteredPalioList: PalioLista[] = [];  // alleen deze nodig

  filterType: 'nietErkend' | 'erkend' = 'erkend';   
  searchTerm: string = '';
  contradaNaam = '';
  beginJaar: number | null = null;
  eindJaar: number | null = null;
  invalidYear = false;
  straordinario = false;
  rinviato = false;
  cappotto = false;

  pageSize = 20;
  currentPage = 1;

  currentLanguage: SupportedLanguage = 'it';
  private langSub?: Subscription;

  constructor(
    private languageService: LanguageService,
    private translationService: TranslationService,
    private palioService: PalioService,
    private router: Router,
    private contradaService: ContradaService,
  ) {}

  async ngOnInit() {
    this.langSub = this.languageService.language$.subscribe(lang => {
      this.currentLanguage = lang;
    });

    if (window.innerWidth <= 768) { 
      this.showFilter = false;
    }

    this.allPalioList = await this.palioService.getPalioLista();
    this.allContrade = await this.contradaService.loadContrade();

    this.applyFilters();
    this.loading = false;
  }

  ngOnDestroy() {
    this.langSub?.unsubscribe();
  }

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }

  goToCavalloDetail(id: string) { this.router.navigate(['/cavallo', id]); }
  goToFantinoDetail(id: string) { this.router.navigate(['/fantino', id]); }  
  goToPalioDetail(slug: string) { this.router.navigate(['/palio', slug]); }  
  goToContradaDetail(contrada: string) { this.router.navigate(['/contrada', contrada.toLowerCase()]); }  

  scrollToTop() { this.content?.scrollToTop(500); }

  applyFilters() {
    this.currentPage = 1;
    let filteredList = [...this.allPalioList];

    if (this.filterType === 'erkend') {
      filteredList = filteredList.filter(p => !p.palio?.trim().endsWith('*'));
    }

    if (this.contradaNaam.trim() !== '') {
      filteredList = filteredList.filter(p => p.contrada === this.contradaNaam);
    }

    if (this.searchTerm.trim() !== '') {
      const words = this.searchTerm.toLowerCase().split(/\s+/).filter(w => w);
      filteredList = filteredList.filter(p => {
        const searchable = [
          p.palio?.toLowerCase() || '',
          p.fantino?.toLowerCase() || '',
          p.cavallo?.toLowerCase() || '',
          p.contrada?.toLowerCase() || ''
        ].join(' ');
        return words.every(word => searchable.includes(word));
      });
    }

    if (this.beginJaar && this.eindJaar) {
      filteredList = filteredList.filter(p => {
        if (!p.palioDate) return false;
        const jaar = parseInt(p.palioDate.toString().substring(0, 4), 10);
        return jaar >= this.beginJaar! && jaar <= this.eindJaar!;
      });
    }

    if (this.straordinario) filteredList = filteredList.filter(p => p.straordinario);
    if (this.rinviato) filteredList = filteredList.filter(p => p.rinviato);
    if (this.cappotto) filteredList = filteredList.filter(p => p.cappotto);

    // Sorteren: nieuwste eerst
    this.filteredPalioList = filteredList.sort((a, b) => {
      const jaarA = a.palioDate ? parseInt(a.palioDate.toString().substring(0, 4), 10) : 0;
      const jaarB = b.palioDate ? parseInt(b.palioDate.toString().substring(0, 4), 10) : 0;
      return jaarB - jaarA;
    });
  }

  getPagedItems(): PalioLista[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredPalioList.slice(start, start + this.pageSize);
  }

  searchElenco() { this.applyFilters(); }  
  chooseContrada() { this.applyFilters(); }

  vai() {
    this.invalidYear = false;
    if (!this.beginJaar && !this.eindJaar) { this.applyFilters(); return; }
    const isBeginValid = this.beginJaar && this.beginJaar.toString().length === 4;
    const isEindValid = this.eindJaar && this.eindJaar.toString().length === 4;
    if (!isBeginValid || !isEindValid) { this.invalidYear = true; return; }
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

  get totalPages(): number {
    return Math.ceil(this.filteredPalioList.length / this.pageSize);
  }

  get pageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }  
}
