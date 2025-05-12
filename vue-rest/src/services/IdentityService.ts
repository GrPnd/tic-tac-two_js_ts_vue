import type { IResultObject } from '@/types/IResultObject.ts'
import { BaseService } from '@/services/BaseService.ts'
import type { LoginDto } from '@/types/LoginDto.ts'
import type { IRegisterResponse } from '@/types/IRegisterResponse'


export class IdentityService extends BaseService {
  async login(email: string, password: string): Promise<IResultObject<LoginDto>> {
    const url = 'account/login'
    try {
      const loginData = {
        email,
        password,
      }
      const response = await this.axiosInstance.post<LoginDto>(url, loginData)

      console.log('login response', response)
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

  async register(data: {
    email: string
    password: string
    firstName: string
    lastName: string
  }): Promise<IResultObject<IRegisterResponse>> {
    const url = 'account/register'

    try {
      const response = await this.axiosInstance.post<IRegisterResponse>(url, data)

      console.log('register response', response)
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
