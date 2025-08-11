import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-palio',
  templateUrl: './palio.page.html',
  styleUrls: ['./palio.page.scss'],
  standalone: false,
})
export class PalioPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content?: IonContent;
  slug: string | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug');

    this.loading = false;
  }

  scrollToTop() {
    this.content?.scrollToTop(500);
  }

}
