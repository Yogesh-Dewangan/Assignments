import './suffle.prototype.js';

const img1 = './image/1.jfif';
const img2 = './image/2.jpg';
const img3 = './image/3.jpg';
const img4 = './image/4.jpg';
const img5 = './image/5.jpg';

const images_img = document.querySelectorAll("[data-ns-test]");
const images = [img1, img2, img3, img4, img5];

export default function imageHandler() {
    
    images.suffle();
    // console.log(images)
    for (let i = 0; i < images.length; i++) {
        images_img[i].setAttribute('src', images[i])
    }
    
    addDuplicateImg();
    // addOnClickToImages();

}

let count = 0;
const mapImg = new Map();

function addDuplicateImg() {

    const img = images_img[Math.floor(Math.random()*images_img.length)];
    const imgClone = img.cloneNode(true);
    // console.log('imgClone', imgClone)
    imgClone.setAttribute('alt', 'img6')
    const imgContainer = document.querySelector('.duplicate-img')
    imgContainer.append(imgClone)
    // console.log(imgClone)
    const newImages_img = document.querySelectorAll('[data-ns-test]');
     
    // console.log(newImages_img);

    newImages_img.forEach((image) => {
        image.addEventListener('click', (e) => {
            let alt = e.target.attributes[2].value;
            let dataNsTest = e.target.attributes[0].value;
            // e.target.style.transform = 'scale(0.9)';
            if (!mapImg.has(alt)) {
                mapImg.set(alt, dataNsTest);
                // console.log(mapImg)
                count++;
            }
            
            // console.log(count)
            resetHandler();
            varifyHandler();
        })
    })

}

const reset_btn = document.getElementById('reset');
const varify_btn = document.getElementById('btn');

function resetHandler() {
    if (count >= 1) {
        reset_btn.style.display = 'inline-block';
    }
}

reset_btn.addEventListener('click', (e) => {
    count = 0;
    reset_btn.style.display = 'none';
    mapImg.clear();
    para1_p.style.display = 'none';
    para2_p.style.display = 'none';
    varify_btn.style.display = 'none';

    // console.log(count)
})

function varifyHandler() {
    if (count >= 2) {
        varify_btn.style.display = 'inline-block';
    }
}

const para1_p = document.getElementById('para1');
const para2_p = document.getElementById('para2');

varify_btn.addEventListener('click', (e) => {
    if (count === 2) {
        let temp = [];
        mapImg.forEach((value) => {
            temp.push(value)
        })
        console.log(temp)
        if (temp[0] === temp[1]){
            para1_p.style.display = 'block';
        } else {
            para2_p.style.display = 'block';
        }
        varify_btn.style.display = 'none';
    }
})

// module.exports = imageHandler