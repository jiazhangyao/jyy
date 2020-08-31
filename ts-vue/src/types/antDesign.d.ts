declare module 'ant-design-vue/lib/locale-provider/zh_CN';

interface PaginationConf {
    total: number;
    hideOnSinglePage?: boolean;
    showTotal: (total: number) => string;
    defaultPageSize: number;
    itemRender?: (current: any, type: any, originalElement: any) => any;
    pageSizeOptions: string[];
    showSizeChanger: boolean;
    current: number;
}

interface ColumnsConf {
    title: string;
    align?: "left" | "center" | "right";
    key?: string;
    scopedSlots?: { customRender: string };
    width?: number;
    dataIndex?: string;
    sorter?: boolean;
    sortOrder?: 'ascend' | 'descend' | false;
    defaultSortOrder?: 'ascend' | 'descend' | false;
    sortDirections?: string[];
}

