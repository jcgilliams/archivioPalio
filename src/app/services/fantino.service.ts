import { Injectable } from '@angular/core';
import { fantini, FantinoDetail, VintoGroupFantini, fantiniDecennium } from 'src/datatypes/fantini';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FantinoService {

  constructor(private http: HttpClient) { }

  async getFantinoById(id: string): Promise<FantinoDetail> {
    const fantino = await firstValueFrom(
      this.http.get<FantinoDetail>(`${environment.apiURL}fantini/fantinoAll/${id}`).pipe(
        map(this._normalizeFantinoDetail.bind(this))
      )
    );
    return fantino;
  }  

  async loadFantiniVintiOrdered(): Promise<VintoGroupFantini[]> {
    try {
      const vintiGroups = await firstValueFrom(
        this.http.get<VintoGroupFantini[]>(`${environment.apiURL}fantini/vintiordered`)
      );
    
      return vintiGroups;
    } catch (err) {
      console.error('❌ Fout bij ophalen fantini vinti:', err);
      return [];
    }
  }

  async loadFantiniDecennium(decennium: string): Promise<fantiniDecennium[]> {
    try {
      const fantiniDecennium = await firstValueFrom(
        this.http.get<fantiniDecennium[]>(`${environment.apiURL}fantini/decennium/${decennium}`)
      );
    
      return fantiniDecennium;
    } catch (err) {
      console.error('❌ Fout bij ophalen fantini decennium:', err);
      return [];
    }
  }  

  searchFantini(zoekterm: string): Observable<fantini[]> {
    if (!zoekterm || zoekterm.trim().length === 0) {
      return of([]);
    }

    return this.http
      .get<any[]>(`${environment.apiURL}searchFantini.php?search=${encodeURIComponent(zoekterm)}`)
      .pipe(
        map(resultaten => resultaten.map(this._normalizeFantino))
      );
  } 

  private _normalizeFantino(c: any): fantini {
    return {
      ...c,
      paliiVinti: c.paliiVinti ?? 0,
      paliiCorsi: Number(c.paliiCorsi),
    };
  }  

  private _normalizeFantinoDetail(f: any): FantinoDetail {
    return {
      ...f,
      palioCorso: (f.palioCorso ?? []).map((p: any) => ({
        ...p,
        vinto: Number(p.vinto) === 1,
        caduto: Number(p.caduto) === 1
      }))
    };
  }
 
}
