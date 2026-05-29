export default {
  name: 'product',
  title: 'Produtos',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Nome do Produto',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Categoria',
      type: 'string',
      description: 'Ex: Conjuntos, Vestidos, Blusas',
      options: {
        list: [
          { title: 'Conjuntos', value: 'Conjuntos' },
          { title: 'Vestidos', value: 'Vestidos' },
          { title: 'Blusas', value: 'Blusas' },
          { title: 'Calças', value: 'Calças' },
          { title: 'Casacos', value: 'Casacos' }
        ]
      }
    },
    {
      name: 'price',
      title: 'Preço (R$)',
      type: 'number',
      description: 'Digite apenas o número com ponto para centavos. Ex: 119.90',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'image',
      title: 'Foto do Produto',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'isNew',
      title: 'Produto Novo?',
      type: 'boolean',
      description: 'Marque para exibir o selo "Novo" no produto',
      initialValue: false
    },
    {
      name: 'whatsappMessage',
      title: 'Mensagem do WhatsApp personalizada',
      type: 'string',
      description: 'Mensagem que o cliente enviará ao clicar em comprar. Se deixar em branco, o site criará uma padrão.',
    }
  ]
}
