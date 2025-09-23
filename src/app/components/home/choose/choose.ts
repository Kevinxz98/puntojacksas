import { Component } from '@angular/core';
import { Information } from '../../../services/information';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-choose',
  imports: [CommonModule],
  templateUrl: './choose.html',
  styleUrl: './choose.css'
})
export class Choose {

  constructor(public infoService: Information) {}
}
