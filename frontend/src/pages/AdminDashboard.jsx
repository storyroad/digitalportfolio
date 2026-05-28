import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, Trash2, Check, Archive, RefreshCw, Calendar, User, 
  MessageSquare, ArrowLeft, Inbox, CheckCircle, ArchiveIcon
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
import { getContactSubmissions, updateSubmissionStatus, deleteSubmission } from '../utils/mock';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, new, read, archived
  const navigate = useNavigate();

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const data = await getContactSubmissions();
      setSubmissions(data);
    } catch (error) {
      toast.error('Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleStatusUpdate = async (submissionId, newStatus) => {
    const result = await updateSubmissionStatus(submissionId, newStatus);
    if (result.success) {
      toast.success('Status updated successfully');
      fetchSubmissions();
    } else {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (submissionId) => {
    if (!window.confirm('Are you sure you want to delete this submission?')) return;
    
    const result = await deleteSubmission(submissionId);
    if (result.success) {
      toast.success('Submission deleted');
      fetchSubmissions();
    } else {
      toast.error('Failed to delete submission');
    }
  };

  const filteredSubmissions = filter === 'all' 
    ? submissions 
    : submissions.filter(sub => sub.status === filter);

  const stats = {
    total: submissions.length,
    new: submissions.filter(s => s.status === 'new').length,
    read: submissions.filter(s => s.status === 'read').length,
    archived: submissions.filter(s => s.status === 'archived').length,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'read': return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'archived': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Button>
            <h1 className="text-4xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-600 mt-2">Manage contact form submissions</p>
          </div>
          <Button onClick={fetchSubmissions} className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg shadow-blue-200">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Total</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
                </div>
                <div className="rounded-xl bg-slate-100 p-3">
                  <Inbox className="h-6 w-6 text-slate-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-blue-200 bg-blue-50/50 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700 mb-1">New</p>
                  <p className="text-3xl font-bold text-blue-900">{stats.new}</p>
                </div>
                <div className="rounded-xl bg-blue-100 p-3">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Read</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.read}</p>
                </div>
                <div className="rounded-xl bg-slate-100 p-3">
                  <CheckCircle className="h-6 w-6 text-slate-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-green-200 bg-green-50/50 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700 mb-1">Archived</p>
                  <p className="text-3xl font-bold text-green-900">{stats.archived}</p>
                </div>
                <div className="rounded-xl bg-green-100 p-3">
                  <ArchiveIcon className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {['all', 'new', 'read', 'archived'].map((filterOption) => (
            <Button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`rounded-xl capitalize transition-all duration-300 ${
                filter === filterOption
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg shadow-blue-200'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-blue-200'
              }`}
            >
              {filterOption}
            </Button>
          ))}
        </div>

        {/* Submissions List */}
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto text-blue-600 mb-4" />
            <p className="text-slate-600">Loading submissions...</p>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
            <CardContent className="p-12 text-center">
              <Inbox className="h-12 w-12 mx-auto text-slate-400 mb-4" />
              <p className="text-slate-600 text-lg">No submissions found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredSubmissions.map((submission, idx) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="rounded-2xl border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        {/* Header */}
                        <div className="flex items-center gap-3">
                          <Badge className={`${getStatusColor(submission.status)} rounded-full px-3 py-1`}>
                            {submission.status}
                          </Badge>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Calendar className="h-4 w-4" />
                            {new Date(submission.timestamp).toLocaleString()}
                          </div>
                        </div>

                        {/* User Info */}
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-slate-600" />
                            <span className="font-semibold text-slate-900">{submission.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-slate-600" />
                            <a href={`mailto:${submission.email}`} className="text-blue-600 hover:underline">
                              {submission.email}
                            </a>
                          </div>
                        </div>

                        {/* Message */}
                        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                          <div className="flex items-start gap-2 mb-2">
                            <MessageSquare className="h-4 w-4 text-slate-600 mt-1" />
                            <span className="text-sm font-semibold text-slate-700">Message</span>
                          </div>
                          <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                            {submission.message}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2">
                        {submission.status === 'new' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusUpdate(submission.id, 'read')}
                            className="rounded-lg"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Mark Read
                          </Button>
                        )}
                        {submission.status === 'read' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusUpdate(submission.id, 'archived')}
                            className="rounded-lg"
                          >
                            <Archive className="h-4 w-4 mr-1" />
                            Archive
                          </Button>
                        )}
                        {submission.status === 'archived' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusUpdate(submission.id, 'new')}
                            className="rounded-lg"
                          >
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Restore
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(submission.id)}
                          className="rounded-lg"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
