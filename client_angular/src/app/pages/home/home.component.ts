import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  index: any;
  seenIndexes: any[] = [];
  values: { index: any; value: any }[] = [];
  constructor(private dataService: DataStorageService) {
    console.log('env', environment.BASE_URL);
  }

  ngOnInit(): void {
    this.fetchIndexes();
    this.fetchValue();
  }

  fetchValue() {
    this.dataService.fetchValues().subscribe({
      next: (data: any) => {
        this.values = [];
        for (let i in data) {
          this.values.push({ index: i, value: data[i] });
        }
      },
      error: (error) => {
        console.log('ERR', error);
      },
    });
  }

  fetchIndexes() {
    this.dataService.fetchIndexes().subscribe({
      next: (data: any) => {
        this.seenIndexes = data;
      },
      error: (error) => {
        console.log('ERR', error);
      },
    });
  }

  onSubmit() {
    console.log('Enter value:', this.index);
    this.dataService.calculateFib(this.index).subscribe({
      next: (data) => {
        this.index = '';
        this.fetchIndexes();
        this.fetchValue();
      },
      error: (error) => {},
    });
  }
}
