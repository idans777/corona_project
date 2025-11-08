import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { graphsModel } from '../models/graphsModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'corona-project';

  constructor(private backendService: BackendService)
  {

  }
}
