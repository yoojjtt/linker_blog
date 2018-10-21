import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DataService } from '../../_util/data.service';
import { UtilService } from '../../_util/util.service';
import { CategoryData } from '../../_model/category.model';
declare var $: any;
@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {

  categoryModel:CategoryData = new CategoryData();
  results:any[] = [];
  deleteBtn:boolean = false;
  constructor
  (
    public _uitl:UtilService,
    public _data:DataService,
    public dialogRef: MatDialogRef<CategoryEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    
  ) { }

  fileId1:any = 'categoryImg'
  uploadedfileInfo1:any;
  fileId2:any = 'categoryBgImg'
  uploadedfileInfo2:any;
  mainCategoryGbn:any[] = []; // mainGroup
  ngOnInit() {
    console.log(this.data);
    this.categoryDBread();
    $('.ui.radio.checkbox')
  .checkbox()
;
  }
  categoryDBread(){

    this.categoryModel.job = 'RA';
    let gubun = 'category';
    let data = { gubun: gubun, data: this.categoryModel };

    // console.log(data);

    this._data
      .postService(this._data.getRouter("boardManager"), data)
      .then(result => this.readAfter(result))
      .catch(error => console.log(error));

  }
  readAfter(res){

    
    this.results = res.data[0];
    let obj;
    var k = 0;
    var j = 1;
    var odd_tag;

    for(let i=0; i<this.results.length; i++){
      obj = this.results[i];
      j = Number(i) + 1;
        k = i % 2;
        odd_tag = "";
        if (k == 1) {
          odd_tag = "odd";
        }
      obj.odd_tag = odd_tag;
      obj.fullPath = this._uitl.getImagePath(obj.img,'thumb'); 
      obj.thumb =  this._uitl.getImagePath(obj.img,'thumb');
    }

    console.log(this.results);
    
  }
  chnagefilesize_handler1(e){
    console.log(e)
  }

  //form 관련
  //radio
  radioChk(e, type){
    // console.log(e.target.check);
    console.log(type);

    switch(type){
      case 'main':this.categoryModel.lv1 = '1'; this.categoryModel.lv2 = '0'; break;
      case 'sub': this.categoryModel.lv1 = '0'; this.categoryModel.lv2 = '1'; break;

    }
    if(type == 'sub'){
      this.readMainCategory();
    }
    console.log(this.categoryModel);
  }
  readMainCategory(){
    this.categoryModel.job = 'RAmain';
    let gubun = 'category';
    let data = { gubun: gubun, data: this.categoryModel };

    // console.log(data);

    this._data
      .postService(this._data.getRouter("boardManager"), data)
      .then(result => this.readMainAfter(result))
      .catch(error => console.log(error));
  }
  readMainAfter(res){

    this.mainCategoryGbn = res.data[0];
  }

  //서브그룹일시, main 카테고리선택
  mainSelect(e){
    
    var value = e.target.value;
    console.log(value);
    this.categoryModel.groupKey = value;
  }

  //save
  categoryDBsave(){

    if(this.categoryModel.title == ''){
      this._data.toastLoad('warning','','제목을 입력하세요.')
      return
    }
    
    if(this.categoryModel.subTitle == ''){
      this._data.toastLoad('warning','','하위 제목을 입력하세요.')
      return
    }
    
    
    if(this.categoryModel.comment == ''){
      this._data.toastLoad('warning','','설명을 입력하세요.')
      return
    }

    //sub 인데, categoryGbn 키랑, lv1 == '0'이여야한다.
    if(this.categoryModel.lv2 == '1'){
      this.categoryModel.lv1 ='0';
      if(this.categoryModel.groupKey == '0'){
        this._data.toastLoad('warning','','상위 카테고리를 선택하세요.');
        return
      }
    }

    this.categoryModel.cpk == 0 ? this.categoryModel.job = 'C' : this.categoryModel.job = 'U';

    let gubun = 'category';
    let data = { gubun: gubun, data: this.categoryModel };

    // console.log(data);

    this._data
      .postService(this._data.getRouter("boardManager"), data)
      .then(result => this.saveAfter(result))
      .catch(error => console.log(error));

  }
  saveAfter(res){
    console.log(res);
    this.categoryModel = new CategoryData();
    this.categoryDBread();
  }
  //save
  save(){
    this.categoryDBsave();
  }
  //edit
  edit(item){
    
    this.deleteBtn = true;
    this.categoryModel = item;
    console.log(this.categoryModel);
  }

  //add
  add(){
    this.categoryModel.job = 'C';
    this.categoryModel = new CategoryData();
  }
  //delete
  delete(){
    this.categoryModel.del = 'Y'
    this.categoryModel.job = 'D';
    let gubun = 'category';
    let data = { gubun: gubun, data: this.categoryModel };

    this._data
      .postService(this._data.getRouter("boardManager"), data)
      .then(result => this.saveAfter(result))
      .catch(error => console.log(error));
  }

  //close
  close(){
    this.dialogRef.close({ data: 'success' });
  }
}
