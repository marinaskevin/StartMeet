import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  id_type: string = "Manual";
  first_name: string = "";
  last_name: string = "";
  email: string = "";
  password: string = "";
  cpassword: string = "";
  err_list: any;
  
  constructor(private _httpService: HttpService,
              private _route: ActivatedRoute,
              private _router: Router) { }

  ngOnInit() {
  }

  register()
  {
    var user = {
      id_type: this.id_type,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      password: this.password,
      cpassword: this.cpassword
    };
    console.log(user);
    var observable = this._httpService.newUser(user);
    observable.subscribe((data: any) => {
      console.log(data);
      if(data.error)
      {
        this.err_list = data.error;
      }
      else
      {
        this._router.navigate(['/home']);
      }
    });
  }

}