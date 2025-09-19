import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  async getToken() {
    let token: string | null = null;
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('jwt');
    }

    if (!token) {
      throw new Error("No JWT token found. Login again.");
      //TODO:: navigate ot login
    }
    return token;
  }
  async createProject(result: any) {
    const token = (await (this.getToken())).trim();
    console.log(result);

    const response = await fetch(`http://localhost:8080/projects`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(result)

    },
    )
      .then(res => { console.log(res.text());
        
       })

      .catch(err => {
        console.error('Request failed:', err);
        throw err;
      });
  }

 
 async getProjects() {
   
  const token = (await this.getToken()).trim();
console.log("Auth header:" +token+"end"); 
const username = (isPlatformBrowser(this.platformId) ? localStorage.getItem('username') : null)?.trim();
if(!username){
throw new Error("No username found in local storage");
}
console.log(token);

  try {
    const response = await fetch(`http://localhost:8080/auth/fetch-projects?username=${encodeURIComponent(username)}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); 

    return data; 
  } catch (err) {
    console.error("Request failed:", err);
    throw err;
  }
}


}
