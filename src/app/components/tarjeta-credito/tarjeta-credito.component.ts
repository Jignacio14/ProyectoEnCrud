import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

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
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['',  [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    })
  }

  validarTarjeta(numeroTarjeta: string){
    return numeroTarjeta.length < 16 && numeroTarjeta.length < 0; 
  }

  cargarListaTarjetas(){
    return this.listTarjetas;
  }

  AgregarTarjeta(){
    const tarjeta: any = {
      nombre: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    }
    this.listTarjetas.push(tarjeta);
    this.form.reset();
  }

  ngOnInit(){}
}
