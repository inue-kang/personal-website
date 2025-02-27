<script>
    import Header from "../../Header.svelte";
    import img_pinscout from "$lib/assets/pinscout.C4CbqxjS.avif";
    import {ArrowSquareOut} from "phosphor-svelte";
</script>

<svelte:head>
	<title>projects/pinscout</title>
	<meta name="description" content="my projects: pinscout" />
</svelte:head>

<Header></Header>
<div class="content">
    <h1>pinScout</h1>
    <p class="desc">a user-powered map to find hidden urban resources</p>
    <div class="inline">
        <a class="redirect" target="_blank" href="https://pinscout.vercel.app/">site<ArrowSquareOut/></a>
        <a class="redirect" target="_blank" href="https://github.com/refact0r/pinscout">github<ArrowSquareOut/></a>
    </div>
    
    <div class="info">
        <p>pinScout is a web app that provides a space for users to contribute to crowdsource data on urban resources that most people
            might find helpful or not know much about. It was created by me, refact0r, raymon-zhang and won third place in our group at the 2025 EmP Hackfest - AccessHack. 
            It was built with the SvelteKit framework, and utilized Mapbox for the map API and Supabase for storing user and location information. For more insight,
            check out refact0r's page here: <a target="_blank" href="https://refact0r.dev/projects/pinscout">refact0r.dev/projects/pinscout</a>.
        </p>
        <br>
        <p>Homepage</p>
        <img style="width: 100%;"src={img_pinscout} alt=""/>
    </div>
</div>


<style>
    .content{
        display: flex;
		flex: 1;
		flex-direction: column;
        padding: 0vh 5vw;
    }
    .desc {
        margin-top: -3vh;
    }
    h1 {
        font-size: 3vw;
        
    }
    .redirect {
        background-color: rgb(255, 200, 97);
        text-decoration: none;
        color: black;
        padding: 1vh 1vw;
        border-radius: 1vw;
        transition: .2s;
    }
    .redirect:hover{
        background-color: orange;
        text-decoration: underline;
    }

    .info{
        margin-top: 4vh;
        padding: 2vh 2vw;
        border-radius: 1vw;
        background-color: rgba(255,255,255,.5);
        overflow: auto;
        height: 60vh;
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
</style>