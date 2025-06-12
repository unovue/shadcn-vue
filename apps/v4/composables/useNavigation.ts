// Current version of Nuxt Content has limitation to render grouped content, thus required manual mapping
// https://github.com/nuxt/content/issues/3119
export async function useNavigation() {
  const { data } = await useAsyncData('navigation', () => {
    return queryCollectionNavigation('content')
  }, {
    default: () => ([]),
    transform: (data) => {
      const doc = data.find(i => i.stem === 'docs')!
      const rootDocs = doc.children?.filter(i => !i.children) ?? []
      const nonRootDocs = doc.children?.filter(i => i.children) ?? []

      return [{ ...doc, children: [{
        path: '/docs',
        stem: 'docs',
        title: 'Get Started',
        children: rootDocs,
      }, ...nonRootDocs] }]
    },
  })

  return {
    data,
  }
}
