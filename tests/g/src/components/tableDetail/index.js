import React from 'react';
import { Table } from 'antd';
import "./index.less"

const defaultProps = {
    className: 'table-detail'
};

export default function ({
    className,
    pageSize = 10,
    dataSource,
    pagination = true,
    rowKey = "id",
    ...props
}) {
    props.pagination = pagination && (dataSource && dataSource.length > pageSize);
    if (props.pagination) {
        props.pagination = {
            pageSize: pageSize
        };
    }

    return <Table {...props} className={`table-detail ${className}`} dataSource={dataSource} rowKey={rowKey} />;
}
