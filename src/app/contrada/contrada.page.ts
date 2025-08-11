import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-contrada',
  templateUrl: './contrada.page.html',
  styleUrls: ['./contrada.page.scss'],
  standalone: false,
})
export class ContradaPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content?: IonContent;
  nome: string | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.nome = this.route.snapshot.paramMap.get('nome');
    this.loading = false;
  }

  async ionViewWillEnter() {
    this.content?.scrollToTop(0);
  }
  
  scrollToTop() {
    this.content?.scrollToTop(500);
  }
}
