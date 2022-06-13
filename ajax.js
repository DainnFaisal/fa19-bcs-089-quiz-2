$(function() {
    //hide function for sign up and login form 
    $("#signupform").hide();
    $("#loginform").hide();

    $(".buybtn").attr("disabled", true);
    showHomeData();

    // delete data
    $("#user").on("click", ".btn-danger", deleteData);

    //show data
    $("#user").on("click", ".nav-link", showData);

    // data showing on corresponding button events 
    $("#addBtn").click(addData);
    $("#Clothing").click(showClothing);

    $("#Acessories").click(showAcessories);
    $("#3DModel").click(show3DModel);

    $("#Home").click(showHomeData);


});

// addition of data
function addData() {
    $("#signupform").hide();
    $("#loginform").hide();
    // asking details from user to add data
    var Name = $("#Name").val();
    var Anime = $("#Anime").val();

    var Type = $("#Type").val();
    var Price = $("#Price").val();

    var Description = $("#Descprition").val();
    var Image = $("#Image").val();

    // handling api through jquery
    $.ajax({
        url: "http://localhost:4000/api/merch/",
        // put method
        method: "PUT",
        // asking details from user
        data: { Name, Anime, Type, Price, Description, Image },

        success: function(response) {
            console.log(response);
            showHomeData();
        },

    });
}


// delete method to delete data
function deleteData() {
    var btn = $(this);

    var parentDiv = btn.closest(".users");

    let id = parentDiv.attr("data-id");

    console.log(id);
    $("#footer").removeClass("fixed-bottom");
    // ajax call for delete operation 
    $.ajax({
        url: "http://localhost:4000/api/merch/" + id,
        method: "DELETE",
        // delete method
        success: function(response) {
            location.reload;
        },
    });

}

function showHomeData() {

    $("#signupform").hide();

    $("#loginform").hide();
    // ajax call for get method 
    $.ajax({
        url: "http://localhost:4000/api/merch",
        method: "GET",

        success: function(response) {

            console.log(response);
            // changing footer class
            $("#footer").removeClass("fixed-bottom");
            var temp = $("#user");

            temp.empty();

            for (var i = 0; i < response.length; i++) {
                var rec = response[i];

                temp.append(
                    `<a class="nav-link" id="fulldata"><div class="d-flex justify-content-center users" data-id="${rec._id}">
            <h3><img src="${rec.Image}" alt="image"><p>  ${rec.Name}<p>Price: ${rec.Price}</a> 
            <button class="btn btn-danger btn-sm float-right">Delete </button></br>
            <button class="btn btn-warning btn-sm float-right">Update</button></br>
            `
                );



            }
        },
    });
}

function show3DModel() {
    $("#signupform").hide();
    $("#loginform").hide();
    // ajax call for handling get method for 3D clothing
    $.ajax({
        url: "http://localhost:4000/api/merch",
        method: "GET",

        success: function(response) {
            console.log(response);
            // removing footer class
            $("#footer").removeClass("fixed-bottom");

            var temp = $("#user");
            temp.empty();

            for (var i = 0; i < response.length; i++) {
                var rec = response[i];
                if (rec.Type === "3D Model")
                    temp.append(
                        `<a class="nav-link" id="fulldata"><div class="d-flex justify-content-center users" data-id="${rec._id}">
            <h3><img src="${rec.Image}" alt="image"><p>  ${rec.Name}<p>Price: ${rec.Price}</a> 
            <button class="btn btn-danger btn-sm float-right">Delete </button></br>
            <button class="btn btn-warning btn-sm float-right">Update</button>`
                    );



            }
        },
    });
}

function showClothing() {

    $("#signupform").hide();
    $("#loginform").hide();
    // ajax call of get method for clothing products
    $.ajax({
        url: "http://localhost:4000/api/merch",
        method: "GET",

        success: function(response) {
            console.log(response);
            // chasnging footer class on call
            $("#footer").removeClass("fixed-bottom");
            var temp = $("#user");

            temp.empty();

            for (var i = 0; i < response.length; i++) {
                var rec = response[i];

                if (rec.Type === "Clothing")
                    temp.append(

                        `<a class="nav-link" id="fulldata"><div class="d-flex justify-content-center users" data-id="${rec._id}">
            <h3><img src="${rec.Image}" alt="image"><p>  ${rec.Name}<p>Price: ${rec.Price}</a> 
            <button class="btn btn-danger btn-sm float-right">Delete </button></br>
            <button class="btn btn-warning btn-sm float-right">Update</button>`
                    );


            }
        },
    });
}


// for showing accessories 
function showAcessories() {

    $("#signupform").hide();
    $("#loginform").hide();
    // ajax call of get method for accessories 
    $.ajax({
        url: "http://localhost:4000/api/merch",
        method: "GET",

        success: function(response) {

            console.log(response);
            var temp = $("#user");

            temp.empty();
            // changing footer class
            $("#footer").removeClass("fixed-bottom");

            for (var i = 0; i < response.length; i++) {

                var rec = response[i];
                if (rec.Type === "Acessories")
                    temp.append(
                        `<a class="nav-link" id="fulldata"><div class="d-flex justify-content-center users" data-id="${rec._id}">
            <h3><img src="${rec.Image}" alt="image"><p>  ${rec.Name}<p>Price: ${rec.Price}</a> 
            <button class="btn btn-danger btn-sm float-right">Delete </button></br>
            <button class="btn btn-warning btn-sm float-right">Update</button>`
                    );

            }
        },
    });
}

function showData() {

    $("#signupform").hide();
    $("#loginform").hide();

    var btn = $(this);
    var parentDiv = btn.closest(".users");

    let id = parentDiv.attr("data-id");
    console.log(id);
    // ajax get request for users 
    $.ajax({
        url: "http://localhost:4000/api/merch/" + id,
        method: "GET",

        success: function(rec) {
            console.log(rec);

            var temp = $("#user");
            // changing to empty
            temp.empty();

            temp.append(
                `<div class="d-flex justify-content-between displaydata" data-id="${rec._id}">
            <div><img src="${rec.Image}" alt="image"></div> 
            <div> <h2>${rec.Name}</h2>
            <div class="text-success"><h1> Rs. ${rec.Price}</div>
            <div> Anime: ${rec.Anime}
            <div><h2> Description: </h2><p>${rec.Description} 
            <div> <button id="buybtn" class="btn btn-warning btn-lg buybtn float-right">Buy</button></br>`
            );
            $("#footer").addClass("fixed-bottom");
            $("#addbtn").hide();



        },
    });

}