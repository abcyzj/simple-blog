<template>
    <transition name="top-btn-fade">
        <div class="top-btn" v-show="visible" @click="scrollToTop">
            ↑
        </div>
    </transition>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class TopButton extends Vue {
    @Prop(Number) private visibleOffset: number;
    private visible: boolean = false;

    private mounted() {
        window.addEventListener('scroll', this.onScroll);
    }

    private destroyed() {
        window.removeEventListener('scroll', this.onScroll);
    }

    private onScroll() {
        this.visible = (window.pageYOffset > this.visibleOffset);
    }

    private scrollToTop() {
        let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(this.scrollToTop);
            window.scrollTo(0, Math.floor(currentScroll - (currentScroll / 5)));
        }
    }
}
</script>

<style>
.top-btn-fade-enter-active,
.top-btn-fade-leave-active {
    transition: opacity .7s;
}
.top-btn-fade-enter,
.top-btn-fade-leave {
    opacity: 0;
}

.top-btn {
    position: fixed;
    z-index: 100;
    cursor: pointer;
    right: 3.5rem;
    color: #dc3958;
    border: 2px solid rgba(220,57,88,.15);
    width: 30px;
    font-weight: 700;
    bottom: 3rem;
    border-radius: 6px;
    padding: .3rem .75rem;
    font-size: 1.4rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 40px;
}
.top-btn:hover {
    transform: scale(1.1);
    transition: all 0.2s;
}
</style>
