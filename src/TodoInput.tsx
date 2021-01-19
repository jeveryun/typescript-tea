import React, { useState } from 'react';
import { Input, Select, DatePicker } from 'antd';
import { Moment } from 'moment';

import { userList } from './utils/data';

const { Option } = Select;

enum UserId {
    Tuture = '666666666',
    MRcfps = '23410977',
    Crxk = '25455350',
    Pftom = '23410976',
    Holy = '58352313',
}

export interface TodoValue {
    content?: string;
    user?: UserId;
    date?: string;
}

interface TodoInputProps {
    value?: TodoValue;
    onChange?: (value: TodoValue) => void;
}

const TodoInput = ({ value = {}, onChange }: TodoInputProps) => {
    const [content, setContent] = useState('');
    const [user, setUser] = useState(UserId.Tuture);
    const [date, setDate] = useState('');

    const triggerChange = (changedValue: TodoValue) => {
        if (onChange) {
            onChange({ content, user, date, ...value, ...changedValue });
        }
    };

    const onContentChange = (e: any) => {
        if (!('content' in value)) {
            setContent(e.target.value);
        }

        triggerChange({ content: e.target.value });
    };

    const onUserChange = (selectValue: UserId) => {
        if (!('user' in value)) {
            setUser(selectValue);
        }

        triggerChange({ user: selectValue });
    };

    const onDateOk = (date: Moment) => {
        if (!('date' in value)) {
            setDate(date.format('YYYY-MM-DD HH:mm'));
        }

        triggerChange({ date: date.format('YYYY-MM-DD HH:mm') });
    };

    return (
        <div className="todoInput">
            <Input
                type="text"
                placeholder="输入待办事项内容"
                value={value.content || content}
                onChange={onContentChange}
            />
            <Select
                style={{ width: 80 }}
                size="small"
                defaultValue={UserId.Tuture}
                value={user}
                onChange={onUserChange}
            >
                {userList.map((user) => (
                    <Option value={user.id}>{user.name}</Option>
                ))}
            </Select>
            <DatePicker showTime size="small" onOk={onDateOk} style={{ marginLeft: '16px', marginRight: '16px' }} />
        </div>
    );
};

export default TodoInput;
