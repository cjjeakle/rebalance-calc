import { CurrentSchemaVersion } from "../types/versionTypes";

const initialState: CurrentSchemaVersion = "2"

export default function versionReducer(): typeof initialState {
  return initialState;
}
