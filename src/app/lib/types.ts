export interface headerType {
  id: string;
  title: string;
}
export interface tableBodyReallocationType {
  id: string;
  documentName: string;
  docType: string;
  size: string;
  uploadBy: string;
  departmentBy: string;
  uploadDate: string;
  description: string;
}

export interface ApprovalType {
  idRealization: string;
  taReff: string | null;
  requestNumber: string;
  typeOfLetter: string;
  entryDate: Date;
  amountSubmission: number;
  status: string;
  statusTo: string;
  departmentTo: string;
  description: string;
}
export interface ApprovalDetailType {
  idRealization: number;
  uniqueId: string;
  years: number;
  month: number;
  costCenterId: number;
  draftNumber: number;
  requestNumber: string;
  taReff: string | null | undefined;
  type: string;
  typeOfLetter: string;
  responsibleNopeg: string;
  titleRequest: string;
  noteRequest: string;
  status: string;
  statusId: number;
  department: string;
  personalNumber: string;
  statusToId: number;
  departmentTo: string;
  personalNumberTo: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: Date | null;
  contributors: null;
}

export interface userType {
  personalNumber: string;
  personalName: string;
  personalTitle: string;
  personalUnit: string;
  personalEmail: string;
  personalBirthPlace: string;
  personalBirthDate: string;
  personalGrade: string;
  personalImage: string | null;
  isGmfEmployee: string | null;
}

export interface modalDocumentType {
  docName: string;
  docCategory: string;
  size: string;
  file: File;
}

export interface documentCategoryType {
  idDocCategory: number;
  uniqueId: string;
  module: string;
  docCategory: string;
  description: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string | null;
}

export interface glAccountType {
  idGlAccount?: number;
  uniqueId?: string;
  glAccount: string;
  description?: string;
  groupDetail: string;
  groupGl: string;
  sap: boolean;
  active: boolean;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string | null;
}

export interface mGlAccountType {
  idGlAccount: number;
  glAccount: string;
  groupGL: string;
  groupDetail: string;
}
export interface mCostCenterType {
  idCostCenter: number;
  costCenter: string;
  bidang: string;
  dinas: string;
}
export interface availableType {
  available: number;
  mGlAccount: mGlAccountType;
  mCostCenter: mCostCenterType;
}
export interface selectType {
  id: string | number;
  value: string;
}

export interface kursType {
  idKurs?: number;
  uniqueId?: string;
  years?: number | string;
  value: number;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
}

export interface CreateRequestRealizationType {
  type: string;
  responsibleNopeg: number;
  personalNumber: string;
  costCenterId: number;
  createdBy: string;
  titleRequest: string;
  noteRequest: string;
  realizationItems: RealizationItemsType[];
  uploadfile: File[];
  docCategoryId: string[];
  docName: string[];
}

export interface RealizationItemsType {
  amountSubmission: number;
  periodStart: Date;
  periodFinish: Date;
  descPby: string;
  remarkPby: string;
  glAccountId: number;
}
export interface newRequestUploadType {
  id: string;
  documentName: string;
  documentType: string;
  size: string;
  uploadBy: string;
  departmentBy: string;
  uploadDate: string;
  file: File;
}

export interface RKAPType {
  [x: string]: any;
  title: string;
  total: number;
  month: {
    JANUARI: number;
    FEBRUARI: number;
    MARET: number;
    APRIL: number;
    MEI: number;
    JUNI: number;
    JULI: number;
    AGUSTUS: number;
    SEPTEMBER: number;
    OKTOBER: number;
    NOVEMBER: number;
    DESEMBER: number;
  };
  groupDetail?: RKAPGroupDetailType[];
}
export interface ViewBudgetMasterData {
  budget: RKAPType | null;
  actual: RKAPType | null;
  remaining: RKAPType | null;
}
export interface BudgetMTDYTD {
  budget: { BudgetMTD: number; BudgetYTD: number };
}
export interface RKAPGroupDetailType {
  title: string;
  total: number;
  glNumber: number;
  month: {
    JANUARI: number;
    FEBRUARI: number;
    MARET: number;
    APRIL: number;
    MEI: number;
    JUNI: number;
    JULI: number;
    AGUSTUS: number;
    SEPTEMBER: number;
    OKTOBER: number;
    NOVEMBER: number;
    DESEMBER: number;
  };
}

export interface CostCenterType {
  idCostCenter?: number;
  uniqueId?: string;
  costCenter: string;
  description: string;
  bidang: string;
  dinas: string;
  directorat: string;
  groupDinas: string;
  profitCenter: string;
  active: boolean;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string | null;
}

export interface UploadRKAP {
  years: string;
  file: File;
  createdBy: string;
}
export interface personalSummaryTypes {
  totalSubmissionValue: number;
  data: personalSummaryDataTypes[];
}
export interface personalSummaryDataTypes {
  idRealization: string;
  dinas: string;
  month: number;
  years: number;
  requestNumber: string | null;
  typeSubmission: string;
  submissionValue: number;
  status: string;
  requestBy: string;
  responsibleOfRequest: string;
  description: string;
}
