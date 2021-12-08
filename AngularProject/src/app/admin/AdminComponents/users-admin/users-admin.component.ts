import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import { User } from 'src/app/model/User';
import { DeleteUserAction, GetAllUserAction } from 'src/app/store/actions/user.actions';
import { selectUserAuth } from 'src/app/store/selectors/user.selector';
import { IAppState } from 'src/app/store/state/app.state';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css']
})
export class UsersAdminComponent implements OnInit {

  users$? : Observable<User[]>;

  constructor(private store : Store<IAppState>) { 
    this.store.dispatch(GetAllUserAction());
  }

  ngOnInit(): void {
    this.users$ = this.store.select(selectUserAuth);
  }

  deleteUser(user_id: any){
    this.store.dispatch(DeleteUserAction({user_id : user_id}));
  }

}
