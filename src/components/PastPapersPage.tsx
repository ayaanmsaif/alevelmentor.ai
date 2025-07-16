import { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import api from '../api/config';

interface PaperData {
  id: number;
  paper: string;
  progress: number;
  recentMark: string;
  status: 'Completed' | 'In Progress' | 'Not Started';
  timeTaken: string;
}

const PastPapersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedBoard, setSelectedBoard] = useState('All Boards');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [selectedPapers, setSelectedPapers] = useState('All Papers');
  const [papers, setPapers] = useState<PaperData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const applyFilters = () => {
    const filters = {
      subject: selectedSubject,
      exam_board: selectedBoard,
      year: selectedYear,
      paper_type: selectedPapers
    };

    api.post('/api/past-papers/filter', filters)
      .then((response) => {
        if (Array.isArray(response.data)) {
          console.log('Filtered API Response:', response.data);
          setPapers(response.data);
          setError(null);
        } else {
          console.error('Invalid filtered API response:', response.data);
          setError('Invalid response from server');
        }
      })
      .catch((error) => {
        console.error('Error applying filters:', error);
        setError('Failed to apply filters. Please try again.');
      });
  };

  // Effect to load initial data and reapply filters when selections change
  useEffect(() => {
    if (searchTerm) {
      // Clear filters when searching
      setSelectedSubject('All Subjects');
      setSelectedBoard('All Boards');
      setSelectedYear('All Years');
      setSelectedPapers('All Papers');

      // Search API call
      api.post('/api/past-papers/search', { searchTerm })
        .then((response) => {
          if (Array.isArray(response.data)) {
            console.log('Search API Response:', response.data);
            setPapers(response.data);
            setError(null);
          } else {
            console.error('Invalid search API response:', response.data);
            setError('Invalid response from server');
          }
        })
        .catch((error) => {
          console.error('Error searching papers:', error);
          setError('Failed to search papers. Please try again.');
        });
    } else {
      // If no search term, use filters
      applyFilters();
    }
  }, [searchTerm, selectedSubject, selectedBoard, selectedYear, selectedPapers]);

  const clearFilters = () => {
    setSelectedSubject('All Subjects');
    setSelectedBoard('All Boards');
    setSelectedYear('All Years');
    setSelectedPapers('All Papers');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-600';
      case 'In Progress': return 'text-blue-600';
      case 'Not Started': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const getProgressBarColor = (progress: number) => {
    if (progress === 100) return 'bg-blue-600';
    if (progress > 0) return 'bg-blue-600';
    return 'bg-gray-300';
  };

  const DropdownSelect = ({ value, options, onChange, placeholder }: {
    value: string;
    options: string[];
    onChange: (value: string) => void;
    placeholder: string;
  }) => (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value={placeholder}>{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
    </div>
  );

  return (
    <div className="h-screen flex-1 flex flex-col overflow-hidden overscroll-none touch-none">
      <div className="flex-1 p-8 overflow-hidden overscroll-none touch-none">
        <div className="flex gap-8 h-full overflow-hidden">
          {/* Left Panel - Combined Search and Filters */}
          <div className="w-80 flex-shrink-0 overflow-hidden">
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6 overflow-hidden">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Papers"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Filters */}
              <div className="space-y-4">
                <DropdownSelect
                  value={selectedSubject}
                  options={['Physics', 'Mathematics', 'Computer Science']}
                  onChange={setSelectedSubject}
                  placeholder="All Subjects"
                />

                <DropdownSelect
                  value={selectedBoard}
                  options={['Cambridge', 'Edexcel', 'AQA']}
                  onChange={setSelectedBoard}
                  placeholder="All Boards"
                />

                <DropdownSelect
                  value={selectedYear}
                  options={['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017']}
                  onChange={setSelectedYear}
                  placeholder="All Years"
                />

                <DropdownSelect
                  value={selectedPapers}
                  options={['Paper 1', 'Paper 2', 'Paper 3']}
                  onChange={setSelectedPapers}
                  placeholder="All Papers"
                />
              </div>

              {/* Clear Filters Button */}
              <button
                className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                onClick={clearFilters}
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Right Panel - Papers Table */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="bg-white rounded-lg border border-gray-200 flex flex-col h-full overflow-hidden">
              {/* Fixed Table Header */}
              <div className="grid grid-cols-12 gap-4 p-6 border-b border-gray-200 bg-gray-50">
                <div className="col-span-3 text-sm font-medium text-gray-600">Paper</div>
                <div className="col-span-2 text-sm font-medium text-gray-600">Progress</div>
                <div className="col-span-2 text-sm font-medium text-gray-600">Recent Mark</div>
                <div className="col-span-2 text-sm font-medium text-gray-600">Status</div>
                <div className="col-span-3 text-sm font-medium text-gray-600">Time taken</div>
              </div>

              {/* Scrollable Table Body - This is the ONLY scrollable element */}
              <div className="flex-1 overflow-y-auto overscroll-contain">
                <div className="divide-y divide-gray-200">
                  {error ? (
                    <div className="p-6 text-red-500">{error}</div>
                  ) : papers && papers.length > 0 ? (
                    papers.map((paper) => (
                      <div key={paper.id} className="grid grid-cols-12 gap-4 p-6 hover:bg-gray-50">
                        <div className="col-span-3">
                          <span className="text-sm text-gray-800">{paper.paper}</span>
                        </div>
                        
                        <div className="col-span-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">{paper.progress || 'N/A'}%</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${getProgressBarColor(paper.progress || 0)}`}
                                style={{ width: `${paper.progress || 0}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-span-2">
                          <span className="text-sm text-gray-800">{paper.recentMark || 'N/A'}</span>
                        </div>
                        
                        <div className="col-span-2">
                          <span className={`text-sm ${getStatusColor(paper.status || 'Not Started')}`}>
                            {paper.status || 'Not Started'}
                          </span>
                        </div>
                        
                        <div className="col-span-3">
                          <span className="text-sm text-gray-800">{paper.timeTaken || 'N/A'}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-gray-500">No past papers available.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastPapersPage;