//dialog-box.component.ts
import { Component, Inject, Optional, OnInit } from "@angular/core"
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms"
import { Observable } from "rxjs"
import { map, startWith } from "rxjs/operators"

export interface UsersData {
  name: string
  id: number
}

@Component({
  selector: "app-dialog-box",
  templateUrl: "./dialog-box.component.html",
  styleUrls: ["./dialog-box.component.scss"],
})
export class DialogBoxComponent implements OnInit {
  action: string
  local_data: any
  form: FormGroup
  options: string[] = []

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data
  ) {
    const datapart2 = data[0]
    const datapart1 = data[1]
    if (Array.isArray(datapart1)) {
      this.options = datapart1
      const temp = { ...datapart2 }
      this.local_data = {}
      this.action = temp["action"]
    }
    this.local_data = { ...datapart2 }
    this.action = this.local_data.action
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [
        this.local_data?.name,
        [Validators.required, Validators.maxLength(30)],
      ],
      description: [
        this.local_data?.description,
        [Validators.required, Validators.maxLength(250)],
      ],
      user: [this.local_data?.user, Validators.required],
      date: [this.local_data?.date],
      action: [this.local_data?.action, Validators.required],
    })
  }

  get f() {
    return this.form.controls
  }

  doAction() {
    this.local_data = {
      name: this.f.name.value,
      user: this.f.user.value,
      date: this.f.date.value,
      description: this.f.description.value,
      id: this.local_data.id,
    }
    this.dialogRef.close({ event: this.action, data: this.local_data })
  }

  closeDialog() {
    this.dialogRef.close({ event: "Cancel" })
  }
}
