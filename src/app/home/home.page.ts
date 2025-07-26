import { Component, OnInit,ViewChild } from '@angular/core';
import { CavalloService } from '../services/cavallo.service';
import { VintoGroup } from 'src/datatypes/cavalli';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  @ViewChild(IonContent, { static: false }) content?: IonContent;
  searchTerm: string = '';
  cavalliVintiOrdered: VintoGroup[] = [];
  filteredCavalliVintiOrdered: VintoGroup[] = [];
  loading = true;

  showPalio = true;
  showCavalli = true;
  showFantini = true;
  showExtra = true;
  showExtraBis = true;

  openAccordionValues: string[] = [];

  constructor(
    private cavalloService: CavalloService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.cavalliVintiOrdered = await this.cavalloService.loadCavalliVintiOrdered();
    this.filteredCavalliVintiOrdered = [...this.cavalliVintiOrdered]; 
    this.openAccordionValues = this.filteredCavalliVintiOrdered.map(g => g.vinto.toString());
    this.loading = false;
  }

  goToCavalloDetail(id: string) {
    this.router.navigate(['/cavallo', id]);
  }

  toggleAccordion(value: string) {
    const index = this.openAccordionValues.indexOf(value);
    if(index > -1) {
      this.openAccordionValues.splice(index, 1);
    } else {
      this.openAccordionValues.push(value);
    }
  }
  
  filterCavalli() {
    const term = this.searchTerm.toLowerCase();

    if (!term) {
      // Geen zoekterm, toon alle groepen zoals normaal
      this.filteredCavalliVintiOrdered = [...this.cavalliVintiOrdered];
    } else {
      // Filter elke groep, houd alleen cavalli die matchen op naam
      this.filteredCavalliVintiOrdered = this.cavalliVintiOrdered
        .map(group => {
          const filteredCavalli = group.cavalli.filter(cavallo =>
            cavallo.nome.toLowerCase().includes(term)
          );
          return {
            ...group,
            cavalli: filteredCavalli
          };
        })
        // optioneel: groepen zonder cavalli wegfilteren
        .filter(group => group.cavalli.length > 0);
    }

    // Open alle accordeons van de gefilterde groepen
    this.openAccordionValues = this.filteredCavalliVintiOrdered.map(g => g.vinto.toString());
  }
    
  scrollToTop() {
    this.content?.scrollToTop(500);
  }
}
