import { DOCUMENT, ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { fromEvent, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Social Network';

  private readonly document = inject(DOCUMENT);
  private readonly viewport = inject(ViewportScroller);

  readonly showScroll$: Observable<boolean> = fromEvent(
    this.document,
    'scroll'
  ).pipe(
    map(() => this.viewport.getScrollPosition()?.[1] > 0)
  );

  onScrollToTop(): void {
    this.viewport.scrollToPosition([0, 0]);
  }
}
