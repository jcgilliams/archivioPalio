import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-palio',
  templateUrl: './palio.page.html',
  styleUrls: ['./palio.page.scss'],
  standalone: false,
})
export class PalioPage implements OnInit {
  slug: string | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug');

    this.loading = false;
  }
}
