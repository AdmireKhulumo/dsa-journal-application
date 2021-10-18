// defines an operation that can be undone or redone
import Entry from "./Entry";
import {OperationType} from "./types";

export default interface Operation{
    // the entry related to the operation
    entry: Entry;
    // the operation type
    type: OperationType;
}
