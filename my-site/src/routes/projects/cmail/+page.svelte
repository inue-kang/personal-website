<script>
    import Header from "../../Header.svelte";
    import {ArrowSquareOut} from "phosphor-svelte";
    import img_cmail from "$lib/assets/cmail.OhCrrboZ.avif"
</script>

<Header></Header>
<div class="content">
    <h1>cmail</h1>
    <p class="desc">an interplanetary pseudo-messaging platform</p>
    <div class="inline">
        <a class="redirect" target="_blank" href="https://cmail.vercel.app">site<ArrowSquareOut/></a>
        <a class="redirect" target="_blank" href="https://github.com/refact0r/cmail">github<ArrowSquareOut/></a>
    </div>
    
    <div class="info">
        <p>cmail is an interplanetary pseudo-messaging platform on the web created by me, refact0r, ben-6, and raymon-zhang.
            This project was submitted for the 2024 EmP Hackfest - SpaceHack and won first place in our group. It was built with 
            the SvelteKit framework and utilized Supabase to handle message contents. For more insight,
            check out refact0r's page here: <a target="_blank" href="https://refact0r.dev/projects/cmail">refact0r.dev/projects/cmail</a>.
        </p>
        <br>
        <p>Homepage</p>
        <img style="width:100%;" src={img_cmail} alt=""/>
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
