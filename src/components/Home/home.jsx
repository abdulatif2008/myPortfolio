import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, Globe, Code, Zap, Ghost, Mail, Github, ExternalLink } from 'lucide-react';
import './home.css'
import flow1 from '../img/flow2.jpg';
import flow2 from '../img/flow1.jpg'
import book1 from '../img/book3.jpg'
import book2 from '../img/book2.jpg'
import gilam1 from '../img/gilam1.jpg'
import gilam2 from '../img/gilam2.jpg'
import mock1 from '../img/mock1.jpg'
import mock2 from '../img/mock2.jpg'
import liga1 from '../img/liga1.jpg'
import liga2 from '../img/liga2.jpg'

const CRT_THEME = {
  green: "#33ff33",
  glow: "0 0 10px rgba(51, 255, 51, 0.7)",
};

export default function RetroPortfolio() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState(['SYSTEM READY...', 'TYPE "HELP" TO SEE COMMANDS']);
  const [currentView, setCurrentView] = useState('terminal'); // 'terminal', 'about', 'projects', etc.
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsBooting(false), 2000);
  }, []);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.toLowerCase().trim();
      setHistory([...history, `> ${cmd}`]);
      
      if (['about', 'experience', 'interests', 'projects', 'contact'].includes(cmd)) {
        setCurrentView(cmd);
      } else if (cmd === 'help') {
        setHistory([...history, `> ${cmd}`, 'Available comands: ABOUT, EXPERIENCE, INTERESTS, PROJECTS, CONTACT, CLEAR']);
      } else if (cmd === 'clear') {
        setHistory([]);
        setCurrentView('terminal');
      } else {
        setHistory([...history, `> ${cmd}`, 'UNKNOWN COMMAND. ERROR 404.']);
      }
      setInput('');
    }
  };

  return (
    <div className="crt-container">
      <div className="crt-bezel">
        <div className="crt-screen">
          {/* Scanline & Static Overlays */}
          <div className="scanlines" />
          <div className="noise" />

          {isBooting ? (
            <div className="boot-sequence">BIOS v4.0.1... <br/>MEMORY CHECK: 640KB OK...</div>
          ) : (
            <div className="content-wrapper">
              <AnimatePresence mode="wait">
                {currentView === 'terminal' && (
                  <motion.div key="term" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="history">
                      {history.map((line, i) => <div key={i}>{line}</div>)}
                    </div>
                    <div className="input-line">
                      <span>{'>'}</span>
                      <input 
                        autoFocus 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        onKeyDown={handleCommand}
                      />
                      <span className="cursor" />
                    </div>
                  </motion.div>
                )}

                {currentView === 'about' && (
                  <ContentView title="Abdulatifs information" onBack={() => setCurrentView('terminal')}>
                    <div className="grid-layout">
                        <p>Full name: Abdurahmonov Abdulatif</p>
                      <p><Cpu size={14}/> age: 17 (Data Encrypted)</p>
                      <p><Globe size={14}/> location: Andijan, Asaka</p>
                      <p><Code size={14}/> education: 60-general school GPA: 4.86 / 5.00. <br /> Studied Frontend development and programming fundamentals in Turon Talim. <br /> 4 Years of intensive english learner at English Life. <br />
                        English Proficient with CEFR b2(62). <br />SAT preparation - Started December 2025. </p>
                      <p><Zap size={14}/> PURPOSE: Being founder of start-ups that have benefits for people and loved by people. (The only solution is: Creativity)</p>
                    </div>
                  </ContentView>
                )}

                {currentView === 'experience' && (
                  <ContentView title="User Experience" onBack={() => setCurrentView('terminal')}>
                    <ul className="pixel-list">
                        <li>Support Teacher & Frontend Developer | TimeSchool, Andijan 2025 - Present</li>
                      <li>Freelance Frontend Developer | Remote | 5 months</li>
                      <li>Interactive UI Designer: Framer Motion / Three.js</li>
                      <li>Head Coder of Small programmer team</li>
                      <li>Status: Available for freelance high-stakes missions</li>
                    </ul>
                  </ContentView>
                )}

                {currentView === 'interests' && (
                  <ContentView title="User Interests" onBack={() => setCurrentView('terminal')}>
                    <div className="interests-bubbles">
                      {['CREATING STUFF: Make imaginations become real', 'MOVIES: love insparition & survival movies', 'CHESS: chess player with tactical preference. Second ranked at school.', 'FOOTBALL: highly skilled player. Football tournament winner with school.', ' DRAWING: skilled as can draw next Mona Lisa'].map(item => (
                        <motion.div whileHover={{ scale: 1.1, color: '#fff' }} className="bubble" key={item}>
                          [{item}]
                        </motion.div>
                      ))}
                    </div>
                  </ContentView>
                )}

                {currentView === 'projects' && (
                  <ProjectGrid onBack={() => setCurrentView('terminal')} />
                )}

                {currentView === 'contact' && (
                  <ContentView title="CONTACT_INFORMATION" onBack={() => setCurrentView('terminal')}>
                    <div className="blog-contact">
                      <p><Mail /> abdulatifmortis@gmail.com</p>
                      <p><Github /> @abdulatif2008/github</p>
                      <p><Ghost /> +998 94 860 90 15</p>
                      <div className="blog-post">
                        <h3>Blog posts: soon...</h3>
                        
                      </div>
                    </div>
                  </ContentView>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Sub-components for structure
const ContentView = ({ title, children, onBack }) => (
  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="view-window">
    <h2 className="view-title">--- {title} ---</h2>
    {children}
    <button className="back-btn" onClick={onBack}>RETURN TO TERMINAL</button>
  </motion.div>
);

const ProjectGrid = ({ onBack }) => {
  const [selected, setSelected] = useState(null);
  const [showImages, setShowImages] = useState(false);

  const projects = [
    { id: 1, name: "Flow Tracker", images: [flow1, flow2], desc: "Future version of daily journal", longDesc: "description: Another level of daily journal where you can write your daily thought in addition add tasks in the beginning of the day as to do list. It tracks your daily, weekly and monhly  progress with clean dashboard.", Problem: "Probem & Goal: Problem - most people can't track their daily life and plan their day as most of people forget their main task of the day. Goal- Reminding users their tasks to do in a day and keeping their progress as they can analyze their daily life.", Role: "Role: Full-Stack coder", Year: "Year: 2025", Status: "tracker-53c63.web.app"  },
    { id: 2, name: "Asaka Superliga", images:[liga1, liga2  ], desc: "Oficcial web-site for local football club.", longDesc: "description: Main idea of website is sharing matches,goals,players and most importantly table of league for fans. Used react.js and django rest-framework to build with jazzmin controllable admin panel.", Problem: "Problem - A lot of fans including me had a difficuly to see stats, clubs and ranking of table. There was almost no source to follow league news. Goal - Fans can now be aware of every upcoming and finished games with scored goals and ranking of clubs as table. Fans and league organizators are pretty happy from this solution.", Role: "Role: Full-Stack programmer", Year: "Year: 2025" },
    {id: 3, name: "BookShare", images:[book1,book2], desc: "Platform to exchange books you finished.", longDesc: "As we see lot's of people who love reading are not always able to buy new book, we build this platform where you can swap books with others or you also can sell your book if you already red it.", Problem: "Problem - As I said, not every book lover is able to buy new book often. Goal - Giving people chance to read book they want to read by exchanging book they already finished. As we expect lots of users loved and gave thankfull commentaries to our team.", Role: "Role: Backend programmer", Year: "Year: 2025"},
    {id: 4, name: "Ideal Gilam", images:[gilam1, gilam2], desc: "Web platform for carpet washing factory.", longDesc: "Carpet factory booked this platform to manage whole factory. Controlling orders, workers, and can see daily,weekly,monthly and yearly profit with profiles for each worker. Features with adding orders, new workers and changing worker roles.", Problem: "Problem - before this project factory had not any journal to track everything which affected negatively to factory's budget said its owner. Goal - Monitoring everything in the factory from small expenses to workers and accessing every workers live information.", Role: "ROle: Frontend programmer", Year: "Year: 2024", Status: "Paused due to seasonal operations" },
    {id: 5, name: "Mock-Zone", images:[mock1, mock2], desc: "CD IELTS mock platofrm with exact atmosphere as real IELTS exam.", longDesc: "Platform for not only test users IELTS skills but also give them real atmosphere of DC exam and make them ready for real IELTS test.", Problem: "Problem - Paper IELTS no more available in Uzbekistan which means students can have problem with CD one. Especially for students who do not know use computer well enough. \n Goal - Help IELTS preparations to understand CD IELTS before their real exam,In additon set up for education centres as weekly mock exam.", Role: "Role: Fulll-Stack coder", Year: "Year: Ongoing...", Status: "Not on production yet..."}
  ];

  return (
    <div className="view-window">
      <div className="project-grid">
        {projects.map(p => (
          <motion.div 
            key={p.id} 
            whileHover={{ x: 10 }}
            className="project-card"
            onClick={() => setSelected(p)}
          >
            {'>'} {p.name} <span className="tooltip">[{p.desc}]</span>
          </motion.div>
        ))}
      </div>
      
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="modal">
            <h3>{selected.name}</h3>
            <p>{selected.longDesc}</p>
            <p>{selected.Problem}</p>
            <p>{selected.Role}</p>
            <div className="items">
            <p>{selected.Year}</p>  <button className="pictures-btn" onClick={() => setShowImages(true)}>pictures</button>

            </div>
            <p>
            <a 
              href={`https://${selected.Status}`} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#0070f3', textDecoration: 'underline' }} // Optional styling
            >
              {selected.Status}
            </a>
          </p>
            <button onClick={() => setSelected(null)}>[CLOSE]</button>
          </motion.div>
        )}

<AnimatePresence>
  {showImages && (
    <motion.div
      className="image-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowImages(false)}
    >
      <motion.div
        className="image-modal"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        {selected?.images?.map((img, i) => (
          <img key={i} src={img} alt="" />
        ))}

        <button className='closebtn' onClick={() => setShowImages(false)}>[CLOSE]</button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      </AnimatePresence>

      <button className="back-btn" onClick={onBack}>RETURN</button>
    </div>
  );
};