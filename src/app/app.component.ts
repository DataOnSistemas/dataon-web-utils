import { HttpClientModule } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import {MessageService, PrimeNGConfig} from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HttpModule } from './config/http/http.module';
import {LoadingComponent} from "./shared/components/loading/loading.component";
import {LoadingService} from "./shared/services/loading/loading.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    ToastModule,
    ReactiveFormsModule,
    HttpModule,
    LoadingComponent
  ],
  providers: [
    MessageService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'dataon-web-utils';
  _showLoading: boolean = false;

  constructor(
    private config: PrimeNGConfig,
    private readonly loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.config.ripple = true;
    this.staterServiceLoading();
    this.config.ripple = true;
  }

  private staterServiceLoading() {
    this.loadingService.showLoading.subscribe({
      next: data => {
        this._showLoading = data;
      },
      error: data => {
        console.log(data)
      }
    })
  }
}
