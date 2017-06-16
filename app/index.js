/**
 * Created by shaolong on 2017/6/14.
 */
const Koa = require('koa');
const serve = require('koa-static');
const path = require('path');
const Router = require('koa-router');
const fs = require('fs');


const app = new Koa();
const router = new Router();

const filePath = path.join(__dirname, '../mock/mock.json');

let readFromFile = () => {  //读文件函数
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, (err, data) => {
			if (err) {
				reject(err)
			}
			setTimeout(function () {
				resolve(data)
			}, 400)
		})
	})
}


router.get('/mock', async (ctx, next) => {
		let data = await readFromFile();
		ctx.body = JSON.stringify({status: 'success', data: data.toString()})
	}
)

app.use(router.routes())
	.use(router.allowedMethods());

app.listen(4000, () => {
	console.log('启动成功，监听4000端口');
})