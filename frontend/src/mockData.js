export const mockUsers = [
  { email: 'admin@example.com', password: 'Admin123!', role: 'Admin', name: 'Administrator' },
  { email: 'user@example.com', password: 'User123!', role: 'User', name: 'Demo User' },
]

export const mockApplications = [
  {
    id: 1,
    applicationName: 'Finance Portal',
    applicationUrl: 'https://finance.example.com',
    hostedOn: ['srv-fin-01','srv-fin-02'],
    apiServer: 'api.finance.example.com',
    dbServer: 'sql-prod-01',
    applicationOwner: 'Alice',
    status: 'Active',
    isDeleted: false
  },
  {
    id: 2,
    applicationName: 'HR Manager',
    applicationUrl: 'https://hr.example.com',
    hostedOn: ['srv-hr-01'],
    apiServer: null,
    dbServer: null,
    applicationOwner: 'Bob',
    status: 'Decommissioned',
    isDeleted: false
  },
  {
    id: 3,
    applicationName: 'Inventory System',
    applicationUrl: 'https://inventory.example.com',
    hostedOn: ['srv-inv-01'],
    apiServer: 'api.inventory.example.com',
    dbServer: 'sql-db-02',
    applicationOwner: 'Carol',
    status: 'Active',
    isDeleted: false
  }
]
