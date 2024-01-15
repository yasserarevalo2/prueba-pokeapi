import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService{

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient){ }

  GetPokemons(index: any){
    return this.http.get<any>(`${this.baseUrl}/pokemon/${index}`)
  }
}
