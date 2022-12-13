import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { interval, timer } from 'rxjs';
import { Observable } from 'rxjs';
import { NiveisLeituras } from '../model/niveis-leituras';
import { NiveisLeiturasService } from '../service/niveis-leituras.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  leituras: Observable<NiveisLeituras>;
  nLeituras:Array<NiveisLeituras>;

  //observableDados: any;
  public chart:any;
  //public dataFomat:String;

  constructor(private leituraService: NiveisLeiturasService) { }

  //@ViewChild("meuCanvas")elemento: ElementRef;

  ngOnInit(): void {
     /* interval(3000).subscribe(()=>{
      this.leituraService.getNiveis().subscribe(data =>{
        this.leituras = data;
        this.nLeituras =data;
        console.log(data)
      })
    })
    */
   this.leituraService.getNiveisDataAtual().subscribe(data=>{
    this.leituras = data;
    this.nLeituras = data;
    this.ngOnChanges();
   // this.createChart();

  })

  }


  ngOnChanges():void{
    interval(100000).subscribe(()=>{
      this.leituraService.getNiveisDataAtual().subscribe(data =>{
        this.leituras = data;
        this.nLeituras =data;
        console.log(data)
      })
    })

  }

 /* createChart(){

    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['POTASSIO', 'NITROGENIO', 'FOSFORO' ],
	       datasets: [
          {
            label: new Date(this.nLeituras[0].data).toString(),
            data: [this.nLeituras[0].potassio, this.nLeituras[0].nitrogenio, this.nLeituras[0].fosforo],
            backgroundColor: 'blue'
          },

        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }*/

  /* formata data
  formataData(){
    let dia = new Date(this.nLeituras[0].data).getDate().toString();
    let mes = (new Date(this.nLeituras[0].data).getMonth()+1).toString();
    let ano = new Date(this.nLeituras[0].data).getFullYear().toString();
    this.dataFomat = dia+"/"+mes+"/"+ano;
  }
  */

}
