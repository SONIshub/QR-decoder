var hamburger = document.querySelector(".hamburger");
hamburger.addEventListener("click", function () {
    let result = document.querySelector("body").classList.toggle("active");
    console.log(result)
})
generatorBoxx()
const generateBtn = document.getElementById('generateBtn')
generateBtn.addEventListener('click', generatorBoxx)
var mClicks = 1;
var cCount = 0;
function generatorBoxx() {
    cCount++;
    if (cCount >= mClicks) {
        window.location.reload()
    }
    const overlay = document.getElementById('overlay')
    const videoContainer = document.getElementById('videoContainer');
    const genratorBox = document.getElementById('genratorBox')
    const showData = document.getElementById('showData')
    const diode = document.getElementsByClassName('diode');

    let html = ''
    html += `
        <div class="page1">
        <p><span style="font-weight: bold;color:white;">-:QR Generator:-</span></p>
        <input type="text"  id="screen" maxlength="50" placeholder="Enter URL">
        <div class="qrImg">
        <a id="downloadLink" style="display: none;">
        <img id="qrImage" src=""/>
        </a>
        <h4 id="text"></h4>
        <p id='textDownload'></p>
        <button  id="btn" class="btn">Generate</button>
        </div>
        `
        // <a id="downloadBtn" class="btn">Download QR Code</a>
    genratorBox.innerHTML = html;
    const btn = document.getElementById('btn'); // Use getElementById instead of getElementsById
    btn.addEventListener('click', (e) => {
        const qrImage = document.getElementById('qrImage');
        const text = document.getElementById('text');
        const screen = document.getElementById('screen'); // Add this line
        const textDownload = document.getElementById('textDownload')

        qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=` + screen.value;
        text.innerText = screen.value;
        screen.value = ''
        textDownload.innerText = '( Click on QR code then download QR code )' 
        textDownload.style.backgroundColor='green'
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = qrImage.src;
        downloadLink.download = 'qrcode.png'; // Set the download filename
        downloadLink.style.display = 'block';
        console.log('it working');
    });
    videoContainer.style.display = 'none'
    genratorBox.style.display = 'block'
    showData.style.display = 'none'
    overlay.style.display = 'none'
    diode[0].style.display = 'none';
}

//code for QR code scanner which you are scan qr code easily

const scannerBtn = document.getElementById('scannerBtn');
scannerBtn.addEventListener('click',()=>{

const overlay = document.getElementById('overlay');
const genratorBox = document.getElementById('genratorBox');
const videoContainer = document.getElementById('videoContainer');
const diode = document.getElementsByClassName('diode');

let scanning = true; // Flag to track if video is being scanned


    const scanner = new Instascan.Scanner({ video: document.getElementById('scanner') });
    
  
    scanner.addListener('scan', function (content) {
        const showData = document.getElementById('showData');
        if (scanning) {
            let html1 = `
            
                <h2>-:Scan Text:-</h2>
                <p><a href=''>${content}</a></p>
              
              
            `;
            showData.innerHTML = html1;
            scanner.stop();
            videoContainer.style.display = 'none';
            overlay.style.display = 'none';
            diode[0].style.display= 'none'
            scanning = false;
        }
        scanning = true;
    });
    
    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            scanner.start(cameras[0]);
        
        } else {
            console.log('No cameras found!');
        }
    }).catch(function (error) {
        console.log(error);
    });

    videoContainer.style.display = 'block';
    genratorBox.style.display = 'none';
    showData.style.display = 'block';

    setTimeout(() => {
        overlay.style.display = 'block';
        diode[0].style.display = 'block'
    }, 1400);
});



// showData.style.display = 'none'

