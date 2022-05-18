///USER REGISTRATION VALIDATION

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
    } else if (username == 0) {
        $('#err_username').html("Enter username");
        $('#fusername').focus();
        return false;
    } else if (!username.match(/^[A-Za-z][A-Za-z#@0-9_]{7,29}$/)) {
        $('#err_username').html("Username must be 8 digit in Ex.(example@123)");
        $('#fusername').focus();
        return false;
    } else if (email == 0) {
        $('#err_email').html("Enter Eamil");
        $('#fremail').focus();
        return false;
    } else if (!email.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
        $('#err_email').html("Email-id must be Ex-(example@email.com)");
        $('#fremail').focus();
        return false;
    } else if (drdow == "") {
        $("#err_qualification").html("Select Your Highest Qualification ");
        $('#drdow').focus();
        return false;
    } else if (pwd == "") {
        console.log(pwd)
        $('#err_password').html("Enter Password");
        $('#rpwd').focus();
        return false;
    } else if (!pwd.match(/^[A-Za-z][A-Za-z#@0-9_]{7,29}$/)) {
        $('#err_password').html("Password must be 8 digitin Ex.(example#123)");
        $('#rpwd').focus();
        return false;
    } else {
        if (window.location == "http://localhost:3000/user") {
            document.getElementById('registerForm').action = '/addUser'
            return true;
        }
        if (window.location == "http://localhost:3000/") {
            // alert('home');
            document.getElementById('registerForm').action = '/userPost'
            return true;
        }
    }

})



////LOGIN VALIDATION
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




/////QUESTION VALIDATION
$('#quizSubmit').click(function() {
    $("#err_exam").html("");
    $("#err_que").html("");
    $("#err_opt1").html("");
    $("#err_opt2").html("");
    $("#err_opt3").html("");
    $("#err_opt4").html("");
    var drdow = $('#exam').val();
    console.log(drdow);
    var qustion = $('#question').val();
    console.log(qustion);
    var quizone = $('#opt1').val();
    console.log(quizone);
    var quiztwo = $("#opt2").val();
    console.log(quiztwo);
    var quizthree = $("#opt3").val();
    console.log(quizthree);
    var quizfour = $("#opt4").val();
    console.log(quizfour);
    if (drdow == 0) {
        $("#err_exam").html("Select Your Highest Qualification ");
        $('#exam').focus();
        return false;
    } else if (qustion == 0) {
        $('#err_que').html("Enter Your Question");
        $("#question").focus();
        return false;
    } else if (qustion.length > 100) {
        $('#err_que').html("Question length should not be greater than 100");
        $("#question").focus();
        return false;
    } else if (quizone == 0) {
        $("#err_opt1").html("Enter Quiz Selector-1");
        $("#err_opt1").focus();
        return false;
    } else if (quizone.length >= 100) {
        $('#err_opt1').html("Option length should not be greater than 100");
        $("#err_opt1").focus();
        return false;
    } else if (quiztwo == 0) {
        $("#err_opt2").html("Enter Quiz Selector-2");
        $("#opt2").focus();
        return false;
    } else if (quiztwo.length >= 100) {
        $('#err_opt2').html("Option length should not be greater than 100");
        $("#err_opt2").focus();
        return false;
    } else if (quizthree == 0) {
        $("#err_opt3").html("Enter Quiz Selector-3");
        $("#opt3").focus();
        return false;
    } else if (quizthree.length >= 100) {
        $('#err_opt3').html("Option length should not be greater than 100");
        $("#err_opt3").focus();
        return false;
    } else if (quizfour == 0) {
        $("#err_opt4").html("Enter Quiz Selector-4");
        $("#opt4").focus();
        return false;
    } else if (quizfour.length >= 100) {
        $('#err_opt4').html("Option length should not be greater than 100");
        $("#err_opt4").focus();
        return false;
    } else {
        // alert('perfect')
        document.getElementById('quiz_form').action = '/quiz'
        return true;
    }
})

///// RULES SUBMIT
$('#ruleSubmit').click(() => {
    $("#err_rule").html("");
    // let rule = $('#rule').val();
    let rule = $('#ruleForm textarea[name=rule]').val();
    if (rule == "") {
        $("#err_rule").html("Enter Rule");
        $("#rule").focus();
        return false;
    } else {
        // alert('perfect')
        document.getElementById('ruleForm').action = '/rulpost'
        return true;
    }
})