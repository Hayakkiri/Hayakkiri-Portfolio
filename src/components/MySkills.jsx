import { useState, useEffect } from 'react';

function MySkills() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const skillsSection = document.getElementById('skills-section');
    if (skillsSection) {
      observer.observe(skillsSection);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const skillCategories = [
    {
      id: 1,
      title: "CAD Design",
      skills: ["SolidWorks", "AutoCAD", "Creo"],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: "from-blue-500 to-cyan-400",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      borderColor: "border-blue-200",
      hoverColor: "hover:border-blue-400 hover:shadow-blue-200/50"
    },
    {
      id: 2,
      title: "CNC Operations",
      skills: ["CNC Programming", "Machine Operation", "Tool Setup"],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      borderColor: "border-purple-200",
      hoverColor: "hover:border-purple-400 hover:shadow-purple-200/50"
    },
    {
      id: 3,
      title: "Quality Control",
      skills: ["Inspection", "Testing", "Documentation"],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      hoverColor: "hover:border-green-400 hover:shadow-green-200/50"
    },
    {
      id: 4,
      title: "Engineering Design",
      skills: ["Technical Drawings", "Schematics", "Blueprint Reading"],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: "from-orange-500 to-red-500",
      bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
      borderColor: "border-orange-200",
      hoverColor: "hover:border-orange-400 hover:shadow-orange-200/50"
    }
  ];

  const proficiencyLevels = [
    { skill: "SolidWorks", level: 90, category: "CAD Design", color: "from-blue-500 to-cyan-400" },
    { skill: "AutoCAD", level: 85, category: "CAD Design", color: "from-cyan-500 to-blue-400" },
    { skill: "Creo", level: 80, category: "CAD Design", color: "from-indigo-500 to-blue-400" },
    { skill: "CNC Programming", level: 88, category: "CNC Operations", color: "from-purple-500 to-pink-400" },
    { skill: "Quality Control", level: 95, category: "Quality Control", color: "from-green-500 to-emerald-400" },
    { skill: "Technical Drawings", level: 92, category: "Engineering Design", color: "from-orange-500 to-red-400" }
  ];

  return (
    <section id="skills-section" className="min-h-screen bg-gradient-to-br from-blue-50/30 to-purple-50/30 py-20">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Title */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 transform transition-all duration-1000 leading-tight ${
            isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}>
            <span className="block sm:inline">My</span>
            <span className="block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 sm:ml-4">
              Skills
            </span>
          </h2>
          <div className={`w-24 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mx-auto rounded-full transform transition-all duration-800 delay-200 ${
            isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
          }`}></div>
          <p className={`text-lg text-gray-600 mt-6 max-w-2xl mx-auto transform transition-all duration-1000 delay-400 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
          }`}>
            Technical expertise and professional competencies developed through years of hands-on experience
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <div
              key={category.id}
              className={`${category.bgColor} ${category.borderColor} ${category.hoverColor} border-2 rounded-2xl p-6 transform transition-all duration-800 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl cursor-pointer group ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${600 + index * 150}ms` }}
              onMouseEnter={() => setHoveredSkill(category.id)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* Icon Header */}
              <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center text-white mb-4 mx-auto transform transition-all duration-300 ${
                hoveredSkill === category.id ? 'rotate-12 scale-110' : ''
              }`}>
                {category.icon}
              </div>

              {/* Category Title */}
              <h3 className="text-xl font-bold text-gray-800 text-center mb-4 group-hover:text-blue-600 transition-colors duration-300">
                {category.title}
              </h3>

              {/* Skills List */}
              <div className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill}
                    className={`bg-white/70 backdrop-blur-sm rounded-lg px-3 py-2 text-center text-gray-700 font-medium text-sm transform transition-all duration-300 ${
                      hoveredSkill === category.id 
                        ? 'translate-x-0 opacity-100' 
                        : 'translate-x-2 opacity-80'
                    }`}
                    style={{ transitionDelay: `${skillIndex * 100}ms` }}
                  >
                    {skill}
                  </div>
                ))}
              </div>

              {/* Hover Effect Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 pointer-events-none`}></div>
            </div>
          ))}
        </div>

        {/* Proficiency Bars Section */}
        <div className={`bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 transform transition-all duration-1000 delay-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h3 className={`text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 transform transition-all duration-800 delay-1200 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}>
            Proficiency Levels
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {proficiencyLevels.map((item, index) => (
              <div
                key={item.skill}
                className={`transform transition-all duration-800 ${
                  isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                }`}
                style={{ transitionDelay: `${1400 + index * 100}ms` }}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-800 font-bold text-lg">{item.skill}</span>
                  <span className={`text-sm font-bold px-3 py-1 rounded-full bg-gradient-to-r ${item.color} text-white shadow-lg`}>{item.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner relative">
                  {/* Background pattern */}
                  <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                  
                  {/* Animated progress bar */}
                  <div 
                    className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-2500 ease-out relative overflow-hidden shadow-lg`}
                    style={{ 
                      width: isVisible ? `${item.level}%` : '0%',
                      transitionDelay: `${1600 + index * 200}ms`
                    }}
                  >
                    {/* Loading animation sweep */}
                    <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-white/70 to-transparent transition-all duration-2000 ease-out"
                      style={{
                        width: '30%',
                        transform: isVisible ? 'translateX(300%)' : 'translateX(-100%)',
                        transitionDelay: `${1600 + index * 200}ms`
                      }}
                    ></div>
                    
                    {/* Glossy overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className={`text-center mt-12 transform transition-all duration-1000 delay-2000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}>
          <p className={`text-gray-600 transform transition-all duration-800 delay-2100 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}>
            Continuously expanding expertise through hands-on projects and professional development
          </p>
        </div>
      </div>
    </section>
  );
}

export default MySkills;
