import Entry from "./Entry";

// type of operations possible
export type OperationType = 'add' | 'delete' | 'edit';

// type of action: either undo or redp
export type ActionType = 'undo' | 'redo';

// field that can be searched or sorted on
export type EntryField = 'id' | 'date' | 'title' | 'contents';

// order of sorting
export type SortOrder = 'ascending' | 'descending';

// signature of a sorting function
export type SortFunction = (arr: Entry[], field: EntryField, order: SortOrder) => Entry[];

// signature of a searching function
export type SearchFunction = (arr: Entry[], field: EntryField, value: string) => Entry;

// blank entry
export const blankEntry: Entry = {contents: "", date: new Date(), id: 0, title: ""}

// dfeault entries
export const defaultEntries: Entry[] = [
    {id: 1, date: new Date(), title: 'My E Day', contents: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.'},
    {id: 2, date: new Date(), title: 'My D Day', contents: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.'},
    {id: 3, date: new Date(), title: 'My C Day', contents: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.'},
    {id: 4, date: new Date(), title: 'My B Day', contents: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.'},
    {id: 5, date: new Date(), title: 'My A Day', contents: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.'}
]
// component props

export interface PropsEntryUI {
    entry: Entry
    index: number
}

export interface PropsEditEntry extends  PropsEntryUI{
    setEditing: Function
}