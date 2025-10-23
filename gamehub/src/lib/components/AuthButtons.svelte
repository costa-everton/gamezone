<script>
  export let isMobile = false;
  
  function handleLoginClick() {
    console.log('Login clicked - redirecting to /login');
    window.location.href = '/login';
  }
  
  function handleRegisterClick() {
    console.log('Register clicked - redirecting to /cadastro');
    window.location.href = '/cadastro';
  }
</script>

{#if isMobile}
  <!-- Mobile Layout -->
  <div class="space-y-2">
    <button 
      on:click={handleLoginClick}
      class="block w-full border-2 border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-white transition-all duration-300 font-medium py-3 rounded-lg cursor-pointer text-center"
    >
      Entrar
    </button>

    <button 
      on:click={handleRegisterClick}
      class="block w-full bg-accent-blue hover:bg-accent-blue/90 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-300 text-center border-none cursor-pointer"
    >
      Cadastrar
    </button>
    
  </div>
{:else}
  <!-- Desktop Layout -->
  <div class="flex items-center space-x-4">
    <button 
      on:click={handleLoginClick}
      class="border-2 border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-white transition-all duration-300 font-medium px-6 py-2 rounded-lg cursor-pointer"
    >
      Entrar
    </button>
    <button 
      on:click={handleRegisterClick}
      class="bg-accent-blue hover:bg-accent-blue/90 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300 border-none cursor-pointer"
    >
      Cadastrar
    </button>
  </div>
{/if}
