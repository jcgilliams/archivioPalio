import { Component, OnInit, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CavalloService } from '../services/cavallo.service';
import { CavalloDetail } from 'src/datatypes/cavalli';
import { IonContent } from '@ionic/angular';
import { LanguageService, SupportedLanguage } from '../services/language.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-cavallo',
  templateUrl: './cavallo.page.html',
  styleUrls: ['./cavallo.page.scss'],
  standalone: false,
})
export class CavalloPage implements OnInit,OnDestroy {
  @ViewChild(IonContent, { static: false }) content?: IonContent;
  cavallo: CavalloDetail | null = null;
  id: string | null = null;
  percentualeVinti = 0;
  loading = true;

  showInfo = true;
  showExperience = true;
  showPalio = true;
  showBatterie = true;
  showProveDiNotte = true;

  openAccordionValues: string[] = [];
  isMobile = false;

  currentLanguage: SupportedLanguage = 'it';
  private langSub?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cavalloService: CavalloService,
    private languageService: LanguageService,
    private translationService: TranslationService,
    private router: Router,
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
    return this.translationService.getTranslation(key);
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
  
}


