import { Component, OnInit, Output, EventEmitter, Input, OnChanges, ViewChild } from '@angular/core';

@Component({
    selector: 'app-test-page',
    templateUrl: './test-page.component.html',
    styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit {

    optionData = {
        category1: '', //카테고리선택
        category2: '', //카테고리선택
        category3: '', //카테고리선택
        category4: '', //카테고리선택
        salesState: '', // 판매상태
        dpState: '', // 전시상태
        productInvolveState: '', //상품 확인여부
        productRegistDateType: '', // 상품 등록일 검색유형
        startDate: '', // 조회시작일
        endDate: '', // 조회시작일
        searchType: '', //상품 검색 타입
        searchWord: '' // 검색어
    }
    @ViewChild('groupDrop') groupDrop;
    @ViewChild('groupDrop2') groupDrop2;

    constructor() { }

    ngOnInit() {

    }
    onInitialize(){
        console.log('init');
        this.groupDrop2.initMethod('0');
    }
    bigCat(){
        this.groupDrop2.categoryLoad('1');
    }
    changeCategroy_handler(e){
        console.log(e)
    }
    changeCategroy_handler2(e){
        console.log(e)
    }


}
