const images = [
    // Add the URLs of your 25 different images here
    'small/1.jpeg', 'small/2.jpeg', 'small/3.jpeg', 'small/4.jpeg', 'small/5.jpeg',
    'small/6.jpeg', 'small/7.jpeg', 'small/8.jpeg', 'small/9.jpeg', 'small/10.jpeg',
    'small/11.jpeg', 'small/12.jpeg', 'small/13.jpeg', 'small/14.jpeg', 'small/15.jpeg',
    'small/16.jpeg', 'small/17.jpeg', 'small/18.jpeg', 'small/19.jpeg', 'small/20.jpeg',
    'small/21.jpeg', 'small/22.jpeg', 'small/23.jpeg', 'small/24.jpeg', 'small/25.jpeg',
    
];

const bigImageParts = [
    //parts of big image
    //'big/00.jpg', 'big/05.jpg', 'big/10.jpg', 'big/15.jpg', 'big/20.jpg',
   // 'big/01.jpg', 'big/06.jpg', 'big/11.jpg', 'big/16.jpg', 'big/21.jpg',
   // 'big/02.jpg', 'big/07.jpg', 'big/12.jpg', 'big/17.jpg', 'big/22.jpg',
   // 'big/03.jpg', 'big/08.jpg', 'big/13.jpg', 'big/18.jpg', 'big/23.jpg',
   // 'big/04.jpg', 'big/09.jpg', 'big/14.jpg', 'big/19.jpg', 'big/24.jpg',
    
    //new check
    'extract/row-1-column-1.jpg', 'extract/row-1-column-2.jpg', 'extract/row-1-column-3.jpg', 'extract/row-1-column-4.jpg', 'extract/row-1-column-5.jpg', 
    'extract/row-2-column-1.jpg', 'extract/row-2-column-2.jpg', 'extract/row-2-column-3.jpg', 'extract/row-2-column-4.jpg', 'extract/row-2-column-5.jpg',
    'extract/row-3-column-1.jpg', 'extract/row-3-column-2.jpg', 'extract/row-3-column-3.jpg', 'extract/row-3-column-4.jpg', 'extract/row-3-column-5.jpg',
    'extract/row-4-column-1.jpg', 'extract/row-4-column-2.jpg', 'extract/row-4-column-3.jpg', 'extract/row-4-column-4.jpg', 'extract/row-4-column-5.jpg',
    'extract/row-5-column-1.jpg', 'extract/row-5-column-2.jpg', 'extract/row-5-column-3.jpg', 'extract/row-5-column-4.jpg', 'extract/row-5-column-5.jpg',


]

const notes = [
    "Mere kaandhe, aapka sukoon", 
    "Meri Zindagi, Aapka Saath", 
    "Meri Chahat, Aapka Haq",
    "Meri Muskurahat, Aapki Sharaarat",
    "Meri Saans, Aapki Mehek",
    "Meri Khamoshi, Aapki Chuppi",
    "Meri Palkein, Aapka Aasra",
    "Meri Kahani, Aapka Naam",
    "Meri Dhadkan, Aapka Ehsaas",
    "Meri Neend, Aapke Khaab",
    "Mera Dil, Aapka Aashiyana ",
    "Meri Manzil, Aapka Safar",
    "Meri Raat,  Aapka Chaand",
    "Meri Subah, Aapke Khayal",
    "Meri Kitaab, Aapke Lafz ",
    "Meri Soch, Aapke Asar",
    "Meri Har Khushi, Aapki Hasrat",
    "Meri Shaam, Aapka Intezar",
    "Mera Chhaya, Aapka Noor",
    "Meri Har Baat, Aapka Zikar",
    "Meri Aarzoo, Mukammal Ishq",
    "Meri Aankhein, Aapki Talaash",
    "Meri Har Dhadkan, Aapki Aahat",
    "Meri Duniya, Aapka Pyaar",
    "MERA WAJOOD, KHUD AAP",

];

const imageContainer = document.getElementById('image-container');
const noteModal = document.getElementById('note-modal');
const noteText = document.getElementById('note-text');
const flipButton = document.getElementById('love-button');
const backgroundMusic = document.getElementById('love-music');

let flipped = false;


flipButton.addEventListener('mouseenter',function(){
    flipButton.textContent = ' ❤️ ';
});


flipButton.addEventListener('mouseleave', function(){
    flipButton.textContent = ' 🩷 ';
});

// Create a 5x5 grid of images

    images.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.classList.add('image-tile');
    img.dataset.index = index;
    img.addEventListener('click', () => showNoteModal(index));
    imageContainer.appendChild(img);
});

//appending all images

document.querySelectorAll('.image-tile').forEach
((img, index) => {
img.addEventListener('click',(event) => {
    if(!flipped) showNoteModal(event, index);
});
});

function showNoteModal(event, index) {
    
        const rect = event.target.getBoundingClientRect();
        noteModal.style.top = `${rect.top + window.scrollY}px`;
        noteModal.style.left = `${rect.left + window.scrollX}px`;
        noteText.textContent = notes[index];
        noteModal.style.display = 'block';

        
    
}

function closeNote() {
    noteModal.style.display = 'none';
}

flipButton.addEventListener('click', () => {
    flipped = !flipped;
    if (flipped) {
        flipImages();
        backgroundMusic.play();
    } else {
        revertImages();
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
    }
});

function flipImages() {
    const tiles = document.querySelectorAll('.image-tile');
    let order = Array.from({ length: tiles.length }, (_, i) => i);
    order.sort(() => Math.random() - 0.5);

    order.forEach((index, i) => {
        setTimeout(() => {
            const img = tiles[index];
            img.src = bigImageParts[index];
            img.classList.add('flipped','fadeIn');
            img.removeEventListener('click',showNoteModal);
        }, i * 900);
    });
}

function revertImages() {
    const tiles = document.querySelectorAll('.image-tile');
    tiles.forEach((img, index) => {
        img.src = images[index];
        img.classList.remove('flipped');
        img.addEventListener('click', (event) => { 
            if (!flipped) showNoteModal(event, index);
    });
});
}
