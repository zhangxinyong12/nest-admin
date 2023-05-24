import { Link } from '@umijs/max';

type AntdPage = {
  current: number;
  pageSize: number;
};
type Pgae = {
  page: number;
  pageSize: number;
};

/**
 * 格式化antdProtable page 分页
 * @param param0
 * @returns 正确的分页格式
 */
export function transPage({ current = 1, pageSize = 20 }: AntdPage): Pgae {
  return {
    page: current,
    pageSize: pageSize,
  };
}

type reqType = Record<string, any>;
type resPonse = {
  data: any[];
  // success 请返回 true，不然 table 会停止解析数据，即使有数据
  success: boolean;
  // 不传会使用 data 的长度，如果是分页一定要传
  total: number;
};

export function reqTableData(_params, api): Promise<resPonse> {
  const params = { ..._params };
  params.page = _params.current || 1;
  params.pageSize = _params.pageSize || 20;
  delete params.current;
  return api(params)
    .then((res) => {
      return Promise.resolve({
        data: res.items || [],
        success: true,
        total: res.total,
      });
    })
    .catch(() => {
      return Promise.resolve({
        data: [],
        success: true,
        total: 0,
      });
    });
}

export function NaveItemRender(route, params, routes, paths) {
  const { path } = route;
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={path}>{route.breadcrumbName}</Link>
  );
}

// TODO 可能会有问题
export const emojiMap = {
  100: '[微笑]',
  101: '[撇嘴]',
  102: '[色]',
  103: '[发呆]',
  104: '[得意]',
  105: '[流泪]',
  106: '[害羞]',
  107: '[闭嘴]',
  108: '[睡]',
  109: '[大哭]',
  110: '[尴尬]',
  111: '[发怒]',
  112: '[调皮]',
  113: '[呲牙]',
  114: '[惊讶]',

  115: '[难过]',
  116: '[酷]',
  117: '[冷汗]',
  118: '[抓狂]',
  119: '[吐]',
  120: '[偷笑]',
  121: '[愉快]',
  122: '[白眼]',
  123: '[傲慢]',
  124: '[饥饿]',
  125: '[困]',
  126: '[惊恐]',
  127: '[流汗]',
  128: '[憨笑]',
  129: '[悠闲]',

  130: '[奋斗]',
  131: '[咒骂]',
  132: '[疑问]',
  133: '[嘘]',
  134: '[晕]',
  135: '[抓狂]',
  136: '[衰]',
  137: '[骷髅]',
  138: '[敲打]',
  139: '[再见]',
  140: '[擦汗]',
  141: '[抠鼻]',
  142: '[鼓掌]',
  143: '[糗大了]',
  144: '[坏笑]',

  145: '[左哼哼]',
  146: '[右哼哼]',
  147: '[哈欠]',
  148: '[鄙视]',
  149: '[委屈]',
  150: '[快哭了]',
  151: '[阴险]',
  152: '[亲亲]',
  153: '[吓]',
  154: '[可怜]',
  155: '[菜刀]',
  156: '[西瓜]',
  157: '[啤酒]',
  158: '[篮球]',
  159: '[乒乓]',

  160: '[咖啡]',
  161: '[饭]',
  162: '[猪头]',
  163: '[玫瑰]',
  164: '[凋谢]',
  165: '[嘴唇]',
  166: '[爱心]',
  167: '[心碎]',
  168: '[蛋糕]',
  169: '[闪电]',
  170: '[炸弹]',
  171: '[刀]',
  172: '[足球]',
  173: '[瓢虫]',
  174: '[便便]',

  175: '[月亮]',
  176: '[太阳]',
  177: '[礼物]',
  178: '[拥抱]',
  179: '[强]',
  180: '[弱]',
  181: '[握手]',
  182: '[胜利]',
  183: '[抱拳]',
  184: '[勾引]',
  185: '[拳头]',
  186: '[差劲]',
  187: '[爱你]',
  188: '[NO]',
  189: '[OK]',

  190: '[爱情]',
  191: '[飞吻]',
  192: '[跳跳]',
  193: '[发抖]',
  194: '[怄火]',
  195: '[转圈]',
  196: '[磕头]',
  197: '[回头]',
  198: '[跳绳]',
  199: '[投降]',
};

/**
 * @param str
 * @returns 替换掉字符串中的【*】为''
 */
export function transformStr(str = '') {
  // 去除开头的换行
  let newStr = str.replace(/\【.*?\】/g, '').replace(/\n\n/g, '\n');
  if (newStr.startsWith('\n')) {
    newStr = newStr.slice(1);
  }

  return newStr;
}
