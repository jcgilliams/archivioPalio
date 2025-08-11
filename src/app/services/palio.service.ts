import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { PalioAnno, Palio } from 'src/datatypes/palio';

@Injectable({
  providedIn: 'root'
})
export class PalioService {

  constructor(private http: HttpClient) { }

  async getPalioByAnno(anno: string): Promise<PalioAnno[]> {
    const palioAnno = await firstValueFrom(
      this.http.get<PalioAnno[]>(`${environment.apiURL}palio/anno/${anno}`).pipe(
        map((items: any[]): PalioAnno[] => 
          items.map((p: any) => ({
            ...p,
            vinto: Number(p.vinto) === 1
          }))
        ),
      )
    );
    return palioAnno;
  }

  async getPalio(): Promise<Palio[]> {
    const palio = await firstValueFrom(
      this.http.get<Palio[]>(`${environment.apiURL}palio`).pipe(
        map((items: any[]): Palio[] => 
          items.map((p: any) => ({
            ...p,
            straordinario: Number(p.straordinario) === 1,
            rinviato: Number(p.straordinario) === 1,
            cappotto: Number(p.straordinario) === 1
          }))
        ),
      )
    );
    return palio;
  }
}
