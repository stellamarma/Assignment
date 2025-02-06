export type TimeSeriesData ={
    timestamp: string; // "DD-MM-YYYY HH:mm"
    series1: number;
    series2: number;
    series3: number;
  }
  
  export interface ChartData {
    labels: string[];
    datasets: { label: string; data: number[]; borderColor: string }[];
  }
  