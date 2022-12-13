export const useLocalAssets = () => {
  const loadAsset = (uri: string) => {
    return require(`../../assets${uri}`)
  }

  return loadAsset
}