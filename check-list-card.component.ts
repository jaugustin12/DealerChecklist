import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from './car';
import { HttpService } from '../../services/http.service';
import { DataService } from '../../services/dataService/data-service.service';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { UserService } from '../../services/userService/user.service';

@Component({
  selector: 'app-check-list-card',
  templateUrl: './check-list-card.component.html',
  styleUrls: ['./check-list-card.component.css']
})
export class CheckListCardComponent implements OnInit {
  userDetails;
  model = new Car();
  loading = false;
  error: {};
  keys: number[] = [1, 2];
  answers: string[] = ['yes', 'no'];
  showCheckList;

  form = new FormGroup({
    vin: new FormControl(this.model.vin, [
      Validators.required,
      Validators.minLength(7)
    ]),
    walk: new FormControl(this.model.walk, [Validators.required]),
    flaws: new FormControl(this.model.flaws, [Validators.required]),
    keys: new FormControl(this.model.keys, [Validators.required]),
    accessory: new FormControl(this.model.accessory, [Validators.required]),
    sdCard: new FormControl(this.model.sdCard, [Validators.required]),
    wheelLockKey: new FormControl(this.model.wheelLockKey, [
      Validators.required
    ]),
    miles: new FormControl(this.model.miles, [Validators.required]),
    dxDriver: new FormControl(this.model.dxDriver, [Validators.required])
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public http: HttpService,
    private userService: UserService,
    private dataService: DataService

  ) {}

  ngOnInit() {
    this.dataService.currentChecklist.subscribe(showCheckList => this.showCheckList = showCheckList);
    this.userService.getUserProfile().subscribe(
      res => {
        console.log('userrrrr', res);
        this.userDetails = res['user'];
      },
      err => {}
    );
  }

  get vin(): any {
    return this.form.get('vin');
  }
  get walk(): any {
    return this.form.get('walk');
  }
  get flaws(): any {
    return this.form.get('flaws');
  }

  get accessory(): any {
    return this.form.get('accessory');
  }

  get wheelLockKey(): any {
    return this.form.get('wheelLockKey');
  }
  get miles(): any {
    return this.form.get('miles');
  }
  get dxDriver(): any {
    return this.form.get('dxDriver');
  }

  onSubmit() {
    this.loading = true;
    this.http
      .sendEmail('http://localhost:3500/sendmail', this.userDetails, this.model)
      .subscribe(
        data => {
          let res: any = data;
          console.log(`👏 > 👏 > 👏 > 👏 successfully registered`);
        },
        err => {
          console.log(err);
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    this.showCheckList = !this.showCheckList;
    this.dataService.toggleChecklist(this.showCheckList);
  }
}
