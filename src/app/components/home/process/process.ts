import { Component } from '@angular/core';
import { Information } from '../../../services/information';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-process',
  imports: [CommonModule],
  templateUrl: './process.html',
  styleUrl: './process.css'
})
export class Process {
constructor(public infoService: Information) {}
}
