import React, {useContext} from 'react';
import {Button, Col, Form, Input, message, Row, Space} from "antd";
import {AppContext} from "../App";
import '../styles/App.less';
import Entry from "../backend/Entry";
import {PlusOutlined} from "@ant-design/icons";

const {TextArea} = Input;

const AddEntryUI = () => {
    const { addEntry, setShowAdd} = useContext(AppContext);

    return (
        <div>
            <Form
                name="add-entry"
                onFinish={addEntry}
            >
                <h3 className={'divider'}><i>Add New Entry...</i></h3>

                <Form.Item
                    name="title"
                    rules={[{required: true, message: 'Please enter the title'}]}
                >
                    <Input
                        type="text"
                        placeholder="Title"
                    />
                </Form.Item>

                <Form.Item
                    name="contents"
                    rules={[{required: true, message: 'Please enter the contents'}]}
                >
                    <TextArea
                        placeholder="Contents"
                    />
                </Form.Item>

                <Space size={'middle'}>
                    <Form.Item>
                        <Button type="ghost" onClick={()=>setShowAdd(false)}>
                            Cancel
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" icon={<PlusOutlined/>}>
                            Add Entry
                        </Button>
                    </Form.Item>
                </Space>

            </Form>
        </div>
    );
};

export default AddEntryUI;