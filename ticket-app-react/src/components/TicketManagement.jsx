import { useState, useEffect } from 'react';
import { LogOut, Plus, Edit2, Trash2 } from 'lucide-react';
import Toast from './Toast';

const TicketManagement = ({ onNavigate, onLogout }) => {
  const [tickets, setTickets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'open',
    priority: 'medium'
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const statusColors = {
    open: 'bg-green-100 text-green-800',
    in_progress: 'bg-amber-100 text-amber-800',
    closed: 'bg-gray-100 text-gray-800'
  };

  useEffect(() => {
    const saved = localStorage.getItem('tickets');
    if (saved) setTickets(JSON.parse(saved));
  }, []);

  const saveTickets = (newTickets) => {
    setTickets(newTickets);
    localStorage.setItem('tickets', JSON.stringify(newTickets));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!['open', 'in_progress', 'closed'].includes(formData.status)) {
      newErrors.status = 'Status must be: open, in_progress, or closed';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    if (editingId) {
      const updated = tickets.map(t => 
        t.id === editingId ? { ...formData, id: editingId } : t
      );
      saveTickets(updated);
      setToast({ message: 'Ticket updated successfully', type: 'success' });
    } else {
      const newTicket = { ...formData, id: Date.now() };
      saveTickets([...tickets, newTicket]);
      setToast({ message: 'Ticket created successfully', type: 'success' });
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', status: 'open', priority: 'medium' });
    setShowForm(false);
    setEditingId(null);
    setErrors({});
  };

  const handleEdit = (ticket) => {
    setFormData({ ...ticket });
    setEditingId(ticket.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      saveTickets(tickets.filter(t => t.id !== id));
      setToast({ message: 'Ticket deleted successfully', type: 'success' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">TicketFlow</h1>
          <div className="flex gap-4">
            <button 
              onClick={() => onNavigate('/dashboard')} 
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Dashboard
            </button>
            <button 
              onClick={onLogout} 
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Ticket Management</h2>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            <Plus size={20} />
            New Ticket
          </button>
        </div>

        {/* Ticket Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              {editingId ? 'Edit' : 'Create'} Ticket
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
                  placeholder="Enter ticket title"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
                  rows="3"
                  placeholder="Enter ticket description"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>
                  {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={handleSubmit} 
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  {editingId ? 'Update' : 'Create'} Ticket
                </button>
                <button 
                  onClick={resetForm} 
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tickets List */}
        <div className="grid gap-4">
          {tickets.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
              No tickets yet. Create your first ticket to get started.
            </div>
          ) : (
            tickets.map(ticket => (
              <div key={ticket.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{ticket.title}</h3>
                    <p className="text-gray-600">{ticket.description}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button 
                      onClick={() => handleEdit(ticket)} 
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Edit ticket"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button 
                      onClick={() => handleDelete(ticket.id)} 
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete ticket"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[ticket.status]}`}>
                    {ticket.status.replace('_', ' ')}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                    {ticket.priority}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 TicketFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TicketManagement;