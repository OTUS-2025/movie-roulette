export const useApi = () => {
    const version = ref('v1.4')
    const baseURL = ref('https://api.poiskkino.dev/')
    const key = ref('G4Y9SMS-P7Q4YJB-Q56BYHK-Q7PKZ90')
    return {
        version,
        baseURL,
        key,
        url: `${baseURL.value}${version.value}/`,
    }
}