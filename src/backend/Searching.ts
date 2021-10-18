import Entry from "./Entry";
import {blankEntry, EntryField} from "./types";

// contains searching methods
export class Searching {

    // linearSearch -- returns null if not found
    public static linearSearch(arr: Entry[], field: EntryField, value: string): Entry {

        // iterate through arrayList
        for (let i: number = 0; i < arr.length; i++) {
            if (Searching.checkEqual(arr[i], field, value)) return arr[i];
        }

        // nothing found -- return blank entry
        return blankEntry;
    }

    // binary search
    public static binarySearch(arr: Entry[], field: EntryField, value: string): Entry {
        // declare variables
        let mid: number;
        let left: number = 0;
        let right: number = arr.length - 1;

        // loop and break in halves
        while (left < right) {

            // calculate midpoint
            mid = Math.floor((left + right) / 2 ) ;

            // check if value is at before or after element at mid
            // value > field of arr.get(mid)
            console.log(mid, arr[mid]);
            if (Searching.checkValueGreater(value, arr[mid], field)) {
                // discard bottom half
                left = mid + 1;
            } else {
                // discard top half
                right = mid;
            }

        }// terminates if we reach the end of the array and nothing has been found yet

        // either element is at mid, or not present
        // field of arr.get(left) == value
        if (Searching.checkEqual(arr[left], field, value)) {
            // item at left
            return arr[left];
        } else {
            // item not found
            return blankEntry;
        }
    }

    // checks if a search value > entry's value
    public static checkValueGreater(value: string, e: Entry, field: EntryField): boolean {
        // change depending on the field -- works for id, title, contents
        switch (field) {
            case "id":
                return Number(value) > e.id;
            case "title":
                return value.toLowerCase() > e.title.toLowerCase();
            case "contents":
                return value.toLowerCase() > e.contents.toLowerCase();
            default:
                return false;
        }
    }

    // checks if an object's value for a field is equal to the value supplied in the search
    public static checkEqual(e: Entry, field: EntryField, value: string): boolean {
        // change depending on the field -- works for id, title, contents
        switch (field) {
            case "id":
                return e.id == Number(value);
            case "title":
                return e.title.toLowerCase() == value.toLowerCase();
            case "contents":
                return e.contents.toLowerCase() == value.toLowerCase();
            default:
                return false;
        }
    }

}