<script>
    import { Medal } from "phosphor-svelte";
    import Header from "../Header.svelte";
	import { goto } from "$app/navigation";

    let d090824 = false;
    let d051824 = false;
    let d030324 = false;
    let d011724 = false;
    let d052023 = false;
    let d063022 = false;
    let d060722 = false;
    let d052922 = false;
    let d031922 = false;

    // @ts-ignore
    function swap(date) {
        d090824 = false;
        d051824 = false;
        d030324 = false;
        d011724 = false;
        d052023 = false;
        d063022 = false;
        d060722 = false;
        d052922 = false;
        d031922 = false;

        if (date == "090824") {
            d090824 = true;
        } else if (date == "051824") {
            d051824 = true;
        } else if (date == "030324") {
            d030324 = true;
        } else if (date == "011724") {
            d011724 = true;
        } else if (date == "052023") {
            d052023 = true;
        } else if (date == "063022") {
            d063022 = true;
        } else if (date == "060722") {
            d060722 = true;
        } else if (date == "052922") {
            d052922 = true;
        } else if (date == "031922") {
            d031922 = true;
        }
    }

</script>

<Header></Header>

<div class="content">
    <h1>My Achievements</h1>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <div class="awards">
        <div class="bar-content">
            <p class="award" on:click={()=> swap("090824")}>9/8/24 - 1st Place Group 3 EmP Hackfest SpaceHack</p>
            <hr>
            <p class="award" on:click={()=> swap("051824")}>5/18/24 - 1st Place Changbal Road to Tech 2024 Coding Contest</p>
            <hr>
            <p class="award" on:click={()=> swap("030324")}>3/3/24 - 2nd Place Design HackPNW Spring</p>
            <hr>
            <p class="award" on:click={()=> swap("011724")}>1/17/24 - 1st Place Overall IPC Winter Hackathon</p>
            <hr>
            <p class="award" on:click={()=> swap("052023")}>5/20/23 - 1st Place Changbal Road to Tech 2023 Coding Contest</p>
            <hr>
            <p class="award" on:click={()=> swap("063022")}>6/30/22 - 2nd Place Cybersecurity National TSA Conference</p>
            <hr>
            <p class="award" on:click={()=> swap("060722")}>6/7/22 - 19th Place BCACTF 3.0</p>
            <hr>
            <p class="award" on:click={()=> swap("052922")}>5/29/22 - 13th Place BYUCTF 2022</p>
            <hr>
            <p class="award" on:click={()=> swap("031922")}>3/19/22 - 2nd Place Cybersecurity Washington TSA Conference</p>
        </div>
        <div class="award-info">
            {#if d090824}
                <h2>2024 EMP Hackfest - SpaceHack</h2>
                <p>Local - In Person - Hackathon - Team Competition - 1st Place - Group 3</p>
                <p>Group Members: shibest / refact0r / static void / arrayman</p>
                <p>Link: <a target="_blank" href="https://emphackfest.org/september-2024-1">SpaceHack - 7th EmP Hackfest (Main Site)</a></p>
                <h3>Overview:</h3>
                <p>Objective: Create the most functional and aesthetically pleasing project that aligns with the theme.</p>
                <p>Theme: Develop a solution that assists in space exploration or technology.</p>
                <p>Our Project: <a target="_blank" href="https://devpost.com/software/cmail?ref_content=my-projects-tab&ref_feature=my_projects">cmail (Devpost Link)</a></p>
            {:else if d051824}
                <h2>Changbal Road to Tech 2024 - Coding Contest</h2>
                <p>Local - In Person - Coding Contest - Individual Competition - 1st Place - 12th Grade</p>
                <p>Link: <a target="_blank">Currently Unavailable</a></p>
                <h3>Overview:</h3>
                <p>Objective: Get the most points from solving coding problems.</p>
            {:else if d030324}
                <h2>HackPNW Spring 2024</h2>
                <p>State - In Person - Hackathon - Team Competition - 2nd Place - Design</p>
                <p>Group Members: shibest / refact0r / ben-6 / NicoNekoru</p>
                <p>Link: <a target="_blank" href="https://spring.2024.hackpnw.org/">HackPNW Spring 2024 (Main Site)</a></p>
                <h3>Overview:</h3>
                <p>Objective: Create the most functional and aesthetically pleasing project that aligns with the theme.</p>
                <p>Theme: Education</p>
                <p>Our Project: <a target="_blank" href="https://github.com/refact0r/papercut">papercut (Github Link)</a></p>
            {:else if d011724}
                <h2>Interlake Programming Club Winter Hackathon 2024</h2>
                <p>Local - In Person - Hackathon - Team Competition - 1nd Place - Overall</p>
                <p>Group Members: shibest / refact0r / ben-6</p>
                <p>Link: <a target="_blank" href="https://ihs-winter-hackathon.devpost.com/">IPC Winter Hackathon (Devpost Link)</a></p>
                <h3>Overview:</h3>
                <p>Objective: Create the most functional and aesthetically pleasing project that aligns with the theme.</p>
                <p>Theme: Develop a technology solution (app, website, or interactive simulation/game) that addresses a specific health issue.</p>
                <p>Our Project: <a target="_blank" href="https://devpost.com/software/respir">respir (Devpost Link)</a></p>
            {:else if d052023}
                <h2>Changbal Road to Tech 2023 - Coding Contest</h2>
                <p>Local - In Person - Coding Contest - Individual Competition - 1st Place - 11th Grade</p>
                <p>Link: <a target="_blank" href="https://www.changbal.org/post/%EC%8F%9F%EC%95%84%EC%A7%80%EB%8D%98-%ED%96%87%EC%82%B4%EC%B2%98%EB%9F%BC-%EB%9C%A8%EA%B1%B0%EC%9B%A0%EB%8D%98-%EC%B2%AB%EB%B2%88%EC%A7%B8-%EC%B0%BD%EB%B0%9C-road-to-tech%ED%96%89%EC%82%AC">Changbal Road to Tech 2023 (Main Site)</a></p>
                <h3>Overview:</h3>
                <p>Objective: Get the most points from solving coding problems.</p>
            {:else if d063022}
                <h2>2022 National Technology Student Association Cybersecurity Conference</h2>
                <p>National - In Person - Capture The Flag - Team Competition - 2nd Place - Overall</p>
                <p>Link: <a target="_blank" href="https://tsamembership.registermychapter.com/finalplacement/ntc2022#">2022 National TSA Conference Results (Main Site)</a></p>
                <h3>Overview:</h3>
                <p>Objective: Score the most points from solving different sets of cybersecurity problems.</p>
            {:else if d060722}
                <h2>BCACTF 3.0 2022</h2>
                <p>National - Online - Capture The Flag - Team Competition - 19th Place - Overall</p>
                <p>Link: <a target="_blank" href="https://ctftime.org/event/1602">BCACTF 3.0 Results (CTFtime Link)</a></p>
                <h3>Overview:</h3>
                <p>Objective: Score the most points from solving different sets of cybersecurity problems.</p>
            {:else if d052922}
                <h2>BYUCTF 2022</h2>
                <p>National - Online - Capture The Flag - Team Competition - 13th Place - Overall</p>
                <p>Link: <a target="_blank" href="https://ctftime.org/event/1660">BYUCTF 2022 Results (CTFtime Link)</a></p>
                <h3>Overview:</h3>
                <p>Objective: Score the most points from solving different sets of cybersecurity problems.</p>
            {:else if d031922}
                <h2>2022 Washington State Technology Student Association Cybersecurity Conference</h2>
                <p>State - In Person - Capture The Flag - Team Competition - 2nd Place - Overall</p>
                <p>Link: <a target="_blank">Currently Unavailable</a></p>
                <h3>Overview:</h3>
                <p>Objective: Score the most points from solving different sets of cybersecurity problems.</p>
            {/if}
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
    h2 {
        font-size: 1.6vw;
    }
    h3 {
        font-size: 1.4vw;
    }
    p {
        font-size: 1vw;
    }
    .awards{
        height: 75vh;
        display: flex;
        gap: 2%;
    }
    .award {
        font-size: 1vw;
        direction: ltr;
        padding: .5vh 0vw;
        color: black;
        transition: .2s;
        text-decoration: none;
    }
    .award:hover {
        color: orange;
        cursor: pointer;
        text-decoration: underline;
    }
    .bar-content{
        flex: 33%;
        overflow-y: scroll;
        background-color: rgba(255,255,255,.5);
        padding: 2vh 2vw;
        direction: rtl;
        border-radius: 0vw 1vw 1vw 0vw;
    }
    .award-info{
        flex:65%;
        background-color: rgba(255,255,255,.5);
        padding: 2vh 2vw;
        border-radius: 1vw;

    }
    /* width */
    ::-webkit-scrollbar {
        width: .8vw;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: rgb(0,0,0);
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background-color: rgb(255, 199, 94);
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background-color: orange;
    }

    hr{
        border: .2vh solid black;
    }

</style>