import { Component, OnInit,OnDestroy,ChangeDetectorRef } from '@angular/core';
import { LoaderState } from '../shared/loader/loader';
import { LoaderService } from '../shared/loader/loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  // private subscription: Subscription;
  isSpinning$: Observable<boolean>;
  show : boolean;
  constructor(
    private loaderService: LoaderService,
    private changeDetect: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.isSpinning$ = this.loaderService.loaderState;

    this.isSpinning$.subscribe(res=> {
      console.log("res of loader ",res);
      if(res){
        this.show = true;
      } else {
        this.show = false;
      }
    });

  }
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
