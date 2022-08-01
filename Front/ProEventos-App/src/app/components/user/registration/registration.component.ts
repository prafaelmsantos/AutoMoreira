import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from 'src/app/helpers/ValidatorField';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({});
  // form!: FormGroup;

  get f(): any {
    return this.form.controls;

  }

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.validation();
  }

  public validation():void {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password','confirmePassword')
    };

    this.form = this.formBuilder.group(
      {
        primeiroNome: ['',[Validators.required]],
        ultimoNome: ['',Validators.required],
        email: ['',[Validators.required, Validators.email]],
        username: ['',[Validators.required]],
        password: ['',[Validators.required, Validators.minLength(6)]],
        confirmePassword: ['',[Validators.required]],
      }, formOptions
    );
  }

  public resetForm(): void{
    this.form.reset();
  }

}
