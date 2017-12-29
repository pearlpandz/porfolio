// onloading time call function
$('main, header, footer').hide();
preloader();

//get username 
$("#submit").click(function(){
    $.session.set("username",$("#username").val());
    $.session.get("username");
    $("#userdetails").hide()
    preloader();
});

// preloader funciton 
function preloader() {
    $("#preloader").append("loading...");
    $('#preloader, .preloader').delay(2000).fadeOut('slow');
    $('main, header, footer').delay(2000).fadeIn('slow');
    // onload session check
    if($.session.get("username")!=undefined) {
        $("#userdetails").hide();
        getbanners();
        getheaderdetails();
        getskills();
        getprojects();
        getsociallinks();
    }
    else {
        $("#userdetails").delay(2000).fadeIn('slow');
    }
    
}

// get banners from firebase for homepage owl slider
function getbanners() {
    // banners
    var firebase_node = $.session.get("username");

    // firebase configuration
    var config = {
        apiKey: "fcafcbc7f2a2ace18ce6721a5bee2a24dc1dad8b",
        authDomain: "https://createcv-1e398.firebaseio.com/",
        databaseURL: "https://createcv-1e398.firebaseio.com/",
        projectId: "createcv-1e398; ?>",
        storageBucket: "gs://createcv-1e398.appspot.com",
    };
    firebase.initializeApp(config);
    var dbRef = firebase.database();
    var contactsRef = dbRef.ref('users/'+firebase_node+'/banners');
    contactsRef.once("value", function(snapshot) {
        var banner_contents = '<div id="myCarousel" class="carousel slide" data-ride="carousel"><div class="carousel-inner" id="slideshow">';        
        var i=0;
        var j=0;
        snapshot.forEach(function(child) {
            if(i<=snapshot.val().length){
                if(i==0){
                    banner_contents +='<div class="item active '+i+'"><img src='+child.val()+' alt=""><div class="overlay"></div></div>';            
                }
                else {
                    banner_contents += '<div class="item '+i+'"><img src='+child.val()+' alt=""><div class="overlay"></div></div>';
                }
                i++;
            }
        });
        if(j<snapshot.val().length){
            if(j==0) { 
                banner_contents += '</div><a class="left carousel-control" href="#myCarousel" data-slide="prev"></a><a class="right carousel-control" href="#myCarousel" data-slide="next"></a></div>';      
            }
            else {
                banner_contents += '</div></div>';      
            }
            j++;
        }
        $('#banners').append(banner_contents);
    });
    
}

// get header contents (name, profile image)
function getheaderdetails(){
    // banners
    var firebase_node = $.session.get("username");

    // firebase configuration

    var dbRef = firebase.database();
    var contactsRef = dbRef.ref('users/'+firebase_node+'/profile');
    contactsRef.once("value", function(snapshot) {
        var headercontent = '<img src="'+snapshot.val().profilepic+'" /><span>'+snapshot.val().username+'</span>';
        $("#logo a").append(headercontent);
        $("#username1").text(snapshot.val().username);
        $("#professional").text(snapshot.val().Professional);
        $(".profilepic #profilepic").attr("src", snapshot.val().profilepic);
        $(".profiledetails h4").text(snapshot.val().username);
        $(".profiledetails h5").text(snapshot.val().Professional);
        $(".profiledetails p").text(snapshot.val().description);
        $(".profiledetails #email").text(snapshot.val().email);
        $(".profiledetails #dob").text(snapshot.val().dob);
        $(".profiledetails #location").text(snapshot.val().location);
        $(".profiledetails #mobile").text(snapshot.val().mobile);
        $(".profiledetails #qualification").text(snapshot.val().qualification);
        $('#lat').val(snapshot.val().lat);
        $('#lang').val(snapshot.val().lang);
    });
}

// get skills
function getskills(){
    // banners
    var firebase_node = $.session.get("username");

    // firebase configuration

    var dbRef = firebase.database();
    var contactsRef = dbRef.ref('users/'+firebase_node+'/skills');
    contactsRef.once("value", function(snapshot) {
        snapshot.forEach(function(child) {
            var skillscontent = '<li>'+child.val()+'</li>';
            $("#skills ul").append(skillscontent);
        });
    });   
}

// get projects
function getprojects() {
    var firebase_node = $.session.get("username");

    // firebase configuration
    var dbRef = firebase.database();
    var contactsRef = dbRef.ref('users/'+firebase_node+'/projects');
    contactsRef.once("value", function(snapshot) {
            var skills_contents = '<ul>';
            snapshot.forEach(function(child) {
                skills_contents +='<li> <a href='+child.val().url+' target="_blank"><h4>'+child.val().title+'</h4><img src='+child.val().coverimg+' alt=""></a></li>';            
            }); 
            skills_contents += '</ul>';       
            $('#project_slider').append(skills_contents);
    });
    
}

// map
var marker;
function initMap() {
    var firebase_node = $.session.get("username");
    // firebase configuration
    var dbRef = firebase.database();
    var contactsRef = dbRef.ref('users/'+firebase_node+'/profile');
    contactsRef.once("value", function(snapshot) {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: {lat: parseFloat(snapshot.val().lat), lng: parseFloat(snapshot.val().lang)}
        });
        marker = new google.maps.Marker({
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: {lat: parseFloat(snapshot.val().lat), lng: parseFloat(snapshot.val().lang)}
        });
        marker.addListener('click', toggleBounce);
    });
}
function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

// get skills
function getsociallinks(){
    // banners
    var firebase_node = $.session.get("username");

    // firebase configuration

    var dbRef = firebase.database();
    var contactsRef = dbRef.ref('users/'+firebase_node+'/social');
    contactsRef.once("value", function(snapshot) {
        $('#facebook').attr("href",snapshot.val().facebook);
        $('#twitter').attr("href",snapshot.val().twitter);
        $('#linkedin').attr("href",snapshot.val().linkedin);
    });   
}