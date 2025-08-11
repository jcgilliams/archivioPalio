import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { LanguageService, SupportedLanguage } from '../services/language.service';
import { Subscription } from 'rxjs';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-contrade',
  templateUrl: './contrade.page.html',
  styleUrls: ['./contrade.page.scss'],
  standalone: false,
})
export class ContradePage implements OnInit {
  @ViewChild(IonContent, { static: false }) content?: IonContent;
  loading = true;

  currentLanguage: SupportedLanguage = 'it';
  private langSub?: Subscription;

  constructor(
    private languageService: LanguageService,
    private translationService: TranslationService,
  ) { }

  ngOnInit() {
    this.loading = false;
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
  
  scrollToTop() {
    this.content?.scrollToTop(500);
  }
}
