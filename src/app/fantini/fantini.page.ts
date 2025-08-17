import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { LanguageService, SupportedLanguage } from '../services/language.service';
import { Subscription } from 'rxjs';
import { TranslationService } from '../services/translation.service';
import { FantinoService } from '../services/fantino.service';
import { fantini, fantiniDecennium, VintoGroupFantini } from 'src/datatypes/fantini';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fantini',
  templateUrl: './fantini.page.html',
  styleUrls: ['./fantini.page.scss'],
  standalone: false,
})
export class FantiniPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content?: IonContent;
  loading = true;

  currentLanguage: SupportedLanguage = 'it';
  private langSub?: Subscription;

  searchTerm: string = '';

  zoekterm: string = '';
  zoekResultaten: fantini[] = [];

  periodes: string[] = [];
  periodesMetAantal: { periode: string; aantal: number }[] = [];

  fantiniVintiOrdered: VintoGroupFantini[] = [];
  filteredFantiniVintiOrdered: VintoGroupFantini[] = [];
  
  showFantini = true;
  showSearch = true;
  showDecennio = true;

  openAccordionValues: string[] = [];

  private zoekTimeout: any;  

  constructor(    
    private fantiniService: FantinoService,
    private languageService: LanguageService,
    private translationService: TranslationService,
    private router: Router) {
       for(let start = 2020; start >= 1900; start -= 10) {
        this.periodes.push(`${start}-${start+9}`);
      }
   }

  async ngOnInit() {
    try {
      this.fantiniVintiOrdered = await this.fantiniService.loadFantiniVintiOrdered();
      this.filteredFantiniVintiOrdered = [...this.fantiniVintiOrdered]; 
      this.openAccordionValues = this.filteredFantiniVintiOrdered.map(g => g.vinto.toString());

      await this.loadAantalPeriodes();

    } catch (error) {
      console.error('❌ Fout bij ophalen van fantini-data:', error);
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
        const fantiniDecenniumList: fantiniDecennium[] = await this.fantiniService.loadFantiniDecennium(apiCode);
        
        this.periodesMetAantal.push({
          periode,
          aantal: fantiniDecenniumList.length
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

  goToFantinoDetail(id: string) {
    this.router.navigate(['/fantino', id]);
  }

  goToDecennio(input: string) {
    this.router.navigate(['/fantini/decennio', input]);
  }


  toggleAccordion(value: string) {
    const index = this.openAccordionValues.indexOf(value);
    if(index > -1) {
      this.openAccordionValues.splice(index, 1);
    } else {
      this.openAccordionValues.push(value);
    }
  }

  filterFantini() {
    const term = this.searchTerm.toLowerCase();

    if (!term) {
      // Geen zoekterm, toon alle groepen zoals normaal
      this.filteredFantiniVintiOrdered = [...this.fantiniVintiOrdered];
    } else {
      // Filter elke groep, houd alleen cavalli die matchen op naam
      this.filteredFantiniVintiOrdered = this.fantiniVintiOrdered
        .map(group => {
          const filteredFantini = group.fantini.filter(fantini =>
            (fantini.nome && fantini.nome.toLowerCase().includes(term)) ||
            (fantini.soprannome && fantini.soprannome.toLowerCase().includes(term))
          );
          return {
            ...group,
            fantini: filteredFantini
          };
        })
        // optioneel: groepen zonder cavalli wegfilteren
        .filter(group => group.fantini.length > 0);
    }

    // Open alle accordeons van de gefilterde groepen
    this.openAccordionValues = this.filteredFantiniVintiOrdered.map(g => g.vinto.toString());
  }
    
  scrollToTop() {
    this.content?.scrollToTop(500);
  }

  searchFantino() {
    clearTimeout(this.zoekTimeout);

    const term = this.zoekterm.trim();

    if (term.length < 1) {
      this.zoekResultaten = [];
      return;
    }

    this.zoekTimeout = setTimeout(() => {
      this.fantiniService.searchFantini(term).subscribe({
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