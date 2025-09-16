import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateProject } from '../../components/create-project/create-project';
import { DashboardService } from '../../service/dashboard-service';
import { ProjectService } from '../../service/project-service';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';

interface ProjectItem {
  id: string;
  name: string;
  language: string;
  author: string;
  codeContent: string[];
  inUse?: boolean;
}

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [MatDialogModule,CommonModule],
  templateUrl: './project.html',
  styleUrls: ['./project.scss']
})
export class Project {
 
 
  constructor(private router: Router, private dialog: MatDialog,private dashboardService:DashboardService,private projectService:ProjectService) {
    console.log("Component loaded");
    this.getProjects();
    this.addSharedProject();
  }
  shareId:string|null=null;
   projects = signal<ProjectItem[]>([]);
   refProjects = signal<ProjectItem[]>([]);
   timeout:any;
// ngOnInit(){
//   this. shareId = this.route.snapshot.paramMap.get('shareId');
// //      this.timeout =setTimeout(() => {
// //   console.log('Task executed after 3 seconds');
// //   this.router.navigate(['/project'], { replaceUrl: true });
// //   // your task here
// // }, 3000); 

// }


  openDialog() {
    const dialogRef = this.dialog.open(CreateProject, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('Dialog closed with:', result);
    this.dashboardService.createProject(result);
    });
  }
  getProjects(){
    console.log("clicked");
     this.dashboardService.getProjects()
    .then(data => {
      this.projects.set(data[0]);
      this.refProjects.set(data[1]);
      console.log("Projects from backend:", data);
    })
    .catch(err => console.error("Error fetching projects:", err));
  }
  openProject(index: number, isOwnProject: boolean) {
// clearTimeout(this.timeout)    
    const selectedProject = isOwnProject?this.projects()[index] : this.refProjects()[index];
  this.projectService.disconnect();
    this.router.navigate(['/project', selectedProject.id]);
  //TODO:: handle error when project is null
  }
  


   addSharedProject(){
 
 if (this.shareId) {
    // let token = await this.projectService.getToken();
    this.projectService.addProjectByShareId(this.shareId).then( () => {
      
      // this.projectId = project['projectId'];
   console.log("ShareId project added");
   
  //  this.aceEditor.setValue(
  //       fetchedProject.value = (fetchedProject.codeContent || []).join('\n')
  //     );
      
;    });
  }
  }
 
}
