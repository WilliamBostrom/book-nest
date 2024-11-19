<script lang="ts">
  import { Header } from '$components';
  import { invalidate } from '$app/navigation';
  import "../app.css";

  let {children, data} = $props();
  let {session, supabase, user } = $derived(data);

	$effect(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});


</script>
<Header/>
{@render children()}