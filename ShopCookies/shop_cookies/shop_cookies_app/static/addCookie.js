$(document).ready(function () {
    $(".addCookie").on("submit", function (event) {
        event.preventDefault()
        $.ajax({
            type: "POST",
            url: $(this).action,
            data: $(this).serialize(),
        })
        $(".count").val(1)
    })
})