import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';



declare let toastr: any;

@Injectable({
    providedIn: 'root'
})
export class DataService {

    /** 공통 URL **/

    public rURL = 'https://linkerbiz.net'; //개발 https -> http 
    // public rURL = 'http://220.230.113.201'; //개발 https -> http 
    public pdfURL = 'http://220.230.113.201'; // pdf 용
    // public rURL = ""; //배포
    public dist_APPNAME = "LinkerBlog[Linker2018]";
    public dist_day = "2018-09-19";
    public dist_version = "1.0.1.";

    public uploadDir = "uploads/"; //업로드폴더
    login_state: boolean = false;

    constructor(private http: Http, private cookieService: CookieService) { 
        /** toast **/
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "rtl": false,
            "positionClass": "toast-bottom-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": 300,
            "hideDuration": 1500,
            "timeOut": 1500,
            "extendedTimeOut": 1500,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    }
    getUrl() {
        let url = this.rURL;
        return url;
    }
    getPDFUrl() {
        let url = this.pdfURL;
        return url;
    }
    getUploadDir() {
        let val = this.uploadDir;
        return val;
    }

    getDistAppName() {
        let val = this.dist_APPNAME;
        return val;
    }

    getDistVersion() {
        let val = this.dist_version;
        return val;
    }

    getDistDay() {
        let date = new Date();
        let year = date.getFullYear();
        let month = this.zero_plus(date.getMonth() + 1);
        let day = this.zero_plus(date.getDate());
        let val = year + "-" + month + "-" + day;
        return val;
    }
    zero_plus(str) {
        var result;
        if (str.toString().length == 1) {
            result = "0" + str;
        }
        else {
            result = str;
        }
        return result;
    }


    getRouter(name: string) {
        let val;
        let extra = ''

        switch (name) {

            case 'board': val = '/blogUpload/ajax.json'; break; // 로그인 처리, 로그아웃처리 => 옛날
            case 'boardManager': val = '/blogUpload/boardManager'; break; // blog total



        }
        val = extra + val;
        //console.log(val);

        return val

    }

    /** ajax promise 공통 **/
    postService(router: string, data: any): Promise<any> {


        let apiRoot = this.rURL;

        let apiURL = `${apiRoot}${router}`;
        return this.http
            .post(apiURL, data)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }



    /** cookie info 관련
     *
     *
     *set( name: string, value: string, expires?: number | Date, path?: string, domain?: string, secure?: boolean ): void;
     * **/
    setCookie(name: string, val: any) {

        this.cookieService.set(name, val);

    }
    setExpirationTime() {
        let now = new Date(); // Tue Oct 20 2015 10:48:49 GMT+0900 (대한민국 표준시) 라고 표시됩니다.

        now.getFullYear(); // 년도
        now.getMonth(); // 월  // 월 단위의 경우 0부터 시작되기 때문에 +1 을 해줘야 됩니다.
        now.getDate(); // 일
        let hours: any = now.getHours();
        let minutes: any = now.getMinutes();
        let seconds: any = now.getSeconds();
        let Time: any = Math.round(new Date().getTime() / 1000).toString();

        this.cookieService.set('expiration', Time);

    }
    fetchCookie(name: string) {
        let returnVal: any = this.cookieService.get(name);
        if (name == 'all') {

            returnVal = this.cookieService.getAll(); // typeof Object :: any로 받아야함 

        }
        return returnVal;
    }

    deleteCookie(name: string) {

        if (name == 'all') {
            this.cookieService.deleteAll();
        } else {
            this.cookieService.delete(name);
        }

    }




    /** toastr total **/
    toastLoad(type: string, title: string, message?: string) {
        // console.log(type);
        switch (type) {
            case 'success':
                toastr.success(title, message);
                break;
            case 'info':
                toastr.info(title, message);
                break;
            case 'warning':
                toastr.warning(title, message);
                break;
            case 'error':
                toastr.error(title, message);
                break;
        }





    }



    sleep(num) {	//[1/1000초]
        var now = new Date();
        var stop = now.getTime() + num;
        while (true) {
            now = new Date();
            if (now.getTime() > stop) return;
        }
    }

    //서버셋션삭제
    serverSession_logout() {
        let items = {};

        let gubun = 'logout';
        let data = { 'gubun': gubun, 'data': items };

        this.postService(this.getRouter('login'), data)
            .then(result => this.serverSession_loggout_handler(result))
            .catch(error => console.log(error));

    }

    serverSession_loggout_handler(res) {
        // console.log('로그아웃정보 : ',res);
    }

    //서버의 셋션이 존재하는지 확인~
    serverSession_check() {
        let items = {};

        let gubun = 'session_check';
        let data = { 'gubun': gubun, 'data': items };

        this.postService(this.getRouter('login'), data)
            .then(result => this.serverSession_check_handler(result))
            .catch(error => console.log(error));

    }

    //서버의 셋션로그인과 쿠기로그인의 일치를 위해서
    serverSession_check_handler(res) {
        //res.userId==undefined이면 서버의 셋션이 없다는 의미임.
        // console.log(res.userId);
        if (res.userId == undefined) {
            this.serverLogin_check();
        }
    }

    //서버에서 셋션이 끊겨서 온경우 확인~
    serverLogin_check() {
        console.log('로그인에러');
        // this.deleteCookie('all');

        this.login_state = false;
        // this.login();
    }

    logSave(_type: string, _log: any) {

        _log = JSON.stringify(_log)
        let items = {
            'api_type': _type,
            'log': _log
        };

        let gubun = 'S';
        let data = { 'gubun': gubun, 'data': items };

        this.postService(this.getRouter('logSave'), data)
            .then(result => this.logSaveAfter(result))
            .catch(error => console.log(error));
    }

    logSaveAfter(result) {
        // console.log('saveLogs')
    }

    //공지/업데이트알람 글 처리
    readUpdate_check() {
        let items = {};

        let gubun = 'update';
        let data = { 'gubun': gubun, 'data': items };

        this.postService(this.getRouter('bbs'), data)
            .then(result => this.readUpdate_checkAfter(result))
            .catch(error => console.log(error));
    }

    readUpdate_checkAfter(result) {

        if (result) {

            if (result[0].length < 0) {
                return;
            }

            //딜레이시키기
            this.sleep(1 * 1000);

            //업데이트 모달 오픈 
            // this.modalOpen('업데이트알람', 'update_modal', '이름검색', 400, 410)
            // console.log('update',result);
        }

    }
}
