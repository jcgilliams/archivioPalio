import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PalioTutto } from 'src/datatypes/palioTutto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaliotuttoService {

  constructor(private http: HttpClient) { }

    getPalio(palioDate: string): Observable<PalioTutto> {
    return this.http.get<any>(`${environment.apiURL}palioTutto/${palioDate}`).pipe(
      map(data => this.transformPalio(data)) 
    );
  }

  private transformPalio(data: any): PalioTutto {
    return {
      ...data,
      straordinario: Number(data.straordinario) === 1,
      rinviato: Number(data.rinviato) === 1,
      cappotto: Number(data.cappotto) === 1,
      accoppiate: data.accoppiate.map((a: any) => ({
        ...a,
        caduto: Number(a.caduto) === 1,
        vinto: Number(a.vinto) === 1,
      })),
      proveDiNotte: data.proveDiNotte.map((notte: any) => ({
        ...notte,
        prove: notte.prove.map((prova: any) => ({
          ...prova,
          cavalli: prova.cavalli.map((c: any) => ({
            ...c,
            caduto: Number(c.caduto) === 1,
          }))
        }))
      })),
      previsite: data.previsite.map((pr: any) => ({
        ...pr,
        assente: Number(pr.assente) === 1,
      })),
      proveDiNotteAssente: data.proveDiNotteAssente.map((pr: any) => ({
        ...pr,
      })),
      assegnazione: data.assegnazione.map((as: any) => ({
        ...as,
      })),
      presentazione: data.presentazione.map((pr: any) => ({
        ...pr,
      })),
      presentazioneAssente: data.presentazioneAssente.map((pra: any) => ({
        ...pra,
      })),
      batterie: data.batterie.map((bat: any) => ({
        ...bat,
        cavallo: bat.cavalli.map((c: any) => ({
          ...c,
          caduto: Number(c.caduto) === 1,
          vinto: Number(c.vinto) === 1,
        })),
      })),   
      prove: data.prove.map((pro: any) => ({
        ...pro,
        accoppiate: pro.accoppiate.map((a: any) => ({
        ...a,
        caduto: Number(a.caduto) === 1,
        vinto: Number(a.vinto) === 1,
        }))  
      })),      
    } as PalioTutto;
  }
}
