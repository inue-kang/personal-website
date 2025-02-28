<script>
    import Header from "../Header.svelte";
    import { fade } from 'svelte/transition';
    import img_acclimate from "$lib/assets/acclimate.jpg"
    import img_pinscout from "$lib/assets/pinscout.C4CbqxjS.avif";
    import img_cmail from "$lib/assets/cmail.OhCrrboZ.avif"
    import img_papercut from "$lib/assets/papercut.BA6ec049.avif";
    import img_respir from "$lib/assets/respir.NzXN-C-F.avif";
    import img_sfd from "$lib/assets/sfd.png";
	import { goto } from "$app/navigation";

    let acclimate = false;
    let pinscout = false;
    let cmail = false;
    let papercut = false;
    let respir = false;
    let sfd = false;

</script>

<svelte:head>
	<title>projects</title>
	<meta name="description" content="my projects" />
</svelte:head>

<Header></Header>
<div class="content">
    <h1>My Projects</h1>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div class="projects">
        <div class="project" on:mouseenter={() => acclimate=true} on:mouseleave={() => acclimate=false} on:click={() => goto("/projects/acclimate")}>
            <h2>
                AccliMate
                {#if acclimate}
                    <b style="font-size: 2.8vh" in:fade={{ duration: 100 }} out:fade={{ duration: 100 }}>
                        ➔
                    </b>
                {/if}
            </h2>
            <p style="font-size:1.8vh">&lt;web app, hackathon&gt;</p>
            <p style="font-size: 1vw">The (mostly) all-in-one weather assistant</p>
            <img class="display" style="width: 80%;" src={img_acclimate} alt=""/>
        </div>
        <div class="project" on:mouseenter={() => pinscout=true} on:mouseleave={() => pinscout=false} on:click={() => goto("/projects/pinscout")}>
            <h2>
                pinScout
                {#if pinscout}
                    <b style="font-size: 2.8vh" in:fade={{ duration: 100 }} out:fade={{ duration: 100 }}>
                        ➔
                    </b>
                {/if}
            </h2>
            <p style="font-size:1.8vh">&lt;web app, hackathon&gt;</p>
            <p style="font-size: 1vw">a user-powered map to find hidden urban resources</p>
            <img class="display" src={img_pinscout} alt=""/>
        </div>
        <div class="project" on:mouseenter={() => cmail=true} on:mouseleave={() => cmail=false} on:click={() => goto("/projects/cmail")}>
            <h2>
                cmail
                {#if cmail}
                    <b style="font-size: 2.8vh" in:fade={{ duration: 100 }} out:fade={{ duration: 100 }}>
                        ➔
                    </b>
                {/if}
            </h2>
            <p style="font-size:1.8vh">&lt;web app, hackathon&gt;</p>
            <p style="font-size: 1vw">an interplanetary pseudo-messaging platform</p>
            <img class="display" src={img_cmail} alt=""/>
        </div>
        <div class="project" on:mouseenter={() => papercut=true} on:mouseleave={() => papercut=false} on:click={() => goto("/projects/papercut")}>
            <h2>papercut
                {#if papercut}
                    <b style="font-size: 2.8vh" in:fade={{ duration: 100 }} out:fade={{ duration: 100 }}>
                        ➔
                    </b>
                {/if}
            </h2>
            <p style="font-size:1.8vh">&lt;web app, hackathon&gt;</p>
            <p style="font-size: 1vw">an AI-powered academic search engine</p>
            <img class="display" src={img_papercut} alt=""/>
        </div>
        <div class="project" on:mouseenter={() => respir=true} on:mouseleave={() => respir=false} on:click={() => goto("/projects/respir")}>
            <h2>respir
                {#if respir}
                    <b style="font-size: 2.8vh" in:fade={{ duration: 100 }} out:fade={{ duration: 100 }}>
                        ➔
                    </b>
                {/if}
            </h2>
            <p style="font-size:1.8vh">&lt;web app, hackathon&gt;</p>
            <p style="font-size: 1vw">a breathing exercise assistant</p>
            <img class="display" src={img_respir} alt=""/>
        </div>
        <div class="project" on:mouseenter={() => sfd=true} on:mouseleave={() => sfd=false} on:click={() => goto("/projects/sfd")}>
            <h2>Shoreline Family Dentistry
                {#if sfd}
                    <b style="font-size: 3vh" in:fade={{ duration: 100 }} out:fade={{ duration: 100 }}>
                        ➔
                    </b>
                {/if}
            </h2>
            <p style="font-size:1.8vh">&lt;website, business&gt;</p>   
            <p style="font-size: 1vw">a business website</p>  
            <img class="display" src={img_sfd} alt=""/>       
        </div>
    </div>
</div>

<style>
    .content{
        display: flex;
		flex: 1;
		flex-direction: column;
        padding: 0vh 5vw;
    }

    .projects{
        display: grid;
        gap: 2% 1%;
        grid-template-columns: 49% 49%;
        height: 75vh;
        overflow: auto;
    }

    .project{
        padding: 2vh 2vw;
        background-color: rgba(255, 255, 255, 0.5);
        height: 64vh;
        border-radius: 1vh;
        box-sizing: border-box;
        border: 0vh orange solid; 
        transition: .2s
    }
    .project:hover{
        cursor:pointer;
        border: 1vh orange solid;
    }
    h1 {
        font-size: 3vw;
        
    }
    h2 {
        font-size: 1.6vw;
        margin-bottom: -1.5vh;
    }

    /* width */
    ::-webkit-scrollbar {
        width: .8vw;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: rgb(0,0,0,0);
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background-color: black;
        border-radius: 1vh;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background-color: orange;
    }

    .display {
        max-height: 40vh;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
</style>