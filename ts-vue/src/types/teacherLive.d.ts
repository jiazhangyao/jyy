interface StudentInfo {
    id: string;
    name: string;
    nickname: string;
}

interface StudentInfoList {
    [key: string]: StudentInfo;
}

interface StudentInfoFindListCache {
    [key: string]: StudentInfoFindListCacheData;
}

interface StudentInfoFindListCacheData {
    idxs: number[];
    s_userid: string | number;
    mobile: string;
    name: string;
}
