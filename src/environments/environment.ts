export class BuildEnvironment {
    constructor() {}
  
    public static GetEnvironmentUrl(): string {
      return environment.apiUrl;
    }
  }
  
export const environment = {
    apiUrl: "http://localhost:8080/api/v1",
}