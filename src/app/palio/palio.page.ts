import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { PaliotuttoService } from '../services/paliotutto.service';
import { PalioTutto } from 'src/datatypes/palioTutto';
import { LanguageService, SupportedLanguage } from '../services/language.service';
import { Subscription } from 'rxjs';
import { TranslationService } from '../services/translation.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-palio',
  templateUrl: './palio.page.html',
  styleUrls: ['./palio.page.scss'],
  standalone: false,
})
export class PalioPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content?: IonContent;
  slug: string | null = null;
  palio?: PalioTutto;
  loading = true;
  showInfo = true;
  activeTab: string = 'home';

  safeYoutubeUrl: SafeResourceUrl = null!;

  presentazioneColumns: any[][] = [];

  currentLanguage: SupportedLanguage = 'it';
  private langSub?: Subscription;  

  constructor(
    private route: ActivatedRoute,
    private palioService: PaliotuttoService,
    private router: Router,
    private languageService: LanguageService,
    private translationService: TranslationService, 
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug');

    if (this.slug) {
      this.palioService.getPalio(this.slug).subscribe({
        next: (data) => {
          this.palio = data;
          this.safeYoutubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.youtube.com/embed/${this.palio?.video}`
          );
          this.loading = false;
          console.log('✅ Palio data geladen:', this.palio);
          this.chunkPresentazione();
        },
        error: (err) => {
          console.error('❌ Fout bij ophalen palio', err);
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }

    this.langSub = this.languageService.language$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  scrollToTop() {
    this.content?.scrollToTop(500);
  }

  gaNaarVorigePalio() {
    this.router.navigate(['/palio', this.palio?.precedente]);
  }

  gaNaarVolgendePalio() {
    this.router.navigate(['/palio', this.palio?.successivo]);
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

  goToFantinoDetail(id: string | null | undefined) {
    if (!id) return;
    this.router.navigate(['/fantino', id]);
  }  

  goToContradaDetail(contrada: string) {
    this.router.navigate(['/contrada', contrada.toLowerCase()]);
  }  

  goToProtocolloPage(anno: string) {
    this.router.navigate(['/albo-cavalli', anno]);
  }

  get sortedAccoppiate() {
    if (!this.palio?.accoppiate) return [];

    return [...this.palio.accoppiate].sort((a, b) => {
      // Als a.canape of b.canape null is → zet achteraan
      if (!a.canape && b.canape) return 1;  // a achter b
      if (!b.canape && a.canape) return -1; // b achter a
      if (!a.canape && !b.canape) return 0; // beide null → gelijk

      let idA = Number(a.canape?.id ?? 0);
      let idB = Number(b.canape?.id ?? 0);

      // Zet id 10 altijd helemaal achteraan
      if (idA === 10) idA = Number.MAX_SAFE_INTEGER;
      if (idB === 10) idB = Number.MAX_SAFE_INTEGER;

      return idA - idB;
    });
  }

  sortByOrdine() {
    if (this.palio?.assegnazione) {
      this.palio.assegnazione = [...this.palio.assegnazione].sort((a, b) => a.ordine - b.ordine);
    }
  }

  sortByOrecchio() {
    if (this.palio?.assegnazione) {
      this.palio.assegnazione = [...this.palio.assegnazione].sort((a, b) => a.orecchio - b.orecchio);
    }
  }

  chunkPresentazione() {
    const array = this.palio?.presentazione || [];
    const size = 2; // 2 kolommen
    this.presentazioneColumns = [];

    for (let i = 0; i < array.length; i += size) {
      this.presentazioneColumns.push(array.slice(i, i + size));
    }
  }
}
