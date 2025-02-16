<script>
// @ts-nocheck

    import { onMount } from 'svelte'
    import {beforeNavigate, goto} from '$app/navigation'

    import jump_anim1 from "$lib/assets/shibest_doggo0001.png"
    import jump_anim2 from "$lib/assets/shibest_doggo0002.png"
    import jump_anim3 from "$lib/assets/shibest_doggo0003.png"
    import jump_anim4 from "$lib/assets/shibest_doggo0004.png"
    import jump_anim5 from "$lib/assets/shibest_doggo0005.png"
    import jump_anim6 from "$lib/assets/shibest_doggo0006.png"
    import jump_anim7 from "$lib/assets/shibest_doggo0007.png"
    import jump_anim8 from "$lib/assets/shibest_doggo0008.png"
    import jump_anim9 from "$lib/assets/shibest_doggo0009.png"
    import jump_anim10 from "$lib/assets/shibest_doggo0010.png"
    import jump_anim11 from "$lib/assets/shibest_doggo0011.png"
    import jump_anim12 from "$lib/assets/shibest_doggo0012.png"
    import jump_anim13 from "$lib/assets/shibest_doggo0013.png"
    import jump_anim14 from "$lib/assets/shibest_doggo0014.png"
    import jump_anim15 from "$lib/assets/shibest_doggo0015.png"
    import jump_anim16 from "$lib/assets/shibest_doggo0016.png"
    import jump_anim17 from "$lib/assets/shibest_doggo0017.png"
    import jump_anim18 from "$lib/assets/shibest_doggo0018.png"
    import jump_anim19 from "$lib/assets/shibest_doggo0019.png"
    import jump_anim20 from "$lib/assets/shibest_doggo0020.png"
    import jump_anim21 from "$lib/assets/shibest_doggo0021.png"
    import jump_anim22 from "$lib/assets/shibest_doggo0022.png"
    import jump_anim23 from "$lib/assets/shibest_doggo0023.png"
    import jump_anim24 from "$lib/assets/shibest_doggo0024.png"
    import point_left2 from "$lib/assets/shibest_doggo0025.png"
    import point_left1 from "$lib/assets/shibest_doggo0026.png"
    import point_right1 from "$lib/assets/shibest_doggo0027.png"
    import point_right2 from "$lib/assets/shibest_doggo0028.png"

    /**
	 * @type {HTMLCanvasElement}
	 */
    let canvas;
    /**
	 * @type {CanvasRenderingContext2D | null}
	 */
    let context;
    
    let animation;
    let awards;
    let posts;
    let projects;
    let about;
    let container;

    let selected = false;

    let pointing = false;

    let jump_anim_cycle = [jump_anim1, jump_anim2, jump_anim3, jump_anim4, jump_anim5, jump_anim6, jump_anim7, jump_anim8, jump_anim9, jump_anim10, jump_anim11, jump_anim12, jump_anim13, jump_anim14, jump_anim15, jump_anim16, jump_anim17, jump_anim18, jump_anim19, jump_anim20, jump_anim21, jump_anim22, jump_anim23, jump_anim24]

    onMount(() => {

        //doobeedoo();

        let frame = 0;
        let gameFrame = 1;
        let stagger = 16;
        animation.src = jump_anim_cycle[frame]

        function animate() {
            if (!pointing) {
                if (gameFrame % stagger == 0) {
                    animation.src = jump_anim_cycle[frame]
                    gameFrame = 0;
                    stagger=2;
                    if (frame < jump_anim_cycle.length-1){
                        frame++;
                    } else{
                        gameFrame=0.5;
                    }
                }
                gameFrame++;
                requestAnimationFrame(animate);
            }
        }

        animate();
    });

    function pageChange(url) {
        let frame = 23;
        let gameFrame = 1;
        let stagger = 2;

        function animate() {
            animation.src = jump_anim_cycle[frame]
            if (gameFrame % stagger == 0) {
                 gameFrame = 0;
                if (frame == 6) {
                    goto(url);
                }
                if (frame > -1){
                    frame--;
                } else {
                    
                }
            }
            gameFrame++;
            requestAnimationFrame(animate);
        }

        animate();


    }

    function enter() {
        selected = true;
    }

    function leave() {
        selected = false;
    }
    

    function doobeedoo(){
        let goopy = "";
        for (let i = 1; i< 541; i++) {
            goopy += ".bubble:nth-child("+i+") {\ntop: "+((((i-1)%20)*10)-100)+"vh;\nleft: "+((Math.floor((i-1)/20)*10)-60)+"vh;\n}";
        }
        console.log(goopy)
    }
</script>

<svelte:head>
	<title>shibest</title>
	<meta name="description" content="my personal website" />
</svelte:head>

<!--<canvas id="animation_box" width="980" height="1080" bind:this={canvas}>
    
</canvas>-->

<div class="row">
    {#if selected}
        <div style="flex: 1%; background-color: orange; margin-left: 0.5vw; height:96vh;"></div>
    {:else}
        <div style="flex: 1%; background-color: black; margin-left: 0.5vw; height:96vh;"></div>
    {/if}
    <div style="flex: 25%;">
        <div class="buttons" bind:this={container}>
            <h1><b>shibest</b></h1>
            <a class="left2" href=""
            on:mouseenter={enter} 
            on:mouseleave={leave}
            on:click={(event) => pageChange("/projects")} bind:this={projects}>Projects</a>
            <a class="right1" href=""
            on:mouseenter={enter} 
            on:mouseleave={leave}
            on:click={(event) => pageChange("/posts")} bind:this={posts}>Posts</a>
            <a class="left1" href=""
            on:mouseenter={enter} 
            on:mouseleave={leave}
            on:click={(event) => pageChange("/awards")} bind:this={awards}>Awards</a>
            <a class="right2" href=""
            on:mouseenter={enter} 
            on:mouseleave={leave}
            on:click={(event) => pageChange("/about")} bind:this={about}>About</a>    
        </div>
        
    </div>
    <div style="flex: 75%">
        <img src={jump_anim1} alt="" bind:this={animation}/>
        <p style="position: absolute; top: 70vh; margin: 0vh 6vw; padding: 2vh 2vw; text-align: center; font-size: 1vw; background-color:rgba(255,255,255,.5); border-radius:1vw;">Hi! I am a student interested in all things computer-related, from web, software, and game development to video editing, graphics, and animation. I also dabble in cybersecurity and machine learning/AI.</p>
    </div>
</div>


<style>
    .row{
        display: flex;
    }
    .column1{
        flex: 25%;
    }
    .column2{
        flex:75%;
    }

    img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-top: -4vh;
        margin-bottom: auto;
        width: 38vw;
        transition: .2s;
        /*border: 1rem black dotted;*/
    }
    img:hover{
        /*width: 45%;*/
    }

    .buttons{
        position: absolute;
        display: inline;
        top: 8vh;
        left: 2vw;
        padding-left: 1vw;
    }

    .top {
        display: block;
        flex: 50%;
    }
    h1 {
        text-decoration: none;
        text-align: left;
        /*background-color: beige;*/
        padding: 1rem 1rem 0rem 1rem;
        /*border: .25rem black solid;*/
        /*border-radius: 4rem;*/
        display: block;
        font-size: 8vh;
        color: black;
    }

    a{  
        text-decoration: none;
        text-align: left;
        /*background-color: beige;*/
        padding: 1rem 1rem 0rem 1rem;
        /*border: .25rem black solid;*/
        /*border-radius: 4rem;*/
        display: block;
        font-size: 8vh;
        color: black;
        transition: .2s;
    }
    a:hover{
        /*border: .25rem orange solid;*/
        font-size: 14vh;
        color: orange;
    }
    .left2 {
        
    }/*
    .left1 {
        position:absolute;
        text-align: center;
        align-items: center;
        align-self: center;
        align-content: center;
        align-tracks: center;
        vertical-align: center;
        font-size: 2rem;
        margin-left: 32%;
        margin-top: 10%;
    }
    .right1 {
        position:absolute;
        text-align: center;
        align-items: center;
        align-self: center;
        align-content: center;
        align-tracks: center;
        vertical-align: center;
        font-size: 2rem;
        margin-left: 55%;
        margin-top: 10%;
    }
    .right2 {
        position:absolute;
        font-size: 2rem;
        text-decoration: none;
        margin-left: 10%;
        margin-right: 25%;
        margin-top: 15%;
    }*/
</style>
  