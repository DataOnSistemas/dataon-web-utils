import {HttpClientModule} from '@angular/common/http';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import {MessageService} from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HttpModule } from './config/http/http.module';
import {LoadingComponent} from "./shared/components/loading/loading.component";
import {LoadingService} from "./shared/services/loading/loading.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
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
    private readonly loadingService: LoadingService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.staterServiceLoading();
  }

  private staterServiceLoading() {
    this.loadingService.showLoading.subscribe({
      next: data => {
        this._showLoading = data;
        this.cdr.detectChanges();
      },
      error: data => {
        console.log(data)
      }
    })
  }
}
