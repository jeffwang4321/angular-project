export interface Report {
  name: string;
  phone: String;
  id: string;
  breed: string;
  location: string;
  notes: string;
  date: string;
  status: string;
  key: number;
}

export interface Location {
  name: string;
  lon: string;
  lat: string;
  count: number;
  key: number;
}
