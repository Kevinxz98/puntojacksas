import { Component, OnInit } from '@angular/core';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  userName: string | null = null;

  constructor(private authService: Auth) {}

  ngOnInit() {
    const user = this.authService.getUser();
    this.userName = user ? user.name : null;
  }


}
