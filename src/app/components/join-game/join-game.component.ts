import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ApiService } from './../../shared2/api.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})

export class JoinGameComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList',{static:false}) chipList;
  @ViewChild('resetPlayerForm',{static:false}) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  playerForm: FormGroup;

  ngOnInit() {
    this.updateBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private playerApi: ApiService

  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.playerApi.GetPlayer(id).subscribe(data => {
      this.playerForm = this.fb.group({
        player: new FormControl({value: data.player, disabled: true}),
        rank: [data.rank, [Validators.required]],
        score: [data.score, [Validators.required]],
        time: [data.time, [Validators.required]],
        games_played: [data.games_played, [Validators.required]],
        status: [data.status, [Validators.required]]
      })      
    })    
  }
//[data.player, [Validators.required]]

  /* Reactive book form */
  updateBookForm() {
    this.playerForm = this.fb.group({
      player: ['', [Validators.required]],
      rank: ['', [Validators.required]],
      score: ['', [Validators.required]],
      time: ['', [Validators.required]],
      games_played: ['', [Validators.required]],
      status: ['', [Validators.required]]
    })
  }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
   
    if (input) {
      input.value = '';
    }
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.playerForm.controls[controlName].hasError(errorName);
  }

  /* Update book */
  joinGame() {
    // console.log(this.playerForm.value)
    // var id = this.actRoute.snapshot.paramMap.get('id');
    // if (window.confirm('Are you sure you want to join the game?')) {
    //   this.playerApi.UpdatePlayer(id, this.playerForm.value).subscribe( res => {
    //     this.ngZone.run(() => this.router.navigateByUrl('/players-list'))
    //   });
    // }
  }
  
}