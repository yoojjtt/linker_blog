import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

declare let $: any;

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor(
        public snackBar: MatSnackBar,
    ) { }

    public rURL = 'https://linkerbiz.net'; //개발 https -> http 

    getUrl() {
        let url = this.rURL;
        return url;
    }
    /** modal **/
    modalOpen(_pageName, _modalName, _title, _width, _height) {
        let idSelector = '#' + _modalName;
        $(idSelector).modal('show');
        // $('.modal-dialog').css('width', _width);
        // $('.modal-body').css('height', _height);

    }
    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

    /** 현재시간 */
    get_Current_Time() {
        let now: any = new Date();
        let hours: any = now.getHours();
        let minutes: any = now.getMinutes();
        let seconds: any = now.getSeconds();
        let ampm;

        if (hours > 12) {
            hours -= 12;
            ampm = " 오후 ";
        } else {
            ampm = " 오전 ";
        }
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        let time = hours + ":" + minutes;
        let time_sec = ":" + seconds;
        let am_pm = ampm;
        let TIME = time + time_sec + am_pm;


        let DATE = this.currentDate();

        let val = DATE + ' ' + TIME;
        val = val.toString();
        return val
    }



    /** 60 세 이상자 체크 **/
    more_than_sixty(jumin1, jumin2) {
        // 주민등록상 생일을 현재 날짜와 비교하여 나이계산 (만) // 8403211 일 경우 29세, 주민등록상 생일 지났으므로 28세 출력하도록


        let curDateObj: any = new Date(); // 날짜 Object 생성
        let curDate: any = ""; // 현재일자
        let tmpAge: any = 0; // 임시나이
        let curYear: any = curDateObj.getFullYear(); // 현재년도
        let curMonth: any = curDateObj.getMonth() + 1; // 현재월

        if (curMonth < 10) curMonth = "0" + curMonth; // 현재 월이 10보다 작을경우 '0' 문자 합한다
        let curDay = curDateObj.getDate(); // 현재일

        if (curDay < 10) curDay = "0" + curDay; // 현재 일이 10보다 작을경우 '0' 문자 합한다
        curDate = curYear + curMonth + curDay;
        let genType = jumin2.substring(0, 1); // 주민번호 뒷자리 성별구분 문자 추출

        if (genType <= 2) {
            tmpAge = curYear - (1900 + parseInt(jumin1.substring(0, 2))); // 1, 2 일경우
        } else {
            tmpAge = curYear - (2000 + parseInt(jumin1.substring(0, 2))); // 그 외의 경우
        }
        let tmpBirthday = jumin1.substring(2, 6); // 주민번호 4자리 생일문자 추출
        if (curDate < (curYear + tmpBirthday)) {
            tmpAge += 1;
        }
        //alert(tmpAge); // 2012년 4월 13일 일 경우 2012413 반환

        // console.log(curYear+"/"+curMonth+"/"+curDate);
        // console.log(tmpAge+"/"+tmpBirthday);
        // console.log(curDate);


        if (tmpAge > 60) {

            //alert("만 60세이상.");

            return false;

        } else {
            return true;
        }

    }
    /** 현재 날짜 **/
    currentMonth() {  // xxxx-xx 현재월을 찍는다.
        let now: any = new Date();
        let year: any = now.getFullYear();
        let mon: any = (now.getMonth() + 1) > 9 ? '' + (now.getMonth() + 1) : '0' + (now.getMonth() + 1);

        let month_val: any = year + '-' + mon;
        //var str = '';
        //str += chan_val;
        //alert(month_val);
        return month_val;


    }
    /** 날짜 yyyy-mm +/1 **/
    changeMonth(strSDate, Months) {

        let now = new Date(strSDate);
        //alert(Months);

        let months = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
        let new_date = now.setMonth(now.getMonth() + Months);
        let month_change = now.getFullYear() + "-" + months[now.getMonth()];

        return month_change;


    }
    /** 날짜 yyyy-mm +/1 **/
    labelMonth(strSDate, duration) {

        let now = new Date(strSDate);
        let monthArray = [];

        let months = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12");

        for (var i = 0; i < duration; i++) {
            let label = months[now.getMonth() - i] + '월';
            monthArray.push(label);
        }
        monthArray = monthArray.sort();
        // console.log(monthArray);

        return monthArray;


    }

    /** 현재 날짜 찍는다 yyyy-mm-dd **/
    currentDate() {  // xxxx-xx-xx 현재일
        let now: any = new Date();
        let year: any = now.getFullYear();
        let mon: any = (now.getMonth() + 1) > 9 ? '' + (now.getMonth() + 1) : '0' + (now.getMonth() + 1);  // 달이 9월이상이면 ''+10,11,12 찍고 아니면 '0'+ 먼스찍기
        let day: any = now.getDate() > 9 ? '' + now.getDate() : '0' + now.getDate();
        let chan_val: any = year + '-' + mon + '-' + day;
        //$('#dateSearch').val(chan_val);
        //daily_search();
        return chan_val;
    }

    currentDateYYMMDDHHMMSS() {

        let now: any = new Date();
        let year: any = now.getFullYear();
        let mon: any = (now.getMonth() + 1) > 9 ? '' + (now.getMonth() + 1) : '0' + (now.getMonth() + 1);  // 달이 9월이상이면 ''+10,11,12 찍고 아니면 '0'+ 먼스찍기
        let day: any = now.getDate() > 9 ? '' + now.getDate() : '0' + now.getDate();
        let chan_val: any = year + '-' + mon + '-' + day;



        let hours: any = now.getHours();
        let minutes: any = now.getMinutes();
        let seconds: any = now.getSeconds();


        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        let time = hours + ":" + minutes;
        let time_sec = ":" + seconds;

        let TIME = time + time_sec;


        var present = chan_val + " T:" + TIME;

        return present;
    }
    /** yyyy-mm 형 date값 전달되면
     * 요일, 달력, 일자 반환
     * **/
    Calendar(date) {
        //alert(date);
        if (typeof (date) !== 'undefined') {
            date = date.split('-');
            date[1] = date[1] - 1;
            date = new Date(date[0], date[1]);  // month라서 date[2]는 필요없음
        } else {

            date = new Date();
        }
        let currentYear = date.getFullYear();
        //년도를 구함

        let currentMonth = date.getMonth() + 1;
        //연을 구함. 월은 0부터 시작하므로 +1, 12월은 11을 출력

        let currentDate = date.getDate();
        //오늘 일자.

        date.setDate(1);
        let currentDay = date.getDay();
        //이번달 1일의 요일은 출력. 0은 일요일 6은 토요일

        let dateString = new Array('sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat');
        let dateSting_kr = new Array('일', '월', '화', '수', '목', '금', '토');
        let lastDate = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
        if ((currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0)
            lastDate[1] = 29;
        //각 달의 마지막 일을 계산, 윤년의 경우 년도가 4의 배수이고 100의 배수가 아닐 때 혹은 400의 배수일 때 2월달이 29일 임.

        let currentLastDate = lastDate[currentMonth - 1];
        let week = Math.ceil((currentDay + currentLastDate) / 7);
        //총 몇 주인지 구함.

        if (currentMonth != 1) {
            let prevDate = currentYear + '-' + (currentMonth - 1) + '-' + currentDate;
        } else {
            let prevDate = (currentYear - 1) + '-' + 12 + '-' + currentDate;
            //만약 이번달이 1월이라면 1년 전 12월로 출력.
        }

        if (currentMonth != 12) {
            let nextDate = currentYear + '-' + (currentMonth + 1) + '-' + currentDate;
        } else {
            let nextDate = (currentYear + 1) + '-' + 1 + '-' + currentDate;
            //만약 이번달이 12월이라면 1년 후 1월로 출력.
        }



        if (currentMonth < 10) {
            currentMonth = '0' + currentMonth;
            //10월 이하라면 앞에 0을 붙여준다.
        }
        let calendar = '';

        let dateNum = 1 - currentDay;  // 0은 일요일 6은 토요일

        let className = [];
        let dateNumRow = [];
        let DateString = [];
        for (let i = 0; i < week; i++) {

            for (let j = 0; j < 7; j++ , dateNum++) {
                if (dateNum < 1 || dateNum > currentLastDate) {
                    calendar += ''; // 예외의 경우
                    continue;
                }
                className.push(dateString[j]);  // 영어 요일
                dateNumRow.push(dateNum); // 일자 숫자
                DateString.push(dateSting_kr[j]);  // 한글 요일


                calendar += '<div class="label_week_date ' + dateString[j] + '">' + dateNum + '<br><span class="_week">' + dateSting_kr[j] + '</span></div>';

            }

        }

        return {
            className: className,
            dateNum: dateNumRow,
            dateStringKr: DateString
        }

    }
    /** 금액 , 찍기 **/
    toLocaleString(num) {
        if (num == null) {
            num = 0;
        }
        if (num == NaN) {
            num = 0;
        }
        let parts = num.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }





    /** 현재시간 **/
    getCurrentTime() {

        let now: any = new Date();
        let hours: any = now.getHours();
        let minutes: any = now.getMinutes();
        let seconds: any = now.getSeconds();
        let ampm;

        if (hours > 12) {
            hours -= 12;
            ampm = " 오후 ";
        } else {
            ampm = " 오전 ";
        }
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        let time = hours + ":" + minutes;
        let time_sec = ":" + seconds;
        let am_pm = ampm;
        let TIME = time + time_sec + am_pm;


        let DATE = this.currentDate();
        let result = DATE + ' ' + TIME;
        return result

    }

    /** 시간차이 구하기 **/
    convert_to_millis(time) {
        //ex) time value = 1481521584.676
        let currentTime: any = new Date().getTime() / 1000;
        let inputTime: any = time;
        let diffTime: any = currentTime - inputTime;
        let postTime: any;
        // console.log(diffTime);
        switch (true) {
            // case diffTime < 60:
            //     postTime = '방금';
            //     break;
            case diffTime < 3601: // 한시간 넘은 거체크하기위해서
                postTime = diffTime / 60;
                break;
            case diffTime < 86400:
                postTime = diffTime / 3600;
                break;
            case diffTime > 86401:
                postTime = diffTime / 3600;
                break; //
            // case diffTime < 604800:
            //     let date = new Date(time*1000);
            //     postTime = date.getFullYear()+"/"+date.getMonth()+"/"+date.getDate();
            //     break;
        }

        return postTime;
    }



    /** nl2br 처리 */
    js_nl2br(_str) {
        if (_str == "" || _str == null) { return ""; }
        return _str.replace(/(\r\n|\n\r|\r|\n)/g, "<br />");
    }

    /**
     * 입력값이 이메일 형식인지 체크
     * * ex) if (!C_isValidEmail(form.email.value)) {
     * * alert("올바른 이메일 주소가 아닙니다.");
     * * }
     **/
    C_isValidEmail(asValue) {
        let strFormat = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;
        return this.C_isValidFormat(asValue, strFormat);
    }

    /** 입력값이 전화번호/생년월일 형식(숫자-숫자-숫자)인지 체크 **/
    C_isValidPhone(asValue) {
        let strFormat = /^(\d+)-(\d+)-(\d+)$/;
        return this.C_isValidFormat(asValue, strFormat);
    }

    /**
     * 입력값이 사용자가 정의한 포맷 형식인지 체크
     * 자세한 format 형식은 자바스크립트의 'regular expression'을 참조
     **/
    C_isValidFormat(asValue, asFormat) {
        if (this.C_isNull(asValue)) return true;
        if (asValue.search(asFormat) != -1) return true; //올바른 포맷 형식

        return false;
    }

    /**-------------------- 유효성 관련 함수 --------------------**/
    /** 입력값이 NULL인지 체크 **/
    C_isNull(asValue) {
        if (asValue == null || asValue == undefined || asValue.toString().replace(/ /g, "") == "") {
            return true;
        }

        return false;
    }
    /** 숫자검증 **/
    C_isNum(asValue) {
        if (this.C_isNull(asValue)) return false;

        for (let i = 0; i < asValue.length; i++) {
            if (asValue.charAt(i) < '0' || asValue.charAt(i) > '9') {
                return false;
            }
        }

        return true;


    }

    /** 콤마 지우기  */
    Uncomma(str) { //toLocaleString 콤마 지우기

        str = String(str);
        return str.replace(/[^\d]+/g, '');

    }


    /** 숫자만 **/
    numkeyCheck(event: KeyboardEvent) {
        let keyValue = event.keyCode;
        // console.log(keyValue)
        //지우기키 제외
        if (keyValue == 8 || keyValue == 46) {
            return true
        }

        if (((keyValue >= 48) && (keyValue <= 57))) {
            return true;
        }
        else {
            return false;
        }
    }

    /** text ... 
        * 1 : string
        * 2 : 자를 길이 len
        * 3 : 치환할 문자
        * 처리  */
    textLengthOverCut(txt, len, lastTxt) {
        if (len == "" || len == null) { // 기본값
            len = 5;
        }
        if (lastTxt == "" || lastTxt == null) { // 기본값
            lastTxt = "...";
        }
        if (txt.length > len) {
            txt = txt.substr(0, len) + lastTxt;
        }
        return txt;
    }




    mktime_to_date(unix_timestamp, _format, _type) {

        let date = new Date(unix_timestamp * 1000);
        /**
         * _type있으면 date는 date형식으로 오고
         * _type없으면 기존의 timestemp형식.
         * **/
        if (_type) {
            let date: any = unix_timestamp;
        }

        let year = date.getFullYear();
        let month = this.zero_plus(date.getMonth() + 1);
        let day = this.zero_plus(date.getDate());

        let hours = date.getHours();
        // Minutes part from the timestamp
        let minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        let seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        let formattedTime = year + '.' + month + '.' + day + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        if (_format == 'ymd') {
            formattedTime = year + '-' + month + '-' + day; // + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        }

        return formattedTime;

    }
    /*******
    * yyyy-mm-dd기준 $n만큼 후의 날짜 계산
    * ex) alert(cal_date('2014-06-24', 365)); 1~10개월 이후 날짜수
    *******/
    cal_date($date, $n) {
        let start = new Date(Date.parse($date) + ($n * 1000 * 60 * 60 * 24));

        if ($n < 10) {
            start.setMonth(start.getMonth() + $n);
        }

        let t_yyyy = start.getFullYear();
        let t_mm = start.getMonth() + 1;
        let t_dd = start.getDate();
        let t_date = t_yyyy + '-' + this.zero_plus(t_mm) + '-' + this.zero_plus(t_dd);

        return t_date;
    }

    zero_plus(str) {

        let result;
        if (str.toString().length == 1) {
            result = "0" + str;
        }
        else {
            result = str;
        }
        return result;

    }


    format_date(date, format) {

        let result;

        let yy = date.substr(0, 4);
        let mm = date.substr(4, 2);
        let dd = date.substr(6, 2);
        let hh = date.substr(8, 2);
        let MM = date.substr(10, 2);
        let ss = date.substr(12, 2);

        switch (format) {
            case '.':
                result = yy + '.' + mm + '.' + dd;
                break;
            case '-':
                result = yy + '-' + mm + '-' + dd;
                break;
            case 'han':
                result = yy + '년 ' + mm + '월 ' + dd + '일';
                break;
            case 'han_hsi':
                result = yy + '년 ' + mm + '월 ' + dd + '일 ' + hh + ':' + MM + ':' + ss;
                break;
            case 'space':
                result = yy + ' ' + mm + ' ' + dd;
                break;
        }

        return result;
    }
    /** 2018.05.18 -> 2018-05-18 */
    format_date2(date, format) {
        let result;
        // console.log(date);
        let yy = date.substr(0, 4);
        let mm = date.substr(5, 2); // .부터 4로인식해서 
        let dd = date.substr(8, 2);
        // let hh = date.substr(8, 2);
        // let MM = date.substr(10, 2);
        // let ss = date.substr(12, 2);
        // console.log(yy);
        // console.log(mm);
        // console.log(dd);

        switch (format) {
            // case '.':
            //   result = yy + '.' + mm + '.' + dd;
            //   break;
            case '-':
                result = yy + '-' + mm + '-' + dd;
                break;
            // case 'han':
            //   result = yy + '년 ' + mm + '월 ' + dd + '일';
            //   break;
            // case 'han_hsi':
            //   result = yy + '년 ' + mm + '월 ' + dd + '일 ' + hh + ':' + MM + ':' + ss;
            //   break;
            // case 'space':
            //   result = yy + ' ' + mm + ' ' + dd;
            //   break;
        }

        return result;
    }

    /** 1,000 **/
    commaNum(num) {
        if (num == null) {
            return "";
        }
        var str = num.toString();
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    }

    /** 
     * 날짜계산 : today 는 0 ~~ 
     * */
    calDate(_day, _format) {
        var caledmonth, caledday, caledYear;
        var loadDt = new Date();

        var v = new Date(Number(loadDt) + _day * 1000 * 60 * 60 * 24);

        caledYear = v.getFullYear();
        caledmonth = v.getMonth() + 1;
        caledmonth = this.zero_plus(caledmonth);

        caledday = v.getDate();
        caledday = this.zero_plus(caledday);

        //_format값에 -넣어서 보내야함.. 빈값은 값이 없음 <- 처리함 (2018-06-15)
        if (_format == '') {
            _format = "-";
        }

        //String이 아니면 합쳐지는 경우가 생김.
        if (_format == undefined) {
            _format = ".";
        }
        var result = this.format_date(String(caledYear) + String(caledmonth) + String(caledday), _format);

        return result;
    }

    /** 요일구하기 **/
    getTodayLabel() {

        var week = new Array('일', '월', '화', '수', '목', '금', '토');

        var today = new Date().getDay();
        var todayLabel = week[today];

        return todayLabel;
    }

    /** 달 계산 : toMonth 는 0 ~~ **/
    calMonth(_month: any, _format: any) {

        //var caledYear, caledmonth, caledday;
        //var D = new Date(); //오늘 부터 한달전

        //D.setMonth(D.getMonth()-1);
        //console.log(D.getFullYear(), D.getMonth()+1);

        var now = new Date();
        if (now.getMonth() == 11) {
            var current: any = new Date(now.getFullYear() + _month, 0, 1);
        } else {
            var current: any = new Date(now.getFullYear(), now.getMonth() + _month, 1);
        }

        //String이 아니면 합쳐지는 경우가 생김.
        if (_format == undefined) {
            _format = ".";
        }
        var result = this.format_month_date(String(current.getFullYear()) + String(this.zero_plus(eval(current.getMonth() + 1))), _format);
        //var result = current.getFullYear() + "-" + this.zero_plus(eval(current.getMonth()+1));
        //console.log(result);

        return result;

    }
    format_month_date(date: any, format: any) {

        var result;

        var yy = date.substr(0, 4);
        var mm = date.substr(4, 2);
        switch (format) {
            case '.':
                result = yy + '.' + mm;
                break;
            case '-':
                result = yy + '-' + mm;
                break;
            case 'han':
                result = yy + '년 ' + mm + '월';
                break;
        }

        return result;
    }
    /**
     * 한글 처리 
     * @param date 
     * 
     * @param format 
     */
    format_month_date2(date: any, format: any) {

        var result;

        var yy = date.substr(0, 4);
        var mm = date.substr(5, 2);
        switch (format) {
            case '.':
                result = yy + '.' + mm;
                break;
            case '-':
                result = yy + '-' + mm;
                break;
            case 'han':
                result = yy + '년 ' + mm + '월';
                break;
        }

        return result;
    }


    /**
     * 
     * @param unix_timestamp 
     * @param _format 
     * @param _type 
     */
    mktimeToDate(unix_timestamp, _format, _type) {

        var date = new Date(unix_timestamp * 1000);
        /**
         * _type있으면 date는 date형식으로 오고
         * _type없으면 기존의 timestemp형식.
         * **/
        if (_type) {
            date = unix_timestamp;
        }

        var year = date.getFullYear();
        var month = this.zero_plus(date.getMonth() + 1);
        var day = this.zero_plus(date.getDate());

        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        var formattedTime = year + '.' + month + '.' + day + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        if (_format == 'ymd') {
            formattedTime = year + '-' + month + '-' + day;
        }
        return formattedTime;
    }



    /** 가족관계라벨처리1/2/3/4/5/6/7/8 **/
    change_family_relation_to_label(_num) {
        switch (_num) {
            case "1":
                return "부";
            case "2":
                return "모";
            case "3":
                return "형";
            case "4":
                return "누나";
            case "5":
                return "언니";
            case "6":
                return "동생";
            case "7":
                return "친척";
            case "8":
                return "보호자";
        }
    }

    /** 
     * date(안의 기호(-, )삭제후 : 20180301152345
     * 공통적으로 사용하는 formatter */
    change_format_date(date, format) {
        var result;

        var yy = date.substr(0, 4);
        var mm = date.substr(4, 2);
        var dd = date.substr(6, 2);
        var hh = date.substr(8, 2);
        var MM = date.substr(10, 2);
        var ss = date.substr(12, 2);
        switch (format) {
            case '.':
                result = yy + '.' + mm + '.' + dd;
                break;
            case '-':
                result = yy + '-' + mm + '-' + dd;
                break;
            case 'han':
                result = yy + '년 ' + mm + '월 ' + dd + '일';
                break;
            case 'han_hsi':
                result = yy + '년 ' + mm + '월 ' + dd + '일 ' + hh + ':' + MM + ':' + ss;
                break;
            case 'space':
                result = yy + ' ' + mm + ' ' + dd;
                break;
        }

        return result;
    }

    /**  
     * 
     * date format 변경 
     * +1 / -1 
     * 2018-01-06, 1 => 2018-01-07
     * 2018-01-06, -1 => 2018-01-05
     */
    dateChange(DATE, Days) {
        let SDate_pYyyymmdd = DATE.replace(eval("/\\" + "-" + "/g"), "");
        let SDate_yyyy = SDate_pYyyymmdd.substr(0, 4) * 1;
        let SDate_mm = SDate_pYyyymmdd.substr(4, 2) * 1;
        let SDate_dd = SDate_pYyyymmdd.substr(6, 2) * 1;
        let SDate: any = new Date(SDate_yyyy, SDate_mm - 1, SDate_dd);
        SDate.getDate(SDate.getDate() + Days);
        let resultDate = new Date(Date.parse(SDate) + Days * 1000 * 60 * 60 * 24);
        let day_val = resultDate.getFullYear() + "-" + ((resultDate.getMonth() + 101) +
            "").substring(1, 3) + "-" + ((resultDate.getDate() + 100) + "").substring(1, 3);


        return day_val;
    }



    /** 
     * 배열의 중보확인 기능.
     * **/
    check_duplicates(array, value) {
        if (array.indexOf(value) === -1) {
            return false;
        }
        return true;
    }

    /** 
     * 배열의 중보제거 기능.
     * **/
    remove_duplicates(array) {
        var result = [];
        $.each(array, function (index, element) {     // 배열의 원소수만큼 반복
            if ($.inArray(element, result) == -1) {  // result 에서 값을 찾는다.  //값이 없을경우(-1)
                result.push(element);                // result 배열에 값을 넣는다.
            }
        });
        return result;
    }
    /**
     * 휴대폰 번호 편집  "-" 들어있거나 없을 경우 상관없이 번호만 남기고 앞자리 3개 뒤에 4개 4개 씩 묶는 배열반환
     */
    cell_edit(_cell) {

        if (_cell == null || _cell == undefined) {
            return '';
        }

        let returnArray: any = ['', '', ''];

        let reqCell = _cell.replace(/[^0-9\.]+/g, ""); //  숫자를 제외한 모든 것을 포함


        if (_cell.indexOf('-') != -1) {
            //console.log('안됨');
            return returnArray = _cell.split('-');

        } else {
            // console.log(reqCell);
            // console.log(reqCell.substring(0, 3));
            // console.log(reqCell.substring(0, 3));
            // console.log(reqCell.substring(3, 7));
            // console.log(reqCell.substring(7, 11));
            returnArray[0] = reqCell.substring(0, 3); //첫째자리
            returnArray[1] = reqCell.substring(3, 7); //첫째자리
            returnArray[2] = reqCell.substring(7, 11); //첫째자리
            return returnArray
        }

    }
    /** 
     * 잘못된 핸드폰번호 확인(정규식이용). 
     * **/
    cell_number_check(_cell) {
        var regExp = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
        if (!regExp.test(_cell)) {
            //alert("잘못된 휴대폰 번호입니다. 숫자, - 를 포함한 숫자만 입력하세요.");
            console.log('잘못된 휴대폰 번호입니다. 숫자, - 를 포함한 숫자만 입력하세요.잘못된 휴대폰 번호입니다. 숫자, - 를 포함한 숫자만 입력하세요.');
            return false
        }
        return true;
    }
    /*
     * 입력값의 바이트 길이를 리턴
     * ex) if (getByteLength(form.title) > 100) {
     * alert("제목은 한글 50자(영문 100자) 이상 입력할 수 없습니다.");
     *}
     */
    getByteLength(asValue) {
        var byteLength = 0;
        var lsEsc = "%B2%B3%B4%B7%A8%AD%B1%D7%F7%B0%A7%B8%A1%BF%A4%B6%AE%C6%D0%AA%3F%3F%D8%BA%DE%BD%BC%BE%E6%F0%F8%DF%FE%B9";

        for (var i = 0; i < asValue.length; i++) {
            var oneChar = asValue.charAt(i);

            if (oneChar.length == 1) {
                byteLength++;
            }
            else if (oneChar.indexOf("%u") != -1) {
                byteLength += 2;
            }
            else if (oneChar.indexOf("%") != -1) {
                if (lsEsc.indexOf(oneChar) != -1) {
                    byteLength += 2;
                }
                else {
                    byteLength += oneChar.length / 3;
                }
            }
        }

        return byteLength;
    }

    random_number(min, max) {
        return Math.floor(Math.random() * (max + 1 - min) + min);
    }


    arrayMove(arr, old_index, new_index) {
        // 맨위에서 다운일때 1, 0
        //맨위에서 업일때 -1,0
        console.log(old_index);
        console.log(new_index);
        if (arr.length == old_index) {
            return arr;
        }
        if (old_index < 0) {
            return arr;
        }
        while (old_index < 0) {
            old_index += arr.length;
        }
        while (new_index < 0) {
            new_index += arr.length;
        }
        if (new_index >= arr.length) {
            var k = new_index - arr.length;
            while ((k--) + 1) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr;
    }
    checkPopup() {
        var win = window.open('', 'win', 'width=1, height=1, scrollbars=yes, resizable=yes');

        if (win == null || typeof (win) == "undefined" || (win == null && win.outerWidth == 0) || (win != null && win.outerHeight == 0)) {
            alert("팝업 차단 기능이 설정되어있습니다\n\n차단 기능을 해제(팝업허용) 한 후 다시 이용해 주십시오.\n\n만약 팝업 차단 기능을 해제하지 않으면\n정상적인 기능이 이루어지지 않습니다.");

            if (win) {
                win.close();
            }

        }
        else if (win) {
            if (win) {
                win.close();
            }
            if (win.innerWidth === 0) {
                // alert("팝업 차단 기능이 설정되어있습니다\n\n차단 기능을 해제(팝업허용) 한 후 다시 이용해 주십시오.\n\n만약 팝업 차단 기능을 해제하지 않으면\n정상적인 기능이 이루어지지 않습니다.");
            }
            return;
        }
        else {
            if (win) {
                win.close();
            }
            return;

        }
        if (win) {    // 팝업창이 떠있다면 close();
            win.close();
        }
    }
    /** 파일용량표시 */
    getfilesizeCalc(basic) {
        if (typeof basic != "number") {
            return;
        }

        let return_val: any = basic;
        if (basic > 1000) {
            return_val = Math.round(basic / 1000) + "K";
        }
        if (basic > 1000000) {
            return_val = Math.round(basic / 1000000) + "M";
        }
        if (basic > 1000000000) {
            return_val = Math.round(basic / 1000000000) + "G";
        }
        // console.log(return_val + '');
        return return_val + "";
    }
    /** 이미지 경로 찾기 : type: 원본 / 섬네일 / 크기별  */
    getImagePath(imgName: String, type: String) {
        var returnVal = "/assets/default_png/no-img.png";
        if (imgName == "") {
            return returnVal;
        }

        var returnVal = "/assets/default_png/no-img.png";
        let baseUrl = this.getUrl();
        let imgNameA = imgName.split("_");
        let imgNameF = imgNameA[1];
        let year = imgNameF.substr(0, 4);
        // console.log(year);

        let extLabel = "/";
        if (type == "thumb") {
            extLabel = "/_thumb/";
        }
        var Path = baseUrl + "uploads/";
        var rename = imgName.split("_");

        returnVal = Path + rename[0] + "/" + year.toString() + extLabel + imgName;
        return returnVal;
    }


}
