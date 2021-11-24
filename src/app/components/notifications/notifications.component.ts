import { AfterViewInit, OnInit, Component, ViewChild } from "@angular/core"
import { MatPaginator } from "@angular/material/paginator"
import { MatTableDataSource } from "@angular/material/table"
import { NotificationService } from "@app/_services"
import { first } from "rxjs/operators"

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.scss"],
})
export class NotificationsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ["name", "description"]
  ELEMENT_DATA = []

  dataSourcePag = new MatTableDataSource(this.ELEMENT_DATA)

  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService
      .getById(JSON.parse(localStorage.getItem("user"))["id"])
      .pipe(first())
      .subscribe((userTask) => {
        this.dataSourcePag = new MatTableDataSource(userTask)
      })
  }

  ngAfterViewInit() {
    this.dataSourcePag.paginator = this.paginator
  }
}
