import { Component, OnInit, Input, OnChanges, Output, SimpleChanges, EventEmitter, ViewChild, ViewChildren } from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-group-combo2',
    templateUrl: './group-combo2.component.html',
    styleUrls: ['./group-combo2.component.scss']
})
export class GroupCombo2Component implements OnInit {

    TAG = "app-group-combo / "

    items1_default = "카테고리 대분류";
    items1_init: Boolean = false; //사용안함
    items1_initNumber = 0;
    items1 = [
        { key: 1, name: '대분류1' },
        { key: 2, name: '대분류2' },
        { key: 3, name: '대분류3' },
        { key: 4, name: '대분류4' },
        { key: 5, name: '대분류5' },
        { key: 6, name: '대분류6' },

    ];

    items2_default = "중분류";
    items2_init: Boolean = false;
    items2_initNumber = 0;
    items2 = [
        { key: 1, name: '중분류1' },
        { key: 2, name: '중분류2' },
        { key: 3, name: '중분류3' },
        { key: 4, name: '중분류4' },
        { key: 5, name: '중분류5' },
        { key: 6, name: '중분류6' },
    ];

    items3_default = "소분류";
    items3_init: Boolean = false;
    items3_initNumber = 0;
    items3 = [
        { key: 1, name: '소분류1' },
        { key: 2, name: '소분류2' },
        { key: 3, name: '소분류3' },
        { key: 4, name: '소분류4' },
        { key: 5, name: '소분류5' },
        { key: 6, name: '소분류6' },
    ];

    items4_default = "상세분류";
    items4_init: Boolean = false;
    items4_initNumber = 0;
    items4 = [
        { key: 1, name: '상세분류1' },
        { key: 2, name: '상세분류2' },
        { key: 3, name: '상세분류3' },
        { key: 4, name: '상세분류4' },
        { key: 5, name: '상세분류5' },
        { key: 6, name: '상세분류6' },];

    outputItem = {
        cSelected1: "", //대분류선택
        cSelected2: "", //중분류선택
        cSelected3: "", //소분류
        cSelected4: "" //상세분류
    }

    item = {
        cpk: "",
        upk: "",
        job: "",
        tpk: 0,
        category: ""
    }

    /** 초기회를 위해서 */
    @Input() optionData;
    @Output() changeCategroy = new EventEmitter<any>();

    @Output() test = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {



    }
    getItemHandler(res, type) {

        let obj = res[0];
        // console.log(this.TAG, obj);

        if (type == 1) {
            this.items1 = [];
            this.items2 = [];
            this.items3 = [];
            this.items4 = [];

        }

        if (type == 2) {
            this.items2 = [];
            this.items3 = [];
            this.items4 = [];

        }

        if (type == 3) {
            this.items3 = [];
            this.items4 = [];

        }

        if (type == 4) {
            this.items4 = [];

        }

        this.changeCategroy.emit(this.outputItem);

    }

    changeSelctedValue1_handler(e) {
        console.log('drop1 changed')
        console.log(e);

        var val = e.value


        var arr1 = [
            { key: 1, name: '중분류11' },
            { key: 2, name: '중분류21' },
            { key: 3, name: '중분류31' },
            { key: 4, name: '중분류41' },
            { key: 5, name: '중분류51' },
            { key: 6, name: '중분류61' },
        ];
        var arr2 = [
            { key: 1, name: '중분류12' },
            { key: 2, name: '중분류22' },
            { key: 3, name: '중분류32' },
            { key: 4, name: '중분류42' },
            { key: 5, name: '중분류52' },
            { key: 6, name: '중분류62' },
        ];
        var arr3 = [
            { key: 1, name: '중분류13' },
            { key: 2, name: '중분류23' },
            { key: 3, name: '중분류33' },
            { key: 4, name: '중분류43' },
            { key: 5, name: '중분류53' },
            { key: 6, name: '중분류63' },
        ];
        var arr4 = [
            { key: 1, name: '중분류14' },
            { key: 2, name: '중분류24' },
            { key: 3, name: '중분류34' },
            { key: 4, name: '중분류44' },
            { key: 5, name: '중분류54' },
            { key: 6, name: '중분류64' },
        ];
        var arr5 = [
            { key: 1, name: '중분류15' },
            { key: 2, name: '중분류25' },
            { key: 3, name: '중분류35' },
            { key: 4, name: '중분류45' },
            { key: 5, name: '중분류55' },
            { key: 6, name: '중분류65' },
        ];
        var arr6 = [
            { key: 1, name: '중분류16' },
            { key: 2, name: '중분류26' },
            { key: 3, name: '중분류36' },
            { key: 4, name: '중분류46' },
            { key: 5, name: '중분류56' },
            { key: 6, name: '중분류66' },
        ];
        // this.initMethod('1');
        val == ''
        val == '1'
        val == '2'
        val == '3'
        val == '4'
        val == '5'
        val == '6'
        switch (val) {
            case '': this.items2 = []; break;
            case '1': this.items2 = arr1; break;
            case '2': this.items2 = arr2; break;
            case '3': this.items2 = arr3; break;
            case '4': this.items2 = arr4; break;
            case '5': this.items2 = arr5; break;
            case '6': this.items2 = arr6; break;

        }



        this.items3 = [];
        this.items4 = [];

    }
    changeSelctedValue2_handler(e) {
        console.log('drop1 changed')
        console.log(e);
        // this.initMethod('2');


    }
    changeSelctedValue3_handler(e) {

        console.log('drop1 changed')
        console.log(e);
        // this.initMethod('3');

    }
    changeSelctedValue4_handler(e) {

        console.log('drop1 changed')
        console.log(e);
        // this.initMethod('4');

    }

    initMethod(type) {

        this.items1 = [];
        this.items2 = [];
        this.items3 = [];
        this.items4 = [];


    }
    categoryLoad(type){
        switch(type){
            case '1': this.items1 = [
                { key: 1, name: '대분류1' },
                { key: 2, name: '대분류2' },
                { key: 3, name: '대분류3' },
                { key: 4, name: '대분류4' },
                { key: 5, name: '대분류5' },
                { key: 6, name: '대분류6' },
        
            ];break;

        }
    }

}
