import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contrada',
  templateUrl: './contrada.page.html',
  styleUrls: ['./contrada.page.scss'],
  standalone: false,
})
export class ContradaPage implements OnInit {
  nome: string | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.nome = this.route.snapshot.paramMap.get('nome');
    this.loading = false;
  }
}
