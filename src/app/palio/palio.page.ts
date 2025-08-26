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

  goToFantinoDetail(id: string) {
    this.router.navigate(['/fantino', id]);
  }  

  goToContradaDetail(contrada: string) {
    this.router.navigate(['/contrada', contrada.toLowerCase()]);
  }  

}
