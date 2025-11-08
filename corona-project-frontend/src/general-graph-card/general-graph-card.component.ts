import { Component, Input } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-general-graph-card',
  standalone: false,
  templateUrl: './general-graph-card.component.html',
  styleUrl: './general-graph-card.component.scss'
})
export class GeneralGraphCardComponent {
  @Input() title!: string;
  @Input() graph!: EChartsOption;
  @Input() showFilter!: boolean;
  @Input() share!: string;
  @Input() download!: string;

  isOptionsOpen = false;

  toggleOptions()
  {
    this.isOptionsOpen = !this.isOptionsOpen;
  }
}
