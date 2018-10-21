import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { BoardComponent } from './board/board.component';

import { PostComponent } from './post/post.component';
import { WriteComponent } from './write/write.component';
import { ContactComponent } from './contact/contact.component';
import { CategoryComponent } from './category/category.component';
import { EnCategoryComponent } from './en-category/en-category.component';
import { FreeBoardComponent } from './free-board/free-board.component'; 
import { TestPageComponent } from './test-page/test-page.component';
const routes: Routes = [
    {
        path: '',
        component: MainComponent
    },
    {
        path: 'board',
        component: BoardComponent
    },
    {
        path: 'board/:boardMainKey',
        component: BoardComponent
    },
    {
        path: 'board/:boardMainKey/:boardKey',
        component: BoardComponent
    },
    {
        path: 'post',
        component: PostComponent
    },
    {
        path: 'post/:postKey',
        component: PostComponent
    },
    {
        path: 'write',
        component: WriteComponent
    },
    {
        path: 'write/:key',
        component: WriteComponent
    },
    {
        path:'contact',
        component:ContactComponent
    },
    {
        path:'category',
        component:CategoryComponent
    },
    {
        path:'category/:categoryKey',
        component:CategoryComponent
    },
    {
        path:'encategory',
        component:EnCategoryComponent
    },
    {
        path: 'freeBoard',
        component:FreeBoardComponent
    },
    {
        path: 'test',
        component: TestPageComponent
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
