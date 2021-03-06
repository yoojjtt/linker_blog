import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-drop-down2',
    templateUrl: './drop-down2.component.html',
    styleUrls: ['./drop-down2.component.scss']
})
export class DropDown2Component implements OnInit {


    outputItems = {
        value: "",
        text: ""
    }


    @Input() items: any;
    @Input() items_default: any;

    @Output() changeSelctedValue = new EventEmitter<any>();

    itemsArray: any = [];


    constructor() { }

    ngOnInit() {

        $('#search-select').dropdown();

        $('#search-select').dropdown({
            onChange(value, text, $choice) {
                console.log('value : ' + value);
                console.log('text : ' + text);
                console.log($choice);
            }
        });


    }

    ngOnChanges(changes: SimpleChanges) {
        // console.log('drop : ', this.items_default);
        console.log(this.items);
        

    }
    
    checkVal(e){
        // console.log('drop : ', this.items_default);
        // console.log('값 선택 : ', e.target.value);
        
        var data = {
            dropName : this.items_default,
            value : e.target.value
        }
        this.changeSelctedValue.emit(data);

    }

}
