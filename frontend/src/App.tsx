import { useState } from 'react';
import { Search, Plus, Edit3, Users, Droplets, Calendar, Phone, Mail, MapPin, Heart, Activity, Building2, Shield, UserPlus, FileText, Clock, AlertTriangle, CheckCircle, XCircle, Eye, Filter } from 'lucide-react';

const BloodBankSystem = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Sample data
  const [bloodInventory, setBloodInventory] = useState([
    { id: 1, bloodType: 'A+', quantity: 15, lastUpdated: '2025-09-10', expiryDate: '2025-10-15', status: 'Available', location: 'Mumbai Center' },
    { id: 2, bloodType: 'O-', quantity: 3, lastUpdated: '2025-09-08', expiryDate: '2025-10-20', status: 'Critical', location: 'Delhi Center' },
    { id: 3, bloodType: 'B+', quantity: 22, lastUpdated: '2025-09-12', expiryDate: '2025-11-01', status: 'Available', location: 'Bangalore Center' },
    { id: 4, bloodType: 'AB+', quantity: 5, lastUpdated: '2025-09-11', expiryDate: '2025-10-25', status: 'Low Stock', location: 'Chennai Center' }
  ]);

  const [donors, setDonors] = useState([
    { id: 1, name: 'Arjun Sharma', bloodType: 'A+', phone: '+91 98765-43210', email: 'arjun@email.com', lastDonation: '2025-07-15', status: 'Eligible', address: '123 MG Road, Mumbai', registeredDate: '2024-01-15' },
    { id: 2, name: 'Priya Patel', bloodType: 'O-', phone: '+91 87654-32109', email: 'priya@email.com', lastDonation: '2025-06-20', status: 'Eligible', address: '456 Gandhi Nagar, Delhi', registeredDate: '2024-02-20' },
    { id: 3, name: 'Rohit Singh', bloodType: 'B+', phone: '+91 76543-21098', email: 'rohit@email.com', lastDonation: '2025-08-10', status: 'Pending', address: '789 Nehru Street, Bangalore', registeredDate: '2024-03-10' },
    { id: 4, name: 'Ananya Reddy', bloodType: 'AB+', phone: '+91 65432-10987', email: 'ananya@email.com', lastDonation: '2025-05-30', status: 'Eligible', address: '321 Park Avenue, Chennai', registeredDate: '2024-04-05' }
  ]);

  const [bloodRequests, setBloodRequests] = useState([
    { id: 1, patientName: 'Rajesh Kumar', bloodType: 'A+', quantity: 2, urgency: 'High', hospital: 'AIIMS Delhi', requestDate: '2025-09-13', status: 'Pending', contactPerson: 'Dr. Mehra', phone: '+91 98765-00001' },
    { id: 2, patientName: 'Sneha Gupta', bloodType: 'O-', quantity: 3, urgency: 'Critical', hospital: 'Apollo Mumbai', requestDate: '2025-09-12', status: 'Approved', contactPerson: 'Dr. Patel', phone: '+91 98765-00002' },
    { id: 3, patientName: 'Vikash Jain', bloodType: 'B+', quantity: 1, urgency: 'Medium', hospital: 'Fortis Bangalore', requestDate: '2025-09-11', status: 'Completed', contactPerson: 'Dr. Sharma', phone: '+91 98765-00003' }
  ]);

  const [hospitals, setHospitals] = useState([
    { id: 1, name: 'AIIMS Delhi', address: 'Ansari Nagar, New Delhi', contact: '+91 11-26588500', email: 'info@aiims.edu', registeredDate: '2024-01-01', status: 'Active' },
    { id: 2, name: 'Apollo Mumbai', address: 'Tardeo Road, Mumbai', contact: '+91 22-26968888', email: 'info@apollomumbai.com', registeredDate: '2024-01-15', status: 'Active' },
    { id: 3, name: 'Fortis Bangalore', address: 'Bannerghatta Road, Bangalore', contact: '+91 80-66214444', email: 'info@fortisbangalore.com', registeredDate: '2024-02-01', status: 'Active' }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBloodType, setSelectedBloodType] = useState('');

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Available': return 'bg-green-100 text-green-800 border-green-200';
      case 'Eligible': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pending': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'High': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'Medium': return <Clock className="w-4 h-4 text-yellow-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const DashboardTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Total Blood Units</h3>
              <p className="text-3xl font-bold">{bloodInventory.reduce((sum, item) => sum + item.quantity, 0)}</p>
            </div>
            <Droplets className="w-12 h-12 text-white/80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Active Donors</h3>
              <p className="text-3xl font-bold">{donors.filter(d => d.status === 'Eligible').length}</p>
            </div>
            <Users className="w-12 h-12 text-white/80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Pending Requests</h3>
              <p className="text-3xl font-bold">{bloodRequests.filter(r => r.status === 'Pending').length}</p>
            </div>
            <FileText className="w-12 h-12 text-white/80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Hospitals</h3>
              <p className="text-3xl font-bold">{hospitals.length}</p>
            </div>
            <Building2 className="w-12 h-12 text-white/80" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-red-500" />
          Critical Alerts
        </h2>
        <div className="space-y-3">
          {bloodInventory.filter(item => item.quantity < 5).map(item => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span className="font-medium text-red-800">Low stock alert for {item.bloodType} blood type</span>
              </div>
              <span className="text-red-600 font-bold">{item.quantity} units left</span>
            </div>
          ))}
          {bloodRequests.filter(req => req.urgency === 'Critical').map(req => (
            <div key={req.id} className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-orange-500" />
                <span className="font-medium text-orange-800">Critical blood request for {req.patientName}</span>
              </div>
              <span className="text-orange-600 font-bold">{req.bloodType} - {req.quantity} units</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Activity className="w-6 h-6 text-blue-500" />
            Recent Donations
          </h2>
          <div className="space-y-3">
            {donors.slice(0, 3).map(donor => (
              <div key={donor.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {donor.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{donor.name}</p>
                  <p className="text-sm text-gray-600">Donated {donor.bloodType} on {donor.lastDonation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-green-500" />
            Recent Requests
          </h2>
          <div className="space-y-3">
            {bloodRequests.slice(0, 3).map(request => (
              <div key={request.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  {getUrgencyIcon(request.urgency)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{request.patientName}</p>
                  <p className="text-sm text-gray-600">{request.bloodType} - {request.quantity} units ({request.urgency})</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                  {request.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const SearchTab = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Search className="w-6 h-6" />
          Blood Availability Search
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-white/70" />
            <input
              type="text"
              placeholder="Search by blood type or location..."
              className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            value={selectedBloodType}
            onChange={(e) => setSelectedBloodType(e.target.value)}
          >
            <option value="">All Blood Types</option>
            {bloodTypes.map(type => (
              <option key={type} value={type} className="text-gray-800">{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {bloodInventory
          .filter(item => 
            (selectedBloodType === '' || item.bloodType === selectedBloodType) &&
            (searchQuery === '' || 
             item.bloodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
             item.location.toLowerCase().includes(searchQuery.toLowerCase()))
          )
          .map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Droplets className="w-8 h-8 text-red-500" />
                  <span className="text-2xl font-bold text-gray-800">{item.bloodType}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Quantity:</span>
                  <span className="text-lg font-bold text-red-600">{item.quantity} units</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Expires: {item.expiryDate}</span>
                </div>
                <div className="text-xs text-gray-400">
                  Last updated: {item.lastUpdated}
                </div>
              </div>
              <button className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                Request Blood
              </button>
            </div>
        ))}
      </div>
    </div>
  );

  const DonorsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-500" />
          Donor Management
        </h2>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <UserPlus className="w-4 h-4" />
          Register Donor
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {donors.map(donor => (
          <div key={donor.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {donor.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{donor.name}</h3>
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-red-500" />
                    <span className="font-medium text-red-600">{donor.bloodType}</span>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(donor.status)}`}>
                {donor.status}
              </span>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{donor.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{donor.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{donor.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Last donation: {donor.lastDonation}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Registered: {donor.registeredDate}</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 mt-4 pt-4 border-t border-gray-100">
              <button className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                Contact
              </button>
              <button className="text-blue-600 hover:text-blue-900 transition-colors p-2">
                <Eye className="w-4 h-4" />
              </button>
              <button className="text-gray-600 hover:text-gray-900 transition-colors p-2">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const RequestsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FileText className="w-6 h-6 text-green-500" />
          Blood Requests
        </h2>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          New Request
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Urgency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bloodRequests.map(request => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">{request.patientName}</div>
                      <div className="text-sm text-gray-500">{request.contactPerson}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-red-500" />
                      <span className="font-medium">{request.bloodType}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.quantity} units</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getUrgencyIcon(request.urgency)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.urgency)}`}>
                        {request.urgency}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.hospital}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      {request.status === 'Pending' && (
                        <>
                          <button className="text-green-600 hover:text-green-900 transition-colors">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900 transition-colors">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button className="text-blue-600 hover:text-blue-900 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const HospitalsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Building2 className="w-6 h-6 text-purple-500" />
          Hospital Management
        </h2>
        <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Register Hospital
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {hospitals.map(hospital => (
          <div key={hospital.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-white">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{hospital.name}</h3>
                  <p className="text-sm text-gray-600">Registered: {hospital.registeredDate}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(hospital.status)}`}>
                {hospital.status}
              </span>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{hospital.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{hospital.contact}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{hospital.email}</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 mt-4 pt-4 border-t border-gray-100">
              <button className="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                View Requests
              </button>
              <button className="text-blue-600 hover:text-blue-900 transition-colors p-2">
                <Eye className="w-4 h-4" />
              </button>
              <button className="text-gray-600 hover:text-gray-900 transition-colors p-2">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Blood Bank Management System</h1>
              <p className="text-gray-600">Comprehensive blood inventory and donor management</p>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Activity },
              { id: 'search', label: 'Blood Search', icon: Search },
              { id: 'donors', label: 'Donors', icon: Users },
              { id: 'requests', label: 'Requests', icon: FileText },
              { id: 'hospitals', label: 'Hospitals', icon: Building2 }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-3 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'search' && <SearchTab />}
        {activeTab === 'donors' && <DonorsTab />}
        {activeTab === 'requests' && <RequestsTab />}
        {activeTab === 'hospitals' && <HospitalsTab />}
      </main>
    </div>
  );
};

export default BloodBankSystem;