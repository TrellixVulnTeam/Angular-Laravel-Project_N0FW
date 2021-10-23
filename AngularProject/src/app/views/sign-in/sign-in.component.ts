import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { ToastrService } from 'ngx-toastr';
import {select, Store} from '@ngrx/store';
import { UserLoginAction, UserSignUpAction} from 'src/app/store/actions/user.actions';
import { IAppState } from 'src/app/store/state/app.state';
import { selectUserResponse } from 'src/app/store/selectors/user.selector';
import { UserAuth } from 'src/app/model/userAuth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  user?: User;

  formGroup: FormGroup;

  formUserSignIn: FormGroup;

  token:any;

  data:any;

  user$?: Observable<any>;

  clicked? = false;

  showFormSignIn = false;

  showFormSignUp = true;

  constructor(private toastr: ToastrService,  private fb: FormBuilder, private store: Store<IAppState>, private router: Router) {  
    this.formGroup = this.fb.group({
      name: ["",[Validators.required, Validators.minLength(4)]],
      email: ["",[Validators.required, Validators.email ,Validators.minLength(4)]],
      password: ["",[Validators.required]],
    }) 
    
    this.formUserSignIn = this.fb.group({
      name: ["",[Validators.required, Validators.minLength(4)]],
      password: ["",[Validators.required]],
    }) 
  }

  ngOnInit(): void {
  }

  //signUp(): void {
  //  let formUser: User =  this.formGroup?.value;
  //  console.log(formUser);
  //  this.user_service.signUp(formUser).subscribe(res =>{
  //   console.log(res);
  //  });
 // }
  signUp(){
    let formUser: User =  {
      'name' : this.formGroup.value.name,
      'email' : this.formGroup.value.email,
      'password' : this.formGroup.value.password,
     }
        this.store.dispatch(UserSignUpAction({user : formUser}));
  }


  signIn() {
    let form: User = this.formUserSignIn.value;
    this.store.dispatch(UserLoginAction({ user: form }));
    this.user$ = this.store.select<UserAuth[]>(selectUserResponse);
    this.user$.subscribe((res: any) => {
      if (typeof res !== 'undefined' && res.length > 0) {
        if (res[0].status === 1) {
          this.toastr.success(JSON.stringify(res[0].message), JSON.stringify(res[0].code), {
            timeOut: 2000,
            progressBar: true,
          });
          this.token = res[0].data.token;
          localStorage.setItem('token', JSON.stringify(res[0].data.token));
          this.router.navigate(['/']);
        } else {
          this.toastr.error(JSON.stringify(res[0].message), JSON.stringify(res[0].code), {
            timeOut: 2000,
            progressBar: true,
          })
        }
      }
    })
  }

  login() {
    this.clicked = true;
      if(this.clicked){
        this.clicked = false;
        this.showFormSignUp = false;
        return this.showFormSignIn = true;       
      } else {
        return false;
      }
  }

  register() {
    this.clicked = true;
      if(this.clicked){
        this.clicked = false;
        this.showFormSignUp = true;
        return this.showFormSignIn = false;       
      } else {
        return false;
      }
  }

  yellowDiv(){
    let registerLink = (document.getElementById('register-form-link') as HTMLAnchorElement);
    if (this.showFormSignUp === true){
      registerLink.setAttribute('checked', 'yellow');
    }else{
      registerLink.setAttribute('checked', '');
    } 
  }

}
