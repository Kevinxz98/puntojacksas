import { Component } from '@angular/core';
import { Information } from '../../../services/information';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-top',
  imports: [CommonModule],
  templateUrl: './header-top.html',
  styleUrl: './header-top.css'
})
export class HeaderTop {
constructor(public infoService: Information) {}
}
