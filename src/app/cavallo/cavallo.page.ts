import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CavalloService } from '../services/cavallo.service';
import { CavalloDetail } from 'src/datatypes/cavalli';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-cavallo',
  templateUrl: './cavallo.page.html',
  styleUrls: ['./cavallo.page.scss'],
  standalone: false,
})
export class CavalloPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content?: IonContent;
  cavallo: CavalloDetail | null = null;
  id: string | null = null;
  percentualeVinti = 0;
  loading = true;

  showInfo = true;
  showExperience = true;
  showPalio = true;

  openAccordionValues: string[] = [];
  isMobile = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cavalloService: CavalloService,
  ) { }

  ngOnInit() {
    this.checkScreenWidth();

    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.loadCavallo(this.id);
      }
    });
    this.loading = false;
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
}


