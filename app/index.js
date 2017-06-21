/**
 * Created by shaolong on 2017/6/14.
 */
const Koa = require('koa');
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

router.get('/dota2', async (ctx, next) => {
		let data = await readFromFile();
		ctx.type = 'application/json';
		ctx.body = JSON.stringify({status: 'success', data: data.toString()})
	}
)

router.get('/dota2/news_detail', async (ctx, next) => {
	let news_id = ctx.request.query.news_id;

	if(Number.isNaN(parseInt(news_id))) {
		handleError(ctx)
	}else {

		news_id = parseInt(news_id)
	}
	let data = await readFromFile();
	data = data ? JSON.parse(data) : handleError(ctx);
	let news = data.news;

	const send = (ns) => {
		ns = JSON.stringify(ns);
		ctx.type = 'application/json';
		ctx.body = JSON.stringify({status: 'success', detail: ns})
	}

	news.forEach((ns) => {
		if (ns.id === news_id) {
			send(ns);
			return;
		}
	});

})

const handleError = (ctx) => {
	console.log('handleError');
	ctx.body = {status: 'fail', data: '请传新闻id'};
	return;
}

app.use(router.routes())
	.use(router.allowedMethods());

app.listen(4000, () => {
	console.log('启动成功，监听4000端口');
})