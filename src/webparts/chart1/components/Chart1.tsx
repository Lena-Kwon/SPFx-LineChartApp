import * as React from 'react';
import styles from './Chart1.module.scss';
//import { IChart1Props } from './IChart1Props';
import { IChart1Props, IChart1State } from './IChart1.types';
//import IChartDataProvider from '../../../services/ChartDataProvider/IChartDataProvider';
//import { MockChartDataProvider } from '../../../services/ChartDataProvider/MockChartDataProvider';
import * as strings from 'Chart1WebPartStrings';
import { ChartControl, ChartType } from "@pnp/spfx-controls-react/lib/ChartControl";
import { ChartData } from 'chart.js';
import  IServiceProvider from '../../../services/ServiceProvider/IServiceProvider';
import { ServiceProvider } from '../../../services/ServiceProvider/ServiceProvider';
import IVaccinationItem from '../../../services/ServiceProvider/IVaccinationItem';
import { CommandBar, DirectionalHint, IContextualMenuItem } from '@fluentui/react';

export default class Chart1 extends React.Component<IChart1Props, IChart1State> {
  //private serviceProvider;
  private _chartElem: ChartControl = undefined;
  public constructor(props: IChart1Props) {
    super(props);
    this.state = { 
      //data: {},
      fill: '전국'
    };
    //this.serviceProvider = new ServiceProvider(this.props.context);

  }
  
  public render(): React.ReactElement<IChart1Props> {
    return (
      <div className={styles.chart1}>
        {this._renderCommandBar()}
        <ChartControl
          type={ChartType.Line}
          datapromise={this._loadAsyncData()}
          options={{
            title: {display:true, text:'코로나19 예방법종 통계'},
            tooltips: {
              mode: 'index',
              callbacks: {
                // Use the footer callback to display the sum of the items showing in the tooltip
                footer: (tooltipItems, data) => {
                  var sum = 0;

                  tooltipItems.forEach((tooltipItem) => {
                    sum += data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] as number;
                  });
                  return strings.SumLabel + sum;
                },
              },
              footerFontStyle: 'normal'
            },
            hover: {
              mode: 'index',
              intersect: true
            },
            scales: {
              yAxes: [{
                  stacked: true
              }]
            }
          }}
        />
      </div>
    );
  }

  /**
  * Loads data from a service.
  * This is where you would replace for your own code
  */
   private _loadAsyncData(): Promise<ChartData> {
    return new Promise<ChartData>((resolve, reject) => {
      // we're using a mock service that returns random numbers.
      const dataProvider: IServiceProvider = new ServiceProvider(this.props.context);
      //dataProvider.getMultiDataset(2, 7).then((dataSets: Array<number[]>) => {
      dataProvider.getCovid19VaccinationCount(this.state.fill).then((dataSets: IVaccinationItem) => {
        const data1: ChartData =
        {
          labels: dataSets.baseDate, //날짜
          datasets: [{
            label: "1차 접종",
            fill: true,
            lineTension: 0,
            backgroundColor: styles.backgroundColor1,
            borderColor: styles.borderColor1,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            borderWidth: 1,
            pointBorderColor: styles.pointBorderColor1,
            pointBackgroundColor: styles.pointBackgroundColor1,
            pointBorderWidth: 1.5,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: styles.pointHoverBackgroundColor1,
            pointHoverBorderColor: styles.pointHoverBorderColor1,
            pointHoverBorderWidth: 1,
            pointRadius: 3,
            pointHitRadius: 10,
            data: dataSets.firstCnt
          },
          {
            label: "2차 접종",
            fill: true,
            lineTension: 0,
            backgroundColor: styles.backgroundColor2,
            borderColor: styles.borderColor2,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            borderWidth: 1.5,
            pointBorderColor: styles.pointBorderColor2,
            pointBackgroundColor: styles.pointBackgroundColor2,
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: styles.pointHoverBackgroundColor2,
            pointHoverBorderColor: styles.pointHoverBorderColor2,
            pointHoverBorderWidth: 1,
            pointRadius: 3,
            pointHitRadius: 10,
            data: dataSets.secondCnt
          }
          ]
        };
        
        //this.setState({data: data1});
        resolve(data1);
      });
    });
  }

  /*
  public componentDidMount(): void {
    //this._applyGradientFill();
    console.log('componentDidMount');

  }
  
  public componentDidUpdate(prevProps: IChart1Props, prevState: IChart1State): void {
    //this._applyGradientFill();
    console.log('componentDidUpdate');
    //console.log('c_' + this._chartElem);
    console.log('테스트:' + this._chartElem.getChart());
    //this._chartElem.update();
  }
  */

  private _renderCommandBar(): JSX.Element {
    return (
      <CommandBar
        items={[
          {
            key: '지역',
            iconProps: {
              iconName: 'ImageSearch'
            },
            subMenuProps: {
              directionalHint: DirectionalHint.bottomLeftEdge,
              items: [
                {
                  key: '전국',
                  name: '전국',
                  canCheck: true,
                  isChecked: this.state.fill === '전국',
                  onClick: (ev: React.MouseEvent<HTMLElement>, item: IContextualMenuItem) => { this._handleToggleFill(ev, item); }
                },
                {
                  key: '서울특별시',
                  name: '서울',
                  canCheck: true,
                  isChecked: this.state.fill === '서울특별시',
                  onClick: (ev: React.MouseEvent<HTMLElement>, item: IContextualMenuItem) => { this._handleToggleFill(ev, item); }
                },
                {
                  key: '경기도',
                  name: '경기',
                  canCheck: true,
                  isChecked: this.state.fill === '경기도',
                  onClick: (ev: React.MouseEvent<HTMLElement>, item: IContextualMenuItem) => { this._handleToggleFill(ev, item); }
                },
                {
                  key: '부산광역시',
                  name: '부산',
                  canCheck: true,
                  isChecked: this.state.fill === '부산광역시',
                  onClick: (ev: React.MouseEvent<HTMLElement>, item: IContextualMenuItem) => { this._handleToggleFill(ev, item); }
                },
                {
                  key: '대구광역시',
                  name: '대구',
                  canCheck: true,
                  isChecked: this.state.fill === '대구광역시',
                  onClick: (ev: React.MouseEvent<HTMLElement>, item: IContextualMenuItem) => { this._handleToggleFill(ev, item); }
                },
                {
                  key: '인천광역시',
                  name: '인천',
                  canCheck: true,
                  isChecked: this.state.fill === '인천광역시',
                  onClick: (ev: React.MouseEvent<HTMLElement>, item: IContextualMenuItem) => { this._handleToggleFill(ev, item); }
                },
                {
                  key: '대전광역시',
                  name: '대전',
                  canCheck: true,
                  isChecked: this.state.fill === '대전광역시',
                  onClick: (ev: React.MouseEvent<HTMLElement>, item: IContextualMenuItem) => { this._handleToggleFill(ev, item); }
                },
                {
                  key: '울산광역시',
                  name: '울산',
                  canCheck: true,
                  isChecked: this.state.fill === '울산광역시',
                  onClick: (ev: React.MouseEvent<HTMLElement>, item: IContextualMenuItem) => { this._handleToggleFill(ev, item); }
                },
                {
                  key: '광주광역시',
                  name: '광주',
                  canCheck: true,
                  isChecked: this.state.fill === '광주광역시',
                  onClick: (ev: React.MouseEvent<HTMLElement>, item: IContextualMenuItem) => { this._handleToggleFill(ev, item); }
                },
                {
                  key: '세종특별자치시',
                  name: '세종',
                  canCheck: true,
                  isChecked: this.state.fill === '세종특별자치시',
                  onClick: (ev: React.MouseEvent<HTMLElement>, item: IContextualMenuItem) => { this._handleToggleFill(ev, item); }
                }
              ]
            },
            name: this.state.fill === '전국' ? '지역: 전국' : `지역: ${this.state.fill.substring(0,2)}`,
            canCheck: false,
            split: true,
          }
        ]}
      />
    );
  }
  
  private _handleToggleFill = (ev: React.MouseEvent<HTMLElement>, item: IContextualMenuItem) => {
    ev!.preventDefault();

    let fillType: '전국' | '서울특별시' | '경기도' | '부산광역시' | '대구광역시' | '인천광역시' | '대전광역시' | '울산광역시' | '광주광역시' | '세종특별자치시'  = undefined;
    switch (item.key) {
      case '전국':
        fillType = '전국';
        break;
      case '서울특별시':
        fillType = '서울특별시';
        break;
      case '경기도':
        fillType = '경기도';
        break;
      case '부산광역시':
        fillType = '부산광역시';
        break;
      case '대구광역시':
        fillType = '대구광역시';
        break;
      case '인천광역시':
        fillType = '인천광역시';
        break;
      case '대전광역시':
        fillType = '대전광역시';
        break;
      case '울산광역시':
        fillType = '울산광역시';
        break;
      case '광주광역시':
        fillType = '광주광역시';
        break;
      case '세종특별자치시':
        fillType = '세종특별자치시';
        break;
      default:
        fillType = '전국';
    }

    this.setState({
      fill: fillType
    }, () => {
      this.forceUpdate();
    });
  }

}