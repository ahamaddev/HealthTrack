import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaBirthdayCake, FaVenusMars, FaEdit, FaSave, FaTimes, FaCalendarAlt } from 'react-icons/fa';

/**
 * Profile page: view and edit user information
 */
const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: user?.age || '',
    gender: user?.gender || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name.trim()) {
      setError('Name is required.');
      return;
    }

    const age = parseInt(formData.age);
    if (!age || age < 1 || age > 150) {
      setError('Please enter a valid age.');
      return;
    }

    setLoading(true);
    try {
      await updateProfile({
        name: formData.name,
        age,
        gender: formData.gender,
      });
      setSuccess('Profile updated successfully!');
      setEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setFormData({
      name: user?.name || '',
      age: user?.age || '',
      gender: user?.gender || '',
    });
    setEditing(false);
    setError('');
    setSuccess('');
  };

  return (
    <div className="page-container py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6">
            {/* Page Header */}
            <div className="text-center mb-5 fade-in">
              <div className="avatar-circle-lg mx-auto mb-3">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>
              <h1 className="display-6 fw-bold">{user?.name}</h1>
              <p className="text-muted">{user?.email}</p>
            </div>

            {/* Profile Card */}
            <div className="card border-0 shadow-sm rounded-4 fade-in">
              <div className="card-body p-4 p-md-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="fw-semibold mb-0">
                    <FaUser className="me-2 text-primary" />
                    Profile Information
                  </h4>
                  {!editing && (
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => setEditing(true)}
                      id="edit-profile-btn"
                    >
                      <FaEdit className="me-1" /> Edit
                    </button>
                  )}
                </div>

                {error && (
                  <div className="alert alert-danger py-2 fade-in">{error}</div>
                )}
                {success && (
                  <div className="alert alert-success py-2 fade-in">{success}</div>
                )}

                {editing ? (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label fw-medium">
                        <FaUser className="me-2 text-primary" /> Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="row g-3 mb-3">
                      <div className="col-6">
                        <label className="form-label fw-medium">
                          <FaBirthdayCake className="me-2 text-primary" /> Age
                        </label>
                        <input
                          type="number"
                          className="form-control form-control-lg"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          min="1"
                          max="150"
                          required
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label fw-medium">
                          <FaVenusMars className="me-2 text-primary" /> Gender
                        </label>
                        <select
                          className="form-select form-select-lg"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          required
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="d-flex gap-2 mt-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg flex-grow-1"
                        disabled={loading}
                        id="save-profile-btn"
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <FaSave className="me-2" /> Save Changes
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-lg"
                        onClick={cancelEdit}
                      >
                        <FaTimes className="me-1" /> Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    {[
                      { icon: FaUser, label: 'Full Name', value: user?.name },
                      { icon: FaEnvelope, label: 'Email', value: user?.email },
                      { icon: FaBirthdayCake, label: 'Age', value: `${user?.age} years` },
                      { icon: FaVenusMars, label: 'Gender', value: user?.gender?.charAt(0).toUpperCase() + user?.gender?.slice(1) },
                      { icon: FaCalendarAlt, label: 'Member Since', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A' },
                    ].map((field, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-center p-3 rounded-3 mb-2 bg-light"
                      >
                        <field.icon className="text-primary me-3" size={18} />
                        <div>
                          <div className="text-muted small">{field.label}</div>
                          <div className="fw-medium">{field.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
