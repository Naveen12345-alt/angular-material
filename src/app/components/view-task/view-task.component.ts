import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core"
import { MatDialog } from "@angular/material/dialog"
import { MatPaginator } from "@angular/material/paginator"
import { MatTable, MatTableDataSource } from "@angular/material/table"
import { TaskService, ToastService } from "@app/_services"
import { first } from "rxjs/operators"
import { DialogBoxComponent } from "../dialog-box/dialog-box.component"

export interface UsersData {
  name: string
  id: number
  user: string
  date: string
}

const ELEMENT_DATA: UsersData[] = []

@Component({
  selector: "app-view-task",
  templateUrl: "./view-task.component.html",
  styleUrls: ["./view-task.component.scss"],
})
export class ViewTaskComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ["id", "name", "user", "date", "action"]
  options: string[] = []
  filterUsername: string = ""

  dataSource: UsersData[] = ELEMENT_DATA
  dataSourcePag = new MatTableDataSource<UsersData>(this.dataSource)

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatTable, { static: true }) table: MatTable<any>

  constructor(
    public dialog: MatDialog,
    private taskService: TaskService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.taskService
      .getAll()
      .pipe(first())
      .subscribe((taskData: string) => {
        this.dataSource = JSON.parse(JSON.parse(taskData)[0]) ?? []
        this.options =
          JSON.parse(JSON.parse(taskData)[1]).map((data) =>
            data.username.toLowerCase()
          ) ?? []

        this.dataSourcePaginator
      })
  }
  ngAfterViewInit() {
    this.dataSourcePag.paginator = this.paginator
  }

  get dataSourcePaginator() {
    this.dataSourcePag = new MatTableDataSource<UsersData>(this.dataSource)
    this.dataSourcePag.paginator = this.paginator
    return
  }

  public doFilter = (value: string) => {
    this.filterUsername = value
    const newDataSource: UsersData[] = value
      ? this.dataSource.filter((item) => item.user === value)
      : this.dataSource
    this.dataSourcePaginator
  }

  openDialog(action, obj, array) {
    obj.action = action
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: "350px",
      data: [obj, array],
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event == "Add") {
        this.taskService
          .create(result.data)
          .pipe(first())
          .subscribe((taskData: string) => {
            this.dataSource = JSON.parse(JSON.parse(taskData)[0]) ?? []
            this.addRowData()
            this.doFilter(this.filterUsername)
          })
      } else if (result.event == "Update") {
        this.updateRowData(result.data)
      } else if (result.event == "Delete") {
        this.deleteRowData(result.data)
      }
    })
  }

  addRowData() {
    this.dataSourcePaginator
    this.table.renderRows()
    this.toastService.success("Task Added")
  }
  updateRowData(row_obj) {
    const result = row_obj
    this.taskService
      .update(result)
      .pipe(first())
      .subscribe((taskData: string) => {
        this.dataSource = JSON.parse(JSON.parse(taskData)[0]) ?? []
        this.addRowData()
        this.dataSourcePaginator
        this.toastService.success("Task Updated")
      })
  }
  deleteRowData(row_obj) {
    const result = row_obj
    this.taskService
      .delete(result.id)
      .pipe(first())
      .subscribe((taskData: string) => {
        this.dataSource = JSON.parse(JSON.parse(taskData)[0]) ?? []
        this.addRowData()
        this.dataSourcePaginator
        this.toastService.warn("Task Deleted")
      })
  }
}
