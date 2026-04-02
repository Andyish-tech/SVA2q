import { useState, useMemo } from 'react';

const studentsData = [
  { id: 1, name: 'Alice Johnson', email: 'alice.j@example.com', course: 'Computer Science', level: 'Level 4', enrolled: '2023-09-01', status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob.s@example.com', course: 'Information Technology', level: 'Level 3', enrolled: '2023-09-05', status: 'Inactive' },
  { id: 3, name: 'Charlie Davis', email: 'charlie.d@example.com', course: 'Software Engineering', level: 'Level 5', enrolled: '2023-08-20', status: 'Active' },
  { id: 4, name: 'Diana Ross', email: 'diana.r@example.com', course: 'Data Science', level: 'Level 6', enrolled: '2023-09-10', status: 'Suspended' },
  { id: 5, name: 'Ethan Hunt', email: 'ethan.h@example.com', course: 'Cyber Security', level: 'Level 4', enrolled: '2023-09-12', status: 'Active' },
  { id: 6, name: 'Fiona Apple', email: 'fiona.a@example.com', course: 'Computer Science', level: 'Level 5', enrolled: '2023-08-25', status: 'Active' },
  { id: 7, name: 'George Miller', email: 'george.m@example.com', course: 'Information Technology', level: 'Level 4', enrolled: '2023-09-02', status: 'Inactive' },
  { id: 8, name: 'Hannah Brown', email: 'hannah.b@example.com', course: 'Software Engineering', level: 'Level 3', enrolled: '2023-09-08', status: 'Suspended' },
  { id: 9, name: 'Ian Wright', email: 'ian.w@example.com', course: 'Data Science', level: 'Level 4', enrolled: '2023-09-15', status: 'Active' },
  { id: 10, name: 'Jane Doe', email: 'jane.d@example.com', course: 'Cyber Security', level: 'Level 6', enrolled: '2023-08-30', status: 'Active' },
  { id: 11, name: 'Kevin Hart', email: 'kevin.h@example.com', course: 'Computer Science', level: 'Level 3', enrolled: '2023-09-20', status: 'Active' },
  { id: 12, name: 'Laura Palmer', email: 'laura.p@example.com', course: 'Information Technology', level: 'Level 5', enrolled: '2023-09-22', status: 'Inactive' }
];

const TablePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sorting logic
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '🔼' : '🔽';
  };

  // Filtering logic
  const filteredStudents = useMemo(() => {
    return studentsData
      .filter((student) => {
        const matchesSearch = 
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.course.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'All' || student.status === statusFilter;
        
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
  }, [searchTerm, statusFilter, sortConfig]);

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container table-page">
      <div className="table-header">
        <h2>Student Directory</h2>
        <p>Manage and view all registered students.</p>
      </div>

      <div className="table-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name, email or course..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="filter-buttons">
          {['All', 'Active', 'Inactive', 'Suspended'].map((status) => (
            <button
              key={status}
              className={`filter-btn ${statusFilter === status ? 'active' : ''}`}
              onClick={() => {
                setStatusFilter(status);
                setCurrentPage(1);
              }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th onClick={() => requestSort('id')}>ID {getSortIcon('id')}</th>
              <th onClick={() => requestSort('name')}>Name {getSortIcon('name')}</th>
              <th onClick={() => requestSort('email')}>Email {getSortIcon('email')}</th>
              <th onClick={() => requestSort('course')}>Course {getSortIcon('course')}</th>
              <th onClick={() => requestSort('level')}>Level {getSortIcon('level')}</th>
              <th onClick={() => requestSort('enrolled')}>Enrolled {getSortIcon('enrolled')}</th>
              <th onClick={() => requestSort('status')}>Status {getSortIcon('status')}</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.length > 0 ? (
              currentStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.course}</td>
                  <td>{student.level}</td>
                  <td>{student.enrolled}</td>
                  <td>
                    <span className={`status-badge ${student.status.toLowerCase()}`}>
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-results">No students found matching your criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            disabled={currentPage === 1} 
            onClick={() => goToPage(currentPage - 1)}
            className="pag-btn"
          >
            Previous
          </button>
          
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`page-num ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => goToPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button 
            disabled={currentPage === totalPages} 
            onClick={() => goToPage(currentPage + 1)}
            className="pag-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TablePage;
