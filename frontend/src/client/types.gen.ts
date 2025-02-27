// This file is auto-generated by @hey-api/openapi-ts

export type HTTPValidationError = {
  detail?: Array<ValidationError>
}

export type ImageCreate = {
  title?: string | null
  category: string
  url: string
  width: number
  height: number
  captured_time: string
}

export type ImagePublic = {
  title?: string | null
  category: string
  url: string
  width: number
  height: number
  captured_time: string
  id: string
}

export type ImageUpdate = {
  title?: string | null
  category: string
  url: string
  width: number
  height: number
  captured_time: string
}

export type ValidationError = {
  loc: Array<string | number>
  msg: string
  type: string
}

export type EndpointApiV1ImagesPostData = {
  requestBody: ImageCreate
}

export type EndpointApiV1ImagesPostResponse = unknown

export type EndpointApiV1ImagesIdGetData = {
  id: string
}

export type EndpointApiV1ImagesIdGetResponse = unknown

export type EndpointApiV1ImagesIdPatchData = {
  id: string
  requestBody: ImageUpdate
}

export type EndpointApiV1ImagesIdPatchResponse = unknown

export type EndpointApiV1ImagesIdDeleteData = {
  id: string
}

export type EndpointApiV1ImagesIdDeleteResponse = unknown

export type UpsertMultipleImagesApiV1UpsertMultiImagesPostData = {
  requestBody: Array<ImageCreate>
}

export type UpsertMultipleImagesApiV1UpsertMultiImagesPostResponse =
  Array<ImagePublic> | null

export type GetMultiImagesApiV1GetMultiImagesGetData = {
  limit?: number | null
  offset?: number
  sortColumns?: Array<string> | null
  sortOrders?: Array<string> | null
}

export type GetMultiImagesApiV1GetMultiImagesGetResponse =
  Array<ImagePublic> | null

export type HealthCheckApiV1UtilsHealthCheckGetResponse = boolean

export type GetContainerSasApiV1UtilsContainerSasTokenGetResponse = string
