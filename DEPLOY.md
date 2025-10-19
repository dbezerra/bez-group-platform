# B.E.Z. Group Platform - Deploy Instructions

## 🚀 Deploy Options

### Option 1: Netlify Drop (Mais Fácil)
1. Acesse: https://app.netlify.com/drop
2. Arraste a pasta `dist/bez-group-platform` para a área de drop
3. Aguarde o upload e obtenha sua URL pública

### Option 2: Vercel (Recomendado)
1. Acesse: https://vercel.com
2. Faça login com GitHub/GitLab/Email
3. Clique em "New Project"
4. Conecte seu repositório ou faça upload da pasta `dist/bez-group-platform`
5. Configure:
   - Framework Preset: Other
   - Build Command: (deixar vazio)
   - Output Directory: dist/bez-group-platform
6. Deploy!

### Option 3: GitHub Pages
1. Crie um repositório no GitHub
2. Faça upload da pasta `dist/bez-group-platform` para o repositório
3. Vá em Settings > Pages
4. Selecione a branch main e pasta / (root)
5. Sua URL será: https://seuusuario.github.io/seurepositorio

## 📁 Arquivos Prontos para Deploy
- ✅ Build de produção criado em `dist/bez-group-platform/`
- ✅ Configuração de redirects para SPA
- ✅ Otimizações de performance aplicadas

## 🌐 Funcionalidades Online
- ✅ Sistema de login (demo/demo)
- ✅ Dashboard completo
- ✅ Multi-idioma (PT-BR/EN-US)
- ✅ B.E.Z. Coins
- ✅ Perfil do membro
- ✅ Design responsivo

## 🔧 Comandos Úteis
```bash
# Build local
ng build --configuration production

# Servir localmente
ng serve --configuration production

# Verificar build
ls dist/bez-group-platform/
```

## 📱 Teste Local
Para testar o build de produção localmente:
```bash
cd dist/bez-group-platform
npx http-server -p 8080
```
Acesse: http://localhost:8080
