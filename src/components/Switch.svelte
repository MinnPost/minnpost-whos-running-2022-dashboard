<script>
	export let checked = false;
	export let id = "";
</script>

<style>  
	.a-switch {
		width: 40px;
		height: 24px;
		margin-right: 0.25em;
	}
	.slider {
		border-radius: 24px;
	}

	.slider:before {
		height: 16px;
		width: 16px;
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(16px);
		-ms-transform: translateX(16px);
		transform: translateX(16px);
	}
</style>

<label class="a-switch">
	<input type="checkbox" bind:checked id="{id}" />
	<span class="slider round" />
</label>
