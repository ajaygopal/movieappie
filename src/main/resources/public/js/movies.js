var table = $("#table").DataTable();
$("#linkAddMovie").click(function (e) {
    e.preventDefault();
    $("#movieModal").modal("toggle");
    $("#btnUpdateMovie").hide();
    $("#btnAddMovie").show();
    $("#titleAddMovie").show();
    $("#titleChangeMovie").hide();
});

getAll();

function getAll() {
    $.get("/api/movies/", function (result) {
        table.clear();
        for (var i = 0; i < result.length; i++) {
            table.row.add(["<a href=\"javascript:del(" + result[i].movieID + ")\"><font color='#ff3385'><i class='fa fa-trash-o' aria-hidden='true'></i></font></a>",
                            "<a href=\"javascript:edit("+result[i].movieID+")\"><font color='#ff3385'><i class='fa fa-pencil' aria-hidden='true'></i></font></a>",
                            result[i].movieTitle,
                            result[i].releaseDate,
                            result[i].score,
                            result[i].watched]);

                                   }
        table.draw();
    });
}

$("#btnAddMovie").click(function (e) {
    e.preventDefault();
    $("#txtFail").text("");
    var obj = getObject();
    if ($("#filmToevoegen").validate()) {
       addMovie(obj);
    }
});

function addMovie(obj) {
     $.ajax({
            url: "/api/movies/",
            type: "POST",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            success: function(result) {
                $("#movieModal").modal("toggle");
                $("#movieModal input").val("");
                getAll();
                $("#txtFail").text("");
            },
            error: function(err) {
                $("#txtFail").text("Vul alle velden correct in.");
            }
     });
}


$("#btnUpdateMovie").click( function (e) {
    e.preventDefault();
    $("#txtFail").text("");
    var obj = getObject();

    if ($("#filmToevoegen").validate()) {
            updateMovie(obj);
    }
})

function updateMovie(obj) {
     $.ajax({
        url: "/api/movies/",
        method:"PUT",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            $("#movieModal").modal("toggle");
            $("#movieModal input").val("");
            getAll();
            $("#txtFail").text("");
        },
        error: function(err) {
            $("#txtFail").text("Vul alle velden correct in.");
        }
    });
}

function del(id) {
    $.confirm({
        title: 'Verwijdering bevestigen',
        content: 'Weet u zeker dat u deze film wilt verwijderen?',
        buttons: {
            confirm: function () {
                $.ajax({url: "/api/movies/"+id+"/", type: "DELETE"}).success( function() {
                    getAll();
                    $.alert('Film is verwijderd');
                })

            },
            cancel: function () {
            }
        }
    });
}

function edit(id) {
    $("#btnAddMovie").hide();
    $("#btnUpdateMovie").show();
    $("#titleAddMovie").hide();
    $("#titleChangeMovie").show();
    $.get({url:"/api/movies/"+id+"/", type:"GET"}).done( function(result) {
        $("#ID").val(result.movieID);
        $("#tile").val(result.movieTile);
        $("#releaseDate").val(result.movieReleaseDate);
        $("#score").val(result.movieScore);
        $("#watched").val(result.movieWatched);
        $("#movieModal").modal("toggle");
    })
}



function getObject() {
    var obj = {};
    obj.movieTitle = $("#title").val();
    obj.movieReleaseDate =  $("#releaseDate").val();
    obj.movieScore = $("#score").val();
    obj.movieWatched = $("#watched").val();
    obj.movieID = $("#ID").val();
    return obj;

}
$(document).ready(function(){
    $('#filmToevoegen').validate();
});





