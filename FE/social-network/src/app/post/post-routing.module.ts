import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostCreateComponent } from "./post-create/post-create.component";
import { PostDetailsComponent } from "./post-details/post-details.component";
import { AuthGuard } from "../guards/auth.guard";
import { ExploreComponent } from "./explore/explore.component";

const routes: Routes = [
    { path: 'create-post', component: PostCreateComponent, canActivate: [AuthGuard] },
    { path: 'posts/:postId', component: PostDetailsComponent, canActivate: [AuthGuard] },
    {path: 'explore', component: ExploreComponent},
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PostRoutingModule { }