<script>
    import Header from "../Header.svelte";
</script>

<Header></Header>
<div class="content">
    <h1>My Posts</h1>
    <div class="posts">
        <div class="post">
            <p>No posts currently.</p>
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
    p {
        font-size: 1vw;
        
    }
    .posts{
        height: 75vh;
    }
    .post{
        background-color: rgba(255,255,255,.5);
        border-radius: 2vw;
        padding: 2vh 2vw;
    }
</style>