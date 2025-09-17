import { Component } from '@angular/core';
import { Aside } from '../aside/aside';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-dashboard',
  imports: [Aside, Footer],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
