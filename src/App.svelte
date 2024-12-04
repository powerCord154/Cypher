<script lang="ts">
    import { slide } from "svelte/transition";
    import Playground from "./lib/playground.svelte";

    let stage = $state<"welcome" | "algorithm" | "playground">("welcome");
    let algorithm = $state<Algorithm | "">("");

    type Algorithm =
        | "Base64"
        | "URL Encoding"
        | "SHA-256"
        | "MD5"
        | "Cesar Cipher";

    const algorithms: Map<
        Algorithm,
        {
            hasKey: boolean;
            hasEncode: boolean;
            hasDecode: boolean;
        }
    > = new Map([
        ["Base64", { hasKey: false, hasEncode: true, hasDecode: true }],
        ["URL Encoding", { hasKey: false, hasEncode: true, hasDecode: true }],
        ["SHA-256", { hasKey: false, hasEncode: true, hasDecode: false }],
        ["MD5", { hasKey: false, hasEncode: true, hasDecode: false }],
        ["Cesar Cipher", { hasKey: true, hasEncode: true, hasDecode: true }],
    ]);
</script>

<main
    class="flex flex-col items-center justify-center w-screen h-screen gap-8 *:flex *:flex-col *:items-center *:justify-center *:w-screen *:h-screen *:gap-8"
>
    {#if stage === "welcome"}
        <div transition:slide={{ duration: 1000 }}>
            <h1
                class="text-7xl font-semibold text-center starting:opacity-0 starting:scale-75 opacity-100 scale-100 transition-all duration-2500"
            >
                Cypher
            </h1>

            <md-filled-tonal-button
                onclick={() => (stage = "algorithm")}
                class="py-2 px-4 starting:opacity-0 starting:scale-75 opacity-100 scale-100 transition-all duration-2500 delay-700"
                trailing-icon
                >Choose an Algorithm <svg
                    slot="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e8eaed"
                    ><path
                        d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"
                    /></svg
                ></md-filled-tonal-button
            >
        </div>
    {:else if stage === "algorithm"}
        <div
            in:slide={{ duration: 1000, delay: 1200 }}
            out:slide={{ duration: 1000 }}
        >
            <md-list class="max-w-xs w-full rounded-xl">
                <md-list-item> Choose an Algorithm </md-list-item>
                <md-divider></md-divider>
                {#each algorithms.keys() as item}
                    <md-list-item
                        type="button"
                        onclick={() => {
                            algorithm = item;
                        }}
                    >
                        {item}
                    </md-list-item>
                {/each}
            </md-list>

            <md-filled-tonal-button
                onclick={() => (stage = "playground")}
                class="py-2 px-4 opacity-0 scale-75 transition-all duration-750"
                class:opacity-100={algorithm}
                class:scale-100={algorithm}
                trailing-icon
            >
                Let's Go <svg
                    slot="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e8eaed"
                    ><path
                        d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"
                    /></svg
                >
            </md-filled-tonal-button>
        </div>
    {:else if stage === "playground"}
        <Playground
            {algorithm}
            {algorithms}
            chooseAlgorithm={() => (stage = "algorithm")}
        ></Playground>
    {/if}
</main>
