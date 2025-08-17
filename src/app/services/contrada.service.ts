import { Injectable } from '@angular/core';
import { Contrade } from 'src/datatypes/contrade';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContradaService {

  constructor(private http: HttpClient) { }

  async loadContrade(): Promise<Contrade[]> {
    try {
      const Contrade = await firstValueFrom(
        this.http.get<Contrade[]>(`${environment.apiURL}contrade`)
      );
    
      return Contrade;
    } catch (err) {
      console.error('❌ Fout bij ophalen Contrade:', err);
      return [];
    }
  }      
}
