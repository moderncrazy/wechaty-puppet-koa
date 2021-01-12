/**
 * Create by geekeryoung on 2020/3/30
 *
 * main router
 */

import Router from '@koa/router';

import rootRouter from './rootRouter';
import roomRouter from './roomRouter';
import messageRouter from './messageRouter';
import contactRouter from './contactRouter';
import friendshipRouter from './friendshipRouter';

/**
 * register router
 */
export default async (app, puppet) => {

  const router = new Router({prefix: puppet.prefix});

  // root router
  await rootRouter(router, puppet);

  // room router
  await roomRouter(router, puppet);

  // contact router
  await contactRouter(router, puppet);

  // message router
  await messageRouter(router, puppet);

  // friendship router
  await friendshipRouter(router, puppet);

  // register router
  app.use(router.routes());
  app.use(router.allowedMethods());
};
