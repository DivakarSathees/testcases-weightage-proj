import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-json-viewer',
  templateUrl: './json-viewer.component.html',
})
export class JsonViewerComponent {
  @Input() jsonData: any;
}
