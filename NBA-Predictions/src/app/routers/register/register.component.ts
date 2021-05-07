import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, RequiredValidator, ValidationErrors, Validators } from '@angular/forms';
import { error } from 'selenium-webdriver';
import { User } from 'src/app/modules/user';
import { HttpService } from 'src/app/services/http-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  RegistrationForm: FormGroup;
  submitted = false;
  oneError = false;
  allErrored = false;
  count = 0;
  notExists = false;
  response = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.RegistrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    document.body.classList.add('landingPageBackgroundImage');
  }

  ngOnDestroy(){
    document.body.classList.remove('landingPageBackgroundImage');
  }

  //getter to easily access form fields
  get f() { return this.RegistrationForm.controls; }

  onSubmit(){
    this.submitted = true;
    this.count = 0;
    this.getFormValidationErrors();
    
    //if the form has errors stop
    if (this.RegistrationForm.invalid) {
      return;
    }

    const credentials: User = {
      'username': this.RegistrationForm.value.username,
      'passwordHash' : this.RegistrationForm.value.password
    }

    var promise = this.userService.registerUser(credentials).then(data => {
      this.notExists = data;
    }, (error) => {
      alert("The API is down!");
      return;
    }).then(() => this.response = true);

  }

 //get the number of errors a form has
  getFormValidationErrors(){
    this.count = 0;
    this.allErrored = false;
    this.oneError = false;

    Object.keys(this.RegistrationForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.RegistrationForm.get(key).errors;
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
    this.notExists = false;
  }

}
