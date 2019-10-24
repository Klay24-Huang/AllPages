function onAddTag(tag) {
    alert("Added a tag: " + tag);
}
function onRemoveTag(tag) {
    alert("Removed a tag: " + tag);
}
function onChangeTag(input,tag) {
    alert("Changed a tag: " + tag);
}
$(function() {
    $('#tags_1').tagsInput({width:'auto'});
    $('#tags_2').tagsInput({
        width: 'auto',
        onChange: function(elem, elem_tags)
        {
            var languages = ['php','ruby','javascript'];
            $('.tag', elem_tags).each(function()
            {
                if($(this).text().search(new RegExp('\\b(' + languages.join('|') + ')\\b')) >= 0)
                    $(this).css('background-color', 'yellow');
            });
        }
    });
    $('#tags_3').tagsInput({
        width: 'auto',
        //autocomplete_url:'test/fake_plaintext_endpoint.html' //jquery.autocomplete (not jquery ui)
        autocomplete_url:'test/fake_json_endpoint.html' // jquery ui autocomplete requires a json endpoint
    });
})