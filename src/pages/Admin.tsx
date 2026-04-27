import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { AlertCircle, Users, CreditCard, Mail, Loader2, UserPlus, X, Phone, Building2, Tag, Calendar, MessageSquare } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';

interface Profile {
  id: string;
  email: string;
  full_name: string;
  company_name: string | null;
  phone: string | null;
  is_admin: boolean;
  created_at: string;
}

interface Subscription {
  id: number;
  customer_id: string;
  subscription_id: string | null;
  status: string;
  current_period_end: number | null;
}

interface Customer {
  id: number;
  user_id: string;
  customer_id: string;
  created_at: string;
}

interface CompanyInquiry {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company_name: string;
  company_type: string;
  message: string;
  status: string;
  created_at: string;
}

export default function Admin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [inquiries, setInquiries] = useState<CompanyInquiry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<CompanyInquiry | null>(null);

  useEffect(() => {
    checkAdminAndLoadData();
  }, []);

  const checkAdminAndLoadData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      console.log('Current user:', user?.id, user?.email);

      if (!user) {
        navigate('/get-started');
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .maybeSingle();

      console.log('Profile check:', { profile, profileError });

      if (profileError) {
        console.error('Profile error:', profileError);
        throw profileError;
      }

      if (!profile) {
        setError('Profile not found. Please contact support.');
        setLoading(false);
        return;
      }

      if (!profile.is_admin) {
        setError('Access denied. You must be an admin to view this page.');
        setLoading(false);
        return;
      }

      setIsAdmin(true);

      const [profilesResult, subscriptionsResult, customersResult, inquiriesResult] = await Promise.all([
        supabase.from('profiles').select('*').order('created_at', { ascending: false }),
        supabase.from('stripe_subscriptions').select('*').order('created_at', { ascending: false }),
        supabase.from('stripe_customers').select('*').order('created_at', { ascending: false }),
        supabase.from('company_inquiries').select('*').order('created_at', { ascending: false })
      ]);

      console.log('Data load results:', {
        profiles: profilesResult.error || `${profilesResult.data?.length} rows`,
        subscriptions: subscriptionsResult.error || `${subscriptionsResult.data?.length} rows`,
        customers: customersResult.error || `${customersResult.data?.length} rows`,
        inquiries: inquiriesResult.error || `${inquiriesResult.data?.length} rows`
      });

      if (profilesResult.error) throw profilesResult.error;
      if (subscriptionsResult.error) throw subscriptionsResult.error;
      if (customersResult.error) throw customersResult.error;
      if (inquiriesResult.error) throw inquiriesResult.error;

      setProfiles(profilesResult.data || []);
      setSubscriptions(subscriptionsResult.data || []);
      setCustomers(customersResult.data || []);
      setInquiries(inquiriesResult.data || []);
    } catch (err) {
      console.error('Error loading admin data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !isAdmin) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-white border-gray-200">
          <CardContent className="pt-6">
            <Alert className="bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-700">
                {error || 'Access denied'}
              </AlertDescription>
            </Alert>
            <Button
              onClick={() => navigate('/')}
              className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-900"
            >
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setSelectedInquiry(null)}
        >
          <div
            className="bg-white border border-gray-200 rounded-2xl w-full max-w-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedInquiry.first_name} {selectedInquiry.last_name}
                </h2>
                <span className={`inline-flex mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                  selectedInquiry.status === 'new' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {selectedInquiry.status}
                </span>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-gray-400 hover:text-gray-700 transition-colors rounded-lg p-1 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Email</p>
                    <p className="text-gray-800 text-sm break-all">{selectedInquiry.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Phone</p>
                    <p className="text-gray-800 text-sm">{selectedInquiry.phone || '-'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Company</p>
                    <p className="text-gray-800 text-sm">{selectedInquiry.company_name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Tag className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Industry</p>
                    <p className="text-gray-800 text-sm">{selectedInquiry.company_type}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-gray-200">
                <Calendar className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Submitted</p>
                  <p className="text-gray-800 text-sm">{formatDate(selectedInquiry.created_at)}</p>
                </div>
              </div>

              {selectedInquiry.message && (
                <div className="flex items-start gap-3 pt-2 border-t border-gray-200">
                  <MessageSquare className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Message</p>
                    <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap bg-gray-50 rounded-lg p-3 border border-gray-200">
                      {selectedInquiry.message}
                    </p>
                  </div>
                </div>
              )}

              {!selectedInquiry.message && (
                <div className="flex items-start gap-3 pt-2 border-t border-gray-200">
                  <MessageSquare className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Message</p>
                    <p className="text-gray-400 text-sm italic">No message provided</p>
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 pb-6">
              <a
                href={`mailto:${selectedInquiry.email}`}
                className="block w-full text-center py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white font-medium text-sm transition-all"
              >
                Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto py-8 px-4 pt-24">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, subscriptions, and inquiries</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card className="bg-white border-gray-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Signups</p>
                  <p className="text-3xl font-bold text-gray-900">{profiles.length}</p>
                </div>
                <UserPlus className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">{profiles.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Subscriptions</p>
                  <p className="text-3xl font-bold text-gray-900">{subscriptions.length}</p>
                </div>
                <CreditCard className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Customers</p>
                  <p className="text-3xl font-bold text-gray-900">{customers.length}</p>
                </div>
                <Users className="h-8 w-8 text-cyan-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Inquiries</p>
                  <p className="text-3xl font-bold text-gray-900">{inquiries.length}</p>
                </div>
                <Mail className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white border-gray-200 mb-8">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Company Inquiries
            </CardTitle>
          </CardHeader>
          <CardContent>
            {inquiries.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No inquiries yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-700 font-medium">Name</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-medium">Email</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-medium">Company</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-medium">Type</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map((inquiry) => (
                      <tr
                        key={inquiry.id}
                        className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => setSelectedInquiry(inquiry)}
                      >
                        <td className="py-3 px-4 text-gray-900 font-medium">
                          {inquiry.first_name} {inquiry.last_name}
                        </td>
                        <td className="py-3 px-4 text-gray-700">{inquiry.email}</td>
                        <td className="py-3 px-4 text-gray-700">{inquiry.company_name}</td>
                        <td className="py-3 px-4 text-gray-700">{inquiry.company_type}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            inquiry.status === 'new' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {inquiry.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-500 text-sm">
                          {formatDate(inquiry.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 mb-8">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Profiles
            </CardTitle>
          </CardHeader>
          <CardContent>
            {profiles.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No users yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-700 font-medium">Email</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-medium">Name</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-medium">Company</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-medium">Admin</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-medium">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profiles.map((profile) => (
                      <tr key={profile.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900">{profile.email}</td>
                        <td className="py-3 px-4 text-gray-700">{profile.full_name}</td>
                        <td className="py-3 px-4 text-gray-700">{profile.company_name || '-'}</td>
                        <td className="py-3 px-4">
                          {profile.is_admin && (
                            <span className="inline-flex px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                              Admin
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-gray-500 text-sm">
                          {formatDate(profile.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Active Subscriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {subscriptions.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No subscriptions yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-700 font-medium">Customer ID</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-medium">Period End</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-medium">Auto-Renew</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptions.map((sub) => (
                      <tr key={sub.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-700 font-mono text-sm">
                          {sub.customer_id.substring(0, 20)}...
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            sub.status === 'active' ? 'bg-green-100 text-green-700' :
                            sub.status === 'trialing' ? 'bg-blue-100 text-blue-700' :
                            sub.status === 'canceled' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-500 text-sm">
                          {sub.current_period_end ? formatTimestamp(sub.current_period_end) : '-'}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {sub.cancel_at_period_end ? 'No' : 'Yes'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
