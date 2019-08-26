export class User {
  managers: string;
  role: string;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  extension: number;

  constructor(managers, role, fullName, email, phone, extension) {
    this.managers = managers;
    this.role = role;
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
    this.extension = extension;

  }
}
