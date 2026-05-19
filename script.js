const infoM = document.getElementById("info-modal");
const reqM = document.getElementById("request-modal");
const content = document.getElementById("modal-content");
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lb-img");
const container = document.getElementById('plugin-container');

function generateCards() {
    Object.keys(pluginData).forEach(key => {
        const data = pluginData[key];
        const count = localStorage.getItem(`dl_${key}`) || Math.floor(Math.random() * 50) + 10;
        localStorage.setItem(`dl_${key}`, count);

        const cardHTML = `
        <div class="glass-card" data-plugin="${key}">
            <div class="card-inner">
                <div class="card-head">
                    <div class="head-left">
                        <span class="badge ${data.badgeColor}">${data.category}</span>
                        <span class="download-stats">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            <span class="count-val" id="count-${key}">${count}</span>
                        </span>
                    </div>
                    <span class="version">${data.version}</span>
                </div>
                <button class="plugin-title">${data.title}</button>
                <div class="specs">
                    <div class="spec-item"><span>Purpose</span> ${data.purpose}</div>
                    <div class="spec-item"><span>Primary</span> ${data.primary}</div>
                    <div class="spec-item"><span>Impact</span> ${data.impact}</div>
                </div>
                <div class="card-footer">
                    <a href="downloads/${data.file}" class="dl-btn" data-id="${key}" download>Download JAR</a>
                </div>
            </div>
        </div>`;
        container.insertAdjacentHTML('beforeend', cardHTML);
    });

    const comingSoonHTML = `
    <div class="glass-card coming-soon-card">
        <div class="card-inner" style="display: flex; flex-direction: column; justify-content: center; height: 100%; min-height: 320px;">
            <div class="card-head">
                <span class="badge" style="background: rgba(255,255,255,0.05); color: #444;">Coming Soon</span>
            </div>
            <h2 style="font-size: 2.2rem; font-weight: 800; letter-spacing: -1px; margin-bottom: 15px; color: #333;">More Coming Soon</h2>
            <p style="color: #444; font-weight: 600; margin-bottom: 30px;">GET your custom plugin NOW FOR FREE</p>
            <div class="card-footer">
                <button class="dl-btn" style="background: #111; color: #444; cursor: default; border: 1px solid #222;">Awaiting Release</button>
            </div>
        </div>
    </div>`;
    container.insertAdjacentHTML('beforeend', comingSoonHTML);

    attachEventListeners();
}

function attachEventListeners() {
    document.querySelectorAll('.dl-btn[data-id]').forEach(btn => {
        btn.onclick = () => {
            const id = btn.getAttribute('data-id');
            let currentCount = parseInt(localStorage.getItem(`dl_${id}`));
            localStorage.setItem(`dl_${id}`, currentCount + 1);
            document.getElementById(`count-${id}`).innerText = currentCount + 1;
        };
    });

    document.querySelectorAll('.glass-card[data-plugin]').forEach(card => {
        const btn = card.querySelector('.plugin-title');
        const key = card.getAttribute('data-plugin');

        if (btn) {
            btn.onclick = () => {
                const data = pluginData[key];
                if(!data) return;
                let images = '';
                for (let i = 1; i <= 7; i++) {
                    images += `<img src="assets/${data.prefix}${i}.png" class="ss-img" onclick="openLB(this.src)" onerror="this.style.display='none'">`;
                }
                content.innerHTML = `
                    <h1 style="font-size: 3rem; letter-spacing: -2px; margin-bottom: 10px;">${data.title}</h1>
                    <p style="color: #666; margin-bottom: 30px; font-size: 1.1rem; line-height: 1.5;">${data.details}</p>
                    <div class="ss-grid">${images}</div>
                    <div style="padding: 25px; background: #000; border-radius: 16px; border: 1px solid #111;">
                        <p style="font-family: monospace; color: #444; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">${data.specs}</p>
                    </div>
                `;
                infoM.style.display = "block";
                document.body.style.overflow = "hidden";
            };
        }
    });
}

generateCards();

document.getElementById('request-btn').onclick = () => {
    reqM.style.display = "block";
    document.body.style.overflow = "hidden";
};

document.querySelectorAll('.close-ui').forEach(x => {
    x.onclick = () => {
        infoM.style.display = "none";
        reqM.style.display = "none";
        document.body.style.overflow = "auto";
    };
});

document.getElementById('req-msg').oninput = function() {
    const lines = this.value.split('\n');
    if (lines.length > 10) this.value = lines.slice(0, 10).join('\n');
};

document.getElementById('submit-request').onclick = () => {
    const user = document.getElementById('req-name').value;
    const msg = document.getElementById('req-msg').value;
    
    if(!user || !msg) return alert("All fields are required.");

    fetch("https://discord.com/api/webhooks/1497884496933163118/8Nny_54EdIxT67bWGaTCIS4AFSw1RI-ee_zk9afcKa5348FihDXOa_OCpqCZ74u8dg9A", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            embeds: [{
                title: "Studio Submission",
                color: 0x00d2ff,
                fields: [{ name: "Principal", value: user }, { name: "Request", value: msg }],
                timestamp: new Date()
            }]
        })
    }).then(() => {
        alert("Transmission successful.");
        reqM.style.display = "none";
        document.body.style.overflow = "auto";
    });
};

function openLB(src) { 
    lbImg.src = src; 
    lb.style.display = "flex"; 
}
lb.onclick = () => lb.style.display = "none";

window.onclick = (e) => {
    if (e.target == infoM || e.target == reqM) {
        infoM.style.display = "none";
        reqM.style.display = "none";
        document.body.style.overflow = "auto";
    }
};
