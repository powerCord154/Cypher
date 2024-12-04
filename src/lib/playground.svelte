<script lang="ts">
    import { slide } from "svelte/transition";
    import * as cryptography from "./cryptography/";

    let {
        algorithms,
        algorithm,
        chooseAlgorithm,
    }: {
        algorithms: Map<
            Algorithm,
            {
                hasKey: boolean;
                hasEncode: boolean;
                hasDecode: boolean;
            }
        >;
        algorithm: Algorithm;
        chooseAlgorithm: () => void;
    } = $props();

    let key = $state("");
    let encoded = $state("");
    let decoded = $state("");

    let lock = $state<"encode" | "decode">("encode");

    // NOTE: Reactivity is manual due to MD3 web using web components, not svelte components
    $effect(() => {
        if (algorithms.get(algorithm)?.hasKey) {
            document.getElementById("key").value = key;
        }
    });

    $effect(() => {
        if (algorithms.get(algorithm)?.hasEncode) {
            document.getElementById("encode").value = encoded;
        }
    });

    $effect(() => {
        if (algorithms.get(algorithm)?.hasDecode) {
            document.getElementById("decode").value = decoded;
        }

        if (
            (algorithms.get(algorithm)?.hasDecode &&
                !algorithms.get(algorithm)?.hasEncode) ||
            (!algorithms.get(algorithm)?.hasDecode &&
                algorithms.get(algorithm)?.hasEncode)
        ) {
            document.getElementById("output").value = decoded;
        }
    });

    $effect(() => {
        if (lock != "encode") {
            cryptography.decode(decoded, key, algorithm).then((result) => {
                encoded = result;
            });
        }
    });

    $effect(() => {
        if (lock != "decode") {
            cryptography.encode(encoded, key, algorithm).then((result) => {
                decoded = result;
            });
        }
    });
</script>

<div in:slide={{ duration: 1000, delay: 1200 }} out:slide={{ duration: 1000 }}>
    <h1 class="text-7xl font-semibold text-center">
        {algorithm}
    </h1>

    <div class="flex flex-col gap-8">
        {#if algorithms.get(algorithm)?.hasKey}
            <md-filled-text-field
                label="Key"
                required
                oninput={(e) => (key = e.target.value)}
                id="key"
            >
                ></md-filled-text-field
            >
        {/if}

        <div class="flex flex-row gap-8 w-2xl h-64">
            {#if algorithms.get(algorithm)?.hasEncode}
                <md-filled-text-field
                    label="Encode"
                    type="textarea"
                    class="w-full flex-1"
                    required
                    oninput={(e) => {
                        lock = "encode";
                        encoded = e.target.value;
                    }}
                    id="encode"
                >
                    ></md-filled-text-field
                >
            {/if}

            {#if algorithms.get(algorithm)?.hasDecode}
                <md-filled-text-field
                    type="textarea"
                    class="w-full flex-1"
                    label="Decode"
                    required
                    oninput={(e) => {
                        lock = "decode";
                        decoded = e.target.value;
                    }}
                    id="decode"
                >
                    ></md-filled-text-field
                >
            {/if}

            {#if (algorithms.get(algorithm)?.hasDecode && !algorithms.get(algorithm)?.hasEncode) || (!algorithms.get(algorithm)?.hasDecode && algorithms.get(algorithm)?.hasEncode)}
                <md-filled-text-field
                    type="textarea"
                    class="w-full flex-1"
                    label="Output"
                    readonly
                    id="output"
                ></md-filled-text-field>
            {/if}
        </div>

        <md-filled-tonal-button
            trailing-icon
            class="px-4 w-max mx-auto"
            onclick={() => {
                chooseAlgorithm();
            }}
        >
            Choose an Algorithm <svg
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
</div>
