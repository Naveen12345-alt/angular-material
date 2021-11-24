import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"

import { AccountService } from "@app/_services"
import { User } from "@app/_models"

@Component({
  selector: "app-top-navbar",
  templateUrl: "./top-navbar.component.html",
  styleUrls: ["./top-navbar.component.scss"],
})
export class TopNavbarComponent implements OnInit {
  user: User
  t1 = ""

  constructor(private router: Router, private accountService: AccountService) {
    // redirect to home if already logged in
    this.accountService.user.subscribe((x) => (this.user = x))
  }

  logout() {
    this.accountService.logout()
  }

  ngOnInit() {}
}
