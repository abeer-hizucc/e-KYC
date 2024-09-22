import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import {  Router } from "@angular/router";
import { MatSort } from '@angular/material/sort';
import { RemarksDialogComponent } from "./remarks-dialog/remarks-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { UserApplicationStatus } from "src/app/models/application-status-models/application-status.model";
import { UserApplicationStatusRequestService } from "src/app/Services/application-status-service/user-status/status-request.service";
import { AuthenticationService } from "src/app/Services/authorzation/authenticate.service";
@Component(
  {
    selector: 'app-user-status',
    templateUrl: './user-status.component.html',
    styleUrls: ['./user-status.component.scss']
  }
)

export class UserStatusComponent implements OnInit, AfterViewInit {
  applicationStatusFilter: string = "all";
  submissionPeriodFilter: string = "anytime";
  applicationTypeFilter: string = 'all';
  applicationData: UserApplicationStatus[] = [];
  userId!: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private route: Router,
    private dialog: MatDialog,
    private userApplicationStatusService: UserApplicationStatusRequestService,
  ) { }
  displayedColumns: string[] = ['ApplicationType', 'ApplicationStatus', 'applicationDate', 'applicationRemarks'];

  dataSource = new MatTableDataSource<UserApplicationStatus>(this.applicationData);


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  ngOnInit(): void {
  
          // this.userId = this.activateRoute.snapshot.params['userId'];
          this.userId =sessionStorage.getItem('userId')!;
          this.userApplicationStatusService.getUserApplicationStatus().subscribe({
            next: (data) => {
              this.applicationData = data;
              this.dataSource.data = this.applicationData;
              console.log(this.applicationData);
            }, error: (err) => {
              console.error("error fetching user application data", err);
            }
          }
          );
    
  }
  goToApplicationForm() {
    this.route.navigate(['application', this.userId]);
  }
  openDialog(remarks: string, applicationStatus: string): void {
    const dialogRef = this.dialog.open(RemarksDialogComponent, {
      height: 'auto',
      width: 'auto',
      maxWidth: '500px',
      maxHeight: '500px',
      data: {
        remarks: remarks,
        applicationStatus: applicationStatus

      }
    });


  }
  applyFilter() {
    // Filter data based on the selected status and type
    this.dataSource.data = this.applicationData.filter((element: UserApplicationStatus) => {
      const statusMatch =
        this.applicationStatusFilter === 'all' ||
        element.applicationStatus.toLowerCase().includes(
          this.applicationStatusFilter.toLowerCase()
        );

      const typeMatch =
        this.applicationTypeFilter === 'all' ||
        element.applicationType.toLowerCase().includes(
          this.applicationTypeFilter.toLowerCase()
        );

      return statusMatch && typeMatch;
    });
  }
  applySubmissionFilter() {
    const now = new Date();

    let startDate: Date, endDate: Date;
    switch (this.submissionPeriodFilter) {
      case 'thisDay':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        break;
      case 'thisWeek':
        const dayOfWeek = now.getDay();
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek);
        endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek + 7);
        break;
      case 'thisMonth':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        break;
      default:
        startDate = new Date(0);
        endDate = new Date();
        break;
    }


    this.dataSource.data = this.applicationData.filter((element: UserApplicationStatus) => {
      const submissionDate = new Date(element.applicationDate);
      return submissionDate >= startDate && submissionDate < endDate;
    });
  }

}

