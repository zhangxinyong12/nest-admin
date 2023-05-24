import { history } from '@umijs/max';
import { useEffect } from 'react';

export function useBlocker(blocker: (tx) => void, when = true) {
  useEffect(() => {
    if (!when) return;
    // 如不需要刷新页面或关闭tab时取消浏览器询问弹窗，下面的绑定事件则不需要
    window.addEventListener('beforeunload', removeBeforeUnload);
    const unblock = history.block((tx) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };
      blocker(autoUnblockingTx);
    });
    // 由于无法直接 remove history 库中绑定的 beforeunload 事件，只能自己在绑定一个 beforeunload 事件（在原事件之前），触发时调用 unblock
    function removeBeforeUnload() {
      unblock();
    }
    return () => {
      unblock();
      window.removeEventListener('beforeunload', removeBeforeUnload);
    };
  }, [when]);
}
