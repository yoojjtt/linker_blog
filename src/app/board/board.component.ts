import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../_util/data.service';


declare var $: any;

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

    boardMainKey: any = '';
    boardKey: any = '';
    listArray = [];
    loadingState:boolean = true;
    constructor(
        private _route: ActivatedRoute,
        private _data: DataService,
        private router: Router, 
        
    ) { }

    ngOnInit() {
        
        this.getParam();
    }

    getParam() {
        this._route.params.forEach(params => {
            this.boardMainKey = params['boardMainKey'];
            this.boardKey = params['boardKey'];
            
            console.log(this.boardKey);
            // if (!this.boardKey) {
            //     this.boardKey = 0;
            //     this.readBoard();
            // }
            this.readBoard();

        });
    }
    readBoard() {

        var bodyData = {
            db_key: 0,
            type: "both",
            category: this.boardMainKey, // category
            subCategory: this.boardKey, // subCategory
            srcWord:"",
            
        }
        let gubun = 'R';
        let data = { 'gubun': gubun, 'data': bodyData };

        this._data.postService(this._data.getRouter('board'), data)
            .then(result => this.readAfter(result))
            .catch(error => console.log(error));


    }
    readAfter(res) {

        var response = res.data[0];
        var msg = response.msg;
        var return_code = response.return_code;
        this.listArray = response;
        var str;

        
        if (this.listArray.length == 0) {

            $('.dimmer').dimmer('show');

            setTimeout(()=>{
                $('.dimmer').dimmer('hide');
            },3000)
        }else{
            this.loadingState = false;
        }

    }
    postDetail(item){
        console.log(item);
        this.router.navigate(['/post',item.id]);
    }



}
