import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataService } from '../_util/data.service';
// import { CkEditorModule } from '../_module/ckeditor.module';
import { CategoryEditComponent } from "../_common/category-edit/category-edit.component";
import { MatDialog } from "@angular/material";
import { CategoryData } from '../_model/category.model';
import { Router, ActivatedRoute } from '@angular/router';
declare var CKEDITOR: any;
declare var $: any;


@Component({
    selector: 'app-write',
    templateUrl: './write.component.html',
    styleUrls: ['./write.component.scss']
})
export class WriteComponent implements OnInit {

    catBoxView: boolean = false;
    categoryModel: CategoryData = new CategoryData();
    mainCategoryGbn: any[] = []; // mainGroup
    subCategoryGbn: any[] = [];//subGroup

    mainCategory: string = '';
    subCategory: string = '';

    Key: any;// 수정시있음

    constructor(
        private _data: DataService,
        public dialog: MatDialog,
        private _route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.getParam()
        this.loadCk();
        this.readMainCategory();
    }
    //수정할 경우에 파라미터 있음
    getParam() {

        this._route.params.forEach(params => {

            this.Key = params['key'];
            console.log(this.Key);  // undefined 또는 int 로 온다.

            //수정시
            if (this.Key) {

                // this.getUserInf();
                // this.getItemInf();
            }
            //신규
            else {
                // this.getUserInf();
            }

        });
    }

    loadCk() {


        $(function () {


            var baseUrl = 'http://blog.linkerbiz.net';
            var uploadUrl = 'http://blog.linkerbiz.net/blogUpload';
            var dragUrl = 'http://blog.linkerbiz.net/blogUpload?type=image';

            CKEDITOR.replace('wp_contents', {
                filebrowserUploadUrl: uploadUrl, // 그냥 업로드
                filebrowserImageUploadUrl: dragUrl, // drag&drop
                // uiColor : '#3f51b5',
                // removeButtons : 'Underline,Subscript,Superscript', // 지울버튼
                format_tags: 'p;h1;h2;h3;pre',
                // config.language = 'fr';
                extraPlugins: 'widget,smiley,image2,lineutils,widgetselection,colordialog,copyformatting,div,find,flash,forms,iframe,liststyle,pagebreak,preview,showblocks,smiley,templates,colorbutton,panelbutton,button,uploadimage,uploadwidget,notificationaggregator,notification,filetools,font,richcombo,codesnippet'

            });

        });

    }
    readMainCategory() {
        this.categoryModel.job = 'RAmain';
        let gubun = 'category';
        let data = { gubun: gubun, data: this.categoryModel };

        // console.log(data);

        this._data
            .postService(this._data.getRouter("boardManager"), data)
            .then(result => this.readMainAfter(result))
            .catch(error => console.log(error));
    }
    readMainAfter(res) {

        this.mainCategoryGbn = res.data[0];
    }
    //메인카테고리선택
    changeCat(e) {
        var value = e.target.value;
        this.mainCategory = value;
        this.readSubCategory(value);
    }
    readSubCategory(value) {
        this.categoryModel.job = 'RAsub';
        this.categoryModel.groupKey = value;

        let gubun = 'category';
        let data = { gubun: gubun, data: this.categoryModel };

        console.log(data);

        this._data
            .postService(this._data.getRouter("boardManager"), data)
            .then(result => this.readSubAfter(result))
            .catch(error => console.log(error));

    }
    readSubAfter(res) {
        console.log(res);
        this.subCategoryGbn = res.data[0];
    }
    //서브카테고리선택
    changeSubCat(e) {
        var value = e.target.value;
        this.subCategory = value;

    }
    submit() {

        var chk = confirm("제출 하시겠습니까?");
        if (chk) {


            var category = this.mainCategory;
            var subCategory = this.subCategory;
            var writer = $('#wp_writer').val();
            var editPwd = $('#wp_editPwd').val();
            var title = $('#wp_title').val();
            var srcWord = $('#wp_srcWord').val();
            var subTitle = $('#wp_subTitle').val();
            var contents = CKEDITOR.instances['wp_contents'].getData();




            if (writer == '') {
                alert('이름을 입력하세요.');
                return
            }
            if (editPwd == '') {
                alert('수정 비밀번호를 입력하세요.');
                return
            }
            if (category == '') {
                alert('카테고리를 선택하세요.');
                return
            }
            if (category == 'Programme' && subCategory == '') {
                alert('하위카테고리를 선택하세요.');
                return
            }

            if (title == '') {
                alert('제목을 입력하세요.');
                return
            }
            if (subTitle == '') {
                alert('요약정보를 입력하세요.');
                return
            }

            if (!subCategory) {

                subCategory = '';
            }


            var d = {
                db_key: 0,
                category: category,
                subCategory: subCategory,
                srcWord: srcWord,
                writer: writer,
                editPwd: editPwd,
                title: title,
                subTitle: subTitle,
                contents: contents



            }

            let gubun = 'S';
            let data = { 'gubun': gubun, 'data': d };
            console.log('writer save data : ', data);

            this._data.postService(this._data.getRouter('board'), data)
                .then(result => this.saveAfter(result))
                .catch(error => console.log(error));


        }
    }
    saveAfter(res) {
        // console.log(res);

        var response = res.data[0][0];
        var msg = response.msg;
        var return_code = response.return_code;

        if (return_code == '100') {
            // alert(msg);
            this._data.toastLoad('success', '', msg);
            this.initForm();
        } else {
            this._data.toastLoad('error', '', msg);

        }

    }
    initForm() {
        $('#wp_category').val('');
        $('#wp_subCategory').val('');
        $('#wp_writer').val('');
        $('#wp_editPwd').val('');
        $('#wp_title').val('');
        $('#wp_srcWord').val('');
        $('#wp_subTitle').val('');
        CKEDITOR.instances['wp_contents'].setData('');

    }
    openCategoryEdit() {
        //필수 : 상품그룹 정보 선택
        // console.log("open : ", this.changedGroupData);

        const dialogRef = this.dialog.open(CategoryEditComponent, {
            width: "650px",
            height: "750px",
            data: {
                dialogName: "카테고리 관리",

            }
        });

        // 창이 닫을 때 이벤트
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            if (result) {
                console.log("결과값 : ", result.data);
                this.readMainCategory();
            } else {
                console.log("취소");
                this.readMainCategory();
            }
        });

    }

}


