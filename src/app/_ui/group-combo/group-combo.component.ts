import { Component, OnInit, Input, OnChanges, Output, SimpleChanges, EventEmitter, ViewChild, ViewChildren } from '@angular/core';
declare var $: any;
@Component({
    selector: 'app-group-combo',
    templateUrl: './group-combo.component.html',
    styleUrls: ['./group-combo.component.scss']
})
export class GroupComboComponent implements OnInit {

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

        e.value == 2

        this.initMethod('1');

    }
    changeSelctedValue2_handler(e) {
        console.log('drop1 changed')
        console.log(e);
        this.initMethod('2');


    }
    changeSelctedValue3_handler(e) {

        console.log('drop1 changed')
        console.log(e);
        this.initMethod('3');

    }
    changeSelctedValue4_handler(e) {

        console.log('drop1 changed')
        console.log(e);
        this.initMethod('4');

    }

    initMethod(type) {

        switch (type) {
            case '0': {
                this.items1 = this.items1;
                this.items2 = [];
                this.items3 = [];
                this.items4 = [];
                break;

            }
            case '1':
            console.log('1 changed');
                this.items2 = [
                    { key: 10, name: '중분류10' },
                    { key: 20, name: '중분류20' },
                    { key: 30, name: '중분류30' },
                    { key: 40, name: '중분류40' },
                    { key: 50, name: '중분류50' },
                    { key: 60, name: '중분류60' },
                ];
                this.items3 = [];
                this.items4 = [];
                break;
            case '2':
            console.log('2 changed');
                this.items3 = [];
                this.items4 = [];
                break;
            case '3':
            console.log('3 changed');
            
                this.items4 = [];
                break;
            case '4':
            console.log('4 changed');
                break;

        }

    }


}
