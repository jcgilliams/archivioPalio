import { Injectable } from '@angular/core';
import { FantinoDetail, VintoGroupFantini } from 'src/datatypes/fantini';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';

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
