import { Injectable } from '@angular/core';
import { cavalli, VintoGroup, CavalloDetail, alboCavalli } from 'src/datatypes/cavalli';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CavalloService {
  constructor(private http: HttpClient) { }

  async getCavalloById(id: string): Promise<CavalloDetail> {
    const cavallo = await firstValueFrom(
      this.http.get<CavalloDetail>(`${environment.apiURL}cavalli/cavalloAll/${id}`).pipe(
        map(this._normalizeCavalloDetail.bind(this))
      )
    );
    return cavallo;
  }

  async loadCavalliVintiOrdered(): Promise<VintoGroup[]> {
    try {
      const vintiGroups = await firstValueFrom(
        this.http.get<VintoGroup[]>(`${environment.apiURL}cavalli/vintiordered`)
      );

      // Normaliseer elke cavallo in de groepen
      const normalized = vintiGroups.map(group => ({
        vinto: group.vinto,
        cavalli: group.cavalli.map(this._normalizeCavallo)
      }));

      return normalized;
    } catch (err) {
      console.error('❌ Fout bij ophalen cavalli vinti:', err);
      return [];
    }
  }

  searchCavalli(zoekterm: string): Observable<cavalli[]> {
    if (!zoekterm || zoekterm.trim().length === 0) {
      return of([]);
    }

    return this.http
      .get<any[]>(`${environment.apiURL}searchCavalli.php?search=${encodeURIComponent(zoekterm)}`)
      .pipe(
        map(resultaten => resultaten.map(this._normalizeCavallo))
      );
  }

  async loadAlboCavalliByYear(anno: string): Promise<alboCavalli[]> {
    const alboCavalli = await firstValueFrom(
      this.http.get<alboCavalli[]>(`${environment.apiURL}alboCavalli/${anno}`).pipe(
        map(items => items.map(c => ({
          ...c,
          ammesso: Number(c.ammesso) === 1,
          assente: Number(c.assente) === 1,
        })))
      )
    );
    return alboCavalli;
  }

  private _normalizeCavallo(c: any): cavalli {
    return {
      ...c,
      tratta: Number(c.tratta) === 1,
      previsite: Number(c.previsite) === 1,
      proveDiNotte: Number(c.proveDiNotte) === 1,
      protocollo: Number(c.protocollo) === 1,
      paliiVinti: c.paliiVinti ?? 0,
      presenzeTratta: Number(c.presenzeTratta),
      presenzeProveDiNotte: Number(c.presenzeProveDiNotte),
      paliiCorsi: Number(c.paliiCorsi),
    };
  }

  private _normalizeCavalloDetail(c: any): CavalloDetail {
  return {
    ...this._normalizeCavallo(c),
    palioCorso: (c.palioCorso ?? []).map((p: any) => ({
      ...p,
      vinto: Number(p.vinto) === 1,
      caduto: Number(p.caduto) === 1
    }))
  };
}
}
