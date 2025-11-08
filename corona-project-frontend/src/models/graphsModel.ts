import { dailyCasesModel } from "./dailyCasesModel";
import { sevenDaysCasesAverageModel } from "./sevenDaysCasesAverageModel";

export interface graphsModel{
    sevenDaysCasesAverage: sevenDaysCasesAverageModel[],
    dailyCases: dailyCasesModel[]
}