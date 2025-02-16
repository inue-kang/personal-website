<script>
    import Header from "../../Header.svelte";
    import img_respir from "$lib/assets/respir.NzXN-C-F.avif";
    import {ArrowSquareOut} from "phosphor-svelte";
</script>

<Header></Header>
<div class="content">
    <h1>respir</h1>
    <p class="desc">a breathing exercise assistant</p>
    <div class="inline">
        <a class="redirect" target="_blank" href="https://respir.netlify.app/">site<ArrowSquareOut/></a>
        <a class="redirect" target="_blank" href="https://github.com/refact0r/respir">github<ArrowSquareOut/></a>
    </div>
    
    <div class="info">
        <p>respir is a web application designed to help people destress with breathing exercises and won 1st place overall
            at the 2024 IPC Winter Hackathon. Made by me, refact0r, and ben-6, it was built with the SvelteKit framework and 
            utilized browser storage to store user-made exercises. For more insight,
            check out refact0r's page here: <a target="_blank" href="https://refact0r.dev/projects/respir">refact0r.dev/projects/respir</a>.
        </p>
        <br>
        <p>Homepage</p>
        <img style="width: 100%;"src={img_respir} alt=""/>
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