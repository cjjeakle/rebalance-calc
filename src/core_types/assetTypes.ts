export type AssetListTypes = "assetsRegular" | "assetsInefficient" | "assetsAdvantaged";

export interface IAsset {
  name: string;
  allocation: number;
  notes: string;
}
