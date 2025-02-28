<script>
    import Header from "../../Header.svelte";
    import img_acclimate from "$lib/assets/acclimate.jpg";
    import {ArrowSquareOut} from "phosphor-svelte";
</script>

<svelte:head>
	<title>projects/acclimate</title>
	<meta name="description" content="my projects: acclimate" />
</svelte:head>

<Header></Header>
<div class="content">
    <h1>AccliMate</h1>
    <p class="desc">The (mostly) all-in-one weather assistant</p>
    <div class="inline">
        <a class="redirect" target="_blank" href="https://acclimate.vercel.app/">site<ArrowSquareOut/></a>
        <a class="redirect" target="_blank" href="https://github.com/shibest/ipc-hackathon-2025">github<ArrowSquareOut/></a>
    </div>
    
    <div class="info">
        <p>AccliMate is an (almost) all-in-one weather assistant. Alongside a sleek UI to see the current weather, 
            future weather, and any weather advisories/alerts, we created a trip planner service that briefs you on potential 
            weather conditions you might expect along a road trip. We also integrated an AI assistant that suggests weather-appropriate 
            activities, gives tips on how to stay safe and prepared during inclement weather, and can answer any weather-related questions 
            in your area. For more insight,
            check out our devpost page here: <a target="_blank" href="https://devpost.com/software/acclimate-26zdjt">Devpost - Acclimate</a>.
        </p>
        <br>
        <p>Homepage</p>
        <img style="width: 100%;"src={img_acclimate} alt=""/>
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