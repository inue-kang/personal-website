<script>
    import Header from "../Header.svelte";
    import {ArrowSquareOut} from "phosphor-svelte";
</script>

<svelte:head>
	<title>about</title>
	<meta name="description" content="more about me" />
</svelte:head>

<Header></Header>
<div class="content">
    <h1>About Me</h1>
    <div class="about">
        <h2>Who am I?</h2>
        <div class="info">
            <p>My name is Inue and I am a student that goes by the alias of shibest online from the Pacific Northwest. When I'm not working on a a coding project, you'll find me making music, graphics, or videos.</p>
            <p>In my spare time, I enjoy playing table tennis, videogames, and hanging out with friends.</p>
        </div>
        <h2>Skills</h2>
        <div class="info">
            <p>Languages: JS / TS / HTML / CSS / Java / Python</p>
            <p>Apps: Adobe Photoshop / Adobe Illustrator / Adobe Premiere Pro / Figma / Canva / FL Studio</p>
        </div>
        <h2>Certificates</h2>
        <div class="info">
            <p><a target="_blank" href="https://coursera.org/share/c292cb95727ed0fc800873f70f5c58ce">Machine Learning (Specialization)<ArrowSquareOut/></a></p>
            <p><a target="_blank" href="https://coursera.org/share/a811c20dcd49b44140ac33d5629eeb38">Unsupervised Learning, Recommenders, Reinforcement Learning (Course)<ArrowSquareOut/></a></p>
            <p><a target="_blank" href="https://coursera.org/share/7ac5257c40bcb8d7c56d3a47f0a368dd">Advanced Learning Algorithms (Course)<ArrowSquareOut/></a></p>
            <p><a target="_blank" href="https://coursera.org/share/ba9fa1f18b4a620de4004387b8895a68">Supervised Machine Learning: Regression and Classification (Course)<ArrowSquareOut/></a></p>
        </div>
        <h2>Contact Me</h2>
        <div class="info">
            <p>Discord: @shibest</p>
            <p>Email: shibest.contact@gmail.com</p>
            <p>LinkedIn: <a target="_blank" href="https://www.linkedin.com/in/inue-kang/">My LinkedIn</a></p>
        </div>
        
    </div>
</div>


<style>
    .content{
        display: flex;
		flex: 1;
		flex-direction: column;
        padding: 0vh 6vw;
    }
    h1 {
        font-size: 3vw;
        
    }
    h2{
        font-size: 1.5vw;
    }
    p{
        font-size: 1vw;
    }
    .about {
        height: 75vh;
        overflow: auto;
    }
    .info {
        padding: 2vh 2vw;
        background-color: rgba(255,255,255,.5);
        border-radius: 2vw;
    }
    a {
        font-size: 1vw;
        color: black;
        text-decoration: none;
        transition: .2s;
    }
    a:hover{
        color: orange;
        text-decoration: underline;
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