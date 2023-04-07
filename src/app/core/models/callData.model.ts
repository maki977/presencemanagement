export interface CallData {
  firstName: string;
  lastName: string;
  email: string;
  isPresent: boolean;
}

export interface PresenceCallList {
  id?: string;
  start: string;
  createdAt: Date;
  end: string;
  matterId: string;
  promotionId: string;
  presenceList: CallData[];
}
