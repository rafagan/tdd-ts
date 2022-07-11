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

## Design Patterns/Principles/Conventions