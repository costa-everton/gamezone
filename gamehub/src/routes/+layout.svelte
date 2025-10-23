<script>
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import CookieBanner from '$lib/components/CookieBanner.svelte';
  import DonationButton from '$lib/components/DonationButton.svelte';
  import { onMount } from 'svelte';
  
  onMount(() => {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  });
</script>

<div class="min-h-screen bg-bg-primary text-text-primary">
  <Header />
  
  <main class="pt-16">
    <slot />
  </main>
  
  <Footer />
  
  <!-- Cookie Banner -->
  <CookieBanner />
  
  <!-- Donation Button - Fixed Position -->
  <div class="fixed right-4 z-[60]" style="top: 0.7rem;">
    <DonationButton />
  </div>
</div>

<!-- Background Effects -->
<div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
  <!-- Animated background elements -->
  <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-blue/5 rounded-full blur-3xl animate-pulse"></div>
  <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-aqua/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent-blue/10 rounded-full blur-2xl animate-pulse delay-500"></div>
</div>