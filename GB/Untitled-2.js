$(document).ready(function(){
    $('.fa-bars').click(function(){
      $(this).toggleClass('fa-times');
      $('.navbar').toggleClass('nav-toggle');
    });
    $(window).on('load scroll', function(){
        $('.fa-bars').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');
    })
    if($(window).scrollTop() > 30){
        $('.header').css({'background':'red','box-shadow':'0 .2rem .5rem rgba(0,0,0,.4)'});
    }else{
        $('.header').css({'background':'darkblue','box-shadow':'0 .2rem .5rem rgba(0,0,0,.4)'});
    }
});    
$('.accordion-header').click(function(){
    $('.accordion .accordion-body').slideUp();
    $(this).next('.accordion-body').slideDown();
    $('.accordion .accordion-header span').text('+');
    $(this).children('span').text('-');
});





const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let spots = [];
let hue = 0;
const mouse = {
    x: undefined,
    y: undefined
}
canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i = 0; i<3; i++){
        spots.push(new Particle());
    }
});
class Particle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() *4 + 0.3;
        this.speedX = Math.random() * 4 - 3;
        this.speedY = Math.random() * 4 - 3;
        this.color = 'hsl(' + hue + ', 100%, 70%)';
    }
    update(){
        this.x += this.speedX;
        this.x += this.speedX;
        if(this.size > 0.1) this.size -= 0.03;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 4);
        ctx.fill();
    }
}
function handleParticle(){
    for (let i = 0; i < spots.length; i++) {
        spots[i].update();
        spots[i].draw();
        for (let j = 0; j < spots.length; j++) {
            const dx = spots[i].x - spots[j].x;
            const dy = spots[i].y - spots[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 90){
                ctx.beginPath();
                ctx.strokeStyle = spots[i].color;
                ctx.lineWidth = spots[i].size / 10;
                ctx.moveTo(spots[i].x, spots[i].y);
                ctx.lineTo(spots[j].x, spots[j].y);
                ctx.stroke();
            }
        }
        if (spots[i].size <= 0.3) {
            spots.splice(i, 1); i--;
        }
    }
}
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticle();
    hue++;
    requestAnimationFrame(animate);
}
window.addEventListener('resize', function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
})
window.addEventListener('mouseout', function(){
    mouse.x = undefined;
    mouse.y = undefined
})
animate()










// var dots = [],
//     mouse = {
//       x: 0,
//       y: 0
//     };

// var Dot = function() {
//   this.x = 0;
//   this.y = 0;
//   this.node = (function(){
//     var n = document.createElement("div");
//     n.className = "MouseTrail";
//     document.body.appendChild(n);
//     return n;
//   }());
// };

// Dot.prototype.draw = function() {
//   this.node.style.left = this.x + "px";
//   this.node.style.top = this.y + "px";
// };

// for (var i = 0; i < 12; i++) {
//   var d = new Dot();
//   dots.push(d);
// }


// function draw() {

//   var x = mouse.x,
//       y = mouse.y;
      
//   dots.forEach(function(dot, index, dots) {
//     var nextDot = dots[index + 1] || dots[0];
    
//     dot.x = x;
//     dot.y = y;
//     dot.draw();
//     x += (nextDot.x - dot.x) * .6;
//     y += (nextDot.y - dot.y) * .6;

//   });
// }

// addEventListener("mousemove", function(event) {
//   mouse.x = event.pageX;
//   mouse.y = event.pageY;
// });

// function animate() {
//   draw();
//   requestAnimationFrame(animate);
// }

// animate();












// var trailimage=["test.gif", 100, 99] //image path, plus width and height
// var offsetfrommouse=[10,-20] //image x,y offsets from cursor position in pixels. Enter 0,0 for no offset
// var displayduration=0 //duration in seconds image should remain visible. 0 for always.

// if (document.getElementById || document.all)
// document.write('<div id="trailimageid" style="position:absolute;visibility:visible;left:0px;top:0px;width:1px;height:1px"><img src="'+trailimage[0]+'" border="0" width="'+trailimage[1]+'px" height="'+trailimage[2]+'px"></div>')

// function gettrailobj(){
// if (document.getElementById)
// return document.getElementById("trailimageid").style
// else if (document.all)
// return document.all.trailimagid.style
// }

// function truebody(){
// return (!window.opera && document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
// }

// function hidetrail(){
// gettrailobj().visibility="hidden"
// document.onmousemove=""

// }

// function followmouse(e){
// var xcoord=offsetfrommouse[0]
// var ycoord=offsetfrommouse[1]
// if (typeof e != "undefined"){
// xcoord+=e.pageX
// ycoord+=e.pageY
// }
// else if (typeof window.event !="undefined"){
// xcoord+=truebody().scrollLeft+event.clientX
// ycoord+=truebody().scrollTop+event.clientY
// }
// var docwidth=document.all? truebody().scrollLeft+truebody().clientWidth : pageXOffset+window.innerWidth-15
// var docheight=document.all? Math.max(truebody().scrollHeight, truebody().clientHeight) : Math.max(document.body.offsetHeight, window.innerHeight)
// if (xcoord+trailimage[1]+3>docwidth || ycoord+trailimage[2]> docheight)
// gettrailobj().display="none"
// else 
// gettrailobj().display=""
// gettrailobj().left=xcoord+"px"
// gettrailobj().top=ycoord+"px"
// }

// document.onmousemove=followmouse

// if (displayduration>0)
// setTimeout("hidetrail()", displayduration*1000)