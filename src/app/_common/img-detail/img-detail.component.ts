import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-img-detail',
  templateUrl: './img-detail.component.html',
  styleUrls: ['./img-detail.component.scss']
})
export class ImgDetailComponent implements OnInit {

  fileSrc;
  fileName;

  constructor(
    public dialogRef: MatDialogRef<ImgDetailComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ImgDetailComponent,
  ) { }

  ngOnInit() {

    // console.log(this.data);
    this.loadDetailImg();
    
  }
  loadDetailImg(){
    this.fileSrc = this.data.fileSrc;
    this.fileName = this.data.fileName;
    
  }

}
