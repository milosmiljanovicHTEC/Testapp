---
name: Custom issue template
about: Describe this issue template's purpose here.
title: ''
labels: ''
assignees: ''

---

## Table Styling in Markdown

<style>
    .Table {
        width:40%;
        text-align: center;
    }
    .Table th {
        background: yellow;
        word-wrap: break-word;
        text-align: center;
        font-style: bold;
        border:3px solid white;
    }
    .Table td{
       border:3px solid white; 
    } 
    .Table tr:nth-child(1) { background: blue; color: black; font-size: 24px; font-style: bold;  } 
    .Table tr:nth-child(2) { background: orange; font-size: 24px }
    .Table tr:nth-child(3) { background: green; font-size: 24px }


</style>

<div class="Table">

| Text | Text | Text | Text | 
| -- | -- | -- | -- |
| Tex1 |Text1 | Text1  |Text1  |
| <em>Text2</em>  | <em>Text2</em>  | <em>Text2</em>  | <em>Text2</em>  |
| Text3  |Text3  | Text3  | Text3  |


</div>
