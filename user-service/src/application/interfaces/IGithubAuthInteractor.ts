import {
  githubAuthRequestDTO,
  githubAuthResponseDTO,
} from "../dtos/githubAuthDTO";

export interface IGithubAuthInteractor {
  execute(body: githubAuthRequestDTO): Promise<githubAuthResponseDTO>;
}
