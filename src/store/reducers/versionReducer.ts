import { ISchemaVersion } from "../types/versionTypes";

const initialState: ISchemaVersion = {
  schemaVersion: "2"
};

export default function versionReducer(): typeof initialState {
  return initialState;
}
