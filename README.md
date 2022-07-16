# CheckLastEventStatus UseCase

> ## Dados
* Id do Grupo

> ## Fluxo primário
1. Obter os dados da último evento do grupo (data de término e duração)
2. Retornar status "ativo" se o evento ainda não foi encerrado

> ## Fluxo alternativo: Evento está no limite do encerramento
1. Retornar status "ativo"

> ## Fluxo alternativo: Evento encerrado, mas está dentro do período do mercado das notas
1. Retornar status "em revisão"

> I Fluxo alternativo: Evento e mercado das notas encerrados
1. Retornar status "encerrado"

> ## Fluxo alternativo: Grupo não tem nenhum evento marcado
1. Retornar status "encerrado"

# Notas

## Anti Patterns/Code Smells
- Speculative Generality: Supor coisas que se precisa antes de precisar (ex: instalar coisas)
- God Class: Unidade que possui multiplas funcionalidades e centenas de linhas
- Divergent Change: Precisar mexer no componente por mais de um motivo
- Spaces/Blank lines: Não trabalhar com as convenções de espaçamento e separação de linhas
- Improper instantiation: Criar instâncias no lugar errado
- High Coupling: Consequência de ferir o Dependency Inversion Principle
- Test Code in Production: Jamais misturar código e dependências de teste no produto
- Duplicate Code: Códigos iguais em lugares diferentes
- Shotgun Surgery: Ao modificar o código em um lugar, você precisa modificar diversos outros lugares
- Primitive obsession: Utilizar em excesso variáveis primitivas reduz a clareza do código
- Implicit logic: Dar nomes claros, evitar tipos confusos

## Design Patterns/Principles/Conventions
- TDD: Test Driven Development, Red - Green - Refactor
- You Ain't Gonna Need It (YAGNI): Não instalar express antes da hora
- Single Responsability Principle: UseCases
- Unit Test: Verificar o comportamento da menor unidade de sua aplicação (ex: useCase)
- SUT: System Under Test, ou unidade sendo testada
- Dummy Double: Utilizado para representar dados que são irrelevantes para o SUT
- Arrange, Act, Assert (AAA)
- Given When Then (GWT)
- Repository/Gateway pattern: Class da camada Model que trás dados de fora da aplicação, fonte de dados
- Dependency Inversion Principle: Entities e UseCases não devem depender diretamente de Gateways
- Inversion of Control / Dependency Injection (DJ): Ao invés da unidade criar suas instâncias, ela recebe de fora
- Fake Double: Implementação fake de alguma interface da aplicação que é injetada
- Liskov Substitution Principle: É possível substituir um RepositoryFake por uma implementação real sem side effects
- Small commits: Evitar levar muito tempo para commitar, Squash e Rebase podem ser necessários
- Mock Double: Substituto de uma função ou objeto utilizado para avaliar e consumir chamadas
- Spy Double: Utilizado para avaliar chamadas, mas mantendo o comportamento original da função
- Stub Double: Utilizado para representar dados que são relevantes para o SUT
- Strategy: Design Pattern onde é possível intercambiar instâncias
- Factory: Design Pattern onde é centralizada a criação da instância