// journal entry
export default interface Entry {
    // id of the entry
    id: number;
    // date added
    date: Date;
    // title and contents
    title: string;
    contents: string;
}