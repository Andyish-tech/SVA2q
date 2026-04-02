import { useState } from 'react';

const FormPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    course: '',
    level: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const courses = [
    'Computer Science',
    'Information Technology',
    'Software Engineering',
    'Data Science',
    'Cyber Security'
  ];

  const levels = ['Level 3', 'Level 4', 'Level 5', 'Level 6'];

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }
    if (!formData.course) newErrors.course = 'Please select a course';
    if (!formData.level) newErrors.level = 'Please select a level';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dob: '',
      gender: '',
      course: '',
      level: '',
      notes: ''
    });
    setSubmitted(false);
    setErrors({});
  };

  if (submitted) {
    return (
      <div className="container success-container">
        <div className="success-card">
          <div className="success-icon">✅</div>
          <h2>Registration Successful!</h2>
          <p>Thank you, <strong>{formData.firstName} {formData.lastName}</strong>. Your registration for <strong>{formData.course}</strong> has been received.</p>
          <button onClick={handleReset} className="btn btn-primary">Register Another Student</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container form-page">
      <div className="form-header">
        <h2>Student Registration</h2>
        <p>Please fill out the form below to enroll in our programs.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-grid">
          {/* First Name */}
          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={errors.firstName ? 'error-input' : ''}
              placeholder="Enter first name"
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={errors.lastName ? 'error-input' : ''}
              placeholder="Enter last name"
            />
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error-input' : ''}
              placeholder="example@mail.com"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+123 456 789"
            />
          </div>

          {/* Date of Birth */}
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>

          {/* Gender */}
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Course */}
          <div className="form-group">
            <label htmlFor="course">Course *</label>
            <select 
              id="course" 
              name="course" 
              value={formData.course} 
              onChange={handleChange}
              className={errors.course ? 'error-input' : ''}
            >
              <option value="">Select Course</option>
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
            {errors.course && <span className="error-message">{errors.course}</span>}
          </div>

          {/* Level */}
          <div className="form-group">
            <label htmlFor="level">Level *</label>
            <select 
              id="level" 
              name="level" 
              value={formData.level} 
              onChange={handleChange}
              className={errors.level ? 'error-input' : ''}
            >
              <option value="">Select Level</option>
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            {errors.level && <span className="error-message">{errors.level}</span>}
          </div>
        </div>

        {/* Notes */}
        <div className="form-group full-width">
          <label htmlFor="notes">Additional Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
            placeholder="Any additional information..."
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary submit-btn">Submit Registration</button>
      </form>
    </div>
  );
};

export default FormPage;
