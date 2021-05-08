import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { User } from 'src/app/modules/user';
import { NavService } from 'src/app/services/nav-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  invalidLogin : boolean;
  submitted = false;
  oneError = false;
  allErrored = false;
  count = 0;
  exists = false;
  response = true;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private navigate:NavService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    document.body.classList.add('landingPageBackgroundImage')
  }

  ngOnDestroy(){
    document.body.classList.remove('landingPageBackgroundImage')
  }

  //getter to easily access form fields
  get f() { return this.loginForm.controls; }

  onSubmit(){
    this.submitted = true;
    this.count = 0;
    this.getFormValidationErrors();
    
    //if the form has errors stop
    if (this.loginForm.invalid) {
      return;
    }

    const credentials: User = {
      'username': this.loginForm.value.username,
      'passwordHash' : this.loginForm.value.password
    }

    var promise = this.userService.loginUser(credentials).then(response => {
      console.log(response.token);
      localStorage.setItem('token', JSON.stringify(response.token));

      if(response != null && response.token != 'Incorrect credentials'){
        this.exists = true;
        this.response = false;
      }
      else{
        this.exists = false;
        this.response = true;
      }

      // this.invalidLogin = false;
      // this.navigate.NavTeamSummary('bob');
    }
    // , (error) => {
    //   this.invalidLogin = true;
    //   alert("The User login is down!");
    //   return;
    // }
    );

    
  }

  getFormValidationErrors(){
    this.count = 0;

    //get the number of errors a form has
    Object.keys(this.loginForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.loginForm.get(key).errors;
      if(controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          this.count++;
        });
      }
    });   

    // to increase the container height based on number of errors displaying
    if(this.count === 1){
      this.oneError = true;
      this.allErrored = false;
    }
    else if(this.count === 2){
      this.allErrored = true;
      this.oneError = false;
    }else{
      this.oneError = false;
      this.allErrored = false;
    }
  }

  onKeyUp(){
    this.submitted = false;
    this.allErrored = false;
    this.oneError = false;
    this.count = 0;
    this.response = false;
    this.exists = false;
  }

}
