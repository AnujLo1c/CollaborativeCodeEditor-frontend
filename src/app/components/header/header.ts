import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderService } from '../../service/header-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink,],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
 
isLogin!: () => boolean; 
  constructor(private headerService:HeaderService) {

    this.isLogin=()=>this.headerService.isLogin();
  }
  
}
