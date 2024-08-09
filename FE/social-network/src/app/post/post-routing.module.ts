import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostCreateComponent } from "./post-create/post-create.component";
import { PostDetailsComponent } from "./post-details/post-details.component";

const routes: Routes = [
    { path: 'create-post', component: PostCreateComponent },
    { path: 'posts/:postId', component: PostDetailsComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PostRoutingModule { }