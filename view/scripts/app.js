$(document).ready(initialize);

var BirthMonth = [
    'Mes',
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre'
];

function initialize() {
    getMonths();
    getDays();
    getYears();
    $("input#SignUp").click(signUp);
    $("input#Reset").click(clearMessages);
    $("input#alre").click(alre);
    /*
    $("#services .button").hover(function() {
        $(this).siblings("img").removeClass("hidden-for-small");
    }, function() {
        $(this).siblings("img").addClass("hidden-for-small");
    });
    */
}

function alre (){
    var required = "Esta información es obligatoria.";
    var Nombre = $("#Nombre").val();
    var Apellido = $("#Apellido").val();
    var Email = $("#Email").val();
    var Mensaje = $("#Mensaje").val();
    
    if ( Nombre === '') {
        $( message(required) ).insertAfter("#Nombre");
    }
    if ( Apellido === '') {
        $( message(required) ).insertAfter("#Apellido");
    }
    if ( Email === '') {
        $( message(required) ).insertAfter("#Email");
    }
    if ( Mensaje === '') {
        $( message(required) ).insertAfter("#Mensaje");
    }
    
}

function signUp() {
    var state = "ok";
    var already = "Ya hay otra persona con esta dirección de correo electrónico.";
    var required = "Esta información es obligatoria.";
    var invalid = "Información incorrecta.";
    var different = "Las contraseñas no coinciden.";
    var minor = "The birthdate indicates that you're under 13 years of age.";
    var firstName = $("#FirstName").val();
    var lastName = $("#LastName").val();
    var userName = $("#UserName").val();
    var password = $("#Password").val();
    var rePassword = $("#RePassword").val();
    var address = $("#Address").val();
    var city = $("#City").val();
    var telephone = $("#Telephone").val();
    var birthMonth = $("#BirthMonth").val();
    var birthDay = $("#BirthDay").val();
    var birthYear = $("#BirthYear").val();
    clearMessages();
    if ( firstName === '') {
        $( message(required) ).insertAfter("#FirstName");
    }
    if ( lastName === '') {
        $( message(required) ).insertAfter("#LastName");
    }
    if ( userName === '') {
        $( message(required) ).insertAfter("#UserName");
    }
    if ( password === '') {
        $( message(required) ).insertAfter("#Password");
    }
    if ( rePassword !== password ) {
        $( message(different) ).insertAfter("#RePassword");
    } else if ( rePassword === '') {
        $( message(required) ).insertAfter("#RePassword");
    }
    if ( address === '' ) {
        $( message(required) ).insertAfter("#Address");
    }
    if ( city === '' ) {
        $( message(required) ).insertAfter("#City");
    }
    if ( telephone === '' ) {
        $( message(required) ).insertAfter("#Telephone");
    } else {
        var staticRegex = / /g;
        telephone = telephone.replace(staticRegex,"");
        if ( !isInteger(telephone) ) {
            $( message(invalid) ).insertAfter("#Telephone");
        }
    }
    if ( birthMonth === '' || birthDay === '' || birthYear === '' ) {
        $( message(required) ).insertAfter("#BirthYear");
    }
    if ( checkAge(birthYear, birthMonth, birthDay) < 13 ) {
        $( message(minor) ).insertAfter("#BirthYear");
    }
    var birthDate = new Date(birthYear, birthMonth, birthDay);
    /*
    $.post(
        "view/js/register.php", {
            first_name: firstName,
            last_name: lastName,
            username: userName,
            pass: password,
            address: address,
            city: city,
            telephone: telephone,
            birthdate: birthDate
        }, function(data) {
            alert(data);
        }
    );
    */
}

function isInteger(x) {
    return (typeof x === 'number') && (x % 1 === 0);
}

function message(text) {
    return "<span class='required'>"+text+"</span>";
}

function clearMessages() {
    if ( $("span#required").length ) {
        $("span#required").remove();
    }
}

function checkAge(year, month, day) {
    var actualDate = new Date();
    var birthDate = new Date(year, month, day);
    var difference = actualDate.getTime() - birthDate.getTime();
    var age = new Date(difference);
    return age.getFullYear() - 1970;
}

function getMonths() {
    var months = '<option selected="selected" value="">Mes</option>';
    for (var index = 1; index <= 12; index++) {
        months +='<option value="'+index+'">'+BirthMonth[index]+'</option>';
    }
    $("select#BirthMonth").html(months);
}

function getDays() {
    var days = '<option selected="selected" value="">Dia</option>';
    for (var day = 1; day <= 31; day++) {
        days += '<option value="'+day+'">'+day+'</option>';
    }
    $("select#BirthDay").html(days);
}

function getYears() {
    var years = '<option selected="selected" value="">Año</option>';
    var date = new Date();
    var actualYear = date.getFullYear();
    for (var year = actualYear; year >= 1905; year--) {
        years += '<option value="'+year+'">'+year+'</option>';
    }
    $("select#BirthYear").html(years);
}