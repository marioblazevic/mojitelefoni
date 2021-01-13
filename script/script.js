/* Events */
$(document).ready(function(){
  $('#btnPrikazi').click(pretrazi);
});

/*Drop down menu*/
$(document).ready(function(){
  $('#menu li ul').css({
    display: "none",
    left: "auto"
  });
  $('#menu li').hoverIntent(function() {
    $(this)
      .find('ul')
      .stop(true, true)
      .slideDown('fast');
  }, function() {
    $(this)
      .find('ul')
      .stop(true,true)
      .fadeOut('fast');
  });
});

/*Header animation*/
$('#brand').hover(
  function(){
    $(this).stop( true, true )
    .animate({padding:'20px'},'slow');
  },
  function(){
      $(this).stop( true, true )
      .animate({padding:'0px'},'slow');
  }
);

/*Footer*/

$('#showFooter').click(function(){
  if($('footer p').is(':visible')){
    $('footer p').hide();
  }else{
    $('footer p').show();
  }
});

/*Best products*/

$(document).ready(function(){
	// alert("ok");
	dohvatiProizvode();
});

function dohvatiProizvode(){
	$.ajax({
		url: "json/bestProducts.json",
		type: "get",
		dataType: "json",
		success: function(data){
			// alert("ok");
			prikaziProizvode(data);
		}

	});

}

function prikaziProizvode(data){

	var sadrzaj="";

	for(var i = 0; i < data.length; i++){
		sadrzaj += '<div class="box">';
    sadrzaj += '<img src="'+data[i].src+'" alt="'+data[i].alt+'">';
    sadrzaj += '<h3>'+data[i].naziv+'</h3>';
    sadrzaj += '<p>Cena: '+data[i].cena+'</p>';
    sadrzaj += '</div>';
	}
	$('#boxes .container').append('<div>' + sadrzaj + '</div>');
}

/* Form */



function validiraj()
{
  $("#feedback").html("");
  var ime = $("#ime").val();
  var prezime = $("#prezime").val();
  var email = $("#email").val();
  var polovi = $("input[name=pol]");

  var errors = [];

  var reImePrezime = /^[A-ZČĆŽĐŠ][a-zčćžđš]{2,10}$/;
  var reEmail = /(\w+)\@(\w+)\.[a-zA-Z]/;
  if(!reImePrezime.test(ime)) {
    errors.push("Ime u losem formatu.");
  }

  if(!reImePrezime.test(prezime)) {
    errors.push("Prezime u losem formatu.");
  }

  if(!reEmail.test(email)) {
      errors.push("Unesite ispravan email.");
  }

  var imaSelektovanih = false;

  for(var i = 0; i < polovi.length; i++) {
      if(polovi[i].checked)
      {
        imaSelektovanih = true;
        break;
      }
  }

  if(!imaSelektovanih) {
    errors.push("Nije odabran pol");
  }

  if(errors.length) {
    var greske = "<ul>";
    for(var i = 0; i < errors.length; i++) {
        greske+= "<li>" + errors[i] + "</li>";
    }
    greske += "</ul>";

    $("#errors").html(greske);
  } else {
    // var podaci = {
    //     ime : ime,
    //     prezime : prezime,
    //     email : email,
    //     adresa : adresa,
    //     idZanimanja : ddZanimanja,
    //     type : "addUser"
    $("#errors").css('color','green');
    $("#errors").html('Poruka je uspesno poslata');
    };

    // $.ajax({
    //     url : "server.php",
    //     type : "post",
    //     data : podaci,
    //     success : function(podatak) {
    //       $("#feedback").html(podatak);
    //     },
    //     error : function(xhr, status, error)
    //     {
    //         $("#feedback").html("Greska do servera.");
    //     }
    // });

  // }
}

/*All products*/

function pretrazi() { // dohvatamo ono sto je selektovao neko
    var kategorijaID = parseInt($('#kategorije').val()); // jqueru fja vraca vrednost, bice string zato ga konvertujemo, sve iz forme se vraca kao string

    if (isNaN(kategorijaID && kategorijaID==0)) {
        alert('greska!');
        return;
    }

    $.ajax({
        url: 'json/allProducts.json',
        type: 'GET',
        success: function (podaci) {
            var divIspis = "";
            $.each(podaci, function (index, value) {
                if (value.id == kategorijaID) {
                    divIspis += "<div class='product'>";
                    divIspis += "<img src= '" + value.src + "' alt='" + value.alt + "'>";
                    divIspis += "<h5>" + value.naziv + "</h5>";
                    divIspis += "<p>Ocena: '"+value.ocena+"'</p>";
                    divIspis += "<p>Ocena: '"+value.cena+"'</p>";
                    divIspis += "</div>";
                }
            });
            $('#products').html(divIspis);
        },
        error: function (greska) {
            console.log(greska.status);
        }
    });

}

/* Products animation */

$(document).ready(function(){
  $('#h3Pretraga').animate({
        letterSpacing:'3px',
        paddingBottom:'30px',
        borderBottomWidth:'5px'
  },2000);
});


$(document).ready(function(){
  $('.vest').animate({
        letterSpacing:'3px'
  },2000);
});

$("p").hover(function(){
    $(this).css("opacity", "0.5");
    }, function(){
    $(this).css("opacity", "1");
});

/* Load gallery */

window.onload = function(){

  var xhr = new XMLHttpRequest();
  xhr.open('GET','json/gallery.json',true);

  xhr.onload = function(){
    if(xhr.status == 200){
      var pictures = JSON.parse(xhr.responseText);

      var output = '';
      for (var i in pictures){
        output += '<div class="picture">' +
        '<img src="'+pictures[i].src+'" alt="'+pictures[i].alt+'">' +
          '<h3>'+pictures[i].title+'</h3>' +
          '</div>';
      }
      $('.pictures').html(output);
    }
  }
  xhr.send();

};


















/**/
