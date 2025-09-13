import { CommonModule } from '@angular/common';
import { Component,  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from '../../components/editor/editor';


// import { EditorComponent } from "../../components/header/editor/editor";


@Component({
  selector: 'app-project-screen',
  imports: [FormsModule, CommonModule, EditorComponent],
  templateUrl: './project-screen.html',
  styleUrl: './project-screen.scss'
})
export class ProjectScreen {

constructor(){
 
  
}

}