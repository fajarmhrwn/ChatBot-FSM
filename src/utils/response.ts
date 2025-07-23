/**
 * Respons API.
 * @class
 */
export class ApiResponse {

  public success: boolean;
  public message: string;
  public data: any;

  constructor(success: boolean, message: string, data: any = null) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
