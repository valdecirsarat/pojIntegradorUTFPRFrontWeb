import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NiveisLeituras } from '../model/niveis-leituras';
import { NiveisLeiturasService } from '../service/niveis-leituras.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {

  @ViewChild('myDomeElement', {static:true}) MyDomElement: ElementRef;
  nLeituras:Array<NiveisLeituras>;
  public chart:any;



  nph:Array<any> = [];
  dia:Array<any> = [];
  ntemperatura:Array<any> = [];
  nnitrogenio:Array<any> = [];
  nfosforo:Array<any> = [];
  npotassio:Array<any> = [];

  constructor(private leituraService: NiveisLeiturasService) { }

  ngOnInit(): void {
    this.leituraService.getNiveis().subscribe(data=>{
      this.nLeituras = data;
      //this.nLeituras = data;
      this.createChart();
      this.criarChart(this.dia, this.nph, this.ntemperatura, this.nnitrogenio,this.nfosforo, this.npotassio);



    })
  }


  createChart(){
    for (let index = 0; index < this.nLeituras.length; index++) {
      const elementPh = this.nLeituras[index].ph;
      const elementTemperatura = this.nLeituras[index].temperatura;
      const elementNitrogenio = this.nLeituras[index].nitrogenio;
      const elementFosforo = this.nLeituras[index].fosforo;
      const elementPotassio = this.nLeituras[index].potassio;

      const elementDate =  new Date(this.nLeituras[index].data).getDate() +"/"
      + (new Date(this.nLeituras[index].data).getMonth() +1)
      +"/"+new Date(this.nLeituras[index].data).getFullYear();
      this.nph.push(elementPh);
      this.ntemperatura.push(elementTemperatura);
      this.nnitrogenio.push(elementNitrogenio);
      this.nfosforo.push(elementFosforo);
      this.npotassio.push(elementPotassio);
      this.dia.push(elementDate);
    }
    console.log("elements ph: " + this.nph)
    // cria metodos para dias

    /*let dia5 = [], ph5 = [];
    let dataR = dia.reverse();
    let phR = ph.reverse();
    for (let i = 0 ; i <= 5; i++) {
      dia5.push(dataR[i]);
      ph5.push(phR[i]);

    }
    //console.log(ph)
    //console.log(ph5)
    console.log(dia.reverse())
    */





  }




  criarChart(dia:Array<any[]>, ph:Array<any[]>, temperatura:Array<any[]>, nitrogenio:Array<any[]>, fosforo:Array<any[]>, potassio:Array<any[]>){
    this.chart = new Chart("chartPh", {
      type: 'line', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: dia,
	       datasets: [
          {
            data: ph,
            borderColor: 'rgba(0, 188, 212, 0.75)',
            backgroundColor: 'rgba(0, 188, 212, 0.3)',
            pointBackgroundColor: 'black',
            fill: false,
            tension: 0.5,
            borderWidth: 5,
            label: 'PH',
          },
          {
            label: 'Temperatura',
            data: temperatura,
            borderColor: 'rgba(255, 0, 0, 0.75)',
            backgroundColor: 'rgba(255, 0, 0, 0.3)',
            pointBackgroundColor: 'black',
            fill: false,
            tension: 0.5,
            borderWidth: 5,
          },
          {
            label: 'Nitrogênio',
            data: nitrogenio,
            borderColor: 'rgba(169, 169, 169, 0.75)',
            backgroundColor: 'rgba(211,211,211, 0.3)',
            pointBackgroundColor: 'black',
            fill: false,
            tension: 0.5,
            borderWidth: 5,
          },
          {
            label: 'Fosfóro',
            data: fosforo,
            borderColor: 'rgba(0, 188, 20, 0.75)',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            pointBackgroundColor: 'black',
            fill: false,
            tension: 0.5,
            borderWidth: 5,
          },
          {
            label: 'Potássio',
            data: potassio,
            borderColor: 'rgba(238, 173, 45, 0.75)',
            backgroundColor: 'rgba(255 , 255, 0, 0.3)',
            pointBackgroundColor: 'black',
            fill: false,
            tension: 0.5,
            borderWidth: 5,
          },

        ]
      },
      options: {
        aspectRatio:2.5
      }
    });
  }

  dadosReverse(){
    this.dia.reverse();
      this.nph.reverse();
      this.ntemperatura.reverse();
      this.nnitrogenio.reverse();
      this.nfosforo.reverse();
      this.npotassio.reverse();
  }


  clickDias(dia:number){
    this.createChart();
    this.chart.destroy();
    // cria metodos para dias
    let diaRev = this.dia.reverse();
    let tempRev = this.ntemperatura.reverse();
    let phRev = this.nph.reverse();
    let nitroRev = this.nnitrogenio.reverse();
    let fosforoRev = this.nfosforo.reverse();
    let potassioRev = this.npotassio.reverse();

    this.limparDados()

    for (let i = 0 ; i <= (dia-1); i++) {
      this.dia.push(diaRev[i]);
      this.nph.push(phRev[i]);
      this.ntemperatura.push(tempRev[i]);
      this.nnitrogenio.push(nitroRev[i]);
      this.nfosforo.push(fosforoRev[i]);
      this.npotassio.push(potassioRev[i]);

    }

    this.dadosReverse();
    this.criarChart(this.dia, this.nph, this.ntemperatura, this.nnitrogenio,this.nfosforo, this.npotassio);


    /*console.log(this.MyDomElement);
    this.MyDomElement.nativeElement.innerHTML = 'qwertyyy';
    */
  }


  todos(){
    this.chart.destroy();
    this.limparDados();
    this.createChart();
    this.criarChart(this.dia, this.nph, this.ntemperatura, this.nnitrogenio,this.nfosforo, this.npotassio);


  }

  ngAfterViewInit() {
    console.log(this.MyDomElement);
    this.MyDomElement.nativeElement.innerHTML = "Fui alterado por ElementRef & ViewChild";
  }

  limparDados(){
    this.nph = []
    this.ntemperatura = [];
    this.nnitrogenio = [];
    this.nfosforo = [];
    this.npotassio = [];
    this.dia = [];

  }



}
