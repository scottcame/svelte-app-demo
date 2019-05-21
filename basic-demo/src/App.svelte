<script>
	import moment from 'moment';
	import { library } from "@fortawesome/fontawesome";
  import { faSearch, faTimes } from "@fortawesome/fontawesome-free-solid";
	library.add(faSearch, faTimes);
	export let name;
	let v = 5;
	let time = moment().format('LLLL');
	//let time = 'foo';
	let aa = Array.from('foo');
	let aal = aa.length;
</script>

<style>
	h1 {
		color: rgb(24, 32, 107);
	}
</style>

<div class="container">
<h1>Hello {name}!</h1>
<p>{v}</p>
<p>The time is now: {time}</p>
</div>

<i class="fas fa-times"></i>boo
<i class="fas fa-search"></i>bop

<p>The array length is {aal}</p>
