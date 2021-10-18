import React, {useContext} from 'react';
import {Button, Form, Input, Select} from "antd";
import {AppContext} from "../App";
import { SearchOutlined } from '@ant-design/icons';


const { Option } = Select;


const SearchingForm = () => {
    const {search} = useContext(AppContext);

    return (
        <Form name={'searching-form'} onFinish={search} style={{width: '400px'}}>

            {/*Search Value*/}
            <Form.Item name="value" label="Search Value" rules={[{ required: true, message: 'Enter a search value!' }]}>
                <Input
                    placeholder="Search Value"
                    type={'text'}
                />
            </Form.Item>

            {/*Search Algorithm*/}
            <Form.Item name="algorithm" label="Algorithm" rules={[{ required: true, message: 'Select Algorithm' }]}>
                <Select
                    placeholder="Search Algorithm"
                >
                    <Option value="linear">Linear Search</Option>
                    <Option value="binary">Binary Search</Option>
                </Select>
            </Form.Item>

            {/*Search field*/}
            <Form.Item name="field" label="Field" rules={[{ required: true, message: 'Select field!' }]}>
                <Select
                    placeholder="Entry Field"
                >
                    <Option value="id">ID</Option>
                    <Option value="title">Title</Option>
                    <Option value="contents">Contents</Option>
                </Select>
            </Form.Item>


            {/*Submit button*/}
            <Form.Item>
                <Button type="primary" htmlType="submit" style={{width: '100%'}} icon={<SearchOutlined />}>
                    Search Entries
                </Button>
            </Form.Item>

        </Form>
    );
};

export default SearchingForm;