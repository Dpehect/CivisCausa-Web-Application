'use client';

import { useEffect, useState, useRef } from 'react';

const ROW_HEIGHT = 70;
const BUFFER = 5;

export default function HomePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [allData, setAllData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [scrollTop, setScrollTop] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const workerRef = useRef<Worker | null>(null);

    useEffect(() => {
        // 1. Data Simulation
        const categories = ['İşkence', 'Basın Özgürlüğü', 'Zorunlu Göç', 'Ayrımcılık'];
        const data = Array.from({ length: 50000 }, (_, i) => ({
            id: i + 1,
            title: `Vaka Dosyası #${i + 1}: ${['Sistematik', 'Münferit', 'Kurumsal'][i % 3]} Hak İhlali Analizi`,
            category: categories[i % categories.length],
            date: `2024-0${(i % 9) + 1}-10`
        }));
        
        setAllData(data);
        setFilteredData(data);

        // 2. Web Worker Search
        const workerCode = `
            let data = [];
            self.onmessage = function(e) {
                if (e.data.type === 'LOAD') data = e.data.payload;
                if (e.data.type === 'SEARCH') {
                    const filtered = data.filter(item => 
                        item.title.toLowerCase().includes(e.data.query.toLowerCase()) ||
                        item.category.toLowerCase().includes(e.data.query.toLowerCase())
                    );
                    self.postMessage(filtered);
                }
            };
        `;
        const blob = new Blob([workerCode], { type: 'application/javascript' });
        workerRef.current = new Worker(URL.createObjectURL(blob));
        workerRef.current.postMessage({ type: 'LOAD', payload: data });
        workerRef.current.onmessage = (e) => {
            setFilteredData(e.data);
            if (containerRef.current) containerRef.current.scrollTop = 0;
        };

        // 3. Canvas Visualization
        const canvas = document.getElementById('main-viz') as HTMLCanvasElement;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const rect = canvas.parentElement!.getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = 120;
                ctx.strokeStyle = '#E63946';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(0, canvas.height);
                for (let i = 0; i < 100; i++) {
                    ctx.lineTo((canvas.width / 100) * i, canvas.height - (Math.random() * 80 + 20));
                }
                ctx.stroke();
            }
        }

        setTimeout(() => setIsLoading(false), 800);

        return () => workerRef.current?.terminate();
    }, []);

    useEffect(() => {
        workerRef.current?.postMessage({ type: 'SEARCH', query: searchTerm });
    }, [searchTerm]);

    const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - BUFFER);
    const endIndex = Math.min(filteredData.length - 1, Math.floor((scrollTop + (containerRef.current?.clientHeight || 600)) / ROW_HEIGHT) + BUFFER);
    
    const displayedItems = filteredData.slice(startIndex, endIndex + 1).map((item, index) => ({
        ...item,
        top: (startIndex + index) * ROW_HEIGHT
    }));

    return (
        <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
            <aside id="sidebar">
                <div className="sidebar-brand">
                    <span className="caps-label">Portal v3.0</span>
                    <h2 style={{ fontSize: '1.5rem' }}>Civis Causa</h2>
                </div>

                <section className="filters">
                    <div style={{ marginBottom: '2rem' }}>
                        <span className="caps-label">Kategori</span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.85rem' }}><input type="checkbox" defaultChecked /> İşkence Vakaları</label>
                            <label style={{ fontSize: '0.85rem' }}><input type="checkbox" /> Basın Özgürlüğü</label>
                            <label style={{ fontSize: '0.85rem' }}><input type="checkbox" /> Zorunlu Göç</label>
                        </div>
                    </div>
                </section>

                <footer style={{ marginTop: 'auto', color: 'var(--text-dim)', fontSize: '0.75rem' }}>
                    <p>Performans: 0ms Lag Engine</p>
                </footer>
            </aside>

            <main style={{ flex: 1 }}>
                <header className="search-wrapper">
                    <input 
                        type="text" 
                        className="search-input" 
                        placeholder="Binlerce vaka arasında ara..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </header>

                <section className="bento-grid">
                    <div className="bento-card large">
                        <div>
                            <span className="caps-label">Soruşturma</span>
                            <h1>Sistematik <br />İhlallerin Anatomisi</h1>
                        </div>
                        <p style={{ color: 'var(--text-dim)', maxWidth: '400px' }}>50,000+ vakanın derinlemesine analizi ve görselleştirilmiş raporu.</p>
                    </div>

                    <div className="bento-card">
                        <span className="caps-label">Toplam Vaka</span>
                        <div className="stat-num">52.4K</div>
                    </div>

                    <div className="bento-card">
                        <span className="caps-label">Doğrulama</span>
                        <div className="stat-num" style={{ color: 'var(--accent)' }}>92%</div>
                    </div>

                    <div className="bento-card wide">
                        <span className="caps-label">Trend Trendi</span>
                        <div className="viz-container">
                            <canvas id="main-viz"></canvas>
                        </div>
                    </div>
                </section>

                <section className="archive-view">
                    <div style={{ padding: '1rem 2rem', borderBottom: '2px solid #000', display: 'grid', gridTemplateColumns: '60px 1fr 180px 120px', fontWeight: 900, fontSize: '0.75rem', color: 'var(--accent)' }}>
                        <div>ID</div>
                        <div>VAKA BAŞLIĞI</div>
                        <div>KATEGORİ</div>
                        <div>TARİH</div>
                    </div>

                    <div 
                        id="virtual-container" 
                        ref={containerRef}
                        onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
                    >
                        <div className="list-viewport" style={{ height: `${filteredData.length * ROW_HEIGHT}px` }}>
                            {isLoading ? (
                                Array.from({ length: 10 }).map((_, i) => (
                                    <div key={i} className="row-item skeleton" style={{ transform: `translateY(${i * ROW_HEIGHT}px)` }}></div>
                                ))
                            ) : (
                                displayedItems.map(item => (
                                    <div 
                                        key={item.id} 
                                        className="row-item" 
                                        style={{ transform: `translateY(${item.top}px)` }}
                                    >
                                        <div style={{ fontWeight: 900, color: 'var(--accent)' }}>#{item.id}</div>
                                        <div style={{ fontWeight: 600 }}>{item.title}</div>
                                        <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-dim)' }}>{item.category}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{item.date}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
