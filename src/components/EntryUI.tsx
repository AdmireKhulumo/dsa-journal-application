import React, {useContext, useState} from 'react';
import {PropsEntryUI} from "../backend/types";
import {dateToString} from "../backend/functions";
import { EditOutlined, DeleteOutlined,SearchOutlined } from '@ant-design/icons';
import {Card, Divider} from "antd";
import {AppContext} from "../App";
import EditEntryUI from "./EditEntryUI";
import '../styles/entry.less';

// user interface for an entry

const EntryUI: React.FC<PropsEntryUI> = ({entry, index}) => {
    const {editEntry, deleteEntry} = useContext(AppContext);
    const [editing, setEditing] = useState<boolean>(false);

    return (
        <div>
            {/*normal when displaying*/}
            {!editing &&
            <Card
                className={'card-entry '}
                actions={[
                    <EditOutlined key="edit" onClick={()=>setEditing(true)}/>,
                    <DeleteOutlined key="delete" onClick={()=>deleteEntry(entry)} />,
                ]}
            >
                <h2 style={{color: 'white'}}><strong>{entry.title}</strong></h2>
                <h5><strong><i>{ dateToString(entry.date)}</i></strong></h5>
                <Divider className={'divider'}>{entry.id}</Divider>
                <p> {entry.contents} </p>

            </Card>
            }
            {/*for
             editing*/}
            {editing &&
                <EditEntryUI entry={entry} setEditing={setEditing} index={index}/>
            }
        </div>
    );
}

export default EntryUI;