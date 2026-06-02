# Meu Primeiro Chatbot

Exemplo didatico para a trilha de Inteligencia Artificial da My Robot Barra.

Este projeto mostra como um aluno pode transformar prompts simples em uma pequena interface de chatbot. Ele nao usa uma API real de IA; as respostas sao geradas por regras em JavaScript para demonstrar o fluxo antes de conectar um modelo de verdade.

## O que o aluno aprende

- Como separar interface, estilos e logica.
- Como montar modos diferentes para o mesmo chatbot.
- Como exibir o "prompt" que guia cada resposta.
- Como testar e melhorar respostas sem depender de backend.

## Como rodar

Abra `index.html` no navegador.

Opcionalmente, sirva a pasta com um servidor local:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Proximos passos

- Trocar as regras locais por uma chamada real a uma API de IA.
- Salvar as conversas em `localStorage`.
- Permitir que o aluno crie seus proprios modos de prompt.
