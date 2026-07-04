'use client';

import React from 'react';

export default function TimeFyiLanding() {
  const tools = [
    {
      title: "Timezones",
      description: "Convert time across different zones",
      icon: "🌍",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Pomodoro",
      description: "Boost productivity with timed work sessions",
      icon: "⏳",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "World Clock",
      description: "Check current time anywhere in the world",
      icon: "🕒",
      color: "from-purple-500 to-violet-500"
    },
    {
      title: "Timer",
      description: "Set countdowns with alarm for any task",
      icon: "⏰",
      color: "from-amber-500 to-yellow-500"
    },
    {
      title: "Stopwatch",
      description: "Measure elapsed time precisely",
      icon: "⚡",
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Daily Planner",
      description: "Plan your days and weeks to stay organized",
      icon: "📅",
      color: "from-rose-500 to-pink-500"
    },
  ];

  return (
    <div className="w-full bg-zinc-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-light">time.fyi</h1>
          <a href="#start" 
             className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition">
            Start App
          </a>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-4xl mx-auto text-center pt-24 pb-20 px-6">
        <h2 className="text-6xl md:text-7xl font-light tracking-tighter mb-6">
          All Your Time Tools<br />in One Place
        </h2>
        <p className="text-2xl text-zinc-400 mb-10">
          Time related tools to help you stay productive and organized
        </p>
        
        <div className="flex justify-center gap-4">
          <a href="#tools" 
             className="px-8 py-4 bg-white text-black rounded-2xl text-lg font-medium hover:scale-105 transition">
            Explore Tools
          </a>
          <a href="#" 
             className="px-8 py-4 border border-zinc-700 rounded-2xl text-lg font-medium hover:bg-zinc-900 transition">
            No sign-up required
          </a>
        </div>
      </div>

      {/* Tools Grid */}
      <div id="tools" className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="group bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-3xl p-8 transition-all hover:-translate-y-1"
            >
              <div className={`inline-block text-5xl mb-6 p-4 rounded-2xl bg-gradient-to-br ${tool.color} bg-opacity-10`}>
                {tool.icon}
              </div>
              
              <h3 className="text-3xl font-light mb-3">{tool.title}</h3>
              <p className="text-zinc-400 text-lg leading-relaxed">
                {tool.description}
              </p>

              <div className="mt-8 text-sm text-zinc-500 group-hover:text-zinc-400 transition">
                → Open tool
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / CTA */}
      <div className="border-t border-zinc-800 py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <p className="text-zinc-400 text-xl mb-6">
            Keep using the app for free.<br />
            Upgrade anytime to support development.
          </p>
          <button className="px-10 py-4 bg-white text-black rounded-2xl text-lg font-medium">
            Get Started — It's Free
          </button>
        </div>
      </div>
    </div>
  );
}