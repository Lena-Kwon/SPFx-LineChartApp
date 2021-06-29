import { ChartPoint } from 'chart.js';
import IVaccinationItem from "./IVaccinationItem";

/**
 * Provides sample chart data. All returned results are randomized.
 * Any resemblance to winning lottery numbers is purely coincidental.
 */
export default interface IServiceProvider {
  getCovid19VaccinationCount(sido: string): Promise<IVaccinationItem>;
  //getCovid19Count(sido: string): Promise<Array<any[]>>;
}