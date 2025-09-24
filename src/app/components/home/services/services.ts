import { Component } from '@angular/core';
import { Information } from '../../../services/information';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-services',
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class Services {
constructor(public infoService: Information) {}
}
