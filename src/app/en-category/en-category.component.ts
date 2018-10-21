import { Component, OnInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-en-category',
  templateUrl: './en-category.component.html',
  styleUrls: ['./en-category.component.scss']
})
export class EnCategoryComponent implements OnInit {
  cards = [
    {titel:'1번', contents:'1번 콘텐츠'},
    {titel:'1번', contents:'1번 콘텐츠'},
    {titel:'1번', contents:'1번 콘텐츠'},
    {titel:'1번', contents:'1번 콘텐츠'},
  ]
  constructor() { }

  ngOnInit() {

    
  }

}
