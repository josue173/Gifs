import { Component, OnInit, Output } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent{

  get historiales(){
    return this.gifsService.historial;
  }

  constructor(private gifsService:GifsService) { }

  buscar(busqueda:string){
    // console.log(busqueda);
    this.gifsService.buscarGifs(busqueda)
  }
}
