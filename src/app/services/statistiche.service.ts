import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { vittorieCitta, vittorieContrade, ultimaVittoria } from 'src/datatypes/statistiche';

@Injectable({
  providedIn: 'root'
})
export class StatisticheService {

  constructor(private http: HttpClient) { }

  async getUltimaVittoria(): Promise<ultimaVittoria[]> {
    const ultimaVittoria = await firstValueFrom(
      this.http.get<ultimaVittoria[]>(`${environment.apiURL}statistiche/ultimaVittoria`).pipe(
        map((items: any[]): ultimaVittoria[] => 
          items.map((p: any) => ({
            ...p,
          }))
        ),
      )
    );
    return ultimaVittoria;
  }  

  async getVittorieContrade(): Promise<vittorieContrade[]> {
    const vittorieContrade = await firstValueFrom(
      this.http.get<vittorieContrade[]>(`${environment.apiURL}statistiche/vittorieContrade`).pipe(
        map((items: any[]): vittorieContrade[] => 
          items.map((p: any) => ({
            ...p,
          }))
        ),
      )
    );
    return vittorieContrade;
  }  
  
  async getVittorieCitta(): Promise<vittorieCitta[]> {
    const vittorieCitta = await firstValueFrom(
      this.http.get<vittorieCitta[]>(`${environment.apiURL}statistiche/vittorieCitta`).pipe(
        map((items: any[]): vittorieCitta[] => 
          items.map((p: any) => ({
            ...p,
          }))
        ),
      )
    );
    return vittorieCitta;
  }    
}
