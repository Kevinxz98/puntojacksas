import { Component } from '@angular/core';
import { Information } from '../../../services/information';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
constructor(public infoService: Information) {}
}
