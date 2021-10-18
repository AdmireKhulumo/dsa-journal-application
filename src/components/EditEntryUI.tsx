import React, {useContext} from 'react';
import {Button, Col, Form, Input, message, Row, Space} from "antd";
import {SaveOutlined} from "@ant-design/icons";
import {AppContext} from "../App";
import {PropsEditEntry} from "../backend/types";

const {TextArea} = Input;

const EditEntryUI: React.FC<PropsEditEntry> = ({entry, setEditing, index}) => {
    const { editEntry} = useContext(AppContext);

    // save details
    const save = (values: any) => {
        // close editing mode
        setEditing(false);

        // update value in array
        editEntry({...values, id: entry.id, date: entry.date, index: index})
    }

    return (
        <div>
            <Form
                name="edit-entry"
                initialValues={entry}
                onFinish={save}
            >
                <h3 className={'divider'}><i>Edit Entry...</i></h3>


                <Form.Item
                    name="title"
                    rules={[{required: true, message: 'Please enter the title'}]}
                >
                    <Input
                        type="text"
                        // defaultValue={entry.title}
                    />
                </Form.Item>

                <Form.Item
                    name="contents"
                    rules={[{required: true, message: 'Please enter the contents'}]}
                >
                    <TextArea
                        // defaultValue={entry.contents}
                    />
                </Form.Item>


                <Space size={'middle'}>
                    <Form.Item>
                        <Button type="ghost" onClick={()=>setEditing(false)}>
                            Cancel
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                            Save
                        </Button>
                    </Form.Item>
                </Space>

            </Form>
        </div>
    );
};

export default EditEntryUI;