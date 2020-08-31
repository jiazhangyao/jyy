/**
 * 判断是否含有表情
 * @export
 * @param {String} substring
 * @returns {Booblen}
 */
export function isEmojiCharacter(substring: string): boolean {
  for ( let i: number = 0; i < substring.length; i++) {
    const hs: number = substring.charCodeAt(i);
    if (0xd800 <= hs && hs <= 0xdbff) {
      if (substring.length > 1) {
        const ls: number = substring.charCodeAt(i + 1);
        const uc: number = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
        if (0x1d000 <= uc && uc <= 0x1f77f) {
          return true;
        }
      }
    } else if (substring.length > 1) {
      const ls: number = substring.charCodeAt(i + 1);
      if (ls === 0x20e3) {
        return true;
      }
    } else {
      if (0x2100 <= hs && hs <= 0x27ff) {
        return true;
      } else if (0x2B05 <= hs && hs <= 0x2b07) {
        return true;
      } else if (0x2934 <= hs && hs <= 0x2935) {
        return true;
      } else if (0x3297 <= hs && hs <= 0x3299) {
        return true;
      } else if (hs === 0xa9 || hs === 0xae || hs === 0x303d || hs === 0x3030
        || hs === 0x2b55 || hs === 0x2b1c || hs === 0x2b1b
        || hs === 0x2b50) {
        return true;
      }
    }
  }
  return false;
}
// js判断一个字符串是否是数字
export function isNumber(val: any): boolean {
  const regPos: any = /^\d+(\.\d+)?$/; // 非负浮点数
  const regNeg: any = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; // 负浮点数
  if (regPos.test(val) || regNeg.test(val)) {
    return true;
  } else {
    return false;
  }
}

/**
 * 根据时间搓计算时间差值
 * @export
 * @param {Number} time_diff
 * @param {Number} type  1: 中文不带em标签 2:中文带em标签 3:时钟格式
 * @returns {AxiosPromise}
 */
export function getTimeDiff(time_diff: number, type: number = 1): string {

  time_diff = Math.abs(time_diff);
  let diff: string = '';
  // 计算出相差天数
  const days: number = Math.floor(time_diff / (24 * 3600));
  if (days > 0) {
    // diff += days + (type ? '<em>天</em>' : '天');
    if (type === 1) {
      diff += days + '天';
    } else if (type === 2) {
      diff += days + '<em>天</em>';
    } else {
      // diff += days + ':';
    }
  }
  // 计算出小时数
  const leave1: number = time_diff % ( 24 * 3600);
  let hours: number| string = Math.floor(leave1 / (3600));
  if (hours > 0) {
    // diff += hours + (type ? '<em>小时</em>' : '小时');
    if (type === 1) {
      // hours = days * 24 + hours;
      diff += hours + '时';
    } else if (type === 2) {
      // hours = days * 24 + hours;
      diff += hours + '<em>时</em>';
    } else {
      hours = days * 24 + hours;
      if (hours < 10) hours = '0' + hours;
      diff += hours + ':';
    }
  } else {
    if (diff !== '') {
      // diff += hours + (type ? '<em>小时</em>' : '小时');
      if (type === 1) {
        diff += hours + '时';
      } else if (type === 2) {
        diff += hours + '<em>小时</em>';
      } else {
        diff += hours + ':';
      }
    } else {
      if (type === 3) {
        if (days) {
          diff = days * 24 + ':';
        } else {
          diff = '00:';
        }
      }
    }
  }
  // 计算相差分钟数
  const leave2: number = leave1 % (3600);
  let minutes: number| string = Math.floor(leave2 / (60));
  if (minutes > 0) {
    // diff += minutes + (type ? '<em>分</em>' : '分');
    if (type === 1) {
      diff += minutes + '分';
    } else if (type === 2) {
      diff += minutes + '<em>分</em>';
    } else {
      if (minutes < 10) minutes = '0' + minutes;
      diff += minutes + '';
    }
  } else {
    if (diff !== '') {
      // diff += minutes + (type ? '<em>分</em>' : '分');
      if (type === 1) {
        diff += minutes + '分';
      } else if (type === 2) {
        diff += minutes + '<em>分</em>';
      } else {
        diff = diff + '00';
      }
    }
  }
  // 计算相差秒数
  const leave3: number = leave2 % ( 60);
  const seconds: number = Math.round(leave3);
  if (seconds > 0) {
    // diff += seconds + (type ? '<em>秒</em>' : '秒');
    if (type === 1) {
      if (!diff) {
        diff += seconds + '秒';
      }
    } else if (type === 2) {
      if (!diff) {
        diff += seconds + '<em>秒</em>';
      }
    } else {
      if (diff === '00:00') {
        diff = seconds + '秒';
      }
      // diff += seconds;
    }
  } else {
    if (diff !== '') {
      // diff += seconds + (type ? '<em>秒</em>' : '秒');
      if (type === 1) {
        if (!diff) {
          diff += seconds + '秒';
        }
      } else if (type === 2) {
        if (!diff) {
          diff += seconds + '<em>秒</em>';
        }
      } else {
        if (diff === '00:00') {
          diff = seconds + '秒';
        }
      }
    }
  }
  if (!diff) {
    if (type === 1) {
      diff = '0分钟';
    } else if (type === 2) {
      diff = '0<em>分钟</em>';
    } else {
      diff = '00:00';
    }
  }
  return diff;
}

// 处理数字
export const noToChinese: any = {
  /*
      单位
  */
  units: '个十百千万@#%亿^&~',
  /*
      字符
  */
  chars: '零一二三四五六七八九',
  /*
      数字转中文
      @number {Number} 形如123的数字
      @return {String} 返回转换成的形如 一百二十三 的字符串
  */
  numberToChinese(num: number): string {
    const a: any = (num + '').split('');
    const s: any[] = [];
    if (a.length > 12) {
      throw new Error('too big');
    } else {
      for (let i: number = 0, j: any = a.length - 1; i <= j; i++) {
        if (j === 1 || j === 5 || j === 9) { // 两位数 处理特殊的 1*
          if (i === 0) {
            if (a[i] !== '1') s.push(this.chars.charAt(a[i]));
          } else {
            s.push(this.chars.charAt(a[i]));
          }
        } else {
          s.push(this.chars.charAt(a[i]));
        }
        if (i !== j) {
          s.push(this.units.charAt(j - i));
        }
      }
    }

    return s.join('').replace(/零([十百千万亿@#%^&~])/g, (m, d, b) => { // 优先处理 零百 零千 等

      b = this.units.indexOf(d);
      if (b !== -1) {
        if (d === '亿') return d;
        if (d === '万') return d;
        // @ts-ignore
        if (a[j - b] === '0') return '零';
      }
      return '';

    }).replace(/零+/g, '零').replace(/零([万亿])/g, (m, b) => { // 零百 零千处理后 可能出现 零零相连的 再处理结尾为零的
      return b;
    }).replace(/亿[万千百]/g, '亿').replace(/[零]$/, '').replace(/[@#%^&~]/g, m => {
      // @ts-ignore
      return {
        '@': '十',
        '#': '百',
        '%': '千',
        '^': '十',
        '&': '百',
        '~': '千'
      }[m];
    }).replace(/([亿万])([一-九])/g, (m, d, b, c) => {
      c = this.units.indexOf(d);
      if (c !== -1) {
        // @ts-ignore
        if (a[j - c] === '0') return d + '零' + b;
      }
      return m;
    });
  }
};
