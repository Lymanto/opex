// realization-update.dto.ts
export interface RealizationUpdateDto {
  idRealization: number | null | string;
  updateRealizationDto: UpdateRealizationDto;
  approvalDto: ApprovalDto;
}

// update-realization.dto.ts
export interface TakeProjectDto {
  status: string;
  personalNumberTo: string | null;
  updatedBy: string;
}
export interface UpdateRealizationDto {
  status: string;
  statusId: number;
  statusToId: number | null | string;
  updatedBy: string; // Assuming "nopeg" is equivalent to personalNumber
}

// approval.dto.ts
export interface ApprovalDto {
  name: string; // Assuming "nama" is equivalent to personalName
  jabatan: string; // Assuming "jabatan" is equivalent to personalJob
  unit: string; // Assuming "unit" is equivalent to personalUnit
  remark: string | null;
}
