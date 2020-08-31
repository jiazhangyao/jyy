interface RootState {
  userInfo: UserInfo;
  admins: any[];
  headerImg: string | null;
}

interface State {
  userInfo: UserInfo;
  admins: any[];
  headerImg: string | null;
}

interface UserInfo {
  id?: number;
  name?: string;
  username?: string;
  authors?: any[];
  roleId?: number;
  role?: string; // 角色 SPEAKER 主讲老师; HELPER 辅导老师; OTHER 其他
}
