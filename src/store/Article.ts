function sleep(ms: number) {
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
  }

export class Article {
    public info: {
        title: string;
        excerpt: string;
        category: string;
    };
    public id: string;
    public content: string;

    public constructor(id: string) {
        this.id = id;
        this.info = {
            title: '',
            excerpt: '',
            category: '',
        };
    }

    public async fetchInfo() { // 获取文章信息，不含内容
        await sleep(200);
        this.info.title = '你好啊';
        this.info.excerpt = '测试内容';
        this.info.category = '不知道';
    }

    public async fetchContent() { // 获取文章内容
        await sleep(200);
        this.content = '#啦啦啦';
    }
}
