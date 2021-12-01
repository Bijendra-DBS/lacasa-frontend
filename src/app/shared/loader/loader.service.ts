import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoaderState } from './loader';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get loaderState(){
    return this.loaderSubject.asObservable();
  }

  constructor() { }

  show() {
    this.loaderSubject.next( true );
    // console.log("this.loaderSubject show ",this.loaderSubject.subscribe(res=>{
    //   console.log("ressssss",res);
    // }))
  }

  hide() {
    this.loaderSubject.next( false );
  }
}
