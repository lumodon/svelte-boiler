<script>
  const optionalChaining = {
    value: [{
      deeplyNested: true,
    }, {
      deeplyNested: () => 4 + 3,
    }],
    destructureNullFails: null,
  };

  const chainMe = optionalChaining?.value?.[0]?.deeplyNested;
  const chainMeFunc = optionalChaining?.value?.[0]?.deeplyNested;
  console.log(chainMe, chainMeFunc);
  export let name;
</script>

<style type="text/scss">
  $color: red;
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: $color;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  div {
    background: green;

    > p {
      color: #fff;
    }
  }
</style>

<main>
  <h1>Hello {name}!</h1>
	<h1>Hello {console.log('hey') && name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
  <div>
    <p>SASS is working!</p>
  </div>
</main>
