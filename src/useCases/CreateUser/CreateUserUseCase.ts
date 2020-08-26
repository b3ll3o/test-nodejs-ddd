import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserDTO } from "./CreateUserDTO";
import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";

export class CreateUserUseCase {

  constructor(
    private userRepository: IUserRepository, 
    private mailProvider: IMailProvider
  ){ }

  async execute(data: ICreateUserDTO) {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if(userAlreadyExists)
      throw new Error('User already exists');

    const user = new User(data);

    await this.userRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
        name: data.name, 
        email: data.email
      }, 
      from: {
        name: 'Equipe do meu app', 
        email: 'equipe@app.com'
      }, 
      subject: 'Seja bem-vindo ao app.', 
      body: '<p>Você já pode fazer login em nossa plataforma.</p>'
    });
  }
}