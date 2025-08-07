import { Injectable } from '@angular/core';
import { Config } from '../../datatypes/config';
import { catchError, firstValueFrom, map, of, BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public config$: Observable<Config | null>;
  private configSubject = new BehaviorSubject<Config | null>(null);

  constructor(private http: HttpClient) { 
      this.config$ = this.configSubject.asObservable();
  }

  async loadConfig(id: number): Promise<void> {
    const config = await this.retrieveConfig(id);
    this.configSubject.next(config);
  }

  async retrieveConfig(id: number): Promise<Config | null> {
    const config = await firstValueFrom(
      this.http.get<Config>(`${environment.apiURL}config?id=${id}`).pipe(
        map((c: any): Config => ({
          ...c,
          live: Number(c.live) === 1
        })),
        catchError(() => {
          console.warn('⚠️ Geen config gevonden met id:', id);
          return of(null);
        })
      )
    );
    return config;
  }
}
