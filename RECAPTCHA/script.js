let mouseMovement = [];
document.addEventListener('mousemove', (event) => {
    mouseMovement.push({x: event.clientX, y: event.clientY});
    if (mouseMovement.length > 100) {
        mouseMovement.shift();
    }
});

function checkBatteryStatus() {
    return new Promise((resolve) => {
        if (navigator.getBattery) {
            navigator.getBattery().then((battery) => {
                console.log('Battery level:', battery.level);
                console.log('Battery charging:', battery.charging);
                resolve({level: battery.level, charging: battery.charging});
            });
        } else {
            console.log('Battery API not supported.');
            resolve(null); 
        }
    });
}

function getIpAddress() {
    return fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            console.log('IP address:', data.ip);
            return data.ip;
        })
        .catch(() => {
            console.log('Failed to fetch IP address.');
            return null;
        });
}

function checkResources() {
    const stylesheets = document.styleSheets;
    const images = document.images;
    console.log('Stylesheets loaded:', stylesheets.length);
    console.log('Images loaded:', images.length);
    return {
        stylesheetsLoaded: stylesheets.length,
        imagesLoaded: images.length
    };
}

async function evaluateCaptcha() {
    const statusElement = document.getElementById('captchaStatus');
    const submitButton = document.getElementById('submitButton');

    const batteryStatus = await checkBatteryStatus();
    const ipAddress = await getIpAddress();
    const resourcesLoaded = checkResources();

    console.log('Mouse movements count:', mouseMovement.length);

    if (mouseMovement.length > 50 && batteryStatus && ipAddress && resourcesLoaded.stylesheetsLoaded > 0) {
        statusElement.textContent = 'Verification complete!';
        submitButton.disabled = false;
    } else {
        statusElement.textContent = 'Verification failed. Please refresh the page.';
        submitButton.disabled = true;
    }
}

setTimeout(evaluateCaptcha, 3000);
