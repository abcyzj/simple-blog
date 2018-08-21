<template>
    <div v-html="renderedHTMLString" class="content-wrapper"></div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import MarkdownIt from 'markdown-it';
const Emoji = require('markdown-it-emoji');
const Katex = require('markdown-it-katex');
const Highlight = require('highlight.js');
import '@/assets/AndroidStudio.css';
import axios from 'axios';

interface Article {
  title: string;
  content: string;
}

@Component
export default class ArticleViewer extends Vue {
    @Prop(String) private id: string;

    private renderedHTMLString: string = '';

    private async created() {
        let md = new MarkdownIt({
            typographer: true,
            highlight: (str, lang) => {
                if (lang && Highlight.getLanguage(lang)) {
                    try {
                        return Highlight.highlight(lang, str).value;
                    } catch (__) {
                        return '';
                    }
                }
                return '';
            },
        });
        md.use(Emoji);
        md.use(Katex);

        const article = await this.getArticle();
        document.title = `Simple Blog - ${article.title}`;
        this.renderedHTMLString = md.render(article.content);
    }

    private async getArticle(): Promise<Article> {
      const res = await axios.get(`/api/article/${this.id}`);
      if (res.status === 200) {
        return {
          title: res.data.title,
          content: res.data.content,
        };
      } else {
        return {
          title: '网络错误',
          content: '# 请重试',
        };
      }
    }
}
</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css";

.content-wrapper {
  font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
}

.content-wrapper p,
 {
  font-size: 1rem;
  margin-bottom: 1.3rem;
}

.content-wrapper hr {
 border: 0;
 height: 0;
 border-top: 1px solid rgba(0, 0, 0, 0.1);
 border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.content-wrapper h1,
.content-wrapper h2,
.content-wrapper h3,
.content-wrapper h4,
.content-wrapper .splendor-h4 {
  margin: 1.414rem 0 .5rem;
  font-weight: inherit;
  line-height: 1.42;
}

.content-wrapper h1,
.content-wrapper .splendor-h1 {
  margin-top: 0;
  font-size: 3.998rem;
}

.content-wrapper h2,
.content-wrapper .splendor-h2 {
  font-size: 2.827rem;
}

.content-wrapper h3,
.content-wrapper .splendor-h3 {
  font-size: 1.999rem;
}

.content-wrapper h4,
.content-wrapper .splendor-h4 {
  font-size: 1.414rem;
}

.content-wrapper h5,
.splendor-h5 {
  font-size: 1.121rem;
}

.content-wrapper h6,
.splendor-h6 {
  font-size: .88rem;
}

.content-wrapper small,
.content-wrapper .splendor-small {
  font-size: .707em;
}

/* https://github.com/mrmrs/fluidity */

.content-wrapper img,
.content-wrapper canvas,
.content-wrapper iframe,
.content-wrapper video,
.content-wrapper svg,
.content-wrapper select,
.content-wrapper textarea {
  max-width: 100%;
}

@import url(http://fonts.googleapis.com/css?family=Merriweather:300italic,300);

/* .content-wrapper * {
  color: #444;
  font-family: 'Merriweather', Georgia, serif;
  margin: 0;
  max-width: 100%;
} */

/* === A bit of a gross hack so we can have bleeding divs/blockquotes. */

.content-wrapper p,
.content-wrapper *:not(div):not(img):not(body):not(html):not(li):not(blockquote):not(p):not(.katex):not(.reset-textstyle.textstyle) {
  margin: 1rem auto 1rem;
  max-width: 36rem;
  padding: .25rem;
}

.content-wrapper div {
  width: 100%;
}

.content-wrapper div img {
  width: 100%;
}

.content-wrapper blockquote p {
  font-size: 1.5rem;
  font-style: italic;
  margin: 1rem auto 1rem;
  max-width: 48rem;
}

.content-wrapper li {
  margin-left: 2rem;
}

/* Counteract the specificity of the gross *:not() chain. */

.content-wrapper h1 {
  padding: 4rem 0 !important;
}

/*  === End gross hack */

.content-wrapper p {
  color: #555;
  height: auto;
  line-height: 1.45;
}

.content-wrapper pre,
.content-wrapper code {
  font-family: Menlo, Monaco, "Courier New", monospace;
  font-size: 1.1rem;
}

.content-wrapper pre {
  font-size: .8rem;
  padding: 1.125em;
  background: #fcfcfc;
  box-shadow: 0px 0px 15px rgba(0,0,0,0.08),0px 0px 4px rgba(0,0,0,0.05);
}

.content-wrapper a,
.content-wrapper a:visited {
  color: #3498db;
}

.content-wrapper table {
  display: block;
  border-spacing: 0;
  border-collapse: collapse;
}
.content-wrapper table th,
.content-wrapper table td {
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
}

.content-wrapper a:hover,
.content-wrapper a:focus,
.content-wrapper a:active {
  color: #2980b9;
}
.content-wrapper {
  max-width: 70%;
  margin: 0 auto;
}
</style>
