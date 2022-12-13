import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


import { AppConstants } from '../app-constants';
import { NiveisLeiturasService } from '../service/niveis-leituras.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {



  constructor(private relatorio: NiveisLeiturasService) { }


  ngOnInit(): void {


  }

  gerarPdf(){
    console.log(this.relatorio.downloadPdfRelatorio())
  }

}

