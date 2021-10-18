import Entry from "./Entry";
import {EntryField, SortOrder} from "./types";

// contains sorting methods
export class Sorting {

    // bubble sort by id, date, title, or contents
    public static bubbleSort(arr: Entry[], field: EntryField, order: SortOrder): Entry[] {

        // arraylist size
        const n: number = arr.length;

        // outer loop -- stops 1 place before end
        for (let i: number = 0; i < n - 1; i++) {
            // pick element and keep comparing
            for (let j: number = 0; j < n - 1 - i; j++) {
                // if out of order, swap
                // arr.get(j) > arr.get(j+1)
                if (Sorting.checkGreater(arr[j], arr[j + 1], field, order)) {
                    const temp: Entry = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }

        return arr;
    }

    // selection sort by id, date, title, or contents
    public static selectionSort(arr: Entry[], field: EntryField, order: SortOrder): Entry[] {
        // length of array list
        const n: number = arr.length;

        // loop through the whole array
        for (let i: number = 0; i < n; i++) {

            // initialise minIndex to first unsorted item each time we go through the outer for loop
            let minIndex: number = i;

            // inner loop must starts just after i to the end
            for (let j: number = i + 1; j < n; j++) {

                // check if current item is less than the minIndex value
                // arr.get(j) < arr.get(minIndex) is the same as arr.get(minIndex) > arr.get(j)
                if (Sorting.checkGreater(arr[minIndex], arr[j], field, order)) {
                    // less than, so update min to this one
                    minIndex = j;
                }
            }

            // after loop, swap the new minValue with the item we've been comparing to in outer loop
            if (minIndex != i) {
                const temp: Entry = arr[i];
                arr[i] = arr[minIndex];
                arr[minIndex] = temp;
            }

        }

        return arr;
    }

    public static insertionSort(arr: Entry[], field: EntryField, order: SortOrder): Entry[] {

        // length of array list
        const n: number = arr.length;

        // loop through the whole array
        for (let i: number = 0; i < n; i++) {
            let j: number = i;

            //i is not the first element
            while (j > 0) {
                //not in order
                // arr.get(j-1) > arr.get(j)
                if (Sorting.checkGreater(arr[j - 1], arr[j], field, order)) {
                    //swapping
                    const temp: Entry = arr[j - 1];
                    arr[j - 1] = arr[j];
                    arr[j] = temp;
                }
                //in order
                else break;
                // decrement i
                j--;
            }
        }

        return arr;
    }


// method to check if Entry a > Entry b depending on the field to be used
    // returns true if a > b else false
    public static checkGreater(a: Entry, b: Entry, field: EntryField, order: SortOrder): boolean {
        // to store result ascending
        let result: boolean;

        // change depending on the field
        switch (field) {
            case "id":
                result = a.id > b.id;
                break;
            case "title":
                result = a.title.toLowerCase() > b.title.toLowerCase();
                break;
            case "contents":
                result = a.contents.toLowerCase() > b.contents.toLowerCase();
                break;
            default:
                result = a.date > b.date;
                break;
        }

        // for reverse order, flip the result
        if (order === 'descending') return !result;
        else return result;
    }


}