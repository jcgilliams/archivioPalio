import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CavalloService } from '../services/cavallo.service';
import { cavalli } from 'src/datatypes/cavalli';

@Component({
  selector: 'app-cavallo',
  templateUrl: './cavallo.page.html',
  styleUrls: ['./cavallo.page.scss'],
  standalone: false,
})
export class CavalloPage implements OnInit {
  cavallo: cavalli | null = null;
  id: string | null = null;
  percentualeVinti = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cavalloService: CavalloService,
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.loadCavallo(this.id);
      }
    });
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
}


