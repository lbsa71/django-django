import React, { useEffect, useState } from 'react';
import { customerApi, logApi } from './services/api';
import { Customer, OperationLog, CreateCustomerData } from './types/api';
import './App.css';

function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [logs, setLogs] = useState<OperationLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState<CreateCustomerData>({
    name: '',
    email: '',
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const [customersData, logsData] = await Promise.all([
        customerApi.list(),
        logApi.list(),
      ]);
      setCustomers(customersData);
      setLogs(logsData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCustomer) {
        await customerApi.update(editingCustomer.id, formData);
      } else {
        await customerApi.create(formData);
      }
      setFormData({ name: '', email: '' });
      setEditingCustomer(null);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormData({ name: customer.name, email: customer.email });
  };

  const handleDelete = async (id: number) => {
    try {
      await customerApi.delete(id);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <h1>Customer Management</h1>
      
      <form onSubmit={handleSubmit} className="form">
        <h2>{editingCustomer ? 'Edit Customer' : 'Add Customer'}</h2>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
          required
        />
        <button type="submit">
          {editingCustomer ? 'Update' : 'Add'}
        </button>
        {editingCustomer && (
          <button type="button" onClick={() => {
            setEditingCustomer(null);
            setFormData({ name: '', email: '' });
          }}>
            Cancel
          </button>
        )}
      </form>

      <div className="content">
        <div className="customers">
          <h2>Customers</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{new Date(customer.created_at).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleEdit(customer)}>Edit</button>
                    <button onClick={() => handleDelete(customer.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="logs">
          <h2>Operation Logs</h2>
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Operation</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id}>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                  <td>{log.operation}</td>
                  <td>{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
