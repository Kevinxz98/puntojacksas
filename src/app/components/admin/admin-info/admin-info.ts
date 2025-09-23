import { Component, OnInit } from '@angular/core';
import { Aside } from '../aside/aside';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Information } from '../../../services/information';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-admin-info',
  standalone: true,
  imports: [Aside, Footer, Header, ReactiveFormsModule],
  templateUrl: './admin-info.html',
  styleUrl: './admin-info.css',
})
export class AdminInfo implements OnInit {
  infoForm!: FormGroup;
  isLoading = false;
  backendUrl = 'http://127.0.0.1:8000/storage/';

  constructor(private infoService: Information, private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.infoForm = this.fb.group({
      title1: [''],
      subtitle1: [''],
      title2: [''],
      subtitle2: [''],
      description1: [''],
      image1: [''],
      title3: [''],
      subtitle3: [''],
      description2: [''],
      subtitle4: [''],
      description4: [''],
      image2: [''],
      title4: [''],
      subtitle5: [''],
      process1: [''],
      desprocess1: [''],
      process2: [''],
      desprocess2: [''],
      process3: [''],
      desprocess3: [''],
      title5: [''],
      subtitle6: [''],
      title6: [''],
      subtitle7: [''],
      image3: [''],
      logo: [''],
      texto: [''],
      telefono: [''],
      email: [''],
      direccion: [''],
      facebook: [''],
      instagram: [''],
      twitter: [''],
      linkedin: [''],
      youtube: [''],
      whatsapp: [''],
    });

    this.loadData();
  }

  loadData(): void {
    this.infoService.getInformation().subscribe((data) => {
      this.infoForm.patchValue(data);
      this.cdr.detectChanges();
    });
  }

  getFullImageUrl(path: string | null): string {
    return path ? this.backendUrl + path : '';
  }

  previewUrls: { [key: string]: string } = {};
  selectedFiles: { [key: string]: File } = {};

  onFileSelected(event: Event, field: string): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.selectedFiles[field] = file;

    // Usamos FileReader para el preview
    const reader = new FileReader();
    reader.onload = (e) => {
      this.previewUrls[field] = e.target?.result as string;
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.infoForm.invalid) return;

    this.isLoading = true;
    this.infoService.updateInformation(this.infoForm.value, this.selectedFiles).subscribe({
      next: (res) => {
        this.isLoading = false;
        setTimeout(() => alert(res.message), 0);
      },
      error: (err) => {
        this.isLoading = false;
        alert('Error updating information');
      },
    });
  }
}
