import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../../../services/contact';
declare var gtag_report_conversion_formulario: any;


@Component({
  selector: 'app-form-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-contact.html',
  styleUrl: './form-contact.css'
})

export class FormContact {

  contactForm: FormGroup;
  isLoading = false;
  messageSent = false;
  errorMessage = '';
  

  constructor(
    private fb: FormBuilder,
    private contactService: Contact
  ) {
    this.contactForm = this.createForm();
  }
  

  private createForm(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]+$/)]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]],
      terminos: [false, Validators.requiredTrue]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.contactService.sendContactForm(this.contactForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.messageSent = true;
          gtag_report_conversion_formulario();
          this.contactForm.reset();
          
          // Opcional: resetear el estado después de 5 segundos
          setTimeout(() => {
            this.messageSent = false;
          }, 5000);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Error al enviar el mensaje. Por favor, intenta nuevamente.';
          console.error('Error:', error);
        }
      });
    } else {
      // Marcar todos los campos como touched para mostrar errores
      this.markFormGroupTouched(this.contactForm);
    }
  }

   private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  get nombre() { return this.contactForm.get('nombre'); }
  get email() { return this.contactForm.get('email'); }
  get telefono() { return this.contactForm.get('telefono'); }
  get mensaje() { return this.contactForm.get('mensaje'); }
  get terminos() { return this.contactForm.get('terminos'); }

}
