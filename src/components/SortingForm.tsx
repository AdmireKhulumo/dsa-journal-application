import React, {useContext} from 'react';
import {Button, Form, Select} from "antd";
import {AppContext} from "../App";
import {SortAscendingOutlined} from '@ant-design/icons';

const { Option } = Select;


const SortingForm = () => {
    const {sort} = useContext(AppContext);

    return (
        <Form name={'sorting-form'} onFinish={sort} style={{width: '400px'}}>

            {/*Sort Algorithm*/}
            <Form.Item name="algorithm" label="Algorithm" rules={[{ required: true, message: 'Select Algorithm' }]}>
                <Select
                    placeholder="Sort Algorithm"
                >
                    <Option value="bubble">Bubble Sort</Option>
                    <Option value="insertion">Insertion Sort</Option>
                    <Option value="selection">Selection Sort</Option>
                </Select>
            </Form.Item>

            {/*Sort field*/}
            <Form.Item name="field" label="Field" rules={[{ required: true, message: 'Select field!' }]}>
                <Select
                    placeholder="Entry Field"
                >
                    <Option value="id">ID</Option>
                    <Option value="date">Date</Option>
                    <Option value="title">Title</Option>
                    <Option value="contents">Contents</Option>
                </Select>
            </Form.Item>

            {/*Sort order*/}
            <Form.Item name="order" label="Order" rules={[{ required: true, message: 'Select order!' }]}>
                <Select
                    placeholder="Sort Order"
                >
                    <Option value="ascending">Ascending</Option>
                    <Option value="descending">Descending</Option>
                </Select>
            </Form.Item>

            {/*Submit button*/}
            <Form.Item>
                <Button type="primary" htmlType="submit" style={{width: '100%'}} icon={<SortAscendingOutlined />}>
                    Sort Entries
                </Button>
            </Form.Item>

        </Form>
    );
};

export default SortingForm;