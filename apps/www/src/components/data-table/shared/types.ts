// Shared data types and mock data generators for data table examples

export interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: "in-stock" | "low-stock" | "out-of-stock"
  description: string
}

export interface Employee {
  id: string
  name: string
  email: string
  role: string
  department: string
  salary: number
  experience: number
  status: "active" | "inactive" | "on-leave"
  joinDate: string
}

export interface Customer {
  id: string
  name: string
  email: string
  company: string
  role: string
  status: "active" | "inactive" | "pending"
  lastContact: string
  value: number
}

export interface ServerProduct {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: "available" | "discontinued" | "out-of-stock"
  supplier: string
  createdAt: string
}

export interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAddress: string
  orderDate: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  items: OrderItem[]
  shippingInfo: ShippingInfo
  paymentInfo: PaymentInfo
}

export interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  image?: string
}

export interface ShippingInfo {
  carrier: string
  trackingNumber: string
  estimatedDelivery: string
  address: string
}

export interface PaymentInfo {
  method: string
  cardLast4?: string
  transactionId: string
  paidAt: string
}

export interface ServerResponse<T> {
  data: T[]
  totalCount: number
  page: number
  pageSize: number
  totalPages: number
}

// Mock data generators
export const generateProducts = (count: number): Product[] => {
  const categories = ["Electronics", "Clothing", "Books", "Home & Garden", "Sports", "Toys"]
  const statuses: Product['status'][] = ["in-stock", "low-stock", "out-of-stock"]
  
  return Array.from({ length: count }, (_, i) => ({
    id: `prod-${i + 1}`,
    name: `Product ${i + 1}`,
    category: categories[i % categories.length],
    price: Math.floor(Math.random() * 500) + 10,
    stock: Math.floor(Math.random() * 100),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    description: `This is a sample description for Product ${i + 1}`,
  }))
}

export const generateEmployees = (count: number): Employee[] => {
  const roles = ["Software Engineer", "Product Manager", "Designer", "Data Scientist", "DevOps Engineer", "QA Engineer"]
  const departments = ["Engineering", "Product", "Design", "Data", "Operations", "Quality Assurance"]
  const statuses: Employee['status'][] = ["active", "inactive", "on-leave"]
  
  return Array.from({ length: count }, (_, i) => ({
    id: `emp-${i + 1}`,
    name: `Employee ${i + 1}`,
    email: `employee${i + 1}@company.com`,
    role: roles[i % roles.length],
    department: departments[i % departments.length],
    salary: Math.floor(Math.random() * 100000) + 40000,
    experience: Math.floor(Math.random() * 15) + 1,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    joinDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
  }))
}

export const generateCustomers = (): Customer[] => [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    company: "Acme Corp",
    role: "CEO",
    status: "active",
    lastContact: "2024-01-15",
    value: 150000,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@techstart.com",
    company: "TechStart Inc",
    role: "CTO",
    status: "pending",
    lastContact: "2024-01-12",
    value: 75000,
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@innovate.co",
    company: "Innovate Co",
    role: "VP Engineering",
    status: "active",
    lastContact: "2024-01-10",
    value: 120000,
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice@futuretech.io",
    company: "FutureTech",
    role: "Product Manager",
    status: "inactive",
    lastContact: "2024-01-08",
    value: 90000,
  },
  {
    id: "5",
    name: "Charlie Wilson",
    email: "charlie@digitalwave.com",
    company: "DigitalWave",
    role: "Director",
    status: "active",
    lastContact: "2024-01-14",
    value: 200000,
  },
]

export const generateServerProducts = (count: number): ServerProduct[] => {
  const categories = ["Electronics", "Clothing", "Books", "Home & Garden", "Sports", "Toys", "Health", "Beauty", "Automotive", "Office"]
  const suppliers = ["Supplier A", "Supplier B", "Supplier C", "Supplier D", "Supplier E"]
  const statuses: ServerProduct['status'][] = ["available", "discontinued", "out-of-stock"]
  
  return Array.from({ length: count }, (_, i) => ({
    id: `server-prod-${i + 1}`,
    name: `Server Product ${i + 1}`,
    category: categories[i % categories.length],
    price: Math.floor(Math.random() * 1000) + 10,
    stock: Math.floor(Math.random() * 500),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    supplier: suppliers[i % suppliers.length],
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
  }))
}

export const generateOrders = (): Order[] => [
  {
    id: "ORD-001",
    customerName: "John Smith",
    customerEmail: "john.smith@email.com",
    customerPhone: "+1 (555) 123-4567",
    customerAddress: "123 Main St, Anytown, ST 12345",
    orderDate: "2024-01-15T10:30:00Z",
    status: "delivered",
    total: 299.99,
    items: [
      { id: "1", name: "Wireless Headphones", quantity: 1, price: 199.99 },
      { id: "2", name: "Phone Case", quantity: 2, price: 49.99 },
    ],
    shippingInfo: {
      carrier: "FedEx",
      trackingNumber: "1Z999AA1234567890",
      estimatedDelivery: "2024-01-18",
      address: "123 Main St, Anytown, ST 12345"
    },
    paymentInfo: {
      method: "Credit Card",
      cardLast4: "1234",
      transactionId: "txn_1234567890",
      paidAt: "2024-01-15T10:35:00Z"
    }
  },
  {
    id: "ORD-002",
    customerName: "Sarah Johnson",
    customerEmail: "sarah.j@email.com",
    customerPhone: "+1 (555) 234-5678",
    customerAddress: "456 Oak Ave, Another City, ST 67890",
    orderDate: "2024-01-14T14:20:00Z",
    status: "processing",
    total: 1249.97,
    items: [
      { id: "3", name: "Laptop", quantity: 1, price: 999.99 },
      { id: "4", name: "Wireless Mouse", quantity: 1, price: 79.99 },
      { id: "5", name: "Keyboard", quantity: 1, price: 169.99 },
    ],
    shippingInfo: {
      carrier: "UPS",
      trackingNumber: "1Z999AA1234567891",
      estimatedDelivery: "2024-01-20",
      address: "456 Oak Ave, Another City, ST 67890"
    },
    paymentInfo: {
      method: "PayPal",
      transactionId: "txn_1234567891",
      paidAt: "2024-01-14T14:25:00Z"
    }
  },
  {
    id: "ORD-003",
    customerName: "Mike Davis",
    customerEmail: "mike.davis@email.com",
    customerPhone: "+1 (555) 345-6789",
    customerAddress: "789 Pine St, Somewhere, ST 54321",
    orderDate: "2024-01-13T09:15:00Z",
    status: "shipped",
    total: 599.98,
    items: [
      { id: "6", name: "Gaming Monitor", quantity: 1, price: 399.99 },
      { id: "7", name: "HDMI Cable", quantity: 2, price: 99.99 },
    ],
    shippingInfo: {
      carrier: "DHL",
      trackingNumber: "1Z999AA1234567892",
      estimatedDelivery: "2024-01-17",
      address: "789 Pine St, Somewhere, ST 54321"
    },
    paymentInfo: {
      method: "Credit Card",
      cardLast4: "5678",
      transactionId: "txn_1234567892",
      paidAt: "2024-01-13T09:20:00Z"
    }
  },
  {
    id: "ORD-004",
    customerName: "Emily Chen",
    customerEmail: "emily.chen@email.com",
    customerPhone: "+1 (555) 456-7890",
    customerAddress: "321 Elm St, Elsewhere, ST 98765",
    orderDate: "2024-01-12T16:45:00Z",
    status: "pending",
    total: 149.99,
    items: [
      { id: "8", name: "Bluetooth Speaker", quantity: 1, price: 149.99 },
    ],
    shippingInfo: {
      carrier: "FedEx",
      trackingNumber: "1Z999AA1234567893",
      estimatedDelivery: "2024-01-19",
      address: "321 Elm St, Elsewhere, ST 98765"
    },
    paymentInfo: {
      method: "Credit Card",
      cardLast4: "9012",
      transactionId: "txn_1234567893",
      paidAt: "2024-01-12T16:50:00Z"
    }
  },
  {
    id: "ORD-005",
    customerName: "Robert Wilson",
    customerEmail: "rob.wilson@email.com",
    customerPhone: "+1 (555) 567-8901",
    customerAddress: "654 Maple Dr, Nowhere, ST 13579",
    orderDate: "2024-01-11T11:30:00Z",
    status: "cancelled",
    total: 89.99,
    items: [
      { id: "9", name: "Phone Charger", quantity: 1, price: 29.99 },
      { id: "10", name: "Screen Protector", quantity: 3, price: 19.99 },
    ],
    shippingInfo: {
      carrier: "N/A",
      trackingNumber: "N/A",
      estimatedDelivery: "N/A",
      address: "654 Maple Dr, Nowhere, ST 13579"
    },
    paymentInfo: {
      method: "Credit Card",
      cardLast4: "3456",
      transactionId: "txn_1234567894",
      paidAt: "2024-01-11T11:35:00Z"
    }
  },
]

// Generic mock API function
export async function mockApiCall<T>(params: {
  data: T[]
  page: number
  pageSize: number
  search?: string
  sortField?: keyof T
  sortOrder?: 'asc' | 'desc'
  categoryFilter?: string
}): Promise<ServerResponse<T>> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800))

  let filteredData = [...params.data]

  // Apply search filter
  if (params.search) {
    filteredData = filteredData.filter(item => {
      const searchableFields = Object.values(item as Record<string, unknown>)
      return searchableFields.some(field => 
        String(field).toLowerCase().includes(params.search!.toLowerCase())
      )
    })
  }

  // Apply category filter (assumes 'category' field exists)
  if (params.categoryFilter) {
    filteredData = filteredData.filter(item => 
      (item as Record<string, unknown>).category === params.categoryFilter
    )
  }

  // Apply sorting
  if (params.sortField && params.sortOrder) {
    filteredData.sort((a, b) => {
      const aVal = a[params.sortField as keyof T]
      const bVal = b[params.sortField as keyof T]
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return params.sortOrder === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      }
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return params.sortOrder === 'asc' 
          ? aVal - bVal
          : bVal - aVal
      }
      
      return 0
    })
  }

  const totalCount = filteredData.length
  const totalPages = Math.ceil(totalCount / params.pageSize)
  const startIndex = (params.page - 1) * params.pageSize
  const endIndex = startIndex + params.pageSize
  const data = filteredData.slice(startIndex, endIndex)

  return {
    data,
    totalCount,
    page: params.page,
    pageSize: params.pageSize,
    totalPages,
  }
}