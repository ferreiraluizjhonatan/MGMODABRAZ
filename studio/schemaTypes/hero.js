export default {
  name: 'hero',
  title: 'Banner Principal (Hero)',
  type: 'document',
  fields: [
    {
      name: 'badge',
      title: 'Selo de Destaque (Badge)',
      type: 'string',
      initialValue: 'Nova Coleção Primavera/Verão'
    },
    {
      name: 'title',
      title: 'Título Principal',
      type: 'string',
      description: 'Dica: use <span>texto</span> para destacar palavras em rosa e <br> para quebras de linha. Ex: Moda Casual <br><span>Direto do Brás</span>',
      initialValue: 'Moda Casual Feminina <br><span>Direto do Brás</span>'
    },
    {
      name: 'description',
      title: 'Descrição / Subtítulo',
      type: 'text',
      initialValue: 'Descubra peças versáteis, elegantes e com aquele preço justo que só a maior capital da moda no Brasil pode oferecer. Exclusividade e conforto para o seu dia a dia.'
    },
    {
      name: 'image',
      title: 'Imagem de Destaque',
      type: 'image',
      options: {
        hotspot: true
      }
    }
  ]
}
