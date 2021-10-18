import React, {SetStateAction, useState} from 'react';
import './styles/App.less'
import Entry from "./backend/Entry";
import EntryUI from "./components/EntryUI";
import Login from "./components/Login";
import {Button, Col, Divider, Form, message, Modal, Row, Select, Space} from "antd";
import AddEntryUI from "./components/AddEntryUI";
import {
    ActionType,
    blankEntry, defaultEntries,
    EntryField,
    OperationType,
    SearchFunction,
    SortFunction,
    SortOrder
} from "./backend/types";
import {Stack} from "stack-typescript";
import Operation from "./backend/Operation";
import {StepBackwardOutlined, StepForwardOutlined , PlusOutlined} from '@ant-design/icons';
import {Sorting} from "./backend/Sorting";
import SortingForm from "./components/SortingForm";
import SearchingForm from "./components/SearchingForm";
import {Searching} from "./backend/Searching";

export const AppContext = React.createContext({} as any);
const {Option} = Select;

function App() {
    // logged in or not
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    // list of journal entries
    const [entries, setEntries] = useState<Entry[]>(defaultEntries);
    // stack for tracking un-doable actions -- initially blank
    const [undoStack, setUndoStack] = useState<Stack<Operation>>(new Stack<Operation>());
    // stack for tracking re-doable actions -- initially blank
    const [redoStack, setRedoStack] = useState<Stack<Operation>>(new Stack<Operation>());
    // shows add form
    const [showAdd, setShowAdd] = useState<boolean>(false);
    // modal used when showing search result
    const[showModal, setShowModal] = useState<boolean>(false);
    // entry result from search
    const[result, setResult] = useState<Entry>(blankEntry);


    // OPERATIONS ON ENTRIES

    // function to add an entry
    const addEntry = (values: any) => {
        // get data from form
        const newEntry: Entry = {
            id: entries.length + 17,
            date: new Date(),
            title: values.title,
            contents: values.contents,
        }

        // add this operation to the undo stack
        const op: Operation = {
            entry: newEntry,
            type: "add"
        }
        updateUndo(op);

        // add new entry to all others
        setEntries(prev => [newEntry, ...prev]);

        message.success('Successful.');

        // close the modal
        setShowAdd(false);
    }
    // function to edit an entry
    const editEntry = (values: any) => {
        // get entries
        let temp: Entry[] = entries;
        // find the specific entry using the index and change it
        const newEntry: Entry  = {
            id: values.id,
            date: values.date,
            title: values.title,
            contents: values.contents
        }

        // filter old one out
        temp = temp.filter(e => e.id !== newEntry.id);

        // update state with new one
        setEntries( [newEntry, ...temp]);
        message.success('Edited Successfully.');
    }
    // function to delete an entry
    const deleteEntry = (entry: Entry) => {
        // create an operation and add to undo stack
        const op: Operation = {
            type: 'delete',
            entry: entry
        }
        updateUndo(op);

        // remove from entries
        setEntries(prevState => prevState.filter(e => e.id != entry.id));

        message.success("Deleted successfully.");
    }

    // Operations on UNDO and REDO functionality

    // updates the undo stack -- redo stack is only ever update after an undo operation
    const updateUndo = (op: Operation) => {
        // add e to the undo stack
        undoStack.push(op);
    }

    // the undo operation
    const undo = () => {
        // check if undo stack empty
        if (undoStack.size != 0) {
            // remove operation from undo
            const op: Operation = undoStack.pop();

            // add operation to redo stack
            let newStack: Stack<Operation> = redoStack;
            newStack.push(op);
            setRedoStack(newStack);
            // redoStack.push(op);
            console.log(redoStack);

            // perform operation undoing
            performOperation(op, "undo");

            message.success('Undo Successful');
        }
        // stack must be empty
        else message.error('No operations');
    }

    // the redo operation
    const redo = () => {
        // check if redo stack is empty
        if (redoStack.size != 0) {
            // remove operation from redo
            const op: Operation = redoStack.pop();

            // add operation to undo stack
            // undoStack.push(op);
            let newStack: Stack<Operation> = undoStack;
            newStack.push(op);
            setUndoStack(newStack);
            console.log(undoStack);

            // perform operation redoing
            performOperation(op, "redo");

            message.success('Redo Successful');
        }
        // stack must be empty
        else message.error('No operations');
    }

    // method performs or un-performs an operation during undo or redo
    const performOperation = (op: Operation, action: ActionType) => {

        // undo action
        if (action === "undo") {
            // check operation performed

            // undo add
            if (op.type === "add") {
                // remove from entries list
                setEntries(prevState => prevState.filter(e => e !== op.entry));

            }
            // undo delete
            if (op.type === "delete") {
                // add back to entries
                setEntries(prevState => [op.entry, ...prevState]);
            }

        }

        // redo action
        if (action === "redo") {
            // check operation performed

            // redo add
            if (op.type === "add") {
                // add back to list
                setEntries(prevState => [op.entry, ...prevState]);
            }
            // undo delete
            if (op.type === ("delete")) {
                // remove from entries
                setEntries(prevState => prevState.filter(e => e !== op.entry));
            }
        }
    }

    // manages sorting
    const sort = (values: any) => {
        // get form fields
        const algorithm = values.algorithm;
        const field: EntryField = values.field;
        const order = values.order;
        console.log(values);

        // map stores algorithm names and their associated functions
        let algoMap: Map<string, SortFunction> = new Map<string, SortFunction>();
        algoMap.set('bubble', Sorting.bubbleSort);
        algoMap.set('insertion', Sorting.insertionSort);
        algoMap.set('selection', Sorting.selectionSort);

        // run function depending on key supplied -- check function from map
        const sortFunction: SortFunction = algoMap.get(algorithm) as SortFunction;
        let sorted: Entry[] = sortFunction(entries, field, order)

        // update state
        setEntries([...sorted, blankEntry]);
    }

    // manages searching
    const search = (values: any) => {
        // get form fields
        const algorithm = values.algorithm;
        const value = values.value;
        const field: EntryField = values.field;
        console.log(values);

        // map stores algorithm names and their associated functions
        let algoMap: Map<string, SearchFunction> = new Map<string, SearchFunction>();
        algoMap.set('linear', Searching.linearSearch);
        algoMap.set('binary', Searching.binarySearch);

        // run function depending on key supplied -- check function from map
        const searchFunction: SearchFunction = algoMap.get(algorithm) as SearchFunction;
        let res: Entry = searchFunction(entries, field, value)

        // check if its blank, i.e not found
        if (res.id == 0) message.info("Entry Not Found.");
        else {
            // entry found
            setResult(res);
            setShowModal(true);
        }

    }


    return (
        <AppContext.Provider
            value={{setLoggedIn, entries, setEntries, setShowAdd, addEntry, editEntry, deleteEntry, sort, search}}>
            <div className={'App'}>
                {/*if not logged in, show login panel*/}

                {!loggedIn && <Login/>}

                {/*{loggedIn && */}
                {loggedIn &&
                <Row gutter={[4, 4]}>

                    <Col sm={24} md={12}>
                        <Space direction={'vertical'} align={'baseline'} size={'large'}>
                            <h1 className={'heading'}><strong><u>Journal Functions</u></strong></h1>

                            <h3 className={'divider'}>Navigation Options</h3>
                            <Space size={"middle"}>
                                <Button disabled={undoStack.size == 0} onClick={() => undo()} icon={<StepBackwardOutlined />} type={'primary'} style={{width: '170px'}}>
                                    UNDO
                                </Button>
                                <Button disabled={redoStack.size == 0}  onClick={() => redo()} icon={<StepForwardOutlined/>} type={'primary'} style={{width: '170px'}}>
                                    REDO
                                </Button>
                            </Space>

                            {/*sorting options*/}
                            <h3 className={'divider'}>Sorting Options</h3>
                            <SortingForm/>

                            {/*searching options*/}
                            <h3 className={'divider'}>Searching Options</h3>
                            <SearchingForm/>
                        </Space>
                    </Col>

                    <Col sm={24} md={12}>
                        <Space direction={'vertical'} size={'middle'}>

                            <h1 className={'heading'}><strong><u>My Journal Entries</u></strong></h1>

                            <Button onClick={() => setShowAdd(!showAdd)} icon={<PlusOutlined/>} type={'primary'}>
                                New Entry
                            </Button>

                            {/*when add entry button is clicked*/}
                            {showAdd &&
                                <AddEntryUI/>
                            }

                            {/*all entries*/}
                            {entries.map((entry, index) => {
                                if (entry.id != 0) return <EntryUI key={entry.id} entry={entry} index={index}/>
                            })}
                        </Space>
                    </Col>

                </Row>
                }

                {/*MOdal used when entry is found by sort*/}
                <Modal visible={showModal} footer={null} onOk={()=>setShowModal(false)} onCancel={()=>setShowModal(false)} >
                    <EntryUI entry={result} index={0}/>
                </Modal>

            </div>
        </AppContext.Provider>
    );
}

export default App;

