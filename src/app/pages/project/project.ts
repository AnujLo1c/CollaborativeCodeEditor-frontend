import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateProject } from '../../components/create-project/create-project';
import { DashboardService } from '../../service/dashboard-service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './project.html',
  styleUrls: ['./project.scss']
})
export class Project {
  constructor(private router: Router, private dialog: MatDialog,private dashboardService:DashboardService) {}

  onItemClick(item: any) {
    console.log("naving");
    this.router.navigate(['', 0]);
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateProject, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('Dialog closed with:', result);
    this.dashboardService.createProject(result);
    });
  }
}
