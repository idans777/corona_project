import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-overview-card',
  standalone: true, // ✅ Make it standalone
  imports: [CommonModule], // ✅ Enables *ngIf, *ngFor, etc.
  templateUrl: './overview-card.component.html',
  styleUrls: ['./overview-card.component.scss']
})
export class OverviewCardComponent {
  @Input() title!: string;
  @Input() mainData?: string | number;
  @Input() dataList: { value: string | number, label: string }[] = [];
  @Input() info?: string;
}