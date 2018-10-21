import { Component, OnInit } from '@angular/core';

declare var $: any;
@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    step = 0;

    constructor() { }

    ngOnInit() {
        
    }
    
    setStep(index: number) {
        this.step = index;
    }
    upScroll(){
        $('html, body').animate({ scrollTop: 0 }, 500);
    }

}
