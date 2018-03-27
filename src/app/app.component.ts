import { Component, OnInit } from '@angular/core';
import { ApiLoaderService } from './api-loader-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiLoaderService]
})
export class AppComponent implements OnInit {

  title = 'app';
  apiLoaded = false;
  apiFailed = false;
  apiReady = false;


  constructor(private apiLoaderService: ApiLoaderService) { }

  ngOnInit(): void {
    this.apiLoaderService.loadClient().then(
        result => {
            this.apiLoaded = true;
            return this.apiLoaderService.initClient();
        },
        err => {
            this.apiFailed = true;
        }
    ).then(result => {
        this.apiReady = true;
        this.apiLoaderService.sigInState();
    }, err => {
        this.apiFailed = true;
    });
}

autorizza() { this.apiLoaderService.signIn(); }
revoca() {this.apiLoaderService.signOut(); }
eventi () { this.apiLoaderService.listUpcomingEvents(); }

}
