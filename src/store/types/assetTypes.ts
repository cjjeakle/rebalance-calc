import { Action } from "redux";

export type AssetListNames = "assetsRegular" | "assetsInefficient" | "assetsAdvantaged";

export interface IAsset extends Action {
  name: string;
  allocation: number;
  notes: string;
}
