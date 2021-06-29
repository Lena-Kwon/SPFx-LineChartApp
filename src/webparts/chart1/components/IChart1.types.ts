import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ChartData } from 'chart.js';

export interface IChart1Props {
    context:WebPartContext;
}

export interface IChart1State {
    //data: any;
    //data: any;
    //data: ChartData;
    fill: '전국' | '서울특별시' | '경기도' | '부산광역시' | '대구광역시' | '인천광역시' | '대전광역시' | '울산광역시' | '광주광역시' | '세종특별자치시';
}