import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent {

  form!: FormGroup;

  listTarjetas: any[] = [
    { nombre: "Juan Perez", numeroTarjeta: "123132131", fechaExpiracion: "11/23", cvv: "122" },
    { nombre: "Amanda Rodriguez", numeroTarjeta: "960843214", fechaExpiracion: "12/28", cvv: "221" },
    {nombre: "Jose ignacio", numeroTarjeta: "123456789", fechaExpiracion: "12/45", cvv: "113"}
  ];
  
  
  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      titular: [''],
      numeroTarjeta: [''],
      fechaExpiracion: [''],
      cvv: ['']
    })
  }

  validarTarjeta(numeroTarjeta: string){
    return numeroTarjeta.length < 16 && numeroTarjeta.length < 0; 
  }

  cargarListaTarjetas(){
    
    return this.listTarjetas;
  }

  ngOnInit(){}

}
