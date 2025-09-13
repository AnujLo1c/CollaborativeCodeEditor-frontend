import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object){}

  async createProject(result: any){
    let token: string | null = null;
  if (isPlatformBrowser(this.platformId)) {
    token = localStorage.getItem('jwt');
  }

  if (!token) {
    throw new Error("No JWT token found. Login again.");
    //TODO:: navigate ot login
  }
console.log(result);

  const response = await fetch(`http://localhost:8080/projects`, {
    method:'POST',
    headers: {
      Authorization: `Bearer ${token}`, 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(result)
  
  },
)
  .then(res => {console.log(res.text());}) 
    
    .catch(err => {
      console.error('Request failed:', err);
      throw err;
    });
}
}
