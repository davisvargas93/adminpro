import { Component, OnInit, OnDestroy } from '@angular/core';
import {  retry, map, filter } from 'rxjs/operators';
import { Observable, Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  constructor() {

    this.subscription = this.regresdaObservable().subscribe(
      numero => console.log('Sub', numero),
      error => console.log('error en el obs', error),
      () => console.log('se completo obs')
      );
    }
    
    ngOnInit() {
    }
    
    ngOnDestroy(){
      
      console.log('esta pagina se va a cerrar');
      this.subscription.unsubscribe();
    }

  regresdaObservable():Observable<any>{
    return new Observable((observer: Subscriber<any>) =>{
      
      let contador = 0 ;
      let intervalo = setInterval(()=>{
        contador += 1 ;
        const salida = {
          valor: contador
        };
        observer.next(salida);
        // if (contador === 3 ){
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
        // if (contador === 2 ){
        //   // clearInterval(intervalo);
        //   observer.error('error auxilio!');
        // }
      },1000);
    }).pipe(
      map(resp=>{return resp.valor}),
      filter((valor,index)=>{
        if ( (valor % 2) !== 0  ){
          // Impar
           console.log('filter Impar', valor, index);
           return true;
          } else {
            // par 
            console.log('filter par ', valor, index);
            return false;
        }        
      })
    );
  }

}
