import { AssetTaxTreatment } from "../types/assetTypes";
import { AccountTaxTreatment } from "../types/accountTypes";
import ITaxConstrainedAction from "../types/taxConstrainedTypes";

export type PossibleTaxCategories = AssetTaxTreatment | AccountTaxTreatment;

export default function mapReducerToTaxCategory<TaxCategory extends PossibleTaxCategories>(reducer: (state: any[], action: ITaxConstrainedAction) => any[], taxCategory: TaxCategory) {
  return (state: any[], action: ITaxConstrainedAction) => {
    const isInitializationCall = (state === undefined);
    if (action.taxCategory !== taxCategory && !isInitializationCall) {
      return state;
    }

    // If this wrapper's name matches the one assigned to this reducer, call 
    return reducer(state, action)
  }
}