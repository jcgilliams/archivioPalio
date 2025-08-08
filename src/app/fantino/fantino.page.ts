import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FantinoService } from '../services/fantino.service';
import { FantinoDetail } from 'src/datatypes/fantini';
import { IonContent } from '@ionic/angular';
import { LanguageService, SupportedLanguage } from '../services/language.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-fantino',
  templateUrl: './fantino.page.html',
  styleUrls: ['./fantino.page.scss'],
  standalone: false,
})
export class FantinoPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content?: IonContent;
  fantino: FantinoDetail | null = null;
  id: string | null = null;
  percentualeVinti = 0;
  loading = true;

  showInfo = true;
  showExperience = true;
  showPalio = true;

  openAccordionValues: string[] = [];

  currentLanguage: SupportedLanguage = 'it';
  private langSub?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fantinoService: FantinoService,
    private languageService: LanguageService,
    private translationService: TranslationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.langSub = this.languageService.language$.subscribe(lang => {
      this.currentLanguage = lang;
    });

    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.loadFantino(this.id);
      }
    });
    this.loading = false;
  }

  ngOnDestroy() {
    this.langSub?.unsubscribe();
  }

  private async loadFantino(id: string) {
    try {
      const data = await this.fantinoService.getFantinoById(id);
      this.fantino = data;
      console.log('Fantino data:', this.fantino);

      // Vermijd delen door nul
      if (this.fantino.paliiCorsi > 0) {
        this.percentualeVinti = Number(
          ((this.fantino.paliiVinti / this.fantino.paliiCorsi) * 100).toFixed(1)
        );
      } else {
        this.percentualeVinti = 0;
      }

    } catch (error) {
      console.error('Error on loading fantino:', error);
      this.fantino = null;
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

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }

  goToCavalloDetail(id: string) {
    this.router.navigate(['/cavallo', id]);
  }

  goToPalioDetail(slug: string) {
    this.router.navigate(['/palio', slug]);
  }  

  goToContradaDetail(contrada: string) {
    this.router.navigate(['/contrada', contrada.toLowerCase()]);
  }  
}
