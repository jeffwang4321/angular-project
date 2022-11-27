export interface Report {
  name: string;
  phone: string;
  id: number;
  breed: string;
  location: string;
  notes: string;
  date: string;
  status: string;
}

export interface Location {
  name: string;
  lon: number;
  lat: number;
  count: number;
}
