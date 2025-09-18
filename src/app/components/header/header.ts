import { isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderService } from '../../service/header-service';
import { Auth } from '../../service/auth';
import { CommonService } from '../../service/common-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink,],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
 authService:Auth=inject(Auth);

  constructor(private commonService:CommonService) {
  }
  
  logout() {
    console.log("Logging out...");
    
this.authService.logout();

}
}
