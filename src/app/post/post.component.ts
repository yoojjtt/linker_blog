import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../_util/data.service';

declare var $: any;
@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

    postKey // 글 조회 키
    postData ={
        id:0,
        title:'',
        contents:''
    }; // 글 데이터
    chkPost: boolean = false; // 글이 있는지여부

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
            this.postKey = params['postKey'];
            // console.log(this.postKey);
            if (!this.postKey) {
                this.postKey = 0;
                this.readBoard();
            } else {
                this.readBoard();
            }

        });
    }
    readBoard() {
        var bodyData = {
            db_key: this.postKey,
            type: "each",
            category: '', // category
            subCategory: '', // subCategory
            srcWord:"",
            
        }
        let gubun = 'R';
        let data = { 'gubun': gubun, 'data': bodyData };
        //console.log(data);

        this._data.postService(this._data.getRouter('board'), data)
            .then(result => this.readAfter(result))
            .catch(error => console.log(error));


    }
    readAfter(res) {
        //console.log(res);
        this.postData = res.data[0][0];
        console.log(this.postData);
        if (!this.postData.id) {
            this.chkPost = false;
        }
        if (this.postData.id) {
            this.chkPost = true;
            console.log(this.postData.contents)
            // this.postData.contents = $.parseHTML(this.postData.contents);
            var str = this.postData.contents;
            // s$('#realContents').append(str)
            // $('#realContents').html(str);
            $('#obj-contents').html(str);
            

        }
    }



}
