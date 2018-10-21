import { Component, OnInit } from '@angular/core';

declare var $:any;
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'blogNew';

    ngOnInit() {

        this.loadTopFunction()
    }
    loadTopFunction() {
        window.onscroll = function () { scrollFunction() };

        function scrollFunction() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                document.getElementById("myTopBtn").style.display = "block";
            } else {
                document.getElementById("myTopBtn").style.display = "none";
            }
        }


    }
    topFunction() {
        
        $('html, body').animate({ scrollTop: 0 }, 500);
        document.documentElement.scrollTop = 0;
    }


}
