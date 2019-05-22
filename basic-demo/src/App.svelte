<script>

	import moment from 'moment';
	import { library } from "@fortawesome/fontawesome";
  import { faArrowAltCircleRight } from "@fortawesome/fontawesome-free-solid";

	library.add(faArrowAltCircleRight);

	export let name;
	let time = moment().format('LLLL');

	// just making sure this doesn't throw an error in the browser due to missing function
	// (this is to test that polyfills are properly included)
	let aa = Array.from('foo');

</script>

<style>
	h1 {
		color: rgb(24, 32, 107);
	}
	div.demo {
		color: #0c3912;
		margin: 20px;
		padding: 8px;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
	}
	div.demo-card {
		width: 30%;
	}
</style>

<div class="container-fluid demo">

	<p>This content is inside a div that is a bootstrap 4 fluid container, to demo use of bootstrap</p>

	<p>Demo use of variable (copied in from basic svelte getting started demo):
	<h1>Hello {name}!</h1>

	<p>Demo use of external javascript library (in this case, moment.js): {time}</p>

	<p>A list that uses fontawesome icons for bullets:</p>

	<ul class="fa-ul">
	<li><span class="fa-li" ><i class="fas fa-arrow-alt-circle-right"></i></span>Item 1</li>
	<li><span class="fa-li" ><i class="fas fa-arrow-alt-circle-right"></i></span>Item 2</li>
	</ul>

	<p>A bootstrap card:</p>

	<div class="card demo-card">
		<div class="card-header">Card Header</div>
		<div class="card-body">Card content</div>
		<div class="card-footer">Card Footer</div>
	</div>

</div>
