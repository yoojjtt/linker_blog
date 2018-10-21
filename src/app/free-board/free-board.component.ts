import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../_util/data.service';
declare var $:any;

@Component({
    selector: 'app-free-board',
    templateUrl: './free-board.component.html',
    styleUrls: ['./free-board.component.scss']
})
export class FreeBoardComponent implements OnInit {

    listArray = []; // board array
    loadingState:boolean = true;

    constructor(
        private _route: ActivatedRoute,
        private _data: DataService,
        private router: Router, 

    ) { }

    ngOnInit() {

        this.readBoard();
    }
    readBoard() {
        var bodyData = {
            db_key: 0,
            type: "category",
            category: "FreeBoard", // category
            subCategory: "", // subCategory
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

        this.loadingState = false;
        if (this.listArray.length == 0) {
            str = '<div class="post-preview">아직작성된 글이 없습니다</div>';

            $('#contents-list').html(str);



        }

    }
    postDetail(item){
        console.log(item);
        this.router.navigate(['/post',item.id]);
    }


}
