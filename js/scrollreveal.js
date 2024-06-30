

/*SCROLL REVEAL*/
window.sr = ScrollReveal();
sr.reveal('.arriba', {
    duration: 2000,
    origin: 'top',
    distance: '-100px'
});
sr.reveal('.izquierda', {
    duration: 2000,
    origin: 'left',
    distance: '-100px'
});


sr.reveal('.derecha', {
    duration: 2000,
    origin: 'rigth',
    distance: '-100px'
});

sr.reveal('.abajo', {
    duration: 2000,
    origin: 'bottom',
    distance: '-100px'
});



// EFECTO ESCRITURA




var options = {
    strings: ['Desarrollador web fullstack de Developer Creative.'],
  typeSpeed: 50
};

var typed = new Typed('.typed', options);

