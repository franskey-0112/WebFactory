// CompanyCheck data utilities
import staticCompanyCheckData from '../data/staticCompanyCheckData';

const {
  companies,
  jobPositions,
  reviews,
  salaries,
  interviews,
  jobCategories,
  industries,
  companySizes,
  jobs
} = staticCompanyCheckData;

// Company utilities
export const getCompanies = () => companies;

export const getCompanyById = (companyId) => {
  return companies.find(company => company.id === companyId);
};

export const searchCompanies = (query, filters = {}) => {
  let filteredCompanies = companies;

  // Text search
  if (query) {
    const searchTerm = query.toLowerCase();
    filteredCompanies = filteredCompanies.filter(company =>
      company.name.toLowerCase().includes(searchTerm) ||
      company.industry.toLowerCase().includes(searchTerm) ||
      company.description.toLowerCase().includes(searchTerm)
    );
  }

  // Industry filter
  if (filters.industry) {
    filteredCompanies = filteredCompanies.filter(company =>
      company.industry === filters.industry
    );
  }

  // Size filter
  if (filters.size) {
    filteredCompanies = filteredCompanies.filter(company =>
      company.size === filters.size
    );
  }

  // Rating filter
  if (filters.minRating) {
    filteredCompanies = filteredCompanies.filter(company =>
      company.rating >= filters.minRating
    );
  }

  // Location filter
  if (filters.location) {
    filteredCompanies = filteredCompanies.filter(company =>
      company.locations.some(location => 
        location.toLowerCase().includes(filters.location.toLowerCase())
      )
    );
  }

  return filteredCompanies;
};

export const getTopRatedCompanies = (limit = 5) => {
  return companies
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

export const getCompaniesWithMostReviews = (limit = 5) => {
  return companies
    .sort((a, b) => b.totalReviews - a.totalReviews)
    .slice(0, limit);
};

// Review utilities
export const getReviews = () => reviews;

export const getReviewsByCompany = (companyId) => {
  return reviews.filter(review => review.companyId === companyId);
};

export const getRecentReviews = (limit = 10) => {
  return reviews
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
};

export const getAverageRatingByCompany = (companyId) => {
  const companyReviews = getReviewsByCompany(companyId);
  if (companyReviews.length === 0) return 0;
  
  const totalRating = companyReviews.reduce((sum, review) => sum + review.rating, 0);
  return Math.round((totalRating / companyReviews.length) * 10) / 10;
};

export const getReviewStats = (companyId) => {
  const companyReviews = getReviewsByCompany(companyId);
  const total = companyReviews.length;
  
  if (total === 0) {
    return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  }

  const stats = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  companyReviews.forEach(review => {
    stats[review.rating]++;
  });

  // Convert to percentages
  Object.keys(stats).forEach(rating => {
    stats[rating] = Math.round((stats[rating] / total) * 100);
  });

  return stats;
};

// Salary utilities
export const getSalaries = () => salaries;

export const getSalariesByCompany = (companyId) => {
  return salaries.filter(salary => salary.companyId === companyId);
};

export const getSalariesByPosition = (position) => {
  return salaries.filter(salary => 
    salary.position.toLowerCase().includes(position.toLowerCase())
  );
};

export const getAverageSalaryByCompany = (companyId) => {
  const companySalaries = getSalariesByCompany(companyId);
  if (companySalaries.length === 0) return 0;
  
  const totalSalary = companySalaries.reduce((sum, salary) => sum + salary.totalComp, 0);
  return Math.round(totalSalary / companySalaries.length);
};

export const getAverageSalaryByPosition = (position) => {
  const positionSalaries = getSalariesByPosition(position);
  if (positionSalaries.length === 0) return 0;
  
  const totalSalary = positionSalaries.reduce((sum, salary) => sum + salary.totalComp, 0);
  return Math.round(totalSalary / positionSalaries.length);
};

export const getSalaryRange = (companyId, position) => {
  const filteredSalaries = salaries.filter(salary => 
    salary.companyId === companyId && 
    salary.position.toLowerCase().includes(position.toLowerCase())
  );
  
  if (filteredSalaries.length === 0) return { min: 0, max: 0 };
  
  const salaryValues = filteredSalaries.map(salary => salary.totalComp);
  return {
    min: Math.min(...salaryValues),
    max: Math.max(...salaryValues)
  };
};

// Interview utilities
export const getInterviews = () => interviews;

export const getInterviewsByCompany = (companyId) => {
  return interviews.filter(interview => interview.companyId === companyId);
};

export const getInterviewsByPosition = (position) => {
  return interviews.filter(interview => 
    interview.position.toLowerCase().includes(position.toLowerCase())
  );
};

export const getInterviewStats = (companyId) => {
  const companyInterviews = getInterviewsByCompany(companyId);
  const total = companyInterviews.length;
  
  if (total === 0) {
    return {
      total: 0,
      positive: 0,
      neutral: 0,
      negative: 0,
      offerRate: 0,
      avgDifficulty: 'N/A'
    };
  }

  const positive = companyInterviews.filter(int => int.experience === 'Positive').length;
  const neutral = companyInterviews.filter(int => int.experience === 'Neutral').length;
  const negative = companyInterviews.filter(int => int.experience === 'Negative').length;
  const offers = companyInterviews.filter(int => int.outcome === 'Offer').length;

  const difficultyMap = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
  const avgDifficultyScore = companyInterviews.reduce((sum, int) => 
    sum + (difficultyMap[int.difficulty] || 2), 0) / total;
  
  let avgDifficulty = 'Medium';
  if (avgDifficultyScore < 1.5) avgDifficulty = 'Easy';
  else if (avgDifficultyScore > 2.5) avgDifficulty = 'Hard';

  return {
    total,
    positive: Math.round((positive / total) * 100),
    neutral: Math.round((neutral / total) * 100),
    negative: Math.round((negative / total) * 100),
    offerRate: Math.round((offers / total) * 100),
    avgDifficulty
  };
};

// Job position utilities
export const getJobPositions = () => jobPositions;

export const getJobPositionsByCategory = (category) => {
  return jobPositions.filter(position => position.category === category);
};

export const searchJobPositions = (query) => {
  if (!query) return jobPositions;
  
  const searchTerm = query.toLowerCase();
  return jobPositions.filter(position =>
    position.title.toLowerCase().includes(searchTerm) ||
    position.category.toLowerCase().includes(searchTerm)
  );
};

// Jobs utilities
export const getJobs = () => jobs;

export const getJobsByCompany = (companyId, filters = {}) => {
  let result = jobs.filter(job => job.companyId === companyId);

  if (filters.query) {
    const q = filters.query.toLowerCase();
    result = result.filter(j =>
      j.title.toLowerCase().includes(q) ||
      j.department.toLowerCase().includes(q) ||
      j.description.toLowerCase().includes(q)
    );
  }

  if (filters.location) {
    const loc = filters.location.toLowerCase();
    result = result.filter(j => j.location.toLowerCase().includes(loc));
  }

  if (filters.type) {
    result = result.filter(j => j.type === filters.type);
  }

  if (filters.level) {
    result = result.filter(j => j.level === filters.level);
  }

  return result.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
};

export const applyForJob = ({ jobId, name, email, resumeUrl, coverLetter }) => {
  const job = jobs.find(j => j.id === jobId);
  if (!job) throw new Error('Job not found');
  // Simulate success
  return {
    success: true,
    jobId,
    to: job.applyEmail,
    applicant: { name, email, resumeUrl },
    submittedAt: new Date().toISOString()
  };
};

// Utility functions
export const formatSalary = (amount) => {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  } else {
    return `$${amount}`;
  }
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const getTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now - date;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return '1 day ago';
  if (diffInDays < 30) return `${diffInDays} days ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
};

export const getRatingStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return {
    full: fullStars,
    half: hasHalfStar ? 1 : 0,
    empty: emptyStars
  };
};

// Filter options
export const getFilterOptions = () => {
  return {
    industries,
    companySizes,
    jobCategories,
    ratings: [
      { value: 4.5, label: '4.5+ stars' },
      { value: 4.0, label: '4.0+ stars' },
      { value: 3.5, label: '3.5+ stars' },
      { value: 3.0, label: '3.0+ stars' }
    ]
  };
};

// Trending data
export const getTrendingCompanies = (limit = 6) => {
  // Companies with high ratings and recent activity
  return companies
    .filter(company => company.rating >= 4.0)
    .sort((a, b) => {
      // Sort by rating and number of reviews
      const scoreA = a.rating * Math.log(a.totalReviews + 1);
      const scoreB = b.rating * Math.log(b.totalReviews + 1);
      return scoreB - scoreA;
    })
    .slice(0, limit);
};

export const getTrendingPositions = (limit = 6) => {
  return jobPositions
    .sort((a, b) => b.averageSalary - a.averageSalary)
    .slice(0, limit);
};

// Search suggestions
export const getSearchSuggestions = (query) => {
  if (!query || query.length < 2) return [];
  
  const searchTerm = query.toLowerCase();
  const suggestions = [];
  
  // Company suggestions
  companies.forEach(company => {
    if (company.name.toLowerCase().includes(searchTerm)) {
      suggestions.push({
        type: 'company',
        value: company.name,
        id: company.id,
        subtitle: company.industry
      });
    }
  });
  
  // Job position suggestions
  jobPositions.forEach(position => {
    if (position.title.toLowerCase().includes(searchTerm)) {
      suggestions.push({
        type: 'position',
        value: position.title,
        id: position.id,
        subtitle: position.category
      });
    }
  });
  
  return suggestions.slice(0, 8);
};

// Default export with all utilities
const companyCheckDataUtils = {
  // Data getters
  companies,
  jobPositions,
  reviews,
  salaries,
  interviews,
  jobCategories,
  industries,
  companySizes,
  
  // Company functions
  getCompanies,
  getCompanyById,
  searchCompanies,
  getTopRatedCompanies,
  getCompaniesWithMostReviews,
  
  // Review functions
  getReviews,
  getReviewsByCompany,
  getRecentReviews,
  getAverageRatingByCompany,
  getReviewStats,
  
  // Salary functions
  getSalaries,
  getSalariesByCompany,
  getSalariesByPosition,
  getAverageSalaryByCompany,
  getAverageSalaryByPosition,
  getSalaryRange,
  
  // Interview functions
  getInterviews,
  getInterviewsByCompany,
  getInterviewsByPosition,
  getInterviewStats,
  
  // Job position functions
  getJobPositions,
  getJobPositionsByCategory,
  searchJobPositions,
  
  // Utility functions
  formatSalary,
  formatDate,
  getTimeAgo,
  getRatingStars,
  getFilterOptions,
  getTrendingCompanies,
  getTrendingPositions,
  getSearchSuggestions
};

export default companyCheckDataUtils;
