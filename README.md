# CheckLastEventStatus UseCase

> ## Dados
* Id do Grupo

> ## Fluxo primário
1. Obter os dados da último evento do grupo (data de término e duração do mercado de notas)
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

## Design Patterns/Principles/Conventions
- TDD: Test Driven Development, Red - Green - Refactor
- You Ain't Gonna Need It (YAGNI): Não instalar express antes da hora
- Single Responsability Principle: UseCases
- Unit Test: Verificar o comportamento da menor unidade de sua aplicação (ex: useCase)
- SUT: System Under Test, ou unidade sendo testada
- Dummy Double: Dublê de teste usado para representar dados que são irrelevantes para o SUT
- Arrange, Act, Assert (AAA)
- Given When Then (GWT)
- Repository/Gateway pattern: Class da camada Model que trás dados de fora da aplicação, fonte de dados
- Dependency Inversion Principle: Unidades de alto nível não devem dependender de unidades de baixo nível
- Inversion of Control / Dependency Injection (DJ): Ao invés da unidade criar suas instâncias, ela recebe de fora 