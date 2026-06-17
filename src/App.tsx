// @ts-nocheck
import 'https://cdn.jsdelivr.net/npm/tailwindcss-just-in-time@0.1.5/dist/tailwind.min.css';
import React, { useState } from 'react';

export default function App() {
  // ข้อมูลเริ่มต้นสำหรับหน้าแสดงผลธีมสีทองหรูหรา PTM Agriculture
  const [links, setLinks] = useState([
    { id: '1', title: '🌱 หน้าแรกเว็บไซต์ PTM Agriculture', url: 'https://www.ptmagriculture.com' },
    { id: '2', title: '🚜 ระบบจัดการภายในบริษัท (Internal Hub)', url: '#', isInternal: true },
    { id: '3', title: '📊 รายงานผลการดำเนินงานประจำปี', url: '#' },
    { id: '4', title: '📞 ติดต่อฝ่ายสนับสนุนและประสานงาน', url: '#' }
  ]);

  const [isAdmin, setIsAdmin] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newUrl) return;
    setLinks([...links, { id: Date.now().toString(), title: newTitle, url: newUrl }]);
    setNewTitle('');
    setNewUrl('');
  };

  const handleDeleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-amber-950 to-black text-amber-100 font-sans p-6 flex flex-col items-center">
      {/* ส่วนหัวเว็บโลโก้สีทองหรูหรา */}
      <div className="w-full max-w-md text-center my-8 p-6 border border-amber-500/30 rounded-2xl bg-black/40 backdrop-blur-md shadow-2xl shadow-amber-500/10">
        <div className="w-20 h-20 bg-gradient-to-tr from-amber-400 to-amber-600 rounded-full mx-auto flex items-center justify-center shadow-lg shadow-amber-500/20 mb-4 text-black font-black text-2xl">
          PTM
        </div>
        <h1 className="text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
          PTM Agriculture
        </h1>
        <p className="text-xs text-amber-400/70 mt-1 uppercase tracking-widest">หน้ารวมลิงก์และระบบบริหารจัดการ</p>
      </div>

      {/* รายการลิงก์ทั้งหมด */}
      <div className="w-full max-w-md space-y-4">
        {links.map((link) => (
          <div key={link.id} className="relative group">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center p-4 rounded-xl border border-amber-500/20 bg-gradient-to-r from-amber-950/40 to-black/60 hover:from-amber-500/20 hover:to-amber-600/20 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/10 text-sm font-medium"
            >
              {link.title}
            </a>
            {isAdmin && (
              <button
                onClick={() => handleDeleteLink(link.id)}
                className="absolute -right-2 -top-2 bg-red-600 hover:bg-red-700 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center shadow-md border border-black transition-transform active:scale-95"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      {/* ส่วนควบคุมโหมดแอดมิน (Admin Dashboard) */}
      <div className="w-full max-w-md mt-12 border-t border-amber-500/20 pt-6">
        <div className="bg-black/50 border border-amber-500/10 rounded-xl p-4 text-center">
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className="text-xs text-amber-400/60 hover:text-amber-400 transition-colors underline"
          >
            {isAdmin ? '🔒 ปิดโหมดผู้ดูแลระบบ' : '🔑 เปิดโหมดผู้ดูแลระบบ (Admin Dashboard)'}
          </button>

          {isAdmin && (
            <form onSubmit={handleAddLink} className="mt-4 space-y-3 text-left">
              <div>
                <label className="block text-xs text-amber-400/80 mb-1">ชื่อลิงก์ใหม่</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-gray-900 border border-amber-500/30 rounded-lg p-2 text-sm text-amber-100 focus:outline-none focus:border-amber-400"
                  placeholder="เช่น ติดต่อ Line Official"
                />
              </div>
              <div>
                <label className="block text-xs text-amber-400/80 mb-1">ลิงก์ URL (https://)</label>
                <input
                  type="url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full bg-gray-900 border border-amber-500/30 rounded-lg p-2 text-sm text-amber-100 focus:outline-none focus:border-amber-400"
                  placeholder="https://example.com"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold p-2 rounded-lg text-sm hover:from-amber-400 hover:to-amber-500 transition-all active:scale-[0.98]"
              >
                ＋ เพิ่มลิงก์เข้าสู่ระบบ
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
