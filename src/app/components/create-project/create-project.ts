import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

export type CodeSnippet = {
  name: string;
  language: string;
  author: string;
};

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [MatDialogModule, FormsModule], // ✅ added FormsModule for ngModel
  templateUrl: './create-project.html',
  styleUrls: ['./create-project.scss']
})
export class CreateProject {
  project: CodeSnippet = {   // ✅ initialize to avoid undefined errors
    name: '',
    language: '',
    author: localStorage.getItem('username')??"anuj"
  };

  constructor(private dialogRef: MatDialogRef<CreateProject>) {}

  // Close without data
  close() {
    this.dialogRef.close();
  }

  // Close with user-entered data
  save() {
    this.dialogRef.close(this.project); // ✅ send form data back
  }
}
