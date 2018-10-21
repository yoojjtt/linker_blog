export class CategoryData {
    constructor(
        public cpk: number = 0, // cp key 값
        public groupKey: string = '0', //대분류 처음넣을때 
        public lv1: string = '1',
        public lv2: string = '0',
        public title: string = '',
        public subTitle: string = '',
        public comment: string = '',
        public img: string = '',
        public bgImg: string = '',
        public click: number = 0,
        public contents: number = 0,
        public share: number = 0,
        public del: string = '',
        public job: string = '', // U:업데이트, D:삭제, C:저장, R:조회

    ) { }
}