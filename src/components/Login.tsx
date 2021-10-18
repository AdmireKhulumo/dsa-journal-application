import React, {useContext} from 'react';
import {Form, Input, Button, message, Avatar, Space} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {AppContext} from "../App";
import '../styles/login.less';


const Login = () => {
    // correct password
    const correctPassword = '12345';
    // context stores logging in function
    const {setLoggedIn} = useContext(AppContext);

    // function to try login
    const checkPin = (values: any) => {
        // check if pin is correct
        if (values.pin === correctPassword){
            setLoggedIn(true);
            console.log('correct pin');
        }
        else{
            message.error("Incorrect pin.");
        }
    };

    return (
        <Form
            name="normal_login"
            onFinish={checkPin}

        >

            <Space direction={'vertical'} size={'large'} className={'login-form'}>

                <Avatar size={150} icon={<LockOutlined/>} className={'avatar'}/>

                <h1 className={'heading'}>Login with PIN</h1>

                <Form.Item
                    name="pin"
                    rules={[{required: true, message: 'Please enter the pin!'}]}
                >
                    <Input
                        prefix={<LockOutlined/>}
                        type="password"
                        placeholder="PIN Code"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className={'submit-button'}>
                        Unlock Journal
                    </Button>
                </Form.Item>

                </Space>
        </Form>
    );
};

export default Login;