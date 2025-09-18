import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import SockJS from 'sockjs-client';
import { Client, over, Message } from 'stompjs';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { log } from 'node:console';
import { SourceTextModule } from 'node:vm';
import { send } from 'node:process';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
 

  private stompClient: Client | null = null;
  private activeProjectId: string | null = null;

  private codeSubject = new BehaviorSubject<string>('');
  code$ = this.codeSubject.asObservable();
ws: WebSocket | null = null;
  localStorage: any;
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}


async checkAndOpenProject(projectId: string): Promise<any> {
  let token: string | null = null;
  if (isPlatformBrowser(this.platformId)) {
    token = localStorage.getItem('jwt');
  }

  if (!token) {
    throw new Error("No JWT token found. Login again.");
    //TODO:: navigate ot login
  }

  const response = await fetch(`http://localhost:8080/projects/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`, 
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch project: ${response.status} ${response.statusText}`);
  }

  const text = await response.text();
  if (!text) throw new Error("Project API returned empty response");

  const project = JSON 
  .parse(text);
  console.log("📦 Project fetched:", project);
  // if (project.inUse ) {
  //   console.log("then why this"+ project.inUse);
    
    this.connectWebSocket(projectId,token);
  //   return project;
  // } else {
    return project;
  // }
}


setCode(code: string) {
    this.codeSubject.next(code);
  }





 connectWebSocket(projectId: string, token: string): void {
    if (this.isConnected()) {
      console.log("⚠️ Already connected to a project.");
      return;
    }

    // Create SockJS + STOMP client
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = over(socket);
    this.activeProjectId = projectId;
console.log("Trying ot connect ot wesocket now");

    // Connect with JWT token in headers
    this.stompClient.connect(
      { Authorization: `Bearer ${token}` },
      () => {
        console.log('✅ Connected to WebSocket for project:', projectId);
// this.sendMessage( "Anuj is now online ",projectId);
        // Subscribe to the project code topic
        this.stompClient?.subscribe(
          `/topic/project/${projectId}/code`,
          (message: Message) => {
            
             
             console.log('📩 no update code update:', message.body);
            if (message.body) {
              console.log('📩 Received code update:', message.body);
              this.codeSubject.next(message.body); 
              
            }
          }
        );
      },
      (error) => {
        console.error('❌ WebSocket connection error:', error);
      }
    );
  }

  sendMessage(message: string,projectId:string): void {
    if (this.stompClient && this.stompClient.connected) {
      
      this.stompClient.send(`/app/project/${projectId}/code`, {}, message);
    }
    else {

    }
  }
  updateProjectCode(projectId: string, code: string) {
    if (this.stompClient && this.stompClient.connected) {
      
      this.stompClient.send(`/app/project/${projectId}/code`, {}, code);
      console.log('📤 Sent code update:', code);
    } else {
      console.error("❌ Cannot send, WebSocket not connected.");
    }
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        console.log("🔌 Disconnected from WebSocket.");
      });
      this.stompClient = null;
      this.activeProjectId = null;
    }
  }




  isConnected(): boolean {
    return !!this.stompClient?.connected;
  }
runProject(language: any, code: any): Promise<string> {
  let token: string | null = null;
  if (isPlatformBrowser(this.platformId)) {
    token = localStorage.getItem('jwt');
  }

  if (!token) {
    console.error('No JWT token found in localStorage.');
    return Promise.resolve("login again");
  }

  return fetch('http://localhost:8080/projects/execute', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ language, code })
  })
    .then(response => response.json())
    .then(data => {
      console.log('Server response:', data);
      return data['output'];
    })
    .catch(error => {
      console.error('Error:', error);
      return `Error: ${error}`;
    });
}
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
  async fetchProjectFromApi(projectId: string) {
  // Only access localStorage in browser
  let token: string | null = await this.getToken();
console.log(token);
  this.http.get<any>(`http://localhost:8080/projects/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).subscribe({
    next: (project) => {
      console.log("📦 Project fetched:", project);

      if (project.inUse) {
console.log("Project is in use, connecting to WebSocket..."+project.inUse);

        this.connect(projectId, token!);
      }

      if (project.code) {
        this.codeSubject.next(project.code);
      }
    },
    error: (err) => {
      console.error("Failed to fetch project:", err);
    }
  });
}

connect(projectId: string, token: string | null) {
  if (this.isConnected()) {
    console.log("⚠️ Already connected to a project.");
    return;
  }
  console.log(token);
  

  const socket = new SockJS('http://localhost:8080/ws');
  this.stompClient = over(socket);
  this.activeProjectId = projectId;

  this.stompClient.connect(
    { Authorization: `Bearer ${token}` },   // 🔑 send JWT in headers
    () => {
      console.log('✅ Connected to WebSocket for project:', projectId);

      this.stompClient?.subscribe(
        `/topic/project/${projectId}/code`,
        (message: Message) => {
          if (message.body) {
            console.log('📩 Received code update:', message.body);
            this.codeSubject.next(message.body);
          }
        }
      );
    }
  );
}

  updateProject(projectId: string, code: string) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send(`/app/project/${projectId}/code`, {}, code);
      console.log('📤 Sent code update:', code);
    } else {
      console.error("❌ Cannot send, WebSocket not connected.");
    }
  }

  fetchProject() {
    return this.code$;
  }

   async generateShareableLink(projectId: string): Promise<string> {
let token= await this.getToken();
if(projectId==null || projectId==undefined){
  throw new Error("Project ID is null or undefined");
}
  try {
       const res = await fetch(`http://localhost:8080/projects/${projectId}/share`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`
         }
       });
       if (!res.ok) throw new Error(`Failed to generate shareable link: ${res.status}`);
       const data = await res.json();
       console.log("Generated shareable link:", data);
       return data.link;
     } catch (error) {
       console.error("Error generating shareable link:", error);
       throw error;
     }

}


  async addProjectByShareId(shareId: string): Promise<any> {
let token= await this.getToken();
const username = localStorage.getItem('username');
console.log("Adding project by shareId:", shareId, "for user:", username);

  const res = await fetch(`http://localhost:8080/projects/share/${shareId}?username=${username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    if (!res.ok) throw new Error(`Failed to fetch project: ${res.status}`);
    return await (res.json() as Promise<any>);
}



}
