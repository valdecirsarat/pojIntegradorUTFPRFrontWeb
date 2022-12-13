import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



import{interval, Observable} from "rxjs";
import { AppConstants } from '../app-constants';


@Injectable({
  providedIn: 'root'
})
export class NiveisLeiturasService {

  constructor(private http: HttpClient) { }


  getNiveisDataAtual(): Observable <any>{

    return this.http.get<any>(AppConstants.baseNiveisLeitura);

  }

  getNiveis():Observable <any>{
    return this.http.get<any>(AppConstants.baseNiveisLeituras2);
  }


  downloadPdfRelatorio(){
    return this.http.get(AppConstants.baseRelatorios+"2",{responseType:"text"}).subscribe(data =>{
       document.querySelector('iframe')!.src= data;
    })
  }




}


