<script>
    import Header from "../../Header.svelte";
    import img_papercut from "$lib/assets/papercut.BA6ec049.avif";
    import {ArrowSquareOut} from "phosphor-svelte";
</script>

<Header></Header>
<div class="content">
    <h1>papercut</h1>
    <p class="desc">an AI-powered academic search engine</p>
    <div class="inline">
        <a class="redirect" target="_blank" href="https://papercut-nu.netlify.app/">site<ArrowSquareOut/></a>
        <a class="redirect" target="_blank" href="https://github.com/refact0r/papercut">github<ArrowSquareOut/></a>
    </div>
    
    <div class="info">
        <p>papercut is an AI-powered academic search engine designed to help scholars find research papers quickly
            and effectively. It was created by me, refact0r, ben-6, and NicoNekoru and won 2nd place for design at the 2024 HackPNW Spring. 
            It was built with the Svelte framework and utilized ChatGPT to handle search prompts. For more insight,
            check out refact0r's page here: <a target="_blank" href="https://refact0r.dev/projects/papercut">refact0r.dev/projects/papercut</a>.
        </p>
        <br>
        <p>Homepage</p>
        <img style="width: 100%;"src={img_papercut} alt=""/>
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