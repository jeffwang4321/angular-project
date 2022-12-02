export interface Report {
  name: string;
  phone: string;
  id: number;
  breed: string;
  location: string;
  notes: string;
  date: string;
  status: string;
  key: number;
}

export interface Location {
  name: string;
  lon: number;
  lat: number;
  count: number;
  key: number;
}
