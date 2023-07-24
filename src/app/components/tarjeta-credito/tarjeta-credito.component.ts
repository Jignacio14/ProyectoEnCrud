import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { TarjetaServiceService } from 'src/app/services/tarjeta-service.service';
import { ToastrService } from 'ngx-toastr/toastr/toastr.service';


@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit{

  id:number | undefined;
  form!: FormGroup;
  accion: string = "agreagar";
  listTarjetas: any[] = [
  ];
  
  
  constructor(private fb: FormBuilder, private _tarjetaService: TarjetaServiceService, private toastr: ToastrService) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['',  [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    })
  }

  cargarListaTarjetas(){
    return this.listTarjetas;
  }

  guardarTarjeta(){
    const tarjeta: any = {
      nombre: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    }
    if (this.id == undefined){
      //agregar nueva tarjeta
      this._tarjetaService.saveTarjeat(tarjeta).subscribe(data => {
        // mostrar mensaje
        this.toastr.success("Se pudo", "Excelente")
      }, error => {
        console.log(error);
      })
    } else {
      tarjeta.id = this.id; 
      this._tarjetaService.updateTarjeta(this.id, tarjeta).subscribe(data => {
          this.form.reset();
          this.accion = "Agregar";
          this.id = undefined;
          //toastr
      }, error => {
        console.log(error);
      });
    }
    this.obtenerTarjetas();
    this.form.reset();
  }

  ngOnInit(): void{
    this.obtenerTarjetas();
  }

  obtenerTarjetas(){
    this._tarjetaService.getListaTarjeta().subscribe(data => {
      console.log(data);
      this.listTarjetas = data;
    }, error => {
      console.log(error);
    });
  }

  eliminarTarjeta(id: number){
    this._tarjetaService.deleteTarjeta(id).subscribe(data => {
      //mostrar borrado del toastr
      console.log(data);
      this.obtenerTarjetas();
    }, error => {
      console.log(error);
    });
  }

  editarTarjeta(tarjeta:any){
    this.accion = "editar"; 
    this.id = tarjeta.id; 
    this.form.patchValue({
      titular: tarjeta.titular,
      numeroTarjeta: tarjeta.numeroTarjeta,
      fechaExpiracion: tarjeta.FechaExpiracion,
      cvv: tarjeta.cvv,
    })
    
  }
}
