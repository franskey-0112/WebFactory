import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  FaGraduationCap,
  FaPlay,
  FaClock,
  FaStar,
  FaUsers,
  FaBookmark,
  FaRegBookmark,
  FaSearch,
  FaFilter,
  FaArrowRight,
  FaCheckCircle,
  FaCertificate,
  FaChartLine,
  FaCode,
  FaBriefcase,
  FaLightbulb
} from 'react-icons/fa';
import CareerLinkHeader from '../../components/careerlink/CareerLinkHeader';

const courses = [
  {
    id: 'python-data-science',
    title: 'Python for Data Science',
    instructor: 'Dr. Sarah Chen',
    category: 'Data Science',
    level: 'Beginner',
    duration: '12h 30m',
    rating: 4.8,
    students: 45820,
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=225&fit=crop',
    skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
    hasCertificate: true,
    isPremium: false
  },
  {
    id: 'react-frontend',
    title: 'React.js: Complete Developer Guide',
    instructor: 'James Wilson',
    category: 'Software Development',
    level: 'Intermediate',
    duration: '18h 45m',
    rating: 4.9,
    students: 62340,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
    skills: ['React', 'JavaScript', 'Hooks', 'Redux'],
    hasCertificate: true,
    isPremium: true
  },
  {
    id: 'product-management',
    title: 'Product Management Fundamentals',
    instructor: 'Emily Rodriguez',
    category: 'Business',
    level: 'Beginner',
    duration: '8h 20m',
    rating: 4.7,
    students: 28910,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=225&fit=crop',
    skills: ['Product Strategy', 'User Research', 'Roadmapping', 'Agile'],
    hasCertificate: true,
    isPremium: false
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning A-Z',
    instructor: 'Prof. Michael Lee',
    category: 'Data Science',
    level: 'Advanced',
    duration: '24h 10m',
    rating: 4.8,
    students: 51200,
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=225&fit=crop',
    skills: ['ML', 'TensorFlow', 'Scikit-learn', 'Deep Learning'],
    hasCertificate: true,
    isPremium: true
  },
  {
    id: 'leadership-skills',
    title: 'Leadership & Management Skills',
    instructor: 'Angela Thompson',
    category: 'Leadership',
    level: 'Intermediate',
    duration: '6h 15m',
    rating: 4.6,
    students: 33500,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop',
    skills: ['Leadership', 'Communication', 'Team Management', 'Coaching'],
    hasCertificate: true,
    isPremium: false
  },
  {
    id: 'sql-databases',
    title: 'SQL & Database Design',
    instructor: 'Robert Kim',
    category: 'Software Development',
    level: 'Beginner',
    duration: '10h 00m',
    rating: 4.7,
    students: 39800,
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=225&fit=crop',
    skills: ['SQL', 'PostgreSQL', 'Database Design', 'Query Optimization'],
    hasCertificate: false,
    isPremium: false
  },
  {
    id: 'ux-design',
    title: 'UX Design: From Wireframe to Prototype',
    instructor: 'Lisa Park',
    category: 'Design',
    level: 'Beginner',
    duration: '14h 30m',
    rating: 4.9,
    students: 27600,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Thinking'],
    hasCertificate: true,
    isPremium: true
  },
  {
    id: 'communication-skills',
    title: 'Professional Communication',
    instructor: 'David Martinez',
    category: 'Business',
    level: 'Beginner',
    duration: '5h 45m',
    rating: 4.5,
    students: 19200,
    image: 'https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=400&h=225&fit=crop',
    skills: ['Presentation', 'Writing', 'Active Listening', 'Negotiation'],
    hasCertificate: false,
    isPremium: false
  }
];

const categories = ['All', 'Data Science', 'Software Development', 'Business', 'Leadership', 'Design'];
const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

const levelColor = {
  Beginner: 'text-green-600 bg-green-100',
  Intermediate: 'text-blue-600 bg-blue-100',
  Advanced: 'text-purple-600 bg-purple-100'
};

const categoryIcon = {
  'Data Science': <FaChartLine />,
  'Software Development': <FaCode />,
  'Business': <FaBriefcase />,
  'Leadership': <FaUsers />,
  'Design': <FaLightbulb />
};

const LearningPage = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeLevel, setActiveLevel] = useState('All Levels');
  const [bookmarked, setBookmarked] = useState(new Set());

  const filtered = courses.filter(c => {
    const matchesSearch = !search ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = activeCategory === 'All' || c.category === activeCategory;
    const matchesLevel = activeLevel === 'All Levels' || c.level === activeLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const toggleBookmark = (id) => {
    setBookmarked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <>
      <Head>
        <title>Learning - CareerLink</title>
        <meta name="description" content="Grow your skills with CareerLink Learning. Thousands of courses taught by industry experts." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <CareerLinkHeader />

        {/* Hero */}
        <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-14">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <FaGraduationCap className="text-5xl mx-auto mb-4 text-blue-200" />
            <h1 className="text-4xl font-bold mb-3">CareerLink Learning</h1>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Develop skills for your career with expert-led courses. Learn at your own pace, earn certificates, and stand out to employers.
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses, skills, topics..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full border-0 rounded-xl pl-11 pr-4 py-3.5 text-gray-900 shadow-lg focus:ring-2 focus:ring-blue-300 outline-none"
              />
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-8 mt-8 flex-wrap">
              <div><div className="text-2xl font-bold">16,000+</div><div className="text-blue-200 text-sm">Courses</div></div>
              <div><div className="text-2xl font-bold">500+</div><div className="text-blue-200 text-sm">Expert Instructors</div></div>
              <div><div className="text-2xl font-bold">50+</div><div className="text-blue-200 text-sm">Topic Areas</div></div>
              <div><div className="text-2xl font-bold">1M+</div><div className="text-blue-200 text-sm">Learners</div></div>
            </div>
          </div>
        </section>

        {/* Benefits Bar */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              {[
                { icon: <FaCheckCircle className="text-green-500" />, text: 'Learn at your own pace' },
                { icon: <FaCertificate className="text-blue-500" />, text: 'Earn shareable certificates' },
                { icon: <FaChartLine className="text-purple-500" />, text: 'Track your progress' },
                { icon: <FaBriefcase className="text-orange-500" />, text: 'Boost your career' },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-2">
                  {item.icon} {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="max-w-6xl mx-auto px-4 py-3 overflow-x-auto">
            <div className="flex items-center gap-3 min-w-max">
              <FaFilter className="text-gray-400 flex-shrink-0" size={13} />
              <div className="flex gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                      activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="w-px h-5 bg-gray-300 mx-1" />
              <div className="flex gap-2">
                {levels.map(level => (
                  <button
                    key={level}
                    onClick={() => setActiveLevel(level)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                      activeLevel === level ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {filtered.length} course{filtered.length !== 1 ? 's' : ''} {search && `for "${search}"`}
            </h2>
            {bookmarked.size > 0 && (
              <span className="text-sm text-blue-600 font-medium">
                {bookmarked.size} saved
              </span>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <FaGraduationCap className="text-5xl mx-auto mb-3 text-gray-300" />
              <p className="text-lg font-medium">No courses found</p>
              <p className="text-sm mt-1">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map(course => (
                <div key={course.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                  {/* Thumbnail */}
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <FaPlay className="text-blue-600 ml-0.5" size={14} />
                      </div>
                    </div>
                    {course.isPremium && (
                      <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded">
                        Premium
                      </span>
                    )}
                    <button
                      onClick={() => toggleBookmark(course.id)}
                      className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-100 transition-colors"
                    >
                      {bookmarked.has(course.id)
                        ? <FaBookmark className="text-blue-600" size={12} />
                        : <FaRegBookmark className="text-gray-500" size={12} />
                      }
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelColor[course.level]}`}>
                        {course.level}
                      </span>
                      {course.hasCertificate && (
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <FaCertificate size={10} className="text-blue-400" /> Certificate
                        </span>
                      )}
                    </div>

                    <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">{course.instructor}</p>

                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" size={11} />
                        <span className="font-semibold text-gray-700">{course.rating}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <FaUsers size={10} /> {course.students.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock size={10} /> {course.duration}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {course.skills.slice(0, 3).map(skill => (
                        <span key={skill} className="text-xs bg-blue-50 text-blue-700 rounded px-1.5 py-0.5">{skill}</span>
                      ))}
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition-colors">
                      {course.isPremium ? 'Enroll with Premium' : 'Start Learning'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Premium CTA */}
        <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-12 mt-6">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <FaCertificate className="text-4xl mx-auto mb-4 text-blue-200" />
            <h2 className="text-2xl font-bold mb-2">Unlock Premium Learning</h2>
            <p className="text-blue-100 mb-6">
              Get unlimited access to all courses, earn certificates, and accelerate your career growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                Start Free Trial
              </button>
              <Link href="/careerlink" className="border border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors">
                Back to Feed
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-8 text-center text-sm text-gray-500">
          <div className="flex justify-center gap-6">
            <Link href="/careerlink" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/careerlink/jobs" className="hover:text-blue-600 transition-colors">Jobs</Link>
            <Link href="/careerlink/network" className="hover:text-blue-600 transition-colors">Network</Link>
            <Link href="/careerlink/learning" className="text-blue-600 font-medium">Learning</Link>
          </div>
          <p className="mt-3">© 2024 CareerLink. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default LearningPage;
