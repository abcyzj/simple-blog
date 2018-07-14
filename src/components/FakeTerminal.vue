<template>
    <div class="terminal">
        <p class="terminal-title">{{ terminalTitle }}</p>
        <div v-for="line in terminalLines" :class="{'terminal-line': true, 'terminal-line-active': line.active}">
            {{ line.content }}
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Prop, Component} from 'vue-property-decorator';
import { setInterval, clearInterval, setTimeout } from 'timers';
import { currentId } from 'async_hooks';

@Component
export default class FakeTerminal extends Vue {
    @Prop({type: [String], default: []}) private contentStrings: string[];
    @Prop(Number) private msPerLetter: number;

    private curLineInd: number = 0;
    private curLetterInd: number = -1;
    private terminalTitle: string = 'simplelife@simplelife-pc';
    private terminalLines: Array<{content: string, active: boolean}> = [];
    private inputTimer: NodeJS.Timer;

    private async created() {
        for (const line of this.contentStrings) {
            this.terminalLines.push({content: '', active: true});
            for (let i = 0; i < line.length + 1; i++) {
                this.terminalLines[this.terminalLines.length - 1].content = line.substr(0, i);
                await this.sleep(this.msPerLetter);
            }
            this.terminalLines[this.terminalLines.length - 1].active = false;
        }
        this.terminalLines[this.terminalLines.length - 1].active = true;
    }

    private sleep(ms: number) {
        return new Promise((resolve, reject) => setTimeout(resolve, ms));
    }
}
</script>

<style scoped>
.terminal {
    border-radius: 10px;
    background-color: black;
    width: 50%;
    height: 30em;
    margin-left: 25%;
    margin-top: 2em;
    box-shadow: 0 0 30px rgba(0,0,0,0.4);
}
.terminal-title {
    text-align: center;
    color: #525252;
    background: linear-gradient(to bottom,  #f7f7f7 0%,#B8B8B8 100%);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
.terminal-line {
    color: #00fd55;
    font-family: 'Helvetica Neue';
    font-size: 26px;
    letter-spacing: 2px;
    text-align: left;
}
.terminal-line-active::after {
    content: "";
    vertical-align: bottom;
    animation: cursor-flash 1s infinite;
    background-color: #00fd55;
    width: 0.5em;
    height: 1.5em;
    display: inline-block;
    margin-left: 5px;
}
.terminal-line::before {
    content: "$";
    margin-right: 10px;
}
@keyframes cursor-flash {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
