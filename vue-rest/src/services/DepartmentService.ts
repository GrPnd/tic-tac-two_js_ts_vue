import type { IDepartment } from '@/domain/IDepartment'
import { BaseEntityService } from '@/services/BaseEntityService'

export class DepartmentService extends BaseEntityService<IDepartment> {
  constructor() {
    super('DepartmentsApi')
  }
}
