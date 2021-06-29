import { HttpClient, IHttpClientOptions, HttpClientResponse } from '@microsoft/sp-http';  
import { WebPartContext } from '@microsoft/sp-webpart-base';  
import IServiceProvider from "./IServiceProvider";
import IVaccinationItem from "./IVaccinationItem";
import { ChartPoint } from 'chart.js';

const FAKE_DELAY: number = 500;

export class ServiceProvider implements IServiceProvider {
    private wpcontext:WebPartContext;
    public constructor(context: WebPartContext) {  
       this.wpcontext= context;  
    }
    
    public apiUrl: string = "https://api.odcloud.kr/api/15077756/v1/vaccine-stat?";
    public serviceKey: string = "serviceKey=swRpjU0mDbCAeTacLnXYmIO1MMcexBm5VyLzcrOhjWmUSlzInAD8ahNhYfusAJeYUhQRT2hWrxGIQ6dw0X95rw%3D%3D";
    public baseDate: string = "cond[baseDate::GT]=" + this.formatted_date(); //"cond[baseDate::GT]=2021-05-27 00:00:00";
    public area: string = "cond[sido::EQ]=";
    public perPage: string = "perPage=7";
    
    private formatted_date()
    {
        let result = "";
        let d = new Date();
        d.setDate(d.getDate() - 7);

        result += d.getFullYear() + "-" 
                + ((d.getMonth()+1) > 10 ? (d.getMonth()+1) : "0" + (d.getMonth()+1)) + "-" 
                + (d.getDate() > 10 ? d.getDate() : "0" + d.getDate())
                + " 00:00:00";
        return result;
    }
    
    private httpClientOptionsForGlobal: IHttpClientOptions = {  
        headers: new Headers({
        "content-type":"application/json",
        "Accept":"application/json",
        "Origin":"https://localhost:4321/"
        }),
        mode: "cors",
    };  

    public async getTotals(sido: string) {
      const url = this.apiUrl + this.perPage + "&" + this.serviceKey + "&" + this.baseDate + "&" + this.area + sido;
      var response = await this.wpcontext.httpClient  
      .post(url, HttpClient.configurations.v1, this.httpClientOptionsForGlobal);  
      
      console.log("REST API Succ");
      var responseJson : any = await response.json();  
    
      return responseJson.data;  
    }  

    public async getCovid19VaccinationCount(sido: string): Promise<IVaccinationItem> {
        return new Promise<IVaccinationItem>((resolve) => {
            let rtnArray: IVaccinationItem = {baseDate:[], firstCnt:[], secondCnt:[]};
            
            var responseJson = this.getTotals(sido).then((data) => {
                data.forEach((d) => {
                    rtnArray.baseDate.push(d.baseDate.substring(5,10).replace('-','/'));
                    rtnArray.firstCnt.push(d.firstCnt);
                    rtnArray.secondCnt.push(d.secondCnt);
                });

                //console.log('테스트 rtnarr' + rtnArray.baseDate);
                resolve(rtnArray);
            });
        });
    }

}

/*
export class ServiceProvider {  
    private wpcontext:WebPartContext;  
    public constructor(context: WebPartContext) {  
       this.wpcontext= context;  
    }

    public apiUrl: string = "https://api.odcloud.kr/api/15077756/v1/vaccine-stat?";
    public serviceKey: string = "swRpjU0mDbCAeTacLnXYmIO1MMcexBm5VyLzcrOhjWmUSlzInAD8ahNhYfusAJeYUhQRT2hWrxGIQ6dw0X95rw%3D%3D";
    public baseDate: string = "2021-05-01 00:00:00";
    public sido: string = "서울특별시";
  
    private httpClientOptionsForGlobal: IHttpClientOptions = {  
        headers: new Headers({
        "content-type":"application/json",
        "Accept":"application/json",
        "Origin":"https://localhost:4321/"
        }),
        mode: "cors",
    };  

    public async getTotals() {
      const url = this.apiUrl + "serviceKey=" + this.serviceKey + "&cond[baseDate::GT]=" + this.baseDate + "&cond[sido::EQ]=" + this.sido;
      var response = await this.wpcontext.httpClient  
      .post(url, HttpClient.configurations.v1, this.httpClientOptionsForGlobal);  
      
      console.log("REST API Succ");
      var responseJson : any = await response.json();  

      return responseJson;  
    }  

}
*/