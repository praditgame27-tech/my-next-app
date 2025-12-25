// app/about/page.js

"use client"; 

import Button from "../components/Button"; 

export default function AboutPage() {

  const handleClick = () => {
    alert("ขอบคุณที่สนใจในโครงการของเรา! Thank you for your interest!");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6 text-center max-w-5xl mx-auto">
        <div className="mb-8">
          <span className="inline-block text-6xl mb-4">🚀</span>
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4">
            About Us
          </h1>
          <p className="text-xl text-gray-600 mt-4">
            สร้างประสบการณ์ดิจิทัลที่ยอดเยี่ยม
          </p>
        </div>

        {/* Description Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">💡</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Innovation</h2>
            <p className="text-gray-600">
              เราใช้เทคโนโลยีล่าสุดเพื่อสร้างโซลูชันสมัยใหม่
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">⚡</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Performance</h2>
            <p className="text-gray-600">
              ความเร็วและประสิทธิภาพสูงสุดในทุกการทำงาน
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Focus</h2>
            <p className="text-gray-600">
              มุ่งเน้นไปที่ความต้องการของผู้ใช้อย่างสมบูรณ์
            </p>
          </div>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">ที่มาของเรา</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            เรามีความมุ่งมั่นที่จะสร้างแอปพลิเคชันเว็บที่ทรงพลังและเป็นมิตรต่อผู้ใช้
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            ด้วยทีมที่มีทักษะและประสบการณ์สูง เรามุ่งมั่นที่จะส่งมอบคุณภาพสูงสุด
          </p>
          
          {/* Tech Stack */}
          <h3 className="text-2xl font-bold text-gray-800 mb-4">เทคโนโลยีที่เราใช้</h3>
          <div className="flex flex-wrap gap-3 mb-8">
            {['Next.js', 'React', 'MongoDB', 'Tailwind CSS', 'JavaScript'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">พร้อมที่จะทำงานด้วยกันหรือไม่?</h2>
          <p className="text-gray-600 mb-8">
            ติดต่อเราเพื่อเรียนรู้เพิ่มเติมเกี่ยวกับโครงการและบริการของเรา
          </p>
          <Button text="ติดต่อเรา →" onClick={handleClick} />
        </div>
      </section>

      {/* Footer spacing */}
      <div className="h-8"></div>
    </main>
  );
}
