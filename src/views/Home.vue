<template>
    <FakeTerminal :contentStrings="terminalContent" :msPerLetter="100"></FakeTerminal>
</template>

<script lang="ts">
import FakeTerminal from '@/components/FakeTerminal.vue';
import {Vue, Component} from 'vue-property-decorator';

@Component({
    components: {
        FakeTerminal,
    },
})
export default class Home extends Vue {
    private terminalContent: string[] = [];

    private created() {
        const Chinese = '你好;欢迎访问simplelife的个人网站;我会在这里分享一些最近的思考和见闻'.split(';');
        this.terminalContent = this.terminalContent.concat(Chinese);
        const English = 'Hello!;Welcome to simplelife\'s personal website.;Here, I share some of my recent thoughts and experiences.'.split(';');
        this.terminalContent = this.terminalContent.concat(English);
    }
}
</script>
