import Router from 'koa-router';
import convert from 'koa-convert';
import KoaBody from 'koa-body';

import Get from './get';
import GetAll from './get.all';
import Add from './add';
import Update from './update';

const router = new Router(),
  koaBody = convert(KoaBody());

router
  .get('/', GetAll)
  .get('/:id', Get)
  .post('/', koaBody, Add)
  .put('/:id', koaBody, Update);

export default router;