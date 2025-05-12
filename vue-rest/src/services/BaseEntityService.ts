import type { IResultObject } from '@/types/IResultObject'
import { BaseService } from '@/services/BaseService'
import type { IDomainId } from '@/domain/IDomainId'

export abstract class BaseEntityService<TEntity extends IDomainId> extends BaseService {
  constructor(private basePath: string) {
    super()
  }

  async getAllAsync(): Promise<IResultObject<TEntity[]>> {
    const url = this.basePath
    try {
      const response = await this.axiosInstance.get<TEntity[]>(url)
      console.log('getAll response', response)
      if (response.status <= 300) {
        return { data: response.data }
      }

      return {
        errors: [(response.status.toString() + ' ' + response.statusText).trim()],
      }
    } catch (error) {
      console.log('error: ', (error as Error).message)
      return {
        errors: [JSON.stringify(error)],
      }
    }
  }

  async getAsync(id: string): Promise<IResultObject<TEntity>> {
    try {
      const response = await this.axiosInstance.get<TEntity>(this.basePath + '/' + id)

      console.log('get response', response)

      if (response.status <= 300) {
        return {
          data: response.data,
        }
      }

      return {
        errors: [(response.status.toString() + ' ' + response.statusText).trim()],
      }
    } catch (error) {
      console.log('error: ', (error as Error).message)
      return {
        errors: [JSON.stringify(error)],
      }
    }
  }

  async addAsync(entity: TEntity): Promise<IResultObject<TEntity>> {
    try {
      const response = await this.axiosInstance.post<TEntity>(this.basePath, entity)
      console.log('add response', response)

      if (response.status <= 300) {
        return { data: response.data }
      }

      return {
        errors: [(response.status.toString() + ' ' + response.statusText).trim()],
      }
    } catch (error) {
      console.log('error: ', (error as Error).message)
      return {
        errors: [JSON.stringify(error)],
      }
    }
  }

  async deleteAsync(id: string): Promise<IResultObject<null>> {
    try {
      const response = await this.axiosInstance.delete<null>(this.basePath + '/' + id)

      console.log('get response', response)

      if (response.status <= 300) {
        return { data: response.data }
      }

      return {
        errors: [(response.status.toString() + ' ' + response.statusText).trim()],
      }
    } catch (error) {
      console.log('error: ', (error as Error).message)
      return {
        errors: [JSON.stringify(error)],
      }
    }
  }

  async editAsync(entity: TEntity): Promise<IResultObject<TEntity>> {
  try {
    const response = await this.axiosInstance.put<TEntity>(this.basePath + '/' + entity.id, entity)
    console.log('edit response', response)

    if (response.status <= 300) {
      return { data: response.data }
    }

    return {
      errors: [(response.status.toString() + ' ' + response.statusText).trim()],
    }
  } catch (error) {
    console.log('error: ', (error as Error).message)
    return {
      errors: [JSON.stringify(error)],
    }
  }
}
}
