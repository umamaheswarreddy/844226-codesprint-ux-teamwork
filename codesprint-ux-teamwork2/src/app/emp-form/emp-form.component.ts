import { Component, OnInit } from '@angular/core';
import { Emp } from '../model/emp';
import { EmpService } from '../service/emp.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-emp-form',
  templateUrl: './emp-form.component.html',
  styleUrls: ['./emp-form.component.css']
})
export class EmpFormComponent implements OnInit {
  emp: Emp;
  msg: string;
  loginForm: FormGroup;

  error_messages = {
    'fname': [
      { type: 'required', message: 'First Name is required.' }
    ],
    'lname': [
      { type: 'required', message: 'Last Name is required.' }
    ],

    'age': [
      { type: 'required', message: 'age is required.' },
      { type: 'min', message: 'age should be between 18 and 60.' },
      { type: 'max', message: 'age should be between 18 and 60.' }
    ],

    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'minlength', message: 'Email length is too short.' },
      { type: 'maxlength', message: 'Invalid Email length.' },
      { type: 'email', message: 'Please enter valid email ID!'}
    ],

    'mobile': [
      { type: 'required', message: 'Mobile number is required.' },
      // { type: 'pattern', message: 'first number should not be zero' },
      { type: 'minlength', message: 'it should contain 10 numbers.' }
    
    ],

    'streetadress': [
      { type: 'required', message: 'streetaddress is required.' }
    ],

    'city': [
      { type: 'required', message: 'city name is required.' }
    ],
    'pincode': [
      { type: 'required', message: 'pincode  is required.' },
      { type: 'minlength', message: 'pincode should contain 6 numbers.' }
    ],

    'country': [
      { type: 'required', message: 'country is required.' }
    ],
    'trainer': [
      { type: 'required', message: 'country is required.' }
    ],

    
  }

  constructor(
    private empService: EmpService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      fname: new FormControl('', Validators.compose([
        Validators.required
      ])),
      lname: new FormControl('', Validators.compose([
        Validators.required
      ])),
      age: new FormControl('', Validators.compose([
        Validators.required,
        Validators.min(18),
        Validators.max(60)
        
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(30)
      ])),
      mobile: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        // Validators.pattern('[1-9]\d{9}')
      ])),
      streetadress : new FormControl('', Validators.compose([
        Validators.required
      ])),

      city: new FormControl('', Validators.compose([
        Validators.required
      ])),
      pincode: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        // Validators.pattern('[0-9]\d{6}')
      ])),
      country: new FormControl('', Validators.compose([
        Validators.required
      
      ])),
      trainer: new FormControl('', Validators.compose([
        Validators.required
      ])),

    
    }, { 
      
    });


  }

  ngOnInit() {





    let empId = this.actRoute.snapshot.params.id;
    if (empId) {
      this.empService.getAllById(empId).subscribe(
        (data) => {
          this.emp = data;

        }
      );

    } else {
      this.emp = {
        empId: 0,
        firstName: '',
        lastName: '',
        age: 0,
        mobileNumber: '',
        email: '',
        address: ''
      };


    }
  }

  save() {
    let ob: Observable<Emp>;
    ob = this.empService.add(this.emp);

    ob.subscribe(
      (Data) => {
        this.router.navigateByUrl("");
      },
      (errResponse) => {
        this.msg = errResponse.error;

      }
    );
  }
}
