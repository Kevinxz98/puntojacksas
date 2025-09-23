import { Component, OnInit } from '@angular/core';
import { Information } from '../../../services/information';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner-area',
  imports: [CommonModule],
  templateUrl: './banner-area.html',
  styleUrl: './banner-area.css'
})
export class BannerArea  {

constructor(public infoService: Information) {}

}
