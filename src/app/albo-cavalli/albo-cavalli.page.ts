import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Router } from '@angular/router';
import { LanguageService, SupportedLanguage } from '../services/language.service';
import { Subscription } from 'rxjs';
import { TranslationService } from '../services/translation.service';
import { ActivatedRoute } from '@angular/router';
import { CavalloService } from '../services/cavallo.service';
import { alboCavalli } from 'src/datatypes/cavalli';

@Component({
  selector: 'app-albo-cavalli',
  templateUrl: './albo-cavalli.page.html',
  styleUrls: ['./albo-cavalli.page.scss'],
  standalone: false,
})
export class AlboCavalliPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content?: IonContent;
  alboCavalli: alboCavalli[] = [];
  filteredAlboCavalli: alboCavalli[] = [];
  loading = true;
  hasProtocollo = false;

  searchTerm: string = '';

  anno!: string;
  annoNumber!: number;
  huidigJaar = new Date().getFullYear();
  eersteJaar = '2001'

  totaal = 0
  aantalAmmesso = 0
  nietAmmesso = 0
  aantalAssente = 0
  nietAssente = 0

  currentLanguage: SupportedLanguage = 'it';
  private langSub?: Subscription;

  constructor(
    private languageService: LanguageService,
    private translationService: TranslationService,
    private route: ActivatedRoute,
    private cavalloService: CavalloService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.anno = this.route.snapshot.paramMap.get('anno')!;
    this.annoNumber = parseInt(this.anno, 10);

    try {      
      const data = await this.cavalloService.loadAlboCavalliByYear(this.anno);

      if (data && data.length > 0) {
        this.hasProtocollo = true;
        this.alboCavalli = [...data];
        this.filteredAlboCavalli = [...data];

        this.totaal = this.alboCavalli.length;
        this.aantalAmmesso = this.alboCavalli.filter(c => c.ammesso).length;
        this.nietAmmesso = this.totaal - this.aantalAmmesso;
        this.aantalAssente = this.alboCavalli.filter(c => c.assente).length;
        this.nietAssente = this.totaal - this.aantalAssente;
      } else {
        this.hasProtocollo = false;
        this.alboCavalli = [];
        this.filteredAlboCavalli = [];
      }

    } catch (error) {
      console.error('❌ Fout bij ophalen van cavalli-data:', error);
      this.hasProtocollo = false;
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

  getTranslationParams(key: string, params?: { [key: string]: any }): string {
    return this.translationService.getTranslation(key, params);
  }

  goToCavalloDetail(id: string) {
    this.router.navigate(['/cavallo', id]);
  }
  
  scrollToTop() {
    this.content?.scrollToTop(500);
  }

  gaNaarVorigJaar() {
    const vorigJaar = parseInt(this.anno) - 1;
    this.router.navigate(['/albo-cavalli', vorigJaar.toString()]);
  }

  gaNaarVolgendeJaar() {
    const vorigJaar = parseInt(this.anno) + 1;
    this.router.navigate(['/albo-cavalli', vorigJaar.toString()]);
  }

  filterCavalli() {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      this.alboCavalli = [...this.filteredAlboCavalli];
    } else {
      this.alboCavalli = this.filteredAlboCavalli.filter(cavallo => {
        // Pas hier aan welke properties je wil doorzoeken, bv naam of id
        return cavallo.cavalloNome.toLowerCase().includes(term)
          || cavallo.cavalloId.toLowerCase().includes(term);
      });
    }
  }
}