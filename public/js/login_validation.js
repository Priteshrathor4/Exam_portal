$(document).ready(function() {
    $('#submitLogin').click(function() {
        $('#lerr_email').html("");
        $('#lerr_pwd').html("");
        var email = $('#femail').val();
        var pwd = $('#pwd').val();
        console.log(email);
        console.log(pwd);
        if (email == 0) {
            $('#lerr_email').html("Enter Your Eamil");
            return false;
        } else if (pwd == 0) {
            $('#lerr_pwd').html("Enter Your Password");
            return false;
        } else {
            // alert('perfect')
            document.getElementById('loginForm').action = '/loginPost'
            return true;
        }
    })

});