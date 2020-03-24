import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { forbiddennameValidator } from './shared/username-valid';
import { passwordvalidator } from './shared/passwordValidator';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  constructor(private fb: FormBuilder, private registrationService : RegistrationService){}

get username (){
  return this.registrationForm.get('username');
}

  registrationForm=this.fb.group({
  username:['', [Validators.required, Validators.maxLength(12), Validators.minLength(5), forbiddennameValidator(/admin/)]],
  password:[''],
  confirmPassword:[''],
  address: this.fb.group({
    city:[''],
    locality:[''],
    pincode:['']
  })
}, {validator : passwordvalidator})



  // registrationForm = new FormGroup({
  //   username: new FormControl(""),
  //   password:new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city:new FormControl(''),
  //     locality: new FormControl(''),
  //     pincode: new FormControl('')
  //   })
  // });
  
  onSubmit(){
    this.registrationForm.patchValue({
      username:'Ashu',
      password:'Ashu@123',
      confirmPassword:'Ashu@123',
      
    })
  }

  onSub(){
    console.log(this.registrationForm.value);
    this.registrationService.register(this.registrationForm.value).subscribe(
      response => console.log('Success!', response),
      error => console.error('Error!', error)
    )
  }
}
