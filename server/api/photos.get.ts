import type { Photo } from '~/types/photo'
import type { ApiResponse, PaginatedResponse } from '~/types'

const mockPhotos: Photo[] = Array.from({ length: 50 }).map((_, i) => ({
  id: `${i + 1}`,
  src: `https://images.unsplash.com/photo-${
    [
      '1470071459604-3b5ec3a7fe05',
      '1497436072909-60f360e1d4b0',
      '1507525428034-b723cf961d3e',
      '1519681393784-d120267933ba',
      '1472214103451-9374bd1c798e',
      '1447752875215-b2761acb3c5d',
      '1500382017468-9049fed747ef',
      '1469474968028-af50264729c8',
      '1475924156734-496f6cac6ec1',
      '1502082553048-f009c371b9b5'
    ][i % 10]
  }?q=80&w=800&auto=format&fit=crop`,
  title: [
    'Misty Mountains',
    'Golden Hour',
    'Ocean Breeze',
    'Starry Night',
    'Green Valley',
    'Autumn Forest',
    'Sunset Beach',
    'Night City',
    'Morning Dew',
    'River Flow'
  ][i % 10] + ` ${Math.floor(i / 10) + 1}`,
  location: [
    'Swiss Alps',
    'Kyoto, Japan',
    'Maldives',
    'Atacama Desert',
    'New Zealand',
    'Vermont, USA',
    'Bali, Indonesia',
    'New York, USA',
    'Amazon Rainforest',
    'Nile River'
  ][i % 10],
  date: new Date(Date.now() - i * 86400000).toISOString(),
  width: [600, 800, 500, 700][i % 4],
  height: [800, 600, 700, 500][i % 4]
}))

export default defineEventHandler(async (event): Promise<ApiResponse<PaginatedResponse<Photo>>> => {
  const query = getQuery(event)
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 9

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500))

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedPhotos = mockPhotos.slice(startIndex, endIndex)
  const total = mockPhotos.length

  return {
    code: 200,
    message: 'Success',
    data: {
      list: paginatedPhotos,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }
  }
})
