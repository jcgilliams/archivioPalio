import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService, SupportedLanguage } from 'src/app/services/language.service';
import { Subscription } from 'rxjs';
import { TranslationService } from 'src/app/services/translation.service';
import { CavalloService } from 'src/app/services/cavallo.service';
import { cavalliDecennium } from 'src/datatypes/cavalli';

@Component({
  selector: 'app-decennio',
  templateUrl: './decennio.page.html',
  styleUrls: ['./decennio.page.scss'],
  standalone: false,
})
export class DecennioPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content?: IonContent;
  cavalliDecenniumList: cavalliDecennium[] = [];
  loading = true;

  periode!: string;
  apiCode!: string;
  aantalCavalliInPeriode = 0;

  showCavalli = true;
  showDecennio = true;

  periodes: string[] = [];
  periodesMetAantal: { periode: string; aantal: number }[] = [];

  currentLanguage: SupportedLanguage = 'it';
  private langSub?: Subscription;

  constructor(
    private languageService: LanguageService,
    private translationService: TranslationService,
    private route: ActivatedRoute,
    private cavalloService: CavalloService,
    private router: Router
  ) {
      for(let start = 2020; start >= 1900; start -= 10) {
        this.periodes.push(`${start}-${start+9}`);
      }
   }

  async ngOnInit() {
    try { 
      this.periode = this.route.snapshot.paramMap.get('periode')!;
      this.apiCode = this.periode.substring(0, 3);

      this.cavalliDecenniumList = await this.cavalloService.loadCavalliDecennium(this.apiCode);

      this.aantalCavalliInPeriode = this.cavalliDecenniumList.length;

      await this.loadAantalPeriodes();
    } catch (error) {
      console.error('❌ Fout bij ophalen van cavalli-data:', error);
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
        console.error(`Fout bij ophalen fantini decennium voor ${periode}:`, error);
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

  getTranslationParams(key: string, params?: { [key: string]: any }): string {
    return this.translationService.getTranslation(key, params);
  }

  goToCavalloDetail(id: string) {
    this.router.navigate(['/cavallo', id]);
  }

  goToDecennio(input: string) {
    this.router.navigate(['/cavalli/decennio', input]);
  } 
  
  scrollToTop() {
    this.content?.scrollToTop(500);
  }

}
