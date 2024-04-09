import { JSONFilePreset } from 'lowdb/node'

// Define a estrutura inicial do seu repositório e cria quando o arquivo db.json não existir
const database = await JSONFilePreset('./database/db.json', { products: [] })

export default database