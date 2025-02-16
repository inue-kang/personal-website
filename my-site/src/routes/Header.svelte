<script>
	import { goto } from "$app/navigation";

    // @ts-ignore
    function pageChange(url) {
        goto(url);
    }
</script>

<div class="header">
    <a on:click={(event) => pageChange("/")}>shibest</a>
    <div class="pages">
        <a on:click={(event) => pageChange("/")}>home</a>
        <a on:click={(event) => pageChange("/projects")}>projects</a>
        <a on:click={(event) => pageChange("/posts")}>posts</a>
        <a on:click={(event) => pageChange("/awards")}>awards</a>
        <a on:click={(event) => pageChange("/about")}>about</a>
    </div>
</div>


<style>
    .header {
        padding:2vh 4vw 0vh;
    }
    .pages {
        float: right;
    }
    a {
        text-decoration: none;
        color: black;
        font-size: 3vh;
        padding:0vh .5vw;
        transition: .2s;
    }
    a:hover {
        text-decoration: underline;
        font-weight: 700;
        color: orange;
        cursor:pointer;
    }
</style>
