import { Injectable } from "@angular/core"
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar"

@Injectable({
  providedIn: "root",
})
export class ToastService {
  constructor(public snackBar: MatSnackBar) {}

  config: MatSnackBarConfig = {
    duration: 8000,
    horizontalPosition: "right",
    verticalPosition: "top",
  }

  success(msg) {
    this.config["panelClass"] = ["notification", "green-snackbar"]
    this.snackBar.open(msg, "Close", this.config)
  }

  warn(msg) {
    this.config["panelClass"] = ["notification", "red-snackbar"]
    this.config["duration"] = 30000
    this.snackBar.open(msg, "Close", this.config)
  }
}
