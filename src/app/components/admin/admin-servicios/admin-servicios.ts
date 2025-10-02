import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Aside } from '../aside/aside';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Servicios } from '../../../services/servicios';
import { ChangeDetectorRef } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'app-admin-servicios',
  standalone: true,
  imports: [Aside, Footer, Header, CommonModule, ReactiveFormsModule],
  templateUrl: './admin-servicios.html',
  styleUrl: './admin-servicios.css',
})
export class AdminServicios implements OnInit {
  servicios: any[] = [];
  servicioForm!: FormGroup;
  showForm: boolean = false;
  backUrl = environment.apiStorageUrl ;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private serviciosService: Servicios,
    private cdr: ChangeDetectorRef
  ) {}

  previewUrls: { [key: string]: string } = {};
  selectedFiles: { [key: string]: File } = {};

  ngOnInit(): void {
    this.servicioForm = this.fb.group({
      nombre: ['', Validators.required],
      keywords: ['', Validators.required],
      fotoTop: [null],
      foto: [null],
      fotoMini: [null],
      titulo: ['', Validators.required],
      subtitulo: ['', Validators.required],
      lead: ['', Validators.required],
      subtitulo2: [''],
      include1: [''],
      include2: [''],
      include3: [''],
      include4: [''],
      subtitulo3: [''],
      texto1: [''],
      descripcion: [''],
      ate1: [''],
      ate2: [''],
      ate3: [''],
      ate4: [''],
      ate5: [''],
      ate6: [''],
      sum1: [''],
      sum2: [''],
      sum3: [''],
      sum4: [''],
      sum5: [''],
      sum6: [''],
    });


    this.loadServicios();
    this.cdr.detectChanges();
  }

  loadServicios(): void {
    this.serviciosService.getServicios().subscribe({
      next: (data) => {
        this.servicios = Array.isArray(data) ? data : data.data ?? [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar servicios', err);
      },
    });
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  addServicio(): void {
    this.showForm = true;
  }

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      }),
    };
  }

  onFileSelected(event: Event, field: string): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    this.selectedFiles[field] = file;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewUrls[field] = e.target.result;
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);

    this.servicioForm.patchValue({
      [field]: file.name,
    });
  }

  onSubmit(): void {
    if (this.servicioForm.invalid) return;
    const formData = new FormData();
    Object.keys(this.servicioForm.value).forEach((key) => {
      formData.append(key, this.servicioForm.value[key]);
    }); // Agregar imágenes si se seleccionaron
    //
    Object.keys(this.selectedFiles).forEach((field) => {
      formData.set(field, this.selectedFiles[field]);
    });

    this.http.post(environment.apiUrl + '/create-servicios', formData, this.getHeaders())
  .subscribe({
    next: (res) => {
      console.log('Guardado exitoso', res);

      // Recargar servicios para que se actualice la vista
      this.serviciosService.getServicios().subscribe(data => {
        this.servicios = data;
        this.cdr.detectChanges(); // <- ahora sí útil, porque forzamos el render
      });

      this.servicioForm.reset();
      this.selectedFiles = {};
      this.previewUrls = {};
    },
    error: (err) => console.error('Error guardando', err),
  });
      
  }

  deleteServicio(id: number): void {
    if (confirm('¿Estás seguro de eliminar este servicio?')) {
      this.serviciosService.deleteServicio(id).subscribe({
        next: (res) => {
          alert(res.message); // refrescar lista 
          
          this.serviciosService.getServicios().subscribe(data => {
            this.servicios = data;
            this.cdr.detectChanges(); // <- ahora sí útil, porque forzamos el render
          });

        },
        error: (err) => {
          console.error(err); alert('Error eliminando el servicio');
        }
      });
    }
  }
}
