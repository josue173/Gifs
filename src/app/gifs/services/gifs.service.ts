import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { SearchGifsResponse, Datum } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _historial: string[] = [];
  private api: string = 'OmROuMEbkvvQPHZyjYrsrh7a5fTbgBFr';
  private servicioURl: string = 'https://api.giphy.com/v1/gifs';

  public resultados: Datum[] = []; //ESTO ES LO QUE SE MUESTRA EN PANTALLA

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    // if ( localStorage.getItem("historial") ) {
    //   this._historial = JSON.parse( localStorage.getItem("historial")!);
    // }
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    /*
     SE COLOCAN '[]' PARA QUE CUANDO SE BORRE EL localStorage EN EL NAVEGADOR NO DE ERROR, LA PROPIEDAD
     JSON.pare RETORNA String o null, CON LOS '[]' SE ENVIA UN NULL, EN CASO DE NO HABER NADA, Y ASI 
     EVITAR EL ERROR

     DE ESTA FORMA SE HACE PERSISTENTE LA INFORMACION, IMPLEMENTANDO ESTAS CARACTERISTICAS DE JSON.parse 
     y localStorage
    */
  }
  //EL CONSTRUCTOR SOLO ES EJECUTADA UNA VEZ, ESTO ES CUANDO EL SERVICIO ES LLAMADO

  buscarGifs(query: string) {
    query = query.trim().toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
      //SE GRABA EN EL localStorage PARA PODER SER MOS
    }

    const params = new HttpParams()
      .set('api_key', this.api)
      .set('limit', '10')
      .set('q', query);
    //ESTE MODULO PERMITE CONSTRUIR LOS PARAMETROS COMO EL api, PARA QUE SE VEA COMO EN POSTMAN

    this.http
      .get<SearchGifsResponse>(
        `${this.servicioURl}/search`, {params}
      )
      .subscribe((res) => {
        this.resultados = res.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
        //ESTE ES EL localStorage DE LAS IMAGENES, VA ACA PORQUE AQUI SE OBTIENE LA RESPUESTA
      });
  }
}
