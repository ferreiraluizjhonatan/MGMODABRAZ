# Como configurar o seu Painel do Sanity.io (Acesso pelo Celular)

Siga os passos abaixo para configurar o seu painel de controle de fotos e produtos no Sanity e integrá-lo com o seu site.

---

## Passo 1: Criar sua conta e projeto no Sanity
1. Acesse **[sanity.io](https://www.sanity.io/)** e clique em **"Get Started"** (ou faça login).
2. Crie uma conta gratuita usando sua conta do GitHub ou Google.
3. No painel inicial do Sanity (Sanity Manage), clique em **"Create new project"** (ou use o terminal no computador).
   * **Dica:** Para criar rápido pelo terminal do computador, na pasta do projeto rodando no prompt, você pode rodar o comando:
     ```bash
     npm create sanity@latest
     ```
   * Siga os passos na tela. Quando perguntar qual o tipo de projeto, selecione **"Clean project with no templates"** (Projeto limpo).
4. Anote o **Project ID** (um código de letras e números de cerca de 8 dígitos).

---

## Passo 2: Configurar o Código do Site
1. Abra o arquivo `scripts/sanity.js` no seu editor.
2. Na linha 3, substitua `'YOUR_SANITY_PROJECT_ID'` pelo seu **Project ID** real.
   ```javascript
   export const SANITY_CONFIG = {
     projectId: 'SEU_CODIGO_AQUI', // Ex: 'abc123de'
     dataset: 'production',
     apiVersion: '2023-08-01',
     useCdn: true,
   };
   ```

---

## Passo 3: Adicionar os Esquemas (Schemas) no Sanity Studio
Dentro da pasta do seu projeto Sanity (o painel administrativo que você criou):
1. Copie os arquivos de esquema que criei para você:
   * Copie [hero.js](schemas/hero.js) para a pasta `schemas/` ou `schemaTypes/` do seu projeto Sanity.
   * Copie [product.js](schemas/product.js) para a pasta `schemas/` ou `schemaTypes/` do seu projeto Sanity.
2. Registre-os no arquivo `index.js` (ou `index.ts`) da pasta de esquemas do seu Sanity Studio:
   ```javascript
   import hero from './hero'
   import product from './product'

   export const schemaTypes = [hero, product]
   ```
3. Publique/Suba o seu Sanity Studio rodando `npx sanity deploy` ou acesse direto a versão web criada pelo comando inicial. O Sanity disponibiliza um link seguro `https://seu-projeto.sanity.studio` que você pode abrir em **qualquer celular**!

---

## Passo 4: Configurar a Permissão de Acesso (CORS) — IMPORTANTE!
O Sanity bloqueia por padrão que sites externos acessem os dados por segurança. Você precisa liberar o seu site:
1. Acesse o painel **[sanity.io/manage](https://www.sanity.io/manage)**.
2. Selecione o seu projeto.
3. Vá na aba **API** -> seção **CORS Origins**.
4. Clique em **"Add CORS Origin"** e adicione os seguintes endereços:
   * **`http://localhost:5173`** (Para testar no seu computador local com o Vite)
   * **`https://seu-site.vercel.app`** (O link oficial que a Vercel vai te dar para o seu site)
5. Marque a caixa **"Allow credentials"** (Permitir credenciais) e clique em **Save**.

---

## Pronto! 🎉
Agora você pode:
1. Abrir o link `https://seu-projeto.sanity.studio` no seu celular.
2. Cadastrar as fotos reais e textos.
3. Abrir o site (tanto local quanto hospedado na Vercel) e ver tudo atualizar instantaneamente!
