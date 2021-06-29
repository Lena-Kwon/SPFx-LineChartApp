declare interface IChart1WebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;

  Loading: string;
  DataSet1Label: string;
  DataSet2Label: string;
  SumLabel: string;
  XAxisLabel: string;
  YAxisLabel: string;
  ChartLabels: string[];
  WebPartDescription: string;
  MoreInfoLinkUrl: string;  
}

declare module 'Chart1WebPartStrings' {
  const strings: IChart1WebPartStrings;
  export = strings;
}
