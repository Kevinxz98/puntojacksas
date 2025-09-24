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

@Component({
  selector: 'app-admin-servicios',
  imports: [Aside, Footer, Header, CommonModule, ReactiveFormsModule],
  templateUrl: './admin-servicios.html',
  styleUrl: './admin-servicios.css'
})
export class AdminServicios implements OnInit {

  servicios: any[] = [];
  servicioForm!: FormGroup;
  showForm: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private serviciosService: Servicios, private cdr: ChangeDetectorRef) { }

  previewUrls: { [key: string]: string } = {};
  selectedFiles: { [key: string]: File } = {};

  ngOnInit(): void {

    this.serviciosService.getServicios().subscribe((data) => {
      this.servicios = data;
    });

    this.cdr.detectChanges();

  }

  trackById(index: number, item: any): number {
    return item.id;
  }

}
