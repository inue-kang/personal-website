<script>
    import Header from "../../Header.svelte";
    import img_sfd from "$lib/assets/sfd.png";
    import {ArrowSquareOut} from "phosphor-svelte";
</script>

<svelte:head>
	<title>projects/sfd</title>
	<meta name="description" content="my project: shoreline family dentistry website" />
</svelte:head>

<Header></Header>
<div class="content">
    <h1>Shoreline Family Dentistry Website</h1>
    <p class="desc">a business website</p>
    <div class="inline">
        <a class="redirect" target="_blank" href="https://shorelinefamilydentistry.com/">site<ArrowSquareOut/></a>
    </div>
    
    <div class="info">
        <p>This website for Shoreline Family Dentistry was designed to be a revamped version of the old website. My primary goal was 
            to make the website look modern and fresh, similar to websites of today as the previous website was a very simple site made 
            with Google Sites. Taking inspiration from other business websites, I used the SvelteKit framework and spent a lot of time 
            adjusting CSS code to get relatively decent styling. I also added an additional functionality where patients could send an 
            email request. Overall, it was a great learning experience and helped me get better at developing sites.
        </p>
        <br>
        <p>Homepage</p>
        <img style="width: 100%;"src={img_sfd} alt=""/>
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