import { getLocalStorage } from '@/common/js/localStorage';
export function isLogin(): boolean {
  const token: string | null = getLocalStorage('token', false);
  if (token) {
    return true;
  }
  return false;
}
