import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { PalioAnno } from 'src/datatypes/palio';

@Injectable({
  providedIn: 'root'
})
export class PalioService {

  constructor(private http: HttpClient) { }

  async getFantinoByAnno(anno: string): Promise<PalioAnno[]> {
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
}
