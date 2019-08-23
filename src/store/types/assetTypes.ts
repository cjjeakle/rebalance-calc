export type AssetListNames = "assetsRegular" | "assetsInefficient" | "assetsAdvantaged";

export interface IAsset {
  name: string;
  allocation: number;
  notes: string;
  showDetails: boolean;
}
