import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  AfterViewInit,
  DoCheck,
  SimpleChanges
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataService } from "../../_util/data.service";
import { UtilService } from "../../_util/util.service";
import { MatDialog } from "@angular/material";
import { ImgDetailComponent } from "../../_common/img-detail/img-detail.component";
declare var $: any;

@Component({
  selector: "app-file-uploader",
  templateUrl: "./file-uploader.component.html",
  styleUrls: ["./file-uploader.component.scss"]
})
export class FileUploaderComponent implements OnInit, OnChanges {
  fileSrc: any = "/assets/img/no-img.png"; //default;
  fileName = "";
  fileSize = 0;
  fileLoaded: boolean = false; // 되면 true

  /** 파일선택여부 전달 */
  outputItem = {
    filesize: 0,
    filetype: "",
    filename: "",
    fileNameSize: "",
    fileDeleteOpt: "",
    fileSrc: "",
    formModel: new FormData()
    // fileSrc2:new FileReader().result,
  };

  @Output()
  chnagefilesize = new EventEmitter<any>();

  form: FormGroup;

  /** upload대상 객체 id / name */
  fileObjID = "uploaded_file";

  /** 업로드후 파일이 있을경우 전달 됨. */
  @Input()
  uploadedfileInfo: any = {
    fileSrc: "/assets/default_png/no-img.png",
    fileName: ""
  }; // 이미지 있을경우 object 안에 filename 있음

  @Input()
  fileId: String; // input 고유의 id
  @Input()
  attachType: String; // attachType

  viewChange: boolean = false;

  loadCount: number;

  constructor(
    public _data: DataService,
    public _util: UtilService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnChanges() {
    // console.log('이미지 값 로드 : ', this.uploadedfileInfo);
    this.chnagefilesize.emit(this.uploadedfileInfo);

    // 부모에서 있으면 담겨 있고 없으면 undefined
    if (this.uploadedfileInfo) {
      if (this.uploadedfileInfo.fileSrc != "") {
        this.fileLoaded = true;
      }
    } else {
      //default 세팅
      this.fileSrc = "/assets/default_png/no-img.png";
      this.fileName = ""; //
      this.outputItem.fileDeleteOpt = ""; // 체크풀기
    }
  }

  ngOnInit() {
    this.createForm(); // 기본 form builder
  }

  //form 생성
  createForm() {
    this.form = this.fb.group({
      name: ["form", Validators.required],
      uploaded_file: null
    });
  }

  /** 파일 선택 : 외부에서 받은 ID*/
  fileUpload() {
    let val = "#" + this.fileId;
    $(val).click();
  }

  // 파일업로드 버튼
  onFileChange(event) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      this.form.get(this.fileObjID).setValue(file);
      reader.readAsDataURL(file);

      reader.onload = e => {
        /** input field 에 사용되는 데이터 */
        this.fileSrc = reader.result;
        this.fileSize = file.size; //Math.abs(file.size / 1000);
        this.fileName =
          file.name +
          "(size : " +
          this._util.getfilesizeCalc(this.fileSize) +
          ")";
        this.fileLoaded = true;

        /** 외부로 전달되는 데이터 */
        this.outputItem.filename = file.name;
        this.outputItem.fileNameSize =
          file.name +
          "(size : " +
          this._util.getfilesizeCalc(this.fileSize) +
          ")";
        this.outputItem.filesize = this.fileSize;
        this.outputItem.filetype = file.type;
        this.outputItem.fileSrc = reader.result.toString();
        this.outputItem.formModel = this.prepareSave(); // 외부
      };

      this.chnagefilesize.emit(this.outputItem); // 외부로 ITEM 전달
    }
  }

  private prepareSave(): any {
    let input = new FormData();

    /** 외부에서 input.set(name,value) 로 다시 정의해서 날린다. */
    input.append("attachType", "");
    input.set("attachType", this.attachType.toString());
    input.append("relativeKey", ""); // 외부에서
    input.append("data", "");
    input.append("thumb_width", "120");
    input.append("thumb_height", "163");
    input.append(this.fileObjID, this.form.get(this.fileObjID).value);

    return input;
  }

  resetForm() {
    this.fileSrc = "/assets/default_png/no-img.png"; //default;
    this.fileName = "";
    this.fileSize = 0;
    this.outputItem = {
      filesize: 0,
      filetype: "",
      filename: "",
      fileNameSize: "",
      fileDeleteOpt: "",
      fileSrc: "",
      formModel: new FormData()

      // fileSrc2:new FileReader().result
    };
  }

  /** 삭제 select */
  select_del(e) {
    // console.log(e.currentTarget.checked);
    if (e.currentTarget.checked) {
      this.outputItem.filename = this.uploadedfileInfo.fileName; //명있어야 지울 수 있다.
      this.outputItem.fileDeleteOpt = "Y";
    } else {
      this.outputItem.filename = this.uploadedfileInfo.fileName;
      this.outputItem.fileDeleteOpt = "";
    }

    this.chnagefilesize.emit(this.outputItem);
  }

  detailImage() {
    //console.log(this.fileLoaded);
    //console.log(this._data.getFullPath(this.uploadedfileInfo.fileName)); // full path 로
    if (this.fileLoaded) {
      const dialogRef = this.dialog.open(ImgDetailComponent, {
        width: "550px",
        // height: '380px',
        data: {
          fileSrc: this._util.getImagePath(this.uploadedfileInfo.fileName,''),
          fileName: this.uploadedfileInfo.fileName
        }
      });
      // 창이 닫을 때 이벤트
      dialogRef.afterClosed().subscribe(result => {
        // console.log(`Dialog result: ${result}`);

        if (result) {
          console.log("저장 성공", result.data);
          // this.getItem();
        } else {
          console.log("취소");
        }
      });
    }
  }

}