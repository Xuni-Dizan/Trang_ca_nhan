function openLab(evt, labName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(labName).style.display = "block";
    document.getElementById(labName).classList.add("active");
    evt.currentTarget.className += " active";
}

// Quay lại trang chủ
function goBack(sectionId) {
    document.getElementById(sectionId).style.display = 'block';
    let sections = ['section-hci', 'section-ds', 'section-p'];
    sections.forEach(function(section) {
        if (section !== sectionId) {
            document.getElementById(section).style.display = 'none';
        }
    });
}

document.getElementById('btn-hci').addEventListener('click', function() {
document.getElementById('home').style.display = 'none';
let sectionHci = document.getElementById('section-hci');
let sectionLab1 = document.getElementById('lab1_1');
sectionHci.style.display = 'block';
sectionHci.classList.add('transition-fade');
sectionLab1.style.display = 'block';
sectionLab1.classList.add('transition-fade');
});

document.getElementById('btn-ds').addEventListener('click', function() {
document.getElementById('home').style.display = 'none';
let sectionDs = document.getElementById('section-ds');
sectionDs.style.display = 'block';
sectionDs.classList.add('transition-fade');
});

document.getElementById('btn-p').addEventListener('click', function() {
document.getElementById('home').style.display = 'none';
let sectionP = document.getElementById('section-p');
sectionP.style.display = 'block';
sectionP.classList.add('transition-fade');
});