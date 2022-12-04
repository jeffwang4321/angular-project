import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Report, Location } from '../interface';

@Component({
  selector: 'app-addpigmodal',
  templateUrl: './addpigmodal.component.html',
  styleUrls: ['./addpigmodal.component.css'],
})
export class AddpigmodalComponent implements OnInit {
  apiURL = 'https://272.selfip.net/apps/E1uq9AFJb3/collections/';
  @Input() reportInput: Report = {
    name: '',
    phone: '',
    id: '',
    breed: '',
    location: '',
    notes: '',
    date: new Date().toLocaleString(),
    status: 'READY FOR PICKUP',
    key: 0,
  };
  @Input() locationInput: Location = {
    name: '',
    lat: '',
    lon: '',
    count: 1,
    key: 0,
  };
  @Input() addlocation: string = 'yes';
  locations: Location[] = [];
  locationTemp?: any;

  constructor(private modalService: NgbModal, private http: HttpClient) {}

  ngOnInit(): void {}

  open(content: any) {
    this.getLocations();
    this.modalService.open(content);
  }

  addReport(): void {
    // this.modalService.dismissAll();
    const KEY = new Date().valueOf();
    let obj = {
      key: KEY,
      data: this.reportInput,
    };
    obj['data'].key = KEY;

    this.http
      .post<Report[]>(this.apiURL + 'reports/documents/', obj)
      .subscribe({
        next: (data) => {
          location.reload();
        },
        error: (error) => {
          console.log('Error:', error);
        },
      });
  }

  addLocation(): void {
    const KEY = new Date().valueOf();
    let obj = {
      key: KEY,
      data: this.locationInput,
    };
    obj['data'].key = KEY;

    this.http
      .post<Report[]>(this.apiURL + 'locations/documents/', obj)
      .subscribe({
        next: (data) => {
          // location.reload();
        },
        error: (error) => {
          console.log('Error:', error);
        },
      });
  }

  validateReport(): void {
    if (this.reportInput.name === '') {
      alert('Please enter a reporter name');
    } else if (
      this.reportInput.phone == null ||
      this.reportInput.phone.toString().length != 10
    ) {
      alert('Please enter a 10 digit phone number');
    } else if (
      this.reportInput.id === '' ||
      this.reportInput.id === null ||
      Number(this.reportInput.id) < 0
    ) {
      alert('Please enter a non-negative pig ID');
    } else if (this.reportInput.breed === '') {
      alert('Please enter a pig breed');
    } else {
      if (this.addlocation === 'yes') {
        if (this.reportInput.location === '') {
          alert('Please enter a location name');
        } else if (this.checkUniqueLocation() === false) {
          alert('Error: Location name already exists');
        } else if (
          this.locationInput.lat == null ||
          this.locationInput.lat.toString().length == 0
        ) {
          alert('Please enter a valid latitude');
        } else if (
          this.locationInput.lon == null ||
          this.locationInput.lon.toString().length == 0
        ) {
          alert('Please enter a valid longitude');
        } else {
          this.locationInput.name = this.reportInput.location;
          this.addLocation();
          this.addReport();
        }
      } else {
        if (this.locationTemp === undefined || this.locationTemp.name === '') {
          alert('Please choose an existing location or add a new one');
        } else {
          this.reportInput.location = this.locationTemp.name;
          this.incrementLocation();
          this.addReport();
        }
      }
    }
  }

  getLocations(): void {
    this.http.get<Location[]>(this.apiURL + 'locations/documents/').subscribe({
      next: (data) => {
        this.locations = this.convertData(data);
      },
      error: (error) => {
        console.log('Error:', error);
      },
    });
  }

  convertData(locations: Location[]): Location[] {
    let arr: Location[] = [];
    (Object.keys(locations) as (keyof typeof locations)[]).forEach((key) => {
      let obj = locations[key];
      const data = 'data' as keyof typeof obj;
      arr.push(obj[data]);
    });
    return arr;
  }

  checkUniqueLocation(): boolean {
    let res = true;
    (Object.keys(this.locations) as (keyof typeof this.locations)[]).forEach(
      (key): any => {
        let obj = this.locations[key];
        const name = 'name' as keyof typeof obj;
        if (obj[name] == this.reportInput.location) {
          res = false;
        }
      }
    );
    return res;
  }

  incrementLocation(): void {
    let obj = {
      key: this.locationTemp.key,
      data: this.locationTemp,
    };
    obj['data'].count += 1;

    this.http
      .put<Location[]>(
        this.apiURL + 'locations/documents/' + this.locationTemp.key + '/',
        obj
      )
      .subscribe({
        next: (data) => {
          // console.log(data);
        },
        error: (error) => {
          console.log('Error:', error);
        },
      });
  }
}
