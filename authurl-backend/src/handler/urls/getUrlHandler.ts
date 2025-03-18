import { type Url, type Visit } from '@prisma/client'

export type getUrlsResponse = Promise<(Url & { VisitHistory: Visit[] })[]>
