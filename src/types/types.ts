export type TimeSeriesData ={
    DateTime: string; // "DD-MM-YYYY HH:mm"
    ENTSOE_DE_DAM_Price: number;
    ENTSOE_GR_DAM_Price: number;
    ENTSOE_FR_DAM_Price: number;
  }
  
  export interface ChartData {
    labels: string[];
    datasets: { label: string; data: number[]; borderColor: string }[];
  }
  