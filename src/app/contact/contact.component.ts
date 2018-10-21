import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataService } from '../_util/data.service';
import { UtilService } from '../_util/util.service';
@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

    email = new FormControl('', [Validators.required, Validators.email]);
    writer = new FormControl('', [Validators.required, Validators.maxLength(15)])
    title = new FormControl('', [Validators.required, Validators.maxLength(15)])
    content = new FormControl('', [Validators.required, Validators.maxLength(256), Validators.minLength(1)])

    query = {
        email: '',
        wrtier: '',
        content: ''

    }


    constructor(
        private _data: DataService,
        private _util: UtilService


    ) { }

    ngOnInit() {
    }
    getErrorMessage() {
        return this.email.hasError('required') ? '이메일은 필수입니다.' :
            this.email.hasError('email') ? '이메일 형식에 맞지않습니다.' :
                '';
    }
    getWriterErrorMsg() {

        return this.writer.hasError('required') ? '작성자는 필수입니다.' :
            this.writer.hasError('maxLength') ? '15자를 넘을 수 없습니다.' :
                '';
    }
    getTitleErrorMsg() {

        return this.title.hasError('required') ? '글제목은 필수입니다.' :
            this.title.hasError('maxLength') ? '15자를 넘을 수 없습니다.' :
                '';
    }
    getContentErrorMsg() {
        return this.content.hasError('required') ? '내용은 필수입니다.' :
            this.content.hasError('maxLength') ? '256자를 넘을 수 없습니다.' :
                '';
    }

    onSubmit() {
        // console.log(this.writer.value);
        // console.log(this.content.value);


        if (this.email.invalid) {
            this._util.openSnackBar('이메일', '유효하지 않습니다.');
            return
        }
        if (this.writer.invalid) {
            this._util.openSnackBar('작성자', '유효하지 않습니다.');
            return
        }

        if (this.content.invalid) {
            this._util.openSnackBar('내용', '유효하지 않습니다.');
            return
        }

        console.log(this.content.value);
        //새글인경우

        //수정인경우
        //댓글인 경우

        //댓글의 댓글인 경우
        // console.log(this.data);
        // if(!this.boardKey){
        //     this.boardKey = 0; // 댓글도 저장임으로 0 
        // }
        // if(!this.data.replyType){
        //     this.data.replyType = '댓글';

        // }

        // 새글쓰기 | 댓글달기 | 댓글의 댓글달기 
        // 새글쓰기 : key = 0 

        // let dataObject = {
        //     key: this.boardKey,
        //     user_key: 0,
        //     writer: this.writer.value,
        //     title: this.title.value,
        //     memo: this.content.value,
        //     isAdmin: 'N',
        //     type: 'A', // 댓글이므로 A
        //     replyType: this.data.replyType,
        //     group_key: this.data.group_key,
        //     group_order: this.data.group_order,
        //     group_depth: this.data.group_depth,
        //     answerKey: this.data.id, // 어떤글의 댓글을 단것인지 
        // };

        // let gubun = 'board_S';
        // // let data = { 'gubun': gubun, 'data': { 'id': 'yoojjtt', 'userid': '' } };
        // let data = { "gubun": gubun, "data": dataObject };
        // console.log(data);
        // this._data
        //     .postService(this._data.getRouter('board'), data)
        //     .then(result => this.submitAfter(result))
        //     .catch(error => console.log(error));


    }
    submitAfter(res) {
        this._util.openSnackBar(this.writer.value, this.content.value);
        console.log(res);
        // this.getBoardList();
        this.writer = new FormControl('', [Validators.required, Validators.maxLength(15)])
        this.title = new FormControl('', [Validators.required, Validators.maxLength(15)])
        this.content = new FormControl('', [Validators.required, Validators.maxLength(256), Validators.minLength(1)])
        // this.boardEditView = false;





    }

}
