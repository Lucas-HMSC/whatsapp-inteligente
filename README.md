# Fila de Atendimento no WhatsApp com NodeJS
---
 - Script desenvolvido a partir da ferramenta [WhatsApp-Web.js](https://github.com/pedroslopez/whatsapp-web.js), com essas características:
    * Criar e gerenciar a fila de atendimento, de acordo com a ordem de chegada (a mensagem recebida ativa um evento, e o mesmo realiza uma verificação se o número gerador dessa mensagem está fila, caso não esteja, é inserido e retorna uma mensagem com a posição que ele obteve). Mensagens geradas em grupos são desconsideradas.
    * Junto com a mensagem incluindo a posição da fila que o gerador da mensagem obteve, há também uma saudação dinâmica (Bom dia, Boa tarde ou Boa noite, de acordo com o horário atual do computador onde o Script foi iniciado).
    * Ainda nessa mensagem, é realizado uma menção incluindo o número do gerador da mensagem. Sendo uma função nativa do WhatsApp, essa menção retorna o nome associado ao número. Caso o número esteja associado a um contato gravado no celular, é esse nome que aparecerá na menção. Caso não seja um contato, será exibido o nome que o usuário inseriu ao criar a conta do WhatsApp. Importante: o nome que resulta dessa menção pode ser diferente para o gerador da mensagem e para o receptor da mesma.
    * Exemplo da mensagem automática gerada quando recebe uma mensagem de alguém que ainda não está na fila: ![Mensagem Automática](https://i.imgur.com/yIWNDpM.png)
    * Para gerenciamento da fila, temos dois comandos:
       * **###** -> Ao enviar três vezes o #, o Script verifica se você foi o autor dessa mensagem, e caso retorne true, envia uma mensagem automática com os integrantes da fila (em forma de lista) no momento em que a função foi chamada. Caso a fila esteja vazia, a mensagem informará isso. A fila é composta pelos números das pessoas que enviaram a mensagem (evitando que uma pessoa ocupe duas posições na fila).
       * **&1** -> Enviar o & seguido de um número, realizará a remoção desse número da fila de atendimento. Para evitar confusões, é aconselhável realizar a remoção da fila após enviar o comando acima (###) para confirmar a posição que deseja retirar da fila. Após ser feito essa remoção, a fila é ordenada automaticamente e é enviado duas mensagens automáticas como confirmação da remoção da fila: uma para você mesmo, outra para a pessoa que foi removida.
       ![Fila de Atendimento](https://i.imgur.com/UPSvyNQ.png)
       * **OBS**: O envio desses comandos, devido aos retornos visuais, é aconselhável ser enviado para um grupo em que somente você seja integrante.
---
# Como Usar?
 * O uso desse Script, graças a ferramenta [WhatsApp-Web.js](https://github.com/pedroslopez/whatsapp-web.js), tem a mesma interface visual que o WhatsApp Web convencional.
 * Porém, é necessário realizar as seguintes instalações: <br />
    1. NodeJS <br />
       __https://nodejs.org/en/__
    2. WhatsApp-Web.js <br />
       __npm i whatsapp-web.js__ <br />
       __npm i qrcode-terminal__
---
# Atalho no Windows
 * Para facilitar o uso desse Script, sugiro a criação de um atalho seguindo esses passos:
    * No arquivo "Iniciar.bat", a primeira linha deve ser editada para inserir o caminho da pasta onde o Script foi colado. A segunda linha nao deve ser modificada;
    * No arquivo "Atalho.vbs", a segunda linha deve ser ediatada para inserir o caminho que leve ao arquivo acima, o "Iniciar.bat". Após editar e salvar, clique para enviar um atalho para a sua pasta de preferência. Por exemplo, Area de Trabalho.
    * Com o atalho criado, edite o nome dele como preferir. Clique com o botão direto para ver as Propriedades do atalho. Selecione 'Alterar ícone'. Caminhe até a pasta onde se encontra o arquivo "Icone.ico" e escolha-o. 
 * Confirme os procedimentos e seu atalho WhatsApp Web estará pronto. 
 ---
 # Atalho no Linux
 * Em breve.
 ---
 # Aviso Legal
 * Este projeto não é afiliado, associado, autorizado, endossado ou de qualquer forma oficialmente conectado ao WhatsApp ou a qualquer de suas subsidiárias ou afiliadas. O site oficial do WhatsApp pode ser encontrado em https://whatsapp.com. "WhatsApp", bem como nomes, marcas, emblemas e imagens relacionados são marcas registradas de seus respectivos proprietários.
---
# Licença

Copyright 2020 Lucas H M S Carvalho

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this project except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
