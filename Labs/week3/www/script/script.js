$( document ).ready(function() {
    $("#form").submit( function(event){
        event.preventDefault();
        console.log("CLICKED");
        ajaxPost();
    });
});


function ajaxPost() {
    const formData = {
        email : $("#email").val(),
        pwd : $("#pwd").val()
    };
    $.ajax({    
        type : "POST",
        contentType : "application/json",
        url : window.location + "login",
        data : JSON.stringify(formData),
        success : function(customer) {
            if (customer.valid == true){
                window.location = "/account";
            } else {
                console.log("Creds don't match!");
                $("#errormsg").show();
            }
        },
        error : function(e) {
            alert("Error!")
            console.log("ERROR: ", e);
        }
    });

}
