export class AppConstants {

  public static get baseServidor(): string{ return "http://localhost:8080/"};

  public static get baseNiveisLeitura(): string{return this.baseServidor + "estufautfpr/niveis/data"};

  public static get baseNiveisLeituras2():string {return this.baseServidor+"estufautfpr/niveis/"};

  public static get baseRelatorios():string {return "http://localhost:8080/estufautfpr/niveis/relatorio"};
}
