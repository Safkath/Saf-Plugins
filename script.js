const pluginData = {
    "junkthrower": {
        title: "JunkThrower",
        details: "Eliminates item clutter during high-speed Crystal PvP. Operates on a specialized filtration algorithm to ensure inventory cleanrooms. And without opening inventory in mid combat and when enabled it does not take any items that counts as 'junk' from the ground",
        specs: "1.21.x Optimized / Combat Integration / Threaded Logic. EnhancedCombat.use for luckperms and /junkthrow enable/disable for ON/OFF.",
        prefix: "junkthrower"
    },
    "susreports": {
        title: "Sus Reports",
        details: "Centralized monitoring system. Aggregates community data to prioritize staff action against suspicious actors.",
        specs: "Admin Dashboard / Automated Ranking / Database Sync. susreport.use for Luckperms and /sus for leaderboard and /report for reporting.",
        prefix: "susreports"
    },
    "crystalcombo": {
        title: "Crystal Combo",
        details: "Advanced combat sequencing tool designed for high-performance Crystal PvP. Focuses on improving frame rates by disabling unnecessary particles and fog. This is the maximum possible to reduce particle and fog for fully server side no client side interaction needed!",
        specs: "Fps improvement / Low Latency / PvP Optimization. crystalcombo.use for permissions and /noparticle disable/enable and same for /nofog 2 in ONE! .",
        prefix: "crystalcombo"
    }
};

const infoM = document.getElementById("info-modal");
const reqM = document.getElementById("request-modal");
const content = document.getElementById("modal-content");
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lb-img");

function updateDisplayCounts() {
    Object.keys(pluginData).forEach(key => {
        const count = localStorage.getItem(`dl_${key}`) || Math.floor(Math.random() * 50) + 10;
        if(!localStorage.getItem(`dl_${key}`)) localStorage.setItem(`dl_${key}`, count);
        const el = document.getElementById(`count-${key}`);
        if(el) el.innerText = count;
    });
}

document.querySelectorAll('.dl-btn[data-id]').forEach(btn => {
    btn.onclick = () => {
        const id = btn.getAttribute('data-id');
        let currentCount = parseInt(localStorage.getItem(`dl_${id}`));
        localStorage.setItem(`dl_${id}`, currentCount + 1);
        updateDisplayCounts();
    };
});

updateDisplayCounts();

document.querySelectorAll('.glass-card[data-plugin]').forEach(card => {
    const btn = card.querySelector('.plugin-title');
    const key = card.getAttribute('data-plugin');

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
});

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

function openLB(src) { lbImg.src = src; lb.style.display = "flex"; }
lb.onclick = () => lb.style.display = "none";

window.onclick = (e) => {
    if (e.target == infoM || e.target == reqM) {
        infoM.style.display = "none";
        reqM.style.display = "none";
        document.body.style.overflow = "auto";
    }
};
