<!-- 
~~~~~~~~~~~~
	COMPONENT JS (w/ TS)
~~~~~~~~~~~~
-->


<script lang="ts">
    import { onMount } from 'svelte';
	import Mobile_BetarenaWidget from './components/_MobileBetarenaWidget.svelte'
	import TabletPlus_BetarenaWidget from './components/_TabletPlusBetarenaWidget.svelte'

	// export let name: string;

    let viewportDesktop: boolean;

    onMount(async() => {
        var wInit = document.documentElement.clientWidth;
        if (wInit > 767) {
            viewportDesktop = true;
        } else {
            viewportDesktop = false;
        }
        window.addEventListener("resize", function() {
            var w = document.documentElement.clientWidth;
            if (w > 767) {
                viewportDesktop = true;
            } else {
                viewportDesktop = false;
            }
        });
    })
</script>


<!-- 
~~~~~~~~~~~~
	COMPONENT STYLE
~~~~~~~~~~~~
-->


<style>
	#mobile-version,
	#desktop-version {
		position: relative;
		height: 100%;
		width: 100%;
	}
	#inner-container {
		position: absolute;
		top: 0;
		bottom: 0;
		margin: auto;
		height: auto;
		width: auto;
		right: 0;
		left: 0;
	}
</style>


<!-- 
~~~~~~~~~~~~
	COMPONENT HTML
~~~~~~~~~~~~
-->


{#if !viewportDesktop}
    <div id='mobile-version'>
		<div id='inner-container'>
			<Mobile_BetarenaWidget />
		</div>
    </div>
{:else}
    <div id='desktop-version'>
		<div id='inner-container'>
			<TabletPlus_BetarenaWidget />
		</div>
    </div>
{/if}