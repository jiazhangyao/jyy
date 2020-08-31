
const matomoUrl: string = '//matomo.jhpy.org/';
const matomoID: string = '100000000';
// 测试服
if (process.env.VUE_APP_SERVER !== 'prodServer') {
  // matomoUrl = 'http://172.19.21.247/';
  // matomoID = '4';
}

export const MATOMO_URL: string = matomoUrl;
export const MATOMO_ID: string = matomoID;
