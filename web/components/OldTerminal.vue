<template>
<div class="terminal">
<slot></slot> 
</div>
</template>

<style scoped lang="scss">
.terminal {
    border-radius: 20px;
    background-color: black;
    background-image: repeating-linear-gradient(
        0deg,
        rgba(black, 0.15),
        rgba(black, 0.15) 1px,
        transparent 1px,
        transparent 2px
    ), radial-gradient(
        rgba(0, 150, 0, 0.75), black 120%
    );
    
    overflow: hidden;
    margin: 0;
    overflow: hidden;
    padding: 2rem;
    color: white;
    font: 1.3rem Inconsolata, monospace;
    text-shadow: 0 0 5px #C8C8C8;
}

::selection {
    background: #0080FF;
    text-shadow: none;
}
pre {
    margin: 0;
}
</style>