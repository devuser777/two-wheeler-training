export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  licenseNumber?: string;
  trainingStatus: 'pending' | 'in-progress' | 'completed';
  registrationDate: Date;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  trainingSchedule?: {
    startDate: Date;
    endDate: Date;
    instructor?: string;
  };
  paymentStatus: 'pending' | 'completed';
  notes?: string;
} 