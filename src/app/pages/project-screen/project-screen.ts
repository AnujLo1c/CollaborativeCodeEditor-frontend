import { CommonModule } from '@angular/common';
import { Component,  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from '../../components/editor/editor';
import { ProjectService } from '../../service/project-service';
import { ActivatedRoute } from '@angular/router';


// import { EditorComponent } from "../../components/header/editor/editor";


@Component({
  selector: 'app-project-screen',
  imports: [FormsModule, CommonModule, EditorComponent],
  templateUrl: './project-screen.html',
  styleUrl: './project-screen.scss'
})
export class ProjectScreen {
  constructor(private route:ActivatedRoute,private projectService: ProjectService){

  }
projectId: any;

  async generateShareableLink() {
  this.projectId = this.route.snapshot.paramMap.get('id')!;
  const shareableLink = await this.projectService.generateShareableLink(this.projectId);
 navigator.clipboard.writeText(shareableLink).then(() => {
    alert('Share link copied to clipboard: ' + shareableLink['link']);
  }).catch(err => {
    console.error('Failed to copy link:', err);
  });
}


}