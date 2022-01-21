<script type="text/javascript">
	// router
	import router from "page";
	
	// all pages
	import Data from "./components/Data.svelte";

	// current template
    let template;

	// current page
	let page;

	// url parameters
	let params;

	// template router
	router('/', () => template = Data)
	router('/by-office', () => template = Data)
	router('/by-office/:office', (context, next) => {
  		params = context.params
  		next()}, () => template = Data)
	router.start();
	router('/by-party', () => template = Data)
	router('/by-party/:party', (context, next) => {
  		params = context.params
  		next()}, () => template = Data)
	router.start();

</script>

<svelte:component this={template} params="{params}" />
