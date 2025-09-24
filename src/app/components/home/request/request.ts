import { Component } from '@angular/core';
import { Information } from '../../../services/information';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request',
  imports: [CommonModule],
  templateUrl: './request.html',
  styleUrl: './request.css'
})
export class Request {
constructor(public infoService: Information) {}
}
