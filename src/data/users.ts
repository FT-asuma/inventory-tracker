export type UserRole = 'executive' | 'supervisor' | 'agent' | 'logistics'
export type Department = 'Management' | 'Operations' | 'Field Sales' | 'Distribution'

export type Seller = {
  id: string
  name: string
  phone: number
  imageUrl: string
  email: string
  label: string
  role: UserRole
  department: Department
  supervisorId: string | null // Points to another invetra-[id]
  createdAt: string
}

export const usersList: Seller[] = [
  // --- SECTION: MANAGEMENT & EXECUTIVES ---
  {
    id: "invetra-001",
    name: "Anvar Alimov",
    phone: 998901234567,
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    email: "anvar.a@apexagro.uz",
    label: "Director",
    role: "executive",
    department: "Management",
    supervisorId: null,
    createdAt: "2026-01-12T10:30:00Z"
  },

  // --- SECTION: SUPERVISORS / MANAGERS ---
  {
    id: "invetra-002",
    name: "Malika Karimova",
    phone: 998935551234,
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    email: "malika.k@apexagro.uz",
    label: "Sales Supervisor",
    role: "supervisor",
    department: "Operations",
    supervisorId: "invetra-001", // Reports to Anvar
    createdAt: "2026-02-20T14:15:00Z"
  },
  {
    id: "invetra-003",
    name: "Dmitry Petrov",
    phone: 998974449876,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    email: "d.petrov@apexagro.uz",
    label: "Logistics Fleet Mgr",
    role: "supervisor",
    department: "Distribution",
    supervisorId: "invetra-001", // Reports to Anvar
    createdAt: "2025-11-05T08:45:00Z"
  },

  // --- SECTION: FIELD AGENTS / SELLERS ---
  {
    id: "invetra-004",
    name: "Laylo Umarova",
    phone: 998912223344,
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
    email: "laylo.u@apexagro.uz",
    label: "Tashkent Field Agent",
    role: "agent",
    department: "Field Sales",
    supervisorId: "invetra-002", // Reports to Malika
    createdAt: "2026-03-01T09:00:00Z"
  },
  {
    id: "invetra-005",
    name: "Shakhzod Tursunov",
    phone: 998909998877,
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    email: "shakhzod.t@apexagro.uz",
    label: "Samarkand Lead Agent",
    role: "agent",
    department: "Field Sales",
    supervisorId: "invetra-002", // Reports to Malika
    createdAt: "2026-04-18T16:20:00Z"
  },

  // --- SECTION: LOGISTICS & DISPATCH ---
  {
    id: "invetra-006",
    name: "Elena Smirnova",
    phone: 998931112233,
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    email: "elena.s@apexagro.uz",
    label: "Route Dispatcher",
    role: "logistics",
    department: "Distribution",
    supervisorId: "invetra-003", // Reports to Dmitry
    createdAt: "2026-05-28T11:10:00Z"
  }
]