import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../_util/data.service';


declare var $: any;
@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

    categoryKey
    categoryName:string = '';
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
            this.categoryKey = params['categoryKey'];
            // console.log(this.categoryKey);
            // if (!this.categoryKey) {
            //     this.categoryKey = 0;
            //     this.readCategory();
            // }
            this.readCategory();

        });
    }
    readCategory(){
        switch(this.categoryKey){
            case '1': this.categoryName='프로그램 이야기'; break;
            case '2': this.categoryName='언어 이야기'; break;
        }
        // console.log(this.categoryName);
    }

    categoryDetail(category, subCategory){
        
        this.router.navigate(['/board',category,subCategory]);
    }



}
