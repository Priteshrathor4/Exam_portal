$(document).ready(function() {
    $('#submitRgister').click(function() {
        $('#err_name').html("");
        $("#err_qualification").html("");
        $('#err_username').html("");
        $('#err_email').html("");
        $('#err_password').html("");
        var name = $('#Fstudentname').val();
        console.log(name);
        var drdow = $('#drdow').val();
        console.log(drdow);
        var username = $('#fusername').val();
        console.log(username);
        var email = $('#fremail').val();
        console.log(email);
        var pwd = $('#rpwd').val();
        console.log(pwd);
        // alert(name + "-" + drdow + "-" + username + "-" + drdow2 + "-" + email + "-" + pwd)
        let flag = false;
        if (name == 0) {
            $('#err_name').html("Enter Name");
            $('#Fstudentname').focus();
            return false;
        } else if (!name.match(/^[A-Za-z ]{4,20}$/)) {
            $('#err_name').html("Enter correct Name");
            $('#Fstudentname').focus();
            return false;
        } else if (drdow == "") {
            $("#err_qualification").html("Select Your Highest Qualification ");
            $('#drdow').focus();
            return false;
        } else if (username == 0) {
            $('#err_username').html("Enter username");
            $('#fusername').focus();
            return false;
        } else if (!username.match(/^[A-Za-z][A-Za-z#@0-9_]{7,29}$/)) {
            $('#err_username').html("Enter Valid Username");
            $('#fusername').focus();
            return false;
        } else if (email == 0) {
            $('#err_email').html("Enter Eamil");
            $('#fremail').focus();
            return false;
        } else if (!email.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
            $('#err_email').html("Enter Valid Email-id");
            $('#fremail').focus();
            return false;
        } else if (pwd == "") {
            console.log(pwd)
            $('#err_password').html("Enter Password");
            $('#rpwd').focus();
            return false;
        } else if (!pwd.match(/^[A-Za-z][A-Za-z#@0-9_]{7,29}$/)) {
            $('#err_password').html("Enter Valid Password");
            $('#rpwd').focus();
            return false;
        } else {
            if (window.location == "http://localhost:3000/user") {
                document.getElementById('registerForm').action = '/admin/addUser'
                return true;
            }
            if (window.location == "http://localhost:3000/") {
                // alert('home');
                document.getElementById('registerForm').action = '/userPost'
                return true;
            }
        }

    })
});