import { Component } from '@angular/core';
import { Header } from '../components/home/header/header';
import { HeaderTop } from '../components/home/header-top/header-top';
import { BannerArea } from '../components/home/banner-area/banner-area';
import { About } from '../components/home/about/about';
import { Choose } from '../components/home/choose/choose';
import { Process } from '../components/home/process/process';
import { Services } from '../components/home/services/services';
import { Request } from '../components/home/request/request';
import { Testimonials } from '../components/home/testimonials/testimonials';
import { Blog } from '../components/home/blog/blog';
import { FormContact } from '../components/home/form-contact/form-contact';
import { Footer } from '../components/home/footer/footer';


@Component({
  selector: 'app-home',
  imports: [
    Header,
    HeaderTop,
    BannerArea,
    About,
    Choose,
    Process,
    Services,
    Request,
    Testimonials,
    Blog,
    FormContact,
    Footer,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
