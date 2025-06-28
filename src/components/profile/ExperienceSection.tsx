import React, { useState } from 'react';
import { 
  Briefcase, 
  Plus, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Users, 
  Edit2, 
  Trash2, 
  X, 
  Save,
  Loader2,
  AlertTriangle,
  Building,
  Award,
  Code
} from 'lucide-react';
import { Experience, ExperienceFormData } from '../../types';

interface ExperienceSectionProps {
  experiences: Experience[];
  onAddExperience: (formData: ExperienceFormData) => Promise<void>;
  onUpdateExperience: (id: string, formData: ExperienceFormData) => Promise<void>;
  onDeleteExperience: (id: string) => Promise<void>;
}

/**
 * Section for managing company past experiences and projects
 */
const ExperienceSection: React.FC<ExperienceSectionProps> = ({ 
  experiences, 
  onAddExperience, 
  onUpdateExperience, 
  onDeleteExperience 
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ExperienceFormData>({
    projectName: '',
    clientName: '',
    description: '',
    startDate: '',
    endDate: '',
    projectValue: undefined,
    category: 'Technology',
    status: 'completed',
    location: '',
    keyAchievements: [''],
    technologies: [''],
    teamSize: undefined,
    role: ''
  });

  const categories = [
    'Technology',
    'Construction',
    'Healthcare',
    'Education',
    'Transportation',
    'Energy',
    'Consulting',
    'Finance',
    'Manufacturing',
    'Other'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'ongoing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact'
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  const calculateDuration = (startDate: Date, endDate?: Date) => {
    const end = endDate || new Date();
    const months = Math.round((end.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
    
    if (months < 12) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    } else {
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      if (remainingMonths === 0) {
        return `${years} year${years !== 1 ? 's' : ''}`;
      } else {
        return `${years}y ${remainingMonths}m`;
      }
    }
  };

  const handleAddAchievement = () => {
    setFormData({
      ...formData,
      keyAchievements: [...formData.keyAchievements, '']
    });
  };

  const handleRemoveAchievement = (index: number) => {
    setFormData({
      ...formData,
      keyAchievements: formData.keyAchievements.filter((_, i) => i !== index)
    });
  };

  const handleAchievementChange = (index: number, value: string) => {
    const newAchievements = [...formData.keyAchievements];
    newAchievements[index] = value;
    setFormData({
      ...formData,
      keyAchievements: newAchievements
    });
  };

  const handleAddTechnology = () => {
    setFormData({
      ...formData,
      technologies: [...(formData.technologies || []), '']
    });
  };

  const handleRemoveTechnology = (index: number) => {
    setFormData({
      ...formData,
      technologies: formData.technologies?.filter((_, i) => i !== index) || []
    });
  };

  const handleTechnologyChange = (index: number, value: string) => {
    const newTechnologies = [...(formData.technologies || [])];
    newTechnologies[index] = value;
    setFormData({
      ...formData,
      technologies: newTechnologies
    });
  };

  const resetForm = () => {
    setFormData({
      projectName: '',
      clientName: '',
      description: '',
      startDate: '',
      endDate: '',
      projectValue: undefined,
      category: 'Technology',
      status: 'completed',
      location: '',
      keyAchievements: [''],
      technologies: [''],
      teamSize: undefined,
      role: ''
    });
    setShowAddForm(false);
    setEditingId(null);
    setError(null);
  };

  const handleEdit = (experience: Experience) => {
    setFormData({
      projectName: experience.projectName,
      clientName: experience.clientName,
      description: experience.description,
      startDate: experience.startDate.toISOString().split('T')[0],
      endDate: experience.endDate ? experience.endDate.toISOString().split('T')[0] : '',
      projectValue: experience.projectValue,
      category: experience.category,
      status: experience.status,
      location: experience.location,
      keyAchievements: experience.keyAchievements.length > 0 ? experience.keyAchievements : [''],
      technologies: experience.technologies && experience.technologies.length > 0 ? experience.technologies : [''],
      teamSize: experience.teamSize,
      role: experience.role
    });
    setEditingId(experience.id);
    setShowAddForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Filter out empty achievements and technologies
      const cleanedData = {
        ...formData,
        keyAchievements: formData.keyAchievements.filter(a => a.trim() !== ''),
        technologies: formData.technologies?.filter(t => t.trim() !== '') || []
      };

      if (editingId) {
        await onUpdateExperience(editingId, cleanedData);
      } else {
        await onAddExperience(cleanedData);
      }
      
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save experience');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    setError(null);

    try {
      await onDeleteExperience(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete experience');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Past Experiences</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </button>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {experiences.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Briefcase className="h-6 w-6 text-gray-400" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">No experiences added</h4>
          <p className="text-gray-500 mb-4">Showcase your past projects and achievements to strengthen your profile</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Experience
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {experiences.map((experience) => (
            <div key={experience.id} className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-xl font-semibold text-gray-900">{experience.projectName}</h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(experience.status)}`}>
                      {experience.status.charAt(0).toUpperCase() + experience.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-1" />
                      <span>{experience.clientName}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{experience.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Present'}
                        <span className="ml-1 text-gray-500">
                          ({calculateDuration(experience.startDate, experience.endDate)})
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(experience)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit experience"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(experience.id)}
                    disabled={deletingId === experience.id}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    title="Delete experience"
                  >
                    {deletingId === experience.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">{experience.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Award className="h-4 w-4 mr-2" />
                  <span>{experience.role}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <span className="inline-flex items-center px-2 py-1 bg-gray-100 rounded-full text-xs">
                    {experience.category}
                  </span>
                </div>
                
                {experience.projectValue && (
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>{formatCurrency(experience.projectValue)}</span>
                  </div>
                )}
                
                {experience.teamSize && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{experience.teamSize} team members</span>
                  </div>
                )}
              </div>

              {experience.keyAchievements.length > 0 && (
                <div className="mb-4">
                  <h5 className="font-medium text-gray-900 mb-2">Key Achievements</h5>
                  <ul className="space-y-1">
                    {experience.keyAchievements.map((achievement, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 mt-2 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {experience.technologies && experience.technologies.length > 0 && (
                <div>
                  <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                    <Code className="h-4 w-4 mr-1" />
                    Technologies Used
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit experience form modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {editingId ? 'Edit Experience' : 'Add New Experience'}
              </h3>
              <button
                onClick={resetForm}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    id="projectName"
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    id="clientName"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Description *
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Role *
                  </label>
                  <input
                    type="text"
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Project Manager, Lead Developer"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave empty if ongoing</p>
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'completed' | 'ongoing' | 'cancelled' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="completed">Completed</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="projectValue" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Value (USD)
                  </label>
                  <input
                    type="number"
                    id="projectValue"
                    value={formData.projectValue || ''}
                    onChange={(e) => setFormData({ ...formData, projectValue: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>

                <div>
                  <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 mb-2">
                    Team Size
                  </label>
                  <input
                    type="number"
                    id="teamSize"
                    value={formData.teamSize || ''}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                  />
                </div>
              </div>

              {/* Key Achievements */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Achievements
                </label>
                {formData.keyAchievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={achievement}
                      onChange={(e) => handleAchievementChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe a key achievement"
                    />
                    {formData.keyAchievements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveAchievement(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddAchievement}
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  + Add Achievement
                </button>
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technologies Used
                </label>
                {formData.technologies?.map((tech, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => handleTechnologyChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Technology or tool used"
                    />
                    {(formData.technologies?.length || 0) > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveTechnology(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddTechnology}
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  + Add Technology
                </button>
              </div>

              <div className="flex items-center space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {editingId ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {editingId ? 'Update Experience' : 'Add Experience'}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceSection;