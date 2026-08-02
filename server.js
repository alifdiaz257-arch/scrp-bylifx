const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware untuk log request
app.use((req, res, next) => {
    console.log(`📥 ${req.method} ${req.url}`);
    next();
});

// Serve static files
app.use(express.static(__dirname, {
    extensions: ['html', 'htm'],
    index: 'index.html'
}));

// Handle 404 - All routes not found
app.use((req, res) => {
    const requestedUrl = req.url;
    console.log(`❌ 404 - ${requestedUrl} tidak ditemukan`);
    
    // Kirim 404.html dengan status 404
    const filePath = path.join(__dirname, '404.html');
    if (fs.existsSync(filePath)) {
        res.status(404).sendFile(filePath);
    } else {
        // Jika 404.html tidak ada, kirim pesan default
        res.status(404).send(`
            <!DOCTYPE html>
            <html>
            <head><title>404 - Halaman Tidak Ditemukan</title>
            <style>
                body { background:#06080f; color:#fff; font-family:Arial; display:flex; align-items:center; justify-content:center; height:100vh; text-align:center; }
                h1 { font-size:6rem; margin:0; background:linear-gradient(135deg,#8b5cf6,#06b6d4); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
                .container { max-width:500px; }
                a { color:#8b5cf6; text-decoration:none; }
                a:hover { text-decoration:underline; }
            </style>
            </head>
            <body>
                <div class="container">
                    <h1>404</h1>
                    <h2>Halaman Tidak Ditemukan</h2>
                    <p>Maaf, halaman yang Anda cari tidak dapat ditemukan.</p>
                    <a href="/">Kembali ke Beranda</a>
                </div>
            </body>
            </html>
        `);
    }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log('========================================');
    console.log('🚀 SERVER BERJALAN!');
    console.log(`📡 http://localhost:${PORT}`);
    console.log(`📱 http://localhost:${PORT}/scraper.html`);
    console.log(`📱 http://localhost:${PORT}/dashboard.html`);
    console.log(`📱 http://localhost:${PORT}/iqc.html`);
    console.log(`📱 http://localhost:${PORT}/admin.html`);
    console.log('========================================');
    console.log('✅ Semua error 404 akan redirect ke 404.html');
    console.log('========================================');
});