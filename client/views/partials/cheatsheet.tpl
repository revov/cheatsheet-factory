<div id="editor">
function foo(items) {
    var x = "All this is syntax highlighted";
    return x;
}
</div>

<script>
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");
</script>